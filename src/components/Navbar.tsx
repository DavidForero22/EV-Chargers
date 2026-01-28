import React, { useState } from 'react';
import { Zap, Menu, X, Map, Bookmark, BarChart } from 'lucide-react'; // Importamos X para cerrar
import { Link, useLocation } from 'react-router-dom';

/**
 * Provides persistent top-level navigation, branding, and authentication access.
 * Uses a sticky positioning to remain visible while scrolling.
 */
export const Navbar: React.FC = () => {
    // 1. Estado para controlar la visibilidad del menú móvil
    const [isOpen, setIsOpen] = useState(false);
    
    // Hook para saber en qué página estamos (opcional, para estilos)
    const location = useLocation();

    // Función para cerrar el menú al hacer clic en un enlace
    const closeMenu = () => setIsOpen(false);

    // Función auxiliar para estilos de enlaces activos
    const getLinkClass = (path: string) => 
        location.pathname === path 
            ? "text-emerald-400 font-bold" 
            : "text-slate-300 hover:text-emerald-400 transition";

    return (
        <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">

                {/** Brand Logo & Home Link */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                >
                    <div className="bg-emerald-500/20 p-2 rounded-full">
                        <Zap className="w-6 h-6 text-emerald-400" />
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        EV <span className="text-emerald-400">Chargers</span>
                    </span>
                </Link>

                {/** Desktop Navigation Links (Hidden on mobile) */}
                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <Link to="/map" className={getLinkClass('/map')}>
                        Mapa
                    </Link>
                    <Link to="/bookings" className={getLinkClass('/bookings')}>
                        Mis Reservas
                    </Link>
                    <Link to="/statistics" className={getLinkClass('/statistics')}>
                        Estadísticas
                    </Link>
                </div>

                {/** Mobile Menu Trigger */}
                <div className="flex items-center gap-4 md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-300 hover:text-white transition p-1"
                        aria-label="Toggle menu"
                    >
                        {/* Cambia el icono entre Menu (hamburguesa) y X (cerrar) */}
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/** * MOBILE DROPDOWN MENU 
             * Se renderiza solo si isOpen es true
             */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl animate-in slide-in-from-top-5 duration-200">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link 
                            to="/map" 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 ${getLinkClass('/map')}`}
                        >
                            <Map className="w-5 h-5" />
                            Mapa
                        </Link>

                        <Link 
                            to="/bookings" 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 ${getLinkClass('/bookings')}`}
                        >
                            <Bookmark className="w-5 h-5" />
                            Mis Reservas
                        </Link>

                        <Link 
                            to="/statistics" 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 ${getLinkClass('/statistics')}`}
                        >
                            <BarChart className="w-5 h-5" />
                            Estadísticas
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};