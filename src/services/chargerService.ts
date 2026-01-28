/**
 * chargerService.ts
 */

export interface Charger {
  id: string;
  address: string;
  power: string;
  connectorType: string;
  price: string; // Texto original de la API
  outlets: number;
  coordinates: [number, number];
  pricePerKwh: number; // Precio calculado
  bookingFee: number;  // Precio de reserva en CÉNTIMOS 
}

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

export const fetchChargers = async (): Promise<Charger[]> => {
  const API_URL = "https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records/?limit=50";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error connecting to the data server");

    const data = await response.json();

    return data.records.map((item: ApiRecord) => {
      const f = item.record.fields;
      
      const rawOutlets = Number(f.toma);
      const safeOutlets = isNaN(rawOutlets) || rawOutlets < 1 ? 1 : rawOutlets;

      // --- LÓGICA DE PRECIOS REALISTA ---
      const powerValue = parseInt(f.potenc_ia || "0");
      const isFastCharger = powerValue >= 40; 

      // Si es carga rápida: 2.99€ reserva / 0.55€ kWh
      // Si es carga lenta:  1.99€ reserva / 0.29€ kWh
      const calculatedBookingFee = isFastCharger ? 299 : 199; 
      const calculatedKwhPrice = isFastCharger ? 0.55 : 0.29;

      return {
        id: item.record.id,
        address: f.emplazamie || "Ubicación desconocida",
        power: f.potenc_ia || "No especificado",
        connectorType: f.conector || "Estándar",
        price: f.precio_iv || "Consultar App",
        outlets: safeOutlets,
        coordinates: f.geo_point_2d
          ? [f.geo_point_2d.lat, f.geo_point_2d.lon]
          : [39.4699, -0.3763],
        
        // Campos nuevos para la pasarela
        pricePerKwh: calculatedKwhPrice,
        bookingFee: calculatedBookingFee 
      };
    });
  } catch (error) {
    console.error("Error fetching chargers:", error);
    return [];
  }
};