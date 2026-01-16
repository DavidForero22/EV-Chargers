import React from 'react';
import { Map, Calendar, BarChart3, Bell } from 'lucide-react';

export const Features: React.FC = () => {
    const features = [
        {
            title: "Interactive Map",
            desc: "Find nearby chargers, filter by connector type, and check availability in real time.",
            icon: <Map className="w-8 h-8 text-emerald-400" />
        },
        {
            title: "Smart Reservations",
            desc: "Secure your refill by scheduling a date and time. Avoid unnecessary waiting.",
            icon: <Calendar className="w-8 h-8 text-sky-400" />
        },
        {
            title: "Consumption Reports",
            desc: "Detailed statistics on your energy consumption, CO2 savings, and monthly expenses.",
            icon: <BarChart3 className="w-8 h-8 text-emerald-400" />
        },
        {
            title: "Live Alerts",
            desc: "Receive notifications about completed top-ups, free points, or incidents.",
            icon: <Bell className="w-8 h-8 text-sky-400" />
        }
    ];

    return (
        <div className="bg-slate-900 py-20 px-4 border-t border-slate-800">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Everything you need for your EV
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
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