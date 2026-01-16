// src/services/chargerService.ts

export interface Charger {
  id: string;
  address: string;
  power: string;
  connectorType: string;
  price: string;
  outlets: number;
  coordinates: [number, number]; // [latitud, longitud]
}

// Interfaz ajustada a la respuesta REAL de la API
interface ApiRecord {
  record: {
    id: string;
    fields: {
      emplazamie?: string;
      potenc_ia?: string;
      conector?: string;
      precio_iv?: string;
      toma?: string | number;

      // Coordenadas
      geo_point_2d?: {
        lat: number;
        lon: number;
      };
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
      const rawOutlets = Number(f.toma);
      const safeOutlets = isNaN(rawOutlets) || rawOutlets < 1 ? 1 : rawOutlets;

      return {
        id: item.record.id,
        address: f.emplazamie || 'Location unknown',
        power: f.potenc_ia || 'Not specified',
        connectorType: f.conector || 'Standard',
        price: f.precio_iv || 'Check App',
        outlets: safeOutlets,

        // Verificamos que existan coordenadas, si no, fallback al centro
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