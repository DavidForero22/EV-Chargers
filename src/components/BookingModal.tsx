import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import {
	X,
	Calendar,
	Clock,
	CreditCard,
	CheckCircle,
	ShieldCheck,
	Zap,
} from "lucide-react";
import { type Charger } from "../services/chargerService";

// IMPORTANTE: Pon aquí tu Public Key de Stripe (empieza por pk_test_)
const stripePromise = loadStripe("pk_test_TU_CLAVE_PUBLICA_AQUI");

// Estilos personalizados para el input de tarjeta de Stripe
const CARD_STYLE = {
	style: {
		base: {
			color: "#32325d",
			fontFamily: "system-ui, sans-serif",
			fontSize: "16px",
			"::placeholder": { color: "#aab7c4" },
		},
		invalid: { color: "#fa755a", iconColor: "#fa755a" },
	},
};

// Formateador de moneda (199 -> 1,99 €)
const formatPrice = (cents: number) =>
	new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
		cents / 100,
	);

const CheckoutForm: React.FC<{ charger: Charger; onClose: () => void }> = ({
	charger,
	onClose,
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessing(true);
		setError(null);

		const cardElement = elements.getElement(CardElement);

		if (!cardElement) {
			setIsProcessing(false);
			return;
		}

		// 1. Validamos la tarjeta con Stripe
		// En un entorno real, aquí enviarías un token al backend para hacer el cargo.
		// Como estamos en modo prueba sin backend, validamos que la tarjeta sea correcta.
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) {
			setError(error.message || "Error al procesar el pago.");
			setIsProcessing(false);
		} else {
			console.log("Pago simulado exitoso. ID:", paymentMethod.id);
			console.log("Cantidad a cobrar:", charger.bookingFee);

			// Simulamos tiempo de red
			setTimeout(() => {
				setPaymentSuccess(true);
				setIsProcessing(false);
			}, 1500);
		}
	};

	if (paymentSuccess) {
		return (
			<div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
				<div className="bg-emerald-100 p-4 rounded-full mb-4">
					<CheckCircle className="w-12 h-12 text-emerald-600" />
				</div>
				<h3 className="text-2xl font-bold text-slate-800 mb-2">
					¡Reserva Confirmada!
				</h3>
				<p className="text-slate-600 mb-1">
					Has pagado {formatPrice(charger.bookingFee)} por reservar el punto.
				</p>
				<p className="text-xs text-slate-400 mb-6 mt-2">
					Usa el código #RES-{Math.floor(Math.random() * 10000)} al llegar.
				</p>
				<button
					onClick={onClose}
					className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
				>
					Cerrar
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
				<h4 className="text-sm font-semibold text-slate-500 uppercase mb-3 flex items-center gap-2">
					<CreditCard className="w-4 h-4" /> Datos de Pago
				</h4>
				<div className="bg-white p-3 rounded border border-slate-300 shadow-sm">
					<CardElement options={CARD_STYLE} />
				</div>
			</div>

			{error && (
				<div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100 font-medium">
					{error}
				</div>
			)}

			{/* Resumen de costes */}
			<div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
				<div className="flex justify-between text-sm text-slate-500">
					<span>Precio estimado carga</span>
					<span>{charger.pricePerKwh} €/kWh</span>
				</div>
				<div className="flex justify-between items-center bg-emerald-50 p-3 rounded-lg border border-emerald-100">
					<span className="font-bold text-emerald-900">Total Reserva</span>
					<span className="text-2xl font-bold text-emerald-700">
						{formatPrice(charger.bookingFee)}
					</span>
				</div>
			</div>

			<button
				type="submit"
				disabled={!stripe || isProcessing}
				className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
			>
				{isProcessing ? "Procesando..." : `Pagar y Reservar`}
			</button>

			<p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
				<ShieldCheck className="w-3 h-3" /> Pagos seguros procesados por Stripe
			</p>
		</form>
	);
};

export const BookingModal: React.FC<{
	charger: Charger;
	onClose: () => void;
}> = ({ charger, onClose }) => {
	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="bg-slate-900 p-6 flex justify-between items-start">
					<div>
						<h2 className="text-xl font-bold text-white mb-1">
							Reservar Punto
						</h2>
						<p className="text-slate-400 text-sm line-clamp-1">
							{charger.address}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-white transition-colors"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Body */}
				<div className="p-6 overflow-y-auto">
					<div className="flex gap-4 mb-6">
						<div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
							<label className="text-xs font-bold text-slate-500 uppercase block mb-1">
								Potencia
							</label>
							<div className="flex items-center gap-2 text-slate-800 font-medium">
								<Zap className="w-4 h-4 text-emerald-600" />
								<span>{charger.power}</span>
							</div>
						</div>
						<div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
							<label className="text-xs font-bold text-slate-500 uppercase block mb-1">
								Inicio
							</label>
							<div className="flex items-center gap-2 text-slate-800 font-medium">
								<Clock className="w-4 h-4 text-emerald-600" />
								<span>Ahora</span>
							</div>
						</div>
					</div>

					<Elements stripe={stripePromise}>
						<CheckoutForm charger={charger} onClose={onClose} />
					</Elements>
				</div>
			</div>
		</div>
	);
};
