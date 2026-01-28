import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { MapPage } from "./pages/MapPage";
import { MyBookings } from "./pages/MyBookings";

function App() {
	return (
		<BrowserRouter>
			{/** Flex container ensures the Footer always stays at the bottom of the viewport */}
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
				</Routes>

				{/** Global Footer */}
				<footer className="bg-slate-950 py-6 text-center text-slate-600 text-sm border-t border-slate-900 mt-auto">
					<p>© 2026 EV Chargers. All rights reserved.</p>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
