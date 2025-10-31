import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Shield, Heart, Star } from "lucide-react";

export default function RecuperarContrasenaCliente() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "cliente";

  const handleBack = () => {
    navigate(from === "prestador" ? "/login/prestador" : "/login/cliente");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] px-4 overflow-hidden">
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 bg-[url('/bg-l.jpg')] bg-repeat opacity-10 z-0"
        aria-hidden="true"
      ></div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-6xl w-full gap-10">
        
        {/* Columna izquierda (solo visible en pantallas grandes) */}
        <div className="hidden lg:flex flex-col flex-1 text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Pet's Ride</h1>
          <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Recupera tu cuenta
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            No te preocupes, te enviaremos instrucciones para restablecer 
            tu contraseña y volver a acceder a los mejores servicios para tus mascotas.
          </p>

          {/* Beneficios */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#fceeeb] p-3 rounded-2xl flex-shrink-0">
                <Shield className="w-5 h-5 text-[#f26644]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Seguro y Protegido</h3>
                <p className="text-sm text-gray-500">
                  Tu información está protegida con encriptación de nivel bancario.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#dde9e7] p-3 rounded-2xl flex-shrink-0">
                <Heart className="w-5 h-5 text-[#005c71]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Soporte 24/7</h3>
                <p className="text-sm text-gray-500">
                  Nuestro equipo está aquí para ayudarte en cualquier momento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#fceeeb] p-3 rounded-2xl flex-shrink-0">
                <Star className="w-5 h-5 text-[#f26644]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Recuperación Rápida</h3>
                <p className="text-sm text-gray-500">
                  Recibe tu enlace de recuperación en minutos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha (formulario) */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-gray-100 shadow-xl rounded-3xl w-full max-w-md p-10 text-center">
            {/* Logo */}
            <div className="flex flex-col items-center mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Pet's Ride</h1>
            </div>
            {!sent ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  ¿Olvidaste tu contraseña?
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Ingresa tu correo y te enviaremos instrucciones para restablecerla
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f26644] outline-none text-gray-600"
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
      </div>
    </div>
  );
}
