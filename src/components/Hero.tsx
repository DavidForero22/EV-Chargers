import React from 'react';
import { MapPin, BatteryCharging, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
    return (
        <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
            {/* Efectos de fondo (Gradientes difuminados) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Smart energy for your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                        Electric Vehicle
                    </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Manage reservations, view charging points in real time, and monitor your energy consumption from a single platform.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
                    <Link to="/map" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 px-8 rounded-full transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Search for Charging Points
                    </Link>
                    {/* <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 px-8 rounded-full transition flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-sky-400" />
                        Administrator Access
                    </button> */}
                </div>

                {/* Tarjetas de Estadísticas Rápidas (Dummy Data) */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <StatCard
                        label="Available Points"
                        value="142"
                        color="text-emerald-400"
                        icon={<MapPin className="w-5 h-5 text-emerald-400" />}
                    />
                    <StatCard
                        label="Energy Supplied (Today)"
                        value="2.4 MWh"
                        color="text-sky-400"
                        icon={<BatteryCharging className="w-5 h-5 text-sky-400" />}
                    />
                    <StatCard
                        label="Active Users"
                        value="+1.2k"
                        color="text-white"
                        icon={<User className="w-5 h-5 text-white" />}
                    />
                </div> */}
            </div>
        </div>
    );
};

// Sub-componente simple para las tarjetas
// const StatCard = ({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) => (
//     <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl flex items-center gap-4 hover:border-emerald-500/30 transition">
//         <div className="bg-slate-700/50 p-3 rounded-lg">
//             {icon}
//         </div>
//         <div className="text-left">
//             <p className={`text-2xl font-bold ${color}`}>{value}</p>
//             <p className="text-slate-400 text-sm">{label}</p>
//         </div>
//     </div>
// );