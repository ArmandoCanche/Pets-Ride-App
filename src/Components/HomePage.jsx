import * as React from 'react';
import {useNavigate } from 'react-router-dom';
import { ArrowRight, StarIcon, HeartIcon, ShieldCheckIcon,CheckCircleIcon } from "lucide-react";
import Footer from './Footer';

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
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                  Buscas Servicios <ArrowRight size={15} />
                </button>
                <button
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
              <HeartIcon className="w-10 h-10 mb-4" /> {/* Puedes usar Heroicons o cualquier librería de íconos */}
              <h2 className="text-3xl font-bold">10,000+</h2>
              <p className="mt-2 text-lg">Mascotas Felices</p>
            </div>

            {/* Proveedores Verificados */}
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="w-10 h-10 mb-4" />
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

      <section>

      </section>

      <Footer/>
    </div>
  );
}