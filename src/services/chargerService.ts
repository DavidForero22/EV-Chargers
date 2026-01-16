/**
 * Domain model representing a normalized Electric Vehicle Charger.
 * This interface is used throughout the application UI.
 */
export interface Charger {
  id: string;
  address: string;
  power: string;
  connectorType: string;
  price: string;
  outlets: number;
  coordinates: [number, number]; /** [Latitude, Longitude] */
}

/**
 * Raw API Response Interface.
 * Mirrors the specific field names returned by the OpenData Valencia API.
 * Note: Field names correspond to the source database columns (e.g., 'emplazamie', 'potenc_ia').
 */
interface ApiRecord {
  record: {
    id: string;
    fields: {
      emplazamie?: string;
      potenc_ia?: string;
      conector?: string;
      precio_iv?: string;
      toma?: string | number;

      geo_point_2d?: {
        lat: number;
        lon: number;
      };
    };
  };
}

/**
 * Fetches charger data from the Valencia Open Data API.
 * Transforms the raw API response into a clean 'Charger' array for the UI.
 *
 * @returns {Promise<Charger[]>} A list of normalized chargers. Returns an empty array on failure.
 */
export const fetchChargers = async (): Promise<Charger[]> => {
  const API_URL = 'https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records/?limit=50';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error connecting to the data server');

    const data = await response.json();

    return data.records.map((item: ApiRecord) => {
      const f = item.record.fields;

      /**
       * Ensures we always have a valid number >= 1, even if the API sends "0" or invalid strings.
       */
      const rawOutlets = Number(f.toma);
      const safeOutlets = isNaN(rawOutlets) || rawOutlets < 1 ? 1 : rawOutlets;

      return {
        id: item.record.id,
        address: f.emplazamie || 'Location unknown',
        power: f.potenc_ia || 'Not specified',
        connectorType: f.conector || 'Standard',
        price: f.precio_iv || 'Check App',
        outlets: safeOutlets,

        /**
         * Falls back to the center of Valencia if coordinates are missing to prevent map crashes.
         */
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