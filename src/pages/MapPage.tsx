import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Zap, BatteryCharging, Map as MapIcon, Info } from 'lucide-react';
import { fetchChargers, type Charger } from '../services/chargerService';
import L from 'leaflet';

// Iconos de Leaflet
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const MapPage: React.FC = () => {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchChargers();
      setChargers(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="flex-1 bg-slate-900 pb-10">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        
        {/* Nueva Sección de Título e Información (Encima del mapa) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <MapIcon className="text-sky-400 w-8 h-8" />
              Reserva tu punto de carga
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Explora los puntos de recarga disponibles en la red de Valencia. 
              Selecciona un marcador para ver detalles y reservar.
            </p>
          </div>
          
          {/* Tarjeta de Estado */}
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg min-w-[250px]">
            <div className="bg-emerald-500/10 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estado de la Red</p>
              <p className="text-xl font-bold text-white">
                {loading ? 'Sincronizando...' : `${chargers.length} Puntos Activos`}
              </p>
            </div>
          </div>
        </div>

        {/* Contenedor del Mapa con Margen y Bordes */}
        {/* min-h-[600px] asegura que tenga altura aunque no sea full screen */}
<div className="flex-1 h-[70vh] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative z-0 ring-1 ring-slate-700/50">
          <MapContainer
            center={[39.4699, -0.3763]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
<TileLayer
              attribution='&copy; CartoDB'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {chargers.map((charger) => (
              <Marker 
                key={charger.id} 
                position={charger.coordinates} 
                icon={customIcon}
              >
                <Popup>
                  {/* Popup personalizado con estilos Tailwind dentro */}
                  <div className="p-1 min-w-[200px] font-sans">
                    <h3 className="font-bold text-slate-900 text-base mb-2 border-b border-slate-200 pb-2">
                      {charger.address}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <BatteryCharging className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium">{charger.power}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">{charger.connectorType}</span>
                      </div>
                    </div>
                    <button className="w-full bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-100 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-md">
                      RESERVAR
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Leyenda o info extra al pie del mapa */}
        <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
          <Info className="w-4 h-4" />
          <span>Datos proporcionados por OpenData Valencia. Actualizado en tiempo real.</span>
        </div>
      </div>
    </div>
  );
};