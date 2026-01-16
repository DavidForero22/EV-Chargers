import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Serves as the main landing entry point, featuring the value proposition
 * and a direct call-to-action to the Map functionality.
 */
export const Hero: React.FC = () => {
    return (
        <div className="bg-slate-900 text-white py-20 relative overflow-hidden">

            {/** Ambient background glow effects (decorative & non-interactive) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Smart energy for your <br />

                    {/** Gradient text effect using bg-clip-text */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                        Electric Vehicle
                    </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Manage reservations, view charging points in real time, and monitor your energy consumption from a single platform.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">

                    {/** Primary Call-to-Action: Navigates to the Map Page */}
                    <Link to="/map" className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-3 px-8 rounded-full transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Search for Charging Points
                    </Link>
                </div>
            </div>
        </div>
    );
};