import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Shield, Heart, Star, Eye, EyeOff } from "lucide-react";

export default function LoginClient() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] flex items-center justify-center px-4 relative">
      {/* Fondo con huellitas */}
      <div className="absolute inset-0 bg-[url('/bg-l.jpg')] opacity-10 bg-repeat"></div>

      {/* Contenedor de dos columnas */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start max-w-6xl w-full gap-10 mb-8">
        
        {/* Columna izquierda - solo visible en pantallas grandes */}
        <div className="hidden lg:flex flex-1 flex-col text-left">
          <h1 className="mt-4 text-4xl font-bold text-gray-800 mb-8">Pet's Ride</h1>
          <h2 className="mt-4 text-5xl font-bold text-gray-800 mb-4">
            Bienvenido de vuelta a Pet's Ride
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Encuentra los mejores servicios para el cuidado de tus mascotas con proveedores verificados y confiables.
          </p>

          {/* Beneficios */}
          <div className="space-y-2">
            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#fceeeb] p-3 rounded-2xl flex-shrink-0">
                <Shield className="w-5 h-5 text-[#f26644]" />
              </div>
              <div>
                <h1 className="text-md font-semibold text-gray-800">Prestadores Verificados</h1>
                <p className="text-sm text-gray-500">
                  Todos nuestros proveedores pasan por verificación de antecedentes.
                </p>
              </div>
            </div>

            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#dde9e7] p-3 rounded-2xl flex-shrink-0">
                <Heart className="w-5 h-5 text-[#005c71]" />
              </div>
              <div>
                <h1 className="text-md font-semibold text-gray-800">Cuidado con Amor</h1>
                <p className="text-sm text-gray-500">
                  Profesionales apasionados por el bienestar de tus mascotas.
                </p>
              </div>
            </div>

            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#fceeeb] p-3 rounded-2xl flex-shrink-0">
                <Star className="w-5 h-5 text-[#f26644]" />
              </div>
              <div>
                <h1 className="text-md font-semibold text-gray-800">Calificaciones Reales</h1>
                <p className="text-sm text-gray-500">
                  Lee reseñas de otros dueños de mascotas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="flex-1 bg-white shadow-xl rounded-3xl w-full max-w-xl p-10 border border-gray-100">
          {/* Logo y título */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="bg-[#fceeeb] p-3 rounded-full mb-3">
              <Heart className="w-8 h-8 text-[#f26644]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Iniciar Sesión</h1>
            <p className="text-gray-500">
              Ingresa a tu cuenta para encontrar servicios para tus mascotas
            </p>
          </div>

          {/* Inicio de sesión */}
          <div className="mb-6">
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Contraseña</label>
              <div className="relative mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2h-4v-2zM5 11h14v10H5V11z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 focus:border-[#f26644]/30"
                />
                {/* Icono ojo */}
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Enlace de recuperación */}
              <div className="text-right mt-2">
                <a
                  onClick={() => navigate("/recuperar-contraseña", { state: { from: "cliente" } })}
                  className="text-xs text-[#f26644] hover:underline font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/cliente")}
              className="w-full bg-[#f26644] hover:bg-[#ff8c6d] text-white px-10 py-3 rounded-xl font-semibold transition"
            >
              Iniciar sesión
            </button>

            <p className="text-xs text-gray-400 mt-3">
              ¿No tienes cuenta?{" "}
              <span
                onClick={() => navigate("/registro/cliente")}
                className="font-semibold text-[#f26644] hover:underline cursor-pointer"
              >
                Regístrate
              </span>
            </p>

            {/* Línea con "o" */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t-2 border-gray-200"></div>
              <span className="mx-3 text-gray-400">o</span>
              <div className="flex-grow border-t-2 border-gray-200"></div>
            </div>

            <button
              onClick={() => navigate("/login/prestador")}
              className="w-full border border-gray-300 text-gray-700 hover:bg-[#005c71] hover:text-white font-semibold px-10 py-3 rounded-xl transition"
            >
              Ingresa como Prestador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
