import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { MapPage } from "./pages/MapPage";
import { MyBookings } from "./pages/MyBookings";
import { Statistics } from "./pages/Statistics";

function App() {
	return (
		<BrowserRouter>
			{/** El contenedor flexible garantiza que el pie de página permanezca siempre en la parte inferior de la ventana gráfica. */}
			<div className="min-h-screen bg-slate-900 flex flex-col">
				<Navbar />

				<Routes>
					<Route
						path="/"
						element={
							<>
								<Hero />
								<Features />
							</>
						}
					/>
					<Route path="/map" element={<MapPage />} />
					<Route path="/bookings" element={<MyBookings />} />
					<Route path="/statistics" element={<Statistics />} />
				</Routes>

				{/** Pie de página global */}
				<footer className="bg-slate-950 py-6 text-center text-slate-600 text-sm border-t border-slate-900 mt-auto">
					<p>© 2026 EV Chargers. Todos los derechos reservados.</p>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
