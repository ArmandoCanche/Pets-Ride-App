import React from "react";
import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, User, PawPrint, LockKeyhole, Eye, EyeOff } from "lucide-react";

export default function RegisterClient (){
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] flex flex-col items-center justify-center px-4 relative">
      {/* Fondo con huellitas */}
      <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat"></div>
      <div className="flex flex-col items-center mb-6 text-center">
        <h1 className="m-10 text-4xl font-bold text-gray-800 mb-1">Pet’s Ride</h1>
      </div>
      {/* Contenedor principal */}
      <div className="bg-white shadow-xl rounded-3xl max-w-2xl w-full relative z-10 p-10 border border-gray-100 mb-10">
        {/* Logo y título */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="bg-[#fceeeb] p-3 rounded-2xl mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#f26644]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Únete a Pet’s Ride</h1>
          <p className="text-gray-500">
            Crea tu cuenta para encontrar el mejor cuidado para tus mascotas
          </p>
        </div>

        {/* Sección de información personal */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <User className="w-5 h-5 text-[#005c71]" />
            Información Personal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Nombre *</label>
              <input
                type="text"
                placeholder="Anna"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Apellido *</label>
              <input
                type="text"
                placeholder="Pérez"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">Correo Electrónico *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="tu@ejemplo.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">Número de Teléfono *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="+52 (555) 123-4567"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Sección de ubicación */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <MapPin className="w-5 h-5 text-[#005c71]" />
            Ubicación
          </h2>
          <div>
            <label className="text-sm font-medium text-gray-600">Dirección *</label>
            <input
              type="text"
              placeholder="Calle Principal 123"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Ciudad *</label>
              <input
                type="text"
                placeholder="San Miguel de Cozumel"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Código Postal *</label>
              <input
                type="text"
                placeholder="77602"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71] text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Sección de mascotas */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <PawPrint className="w-5 h-5 text-[#005c71]" />
            Información de Mascotas
          </h2>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
              ¿Cuántas mascotas tienes? *
            </label>
            <select
              className="w-full sm:w-auto mt-1 border border-gray-200 rounded-xl px-10 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30 appearance-none bg-[url('/chevron-down.svg')] bg-no-repeat bg-right bg-center"
              defaultValue="1"
            >
              <option value="1">1 mascota</option>
              <option value="2">2 mascotas</option>
              <option value="3">3 mascotas</option>
              <option value="4">4 mascotas</option>
              <option value="5">5 o más</option>
            </select>

            <p className="text-xs text-gray-400 mt-1">
              Podrás agregar perfiles de mascotas después del registro
            </p>
          </div>
          <div className="mt-6 p-4 border border-gray-200 rounded-2xl bg-white/60 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Contacto de Emergencia <span className="text-gray-500 text-sm">(Opcional)</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nombre del Contacto</label>
                <input
                  type="text"
                  placeholder="Sofía Rodríguez"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Teléfono del Contacto</label>
                <input
                  type="tel"
                  placeholder="+52 (555) 987-6543"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seccion de Seguridad */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <LockKeyhole className="w-5 h-5 text-[#005c71]" />
            Seguridad
          </h2>
          <div>
              {/* Contraseña */}
              <div>
                <label className="text-sm font-medium text-gray-600">Contraseña *</label>
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
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30"
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
                  <p className="text-xs text-gray-400 mt-1">Debe tener al menos 8 caracteres</p>
                </div>
              
                {/* Confirmar Contraseña */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Confirmar Contraseña *</label>
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
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
          </div>
        </div>
        
        {/* Botón final */}
        <div className="mt-8 text-center">
          <button className="w-full border bg-[#f26644] hover:bg-[#ff8c6d] text-white px-10 py-3 rounded-xl font-semibold transition">
            Crear Cuenta
          </button>
          <p className="text-xs text-gray-400 mt-3">
            ¿Ya tienes una cuenta?{' '}
            <span
              onClick={() => navigate("/login/cliente")}
              className="font-semibold text-[#f26644] hover:underline cursor-pointer"
            >
              Iniciar sesión
            </span>
          </p>
          <hr className="my-4 border-t border-gray-300" />
          <button
            onClick={() => navigate("/registro/prestador")}
            className="w-full border border-gray-300 text-gray-700 hover:bg-[#005c71] hover:text-white font-semibold px-10 py-3 rounded-xl transition">
            Registrarse como Proveedor
          </button>
        </div>
      </div>

    </div>
  );
};
