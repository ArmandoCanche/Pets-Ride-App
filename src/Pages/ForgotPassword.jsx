import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "cliente"; // por defecto

  const handleBack = () => {
    navigate(from === "prestador" ? "/login/prestador" : "/login/cliente");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Fondo separado con opacidad controlada */}
      <div
        className="absolute inset-0 bg-[url('/bg-2.jpg')] bg-cover bg-center bg-repeat opacity-10"
        aria-hidden="true"
      ></div>

      {/* Contenido sobre el fondo */}
      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center border border-gray-100">
        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Ingresa el correo asociado a tu cuenta. <br />
              Te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  required
                  className="w-full pl-10 pr-4 py-2 text-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f26644] outline-none text-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f26644] hover:bg-[#007e99] text-white py-2 rounded-xl font-semibold transition"
              >
                Enviar enlace
              </button>
            </form>

            <button
              onClick={handleBack}
              className="mt-6 text-sm text-[#005c71] hover:underline"
            >
              Volver al inicio de sesión
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#005c71] mb-2">
              ¡Revisa tu bandeja!
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Si tu correo está registrado, recibirás un enlace para 
              restablecer tu contraseña en unos momentos.
            </p>

            <button
              onClick={handleBack}
              className="w-full bg-[#f26644] hover:bg-[#007e99] text-white py-2 rounded-xl font-semibold transition"
            >
              Volver al inicio de sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
