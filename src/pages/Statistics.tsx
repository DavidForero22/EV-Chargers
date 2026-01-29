import React, { useMemo } from "react";
import { getBookings } from "../services/chargerService";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import { TrendingUp, DollarSign, Zap, Leaf, Activity } from "lucide-react";

export const Statistics: React.FC = () => {
	const bookings = getBookings();

	// --- LÓGICA DE CÁLCULO DE ESTADÍSTICAS ---
	const stats = useMemo(() => {
		const totalBookings = bookings.length;

		// Total gastado en reservas (bookingFee está en céntimos)
		const totalSpent =
			bookings.reduce((acc, curr) => acc + curr.bookingFee, 0) / 100;

		// Estimación de kWh cargados (simulado: media de 25kWh por sesión)
		const totalEnergy = totalBookings * 25;

		// Estimación de CO2 ahorrado vs Gasolina (aprox 0.4kg ahorrado por kWh)
		const co2Saved = (totalEnergy * 0.4).toFixed(1);

		// Datos para el Gráfico Circular (Tipos de Conector)
		const connectorData = bookings.reduce((acc: any[], curr) => {
			const existing = acc.find((item) => item.name === curr.connectorType);
			if (existing) {
				existing.value += 1;
			} else {
				acc.push({ name: curr.connectorType, value: 1 });
			}
			return acc;
		}, []);

		// Datos para el Gráfico de Barras (Gasto por Potencia)
		const powerData = bookings.reduce((acc: any[], curr) => {
			const existing = acc.find((item) => item.name === curr.power);
			if (existing) {
				existing.amount += curr.bookingFee / 100;
			} else {
				acc.push({ name: curr.power, amount: curr.bookingFee / 100 });
			}
			return acc;
		}, []);

		return {
			totalBookings,
			totalSpent,
			totalEnergy,
			co2Saved,
			connectorData,
			powerData,
		};
	}, [bookings]);

	const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

	return (
		<div className="flex-1 bg-slate-900 py-10 text-white">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold flex items-center gap-3">
						<Activity className="text-emerald-400" />
						Estadísticas de Uso
					</h1>
					<p className="text-slate-400 mt-1">
						Análisis de tu consumo y ahorro energético.
					</p>
				</div>

				{/* KPI CARDS - Indicadores clave */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
					{/* Card 1: Gasto Total */}
					<div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-slate-400 text-sm font-medium uppercase">
									Inversión Total
								</p>
								<h3 className="text-3xl font-bold mt-1">
									{stats.totalSpent.toFixed(2)}€
								</h3>
							</div>
							<div className="bg-emerald-500/20 p-3 rounded-xl">
								<DollarSign className="w-6 h-6 text-emerald-400" />
							</div>
						</div>
						<p className="text-xs text-slate-500">En tarifas de reserva</p>
					</div>

					{/* Card 2: Total Reservas */}
					<div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-slate-400 text-sm font-medium uppercase">
									Sesiones
								</p>
								<h3 className="text-3xl font-bold mt-1">
									{stats.totalBookings}
								</h3>
							</div>
							<div className="bg-blue-500/20 p-3 rounded-xl">
								<TrendingUp className="w-6 h-6 text-blue-400" />
							</div>
						</div>
						<p className="text-xs text-slate-500">Reservas completadas</p>
					</div>

					{/* Card 3: Energía Estimada */}
					<div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-slate-400 text-sm font-medium uppercase">
									Energía Est.
								</p>
								<h3 className="text-3xl font-bold mt-1">
									{stats.totalEnergy}{" "}
									<span className="text-lg text-slate-500">kWh</span>
								</h3>
							</div>
							<div className="bg-yellow-500/20 p-3 rounded-xl">
								<Zap className="w-6 h-6 text-yellow-400" />
							</div>
						</div>
						<p className="text-xs text-slate-500">Carga total estimada</p>
					</div>

					{/* Card 4: CO2 Ahorrado */}
					<div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
						<div className="flex justify-between items-start mb-4">
							<div>
								<p className="text-slate-400 text-sm font-medium uppercase">
									CO2 Ahorrado
								</p>
								<h3 className="text-3xl font-bold mt-1">
									{stats.co2Saved}{" "}
									<span className="text-lg text-slate-500">kg</span>
								</h3>
							</div>
							<div className="bg-green-500/20 p-3 rounded-xl">
								<Leaf className="w-6 h-6 text-green-400" />
							</div>
						</div>
						<p className="text-xs text-slate-500">Vs. vehículo de combustión</p>
					</div>
				</div>

				{/* GRÁFICOS */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Gráfico 1: Inversión por Potencia */}
					<div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
						<h3 className="text-xl font-bold mb-6 text-white">
							Gasto por Tipo de Potencia
						</h3>
						<div className="h-[300px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={stats.powerData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="#334155"
										vertical={false}
									/>
									<XAxis
										dataKey="name"
										stroke="#94a3b8"
										fontSize={12}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke="#94a3b8"
										fontSize={12}
										tickLine={false}
										axisLine={false}
										tickFormatter={(value) => `${value}€`}
									/>

									<Tooltip
										contentStyle={{
											backgroundColor: "#1e293b",
											borderColor: "#334155",
											color: "#fff",
										}}
										itemStyle={{ color: "#10b981" }}
										formatter={(value: any) => [
											`${Number(value).toFixed(2)}€`,
											"Gasto",
										]}
									/>
									<Bar
										dataKey="amount"
										fill="#10b981"
										radius={[4, 4, 0, 0]}
										barSize={50}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Gráfico 2: Tipos de Conector Preferidos */}
					<div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
						<h3 className="text-xl font-bold mb-6 text-white">
							Conectores Más Usados
						</h3>
						<div className="h-[300px] w-full relative">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={stats.connectorData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={100}
										paddingAngle={5}
										dataKey="value"
									>
										{stats.connectorData.map((index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
												stroke="none"
											/>
										))}
									</Pie>
									<Tooltip
										contentStyle={{
											backgroundColor: "#1e293b",
											borderColor: "#334155",
											color: "#fff",
										}}
									/>
									<Legend
										verticalAlign="bottom"
										height={36}
										iconType="circle"
									/>
								</PieChart>
							</ResponsiveContainer>
							{/* Centro del Donut */}
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<div className="text-center">
									<span className="text-3xl font-bold text-white">
										{stats.totalBookings}
									</span>
									<p className="text-xs text-slate-500 uppercase">Total</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
