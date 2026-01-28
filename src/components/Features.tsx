import React from 'react';
import { Map, Calendar, BarChart3, Bell } from 'lucide-react';

/**
 * Displays a grid of key application capabilities (Map, Reservations, Reports, Alerts).
 */
export const Features: React.FC = () => {

    /**
     * Static configuration for feature cards.
     * Contains the display data and specific Lucide icon for each item.
     */
    const features = [
        {
            title: "Mapa interactivo",
            desc: "Encuentra cargadores cercanos, filtra por tipo de conector y comprueba la disponibilidad en tiempo real..",
            icon: <Map className="w-8 h-8 text-emerald-400" />
        },
        {
            title: "Reservas inteligentes",
            desc: "Asegúrate tu recarga programando una fecha y hora. Evita esperas innecesarias..",
            icon: <Calendar className="w-8 h-8 text-sky-400" />
        },
        {
            title: "Informes de consumo",
            desc: "Estadísticas detalladas sobre tu consumo energético, ahorro de CO2 y gastos mensuales..",
            icon: <BarChart3 className="w-8 h-8 text-emerald-400" />
        },
        {
            title: "Alertas en vivo",
            desc: "Reciba notificaciones sobre recargas completadas, puntos gratuitos o incidentes..",
            icon: <Bell className="w-8 h-8 text-sky-400" />
        }
    ];

    return (
        <div className="bg-slate-900 py-20 px-4 border-t border-slate-800">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Todo lo que necesitas para tu vehículo eléctrico
                </h2>

                {/* Responsive Grid Layout: 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        /** * Feature Card.
                         * Includes hover effects for border color and icon scaling.
                         */
                        <div key={index} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-800 hover:bg-slate-800 hover:border-emerald-500/30 transition group">
                            <div className="mb-4 bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};