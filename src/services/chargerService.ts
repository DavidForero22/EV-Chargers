/**
 * Servicio encargado de la comunicación con la API de OpenDataSoft
 * y la gestión del almacenamiento local (LocalStorage).
 */

// Interfaz para el modelo "limpio" que usa nuestra APP.
export interface Charger {
	id: string;
	address: string;
	power: string;
	connectorType: string;
	price: string;
	outlets: number;
	coordinates: [number, number];
	pricePerKwh: number;
	bookingFee: number;
}

// Interfaz que define la estructura EXACTA de la respuesta de la API externa.
interface ApiRecord {
	record: {
		id: string;
		fields: {
			emplazamie?: string;
			potenc_ia?: string;
			conector?: string;
			precio_iv?: string;
			toma?: string | number;
			geo_point_2d?: { lat: number; lon: number };
		};
	};
}

/**
 * FUNCIÓN DE OBTENCIÓN DE DATOS (FETCH)
 * Recupera la lista de cargadores desde la API pública de Valencia.
 * Realiza un patrón de "Adaptador": Convierte datos externos en el formato interno.
 */
export const fetchChargers = async (): Promise<Charger[]> => {
	const API_URL =
		"https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records/?limit=50";

	try {
		// Petición asíncrona al servidor
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Error connecting to the data server");

		const data = await response.json();

		// MAPPING (Transformación):
		return data.records.map((item: ApiRecord) => {
			const f = item.record.fields;
			const rawOutlets = Number(f.toma);
			const safeOutlets = isNaN(rawOutlets) || rawOutlets < 1 ? 1 : rawOutlets;
			const powerValue = parseInt(f.potenc_ia || "0");
			const isFastCharger = powerValue >= 40; // Umbral para considerar carga rápida (40kW)

			// Carga rápida (>40kW): Más cara la reserva y el kWh.
			// Carga lenta (<40kW): Más económica.
			const calculatedBookingFee = isFastCharger ? 299 : 199; // Precio en céntimos
			const calculatedKwhPrice = isFastCharger ? 0.55 : 0.29; // Precio en Euros

			return {
				id: item.record.id,
				address: f.emplazamie || "Ubicación desconocida",
				power: f.potenc_ia || "No especificado",
				connectorType: f.conector || "Estándar",
				price: f.precio_iv || "Consultar App",
				outlets: safeOutlets,
				// Geo-coordenadas: Si fallan, centramos en Valencia capital por defecto.
				coordinates: f.geo_point_2d
					? [f.geo_point_2d.lat, f.geo_point_2d.lon]
					: [39.4699, -0.3763],

				pricePerKwh: calculatedKwhPrice,
				bookingFee: calculatedBookingFee,
			};
		});
	} catch (error) {
		console.error("Error fetching chargers:", error);
		// Retornamos array vacío para que la UI no se rompa, aunque falle la red.
		return [];
	}
};

export interface Booking extends Charger {
	bookingDate: string;
	transactionId: string;
}

// Clave para guardar en el navegador
const STORAGE_KEY = "ev_bookings_v1";

/**
 * FUNCIÓN DE GUARDADO (PERSISTENCIA)
 * Guarda una nueva reserva en el LocalStorage del navegador.
 * Esto permite que las reservas sobrevivan si el usuario refresca la página.
 */
export const saveBooking = (charger: Charger, customDate?: string): Booking => {
	// Leer lo que ya existe para no sobrescribirlo
	const existingJson = localStorage.getItem(STORAGE_KEY);
	const existingBookings: Booking[] = existingJson
		? JSON.parse(existingJson)
		: [];

	// Crear el objeto reserva con ID único y fecha
	const newBooking: Booking = {
		...charger,
		bookingDate: customDate || new Date().toISOString(),
		// Generador simple de ID de transacción (ej: RES-48102)
		transactionId: `RES-${Math.floor(Math.random() * 100000)
			.toString()
			.padStart(5, "0")}`,
	};

	// Añadir la nueva al principio del array y guardar
	const updatedBookings = [newBooking, ...existingBookings];
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));

	return newBooking;
};

/**
 * FUNCIÓN DE LECTURA
 * Simplemente recupera el array de reservas guardadas.
 */
export const getBookings = (): Booking[] => {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
};
