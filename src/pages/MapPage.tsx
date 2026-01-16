import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Zap, BatteryCharging, Map as MapIcon, Info, Euro } from 'lucide-react';
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

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <MapIcon className="text-sky-400 w-8 h-8" />
                            Reserve your charging point
                        </h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Explore the charging points available in the Valencia network.
                            Select a marker to view details and make a reservation.
                        </p>
                    </div>

                    {/* Tarjeta de Estado */}
                    <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shadow-lg min-w-[250px]">
                        <div className="bg-emerald-500/10 p-3 rounded-lg">
                            <Zap className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Network Status</p>
                            <p className="text-xl font-bold text-white">
                                {loading ? 'Synchronizing...' : `${chargers.length} Active Points`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenedor del Mapa con Margen y Bordes */}
                <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative z-0">
                    <MapContainer
                        center={[39.4699, -0.3763]}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: "600px", width: "100%" }}
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
                                            {/* Potencia + Nº de Tomas */}
                                            <div className="flex items-center justify-between text-slate-700 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                                                    <span className="text-sm font-medium">{charger.power}</span>
                                                </div>


                                                <span className="ml-auto text-[10px] bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 text-slate-600 font-extrabold shadow-sm">
                                                    {charger.outlets} {charger.outlets > 1 ? 'TOMAS' : 'TOMA'}
                                                </span>
                                            </div>

                                            {/* Tipo de Conector */}
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Zap className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-medium">{charger.connectorType}</span>
                                            </div>

                                            {/* Precio */}
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Euro className="w-4 h-4 text-amber-500" />
                                                <span className="text-sm font-medium">{charger.price}</span>
                                            </div>
                                        </div>
                                        <button className="w-full bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-100 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-md">
                                            RESERVE
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* info extra al pie del mapa */}
                <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
                    <Info className="w-4 h-4" />
                    <span>Data provided by OpenData Valencia. Updated in real time.</span>
                </div>
            </div>
        </div>
    );
};