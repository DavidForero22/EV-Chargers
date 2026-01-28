import React from 'react';
import { Zap, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Provides persistent top-level navigation, branding, and authentication access.
 * Uses a sticky positioning to remain visible while scrolling.
 */
export const Navbar: React.FC = () => {
    return (
        <nav className="bg-slate-900 border-b border-slate-800 text-white p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">

                {/** Brand Logo & Home Link */}
                <Link
                    to="/"
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                >
                    <div className="bg-emerald-500/20 p-2 rounded-full">
                        <Zap className="w-6 h-6 text-emerald-400" />
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        EV <span className="text-emerald-400">Chargers</span>
                    </span>
                </Link>

                {/** Desktop Navigation Links (Hidden on mobile viewports) */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    <Link to="/map" className="hover:text-emerald-400 transition">
                        Map
                    </Link>

                    <Link to="/bookings" className="hover:text-emerald-400 transition">
                        My Reservations
                    </Link>

                    <Link to="/statistics" className="hover:text-emerald-400 transition">
                        Statistics
                    </Link>
                </div>

                {/** User Actions Area */}
                <div className="flex items-center gap-4">
                    {/** Login Button (Desktop only) */}
                    <button className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 transition text-sm">
                        <User className="w-4 h-4 text-sky-400" />
                        <span>Login</span>
                    </button>

                    {/** Hamburger Menu Trigger (Mobile only) */}
                    <button className="md:hidden text-slate-300">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};