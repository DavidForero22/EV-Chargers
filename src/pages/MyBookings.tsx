import React, { useEffect, useState } from "react";
import { getBookings, type Booking } from "../services/chargerService";
import {
	MapPin,
	Calendar,
	Clock,
	Zap,
	CreditCard,
	ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export const MyBookings: React.FC = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);

	useEffect(() => {
		setBookings(getBookings());
	}, []);

	return (
		<div className="flex-1 bg-slate-900 py-12">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
						<p className="text-slate-400">
							History of your reserved charging points.
						</p>
					</div>
					{bookings.length > 0 && (
						<div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
							<span className="text-slate-400 text-sm">Total: </span>
							<span className="text-white font-bold">{bookings.length}</span>
						</div>
					)}
				</div>

				{bookings.length === 0 ? (
					<div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-700 border-dashed">
						<div className="bg-slate-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
							<Zap className="w-8 h-8 text-slate-500" />
						</div>
						<h3 className="text-xl font-bold text-white mb-2">
							No bookings yet
						</h3>
						<p className="text-slate-400 mb-6">
							Explore the map to find your first charger.
						</p>
						<Link
							to="/map"
							className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
						>
							Go to Map <ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				) : (
					<div className="space-y-4">
						{bookings.map((booking) => (
							<div
								key={booking.transactionId}
								className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group shadow-lg"
							>
								<div className="flex flex-col md:flex-row gap-6 justify-between">
									{/* Info Principal */}
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">
												CONFIRMED
											</span>
											<span className="text-slate-500 text-xs font-mono tracking-wider">
												#{booking.transactionId}
											</span>
										</div>

										<h3 className="text-xl font-bold text-white mb-2 flex items-start gap-2">
											<MapPin className="w-5 h-5 text-sky-400 mt-1 shrink-0" />
											{booking.address}
										</h3>

										<div className="flex items-center gap-4 text-sm text-slate-400 mt-3">
											<div className="flex items-center gap-1.5">
												<Zap className="w-4 h-4 text-yellow-500" />
												<span>{booking.power}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<CreditCard className="w-4 h-4 text-slate-500" />
												<span>Reserva pagada</span>
											</div>
										</div>
									</div>

									{/* Fecha y Precio */}
									<div className="flex flex-row md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0 min-w-[140px]">
										<div className="text-right">
											<p className="text-xs text-slate-500 font-bold uppercase mb-1">
												Booked on
											</p>
											<div className="flex items-center justify-end gap-2 text-slate-300">
												<span>
													{new Date(booking.bookingDate).toLocaleDateString()}
												</span>
												<Calendar className="w-4 h-4" />
											</div>
											<div className="flex items-center justify-end gap-2 text-slate-300 mt-1">
												<span>
													{new Date(booking.bookingDate).toLocaleTimeString(
														[],
														{ hour: "2-digit", minute: "2-digit" },
													)}
												</span>
												<Clock className="w-4 h-4" />
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
