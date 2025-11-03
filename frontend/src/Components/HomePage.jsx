import * as React from 'react';
import {useNavigate } from 'react-router-dom';
import { ArrowRight, StarIcon, HeartIcon, Shield,CheckCircleIcon } from "lucide-react";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
import Footer from './Footer';
import TestimonialsSection from './TestimonialSection';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <section
          className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
        >
          {/* Fondo */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/bg-pets.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.15,
              zIndex: 0,
            }}
          ></div>

          {/* Capa blanca base */}
          <div className="absolute inset-0 bg-white z-[-1]"></div>

          {/* Contenido principal */}
          <div className="relative z-10 flex w-full max-w-7xl px-8 flex-col lg:flex-row">
            {/* Izquierda: texto + avatar */}
            <div className="flex-1 flex flex-col justify-center text-black space-y-4">
              <div>
                {/* Texto con tamaños responsivos */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-snug">
                  Cuidado
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-snug">
                  Profesional
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-snug">
                  para tu <br/><span className="text-[#005c71]">Mejor Amigo</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl max-w-lg lg:max-w-2xl">
                Conecta con proveedores verificados de servicios para mascotas. Paseos,
                veterinaria, transporte, hoteles y más. Cuidado profesional en el que
                puedes confiar.
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/login/cliente")}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                  Buscas Servicios <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate("/login/prestador")}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                  Ofrecer Servicios
                </button>
              </div>

              {/* Avatares y calificación */}
              <div className="mt-8 flex items-center gap-8 text-gray-700 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <img src="/cliente1.jpg" alt="cliente1" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/cliente2.jpg" alt="cliente2" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/cliente1.jpg" alt="cliente3" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/cliente2.jpg" alt="cliente4" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="/cliente1.jpg" alt="cliente4" className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-semibold">5,000+ clientes</p>
                    <p className="text-sm text-gray-500 -mt-1">satisfechos</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <div className="flex text-orange-500">
                    <StarIcon size={20} fill="currentColor" />
                    <StarIcon size={20} fill="currentColor" />
                    <StarIcon size={20} fill="currentColor" />
                    <StarIcon size={20} fill="currentColor" />
                    <StarIcon size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-semibold">4.9/5</p>
                    <p className="text-sm text-gray-500 -mt-1">calificación</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Derecha: recuadro con imagen redondeada, oculto en tablet */}
            <div className="flex-1.5 flex justify-center items-center mt-8 lg:mt-0 lg:block hidden">
              <div className="w-140 h-140 overflow-hidden rounded-[3rem] shadow-lg">
                <img
                  src="/gd-1.jpg"
                  alt="Perro feliz"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
      </section>

      <section className="w-full bg-[#005c71] py-16">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
            
            {/* Mascotas Felices */}
            <div className="flex flex-col items-center">
              <HeartIcon className="w-10 h-10 mb-4" />
              <h2 className="text-3xl font-bold">10,000+</h2>
              <p className="mt-2 text-lg">Mascotas Felices</p>
            </div>

            {/* Proveedores Verificados */}
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 mb-4" />
              <h2 className="text-3xl font-bold">2,500+</h2>
              <p className="mt-2 text-lg">Proveedores Verificados</p>
            </div>

            {/* Servicios Completados */}
            <div className="flex flex-col items-center">
              <CheckCircleIcon className="w-10 h-10 mb-4" />
              <h2 className="text-3xl font-bold">50,000+</h2>
              <p className="mt-2 text-lg">Servicios Completados</p>
            </div>

            {/* Calificación Promedio */}
            <div className="flex flex-col items-center">
              <StarIcon className="w-10 h-10 mb-4" />
              <h2 className="text-3xl font-bold">4.9/5</h2>
              <p className="mt-2 text-lg">Calificación Promedio</p>
            </div>

          </div>
      </section>

      <section className="w-full bg-[#f6fcfc] py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Encabezado */}
          <div className="mb-10">
            <span className="text-sm font-medium text-[#005c71] border border-[#005c71] px-3 py-1 rounded-full">
              Proceso Simple
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-900">
              ¿Cómo Funciona Pet's Ride?
            </h2>
            <p className="text-gray-600 mt-2">
              Tres simples pasos para encontrar el cuidado perfecto para tu mascota
            </p>
          </div>

          {/* Pasos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Paso 1 */}
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-left hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="absolute top-6 right-6 text-5xl font-extrabold text-gray-100 select-none">
                01
              </div>
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24"  strokeWidth={2}  stroke="#005c71"  className="w-6 h-6">
                  <path  strokeLinecap="round"  strokeLinejoin="round"  d="M21 21l-4.35-4.35M9.75 18a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Busca y Compara</h3>
              <p className="text-gray-600 leading-relaxed">
                Explora proveedores verificados, lee reseñas reales y compara precios para
                encontrar el servicio perfecto.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-left hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="absolute top-6 right-6 text-5xl font-extrabold text-gray-100 select-none">
                02
              </div>
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#005c71" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5m-7.5 3.75h7.5m-9 3.75h9M9.75 3v1.5M14.25 3v1.5M3 9h18M5.25 5.25h13.5A2.25 2.25 0 0121 7.5v11.25A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V7.5a2.25 2.25 0 012.25-2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reserva Fácilmente</h3>
              <p className="text-gray-600 leading-relaxed">
                Selecciona fecha y hora, elige tu mascota y confirma tu reserva en minutos con pago seguro.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-left hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="absolute top-6 right-6 text-5xl font-extrabold text-gray-100 select-none">
                03
              </div>
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#005c71" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Disfruta la Tranquilidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Recibe actualizaciones en tiempo real y comunícate directamente con tu proveedor durante el servicio.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Encabezado */}
          <div className="mb-10">
            <span className="text-sm font-medium text-[#005c71] border border-[#005c71] px-3 py-1 rounded-full">
              Servicios Completos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-900">
              Todo lo que tu Mascota Necesita
            </h2>
            <p className="text-gray-600 mt-2">
              Desde paseos diarios hasta cuidado veterinarios,<br/> encuentra todo en un solo lugar
            </p>
          </div>

          {/* Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <PetsIcon sx={{ fontSize: 28, color: '#005c71' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Paseos</h3>
            </div>

            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#fceeeb] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <VaccinesIcon sx={{ fontSize: 28, color: '#ff7043' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Veterinaria</h3>
            </div>

            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <ElectricMopedIcon sx={{ fontSize: 28, color: '#005c71' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Transporte</h3>
            </div>

            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#fceeeb] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <ApartmentIcon sx={{ fontSize: 28, color: '#ff7043' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hoteles</h3>
            </div>


            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <ContentCutIcon sx={{ fontSize: 28, color: '#005c71' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Peluquería</h3>
            </div>

            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#fceeeb] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <SchoolIcon sx={{ fontSize: 28, color: '#ff7043' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Entrenamiento</h3>
            </div>

            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <HomeIcon sx={{ fontSize: 28, color: '#005c71' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cuidado en Casa</h3>
            </div>


            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#fceeeb] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <LocalHospitalIcon sx={{ fontSize: 28, color: '#ff7043' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergencias</h3>
            </div>

          </div>
        </div>
      </section>

      <TestimonialsSection/>

      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Encabezado */}
          <div className="mb-10">
            <span className="text-sm font-medium text-[#005c71] border border-[#005c71] px-3 py-1 rounded-full">
              Seguridad Garantizada
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
              <br/>Tu Confianza es Nuestra Prioridad<br/>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1 */}
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#005c71" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M9.75 18a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Proveedores verificados</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos los proveedores pasan por un riguroso proceso de verificación incluyendo antecedentes y certificaciones.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#005c71" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5m-7.5 3.75h7.5m-9 3.75h9M9.75 3v1.5M14.25 3v1.5M3 9h18M5.25 5.25h13.5A2.25 2.25 0 0121 7.5v11.25A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V7.5a2.25 2.25 0 012.25-2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pagos Seguros</h3>
              <p className="text-gray-600 leading-relaxed">
                Procesamiento de pagos encriptado y protegido. Tu información financiera siempre está segura.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-white shadow-md rounded-2xl border-2 border-[#d7e0de] p-8 relative text-center hover:shadow-lg hover:border-[#005c71] hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="mb-6 bg-gradient-to-tr from-[#e0f6f8] to-[#f7fbfc] p-3 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#005c71" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema de calificaciones y reseñas verificadas. Solo los mejores proveedores permanecen en la plataforma.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section
        className="relative text-center text-white py-24 px-6 bg-[#005c71] overflow-hidden"
        style={{
          backgroundImage: "url('/bg-2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Capa de oscurecimiento sutil */}
        <div className="absolute inset-0 bg-[#005c71]/90"></div>

        {/* Contenido principal */}
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Etiqueta superior */}
          <span className="text-sm font-semibold tracking-wide bg-[#ff7043] text-white px-4 py-1 rounded-full inline-block mb-4">
            Únete Hoy
          </span>

          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            ¿Listo para Darle a tu <br className="hidden md:block" /> 
            Mascota el Mejor Cuidado?
          </h2>

          {/* Subtítulo */}
          <p className="text-lg text-gray-100 mb-10">
            Únete a miles de dueños felices que confían en Pet's Ride para las
            necesidades de cuidado de sus mascotas.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/registro/cliente")}
              className="flex items-center justify-center gap-2 bg-[#ff7043] hover:bg-[#ff5722] text-white font-semibold px-8 py-3 rounded-xl transition">
              Comenzar Ahora <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/registro/prestador")}
              className="border border-gray-300 text-white hover:bg-white hover:text-[#005c71] font-semibold px-8 py-3 rounded-xl transition">
              Ofrecer Servicios
            </button>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}