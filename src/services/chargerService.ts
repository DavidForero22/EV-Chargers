export interface Charger {
    id: string;
    address: string;
    power: string;
    connectorType: string;
    price: string;
    coordinates: [number, number]; // [latitud, longitud]
}

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
        if (!response.ok) throw new Error('Error connecting to the data server');

        const data = await response.json();

        return data.records.map((item: ApiRecord) => {
            const f = item.record.fields;
            return {
                id: item.record.id,
                address: f.direccion || 'Location unknown',
                power: f.potencia || 'Not specified',
                connectorType: f.tipo_conector || 'Standard',
                price: f.precio || 'Check app',
                coordinates: f.geo_point_2d
                    ? [f.geo_point_2d.lat, f.geo_point_2d.lon]
                    : [39.4699, -0.3763]
            };
        });
    } catch (error) {
        console.error("Error fetching chargers:", error);
        return [];
    }
};