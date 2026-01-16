// src/services/chargerService.ts

export interface Charger {
    id: string;
    address: string;
    power: string;
    connectorType: string;
    price: string;
    coordinates: [number, number]; // [latitud, longitud]
}

// Interfaz cruda de la respuesta de OpenDataSoft
interface ApiRecord {
    record: {
        id: string;
        fields: {
            direccion?: string;
            potencia?: string;
            tipo_conector?: string;
            precio?: string;
            geo_point_2d?: {
                lat: number;
                lon: number;
            };
            // A veces viene como array en otras APIs, prevenimos
            geo_shape?: {
                geometry: {
                    coordinates: [number, number];
                }
            }
        };
    };
}

export const fetchChargers = async (): Promise<Charger[]> => {
    const API_URL = 'https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records/?limit=50';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al conectar con el servidor de datos');

        const data = await response.json();

        return data.records.map((item: ApiRecord) => {
            const f = item.record.fields;
            return {
                id: item.record.id,
                address: f.direccion || 'Ubicación desconocida',
                power: f.potencia || 'No especificado',
                connectorType: f.tipo_conector || 'Estándar',
                price: f.precio || 'Consultar app',
                // Ojo: OpenData devuelve lat/lon, Leaflet usa [lat, lon]
                coordinates: f.geo_point_2d
                    ? [f.geo_point_2d.lat, f.geo_point_2d.lon]
                    : [39.4699, -0.3763] // Fallback al centro de Valencia
            };
        });
    } catch (error) {
        console.error("Error fetching chargers:", error);
        return [];
    }
};