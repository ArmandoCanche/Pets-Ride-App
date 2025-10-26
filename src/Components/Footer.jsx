import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-12">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Columna 1: Pet's Ride */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Pet's Ride</h3>
          <p className="text-gray-500">
            Conectando mascotas con los mejores proveedores de servicios desde 2024.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="X" className="hover:text-sky-400">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Columna 2: Para Clientes */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Para Clientes</h4>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">Buscar Servicios</a></li>
            <li><a href="#" className="hover:text-white">Cómo Funciona</a></li>
            <li><a href="#" className="hover:text-white">Precios</a></li>
            <li><a href="#" className="hover:text-white">Preguntas frecuentes</a></li>
          </ul>
        </div>

        {/* Columna 3: Para Proveedores */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Para Proveedores</h4>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">Ofrecer Servicios</a></li>
            <li><a href="#" className="hover:text-white">Requisitos</a></li>
            <li><a href="#" className="hover:text-white">Comisiones</a></li>
            <li><a href="#" className="hover:text-white">Centro de Ayuda</a></li>
          </ul>
        </div>

        {/* Columna 4: Empresa */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Empresa</h4>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">Sobre Nosotros</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Carreras</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>
      </div>

      {/* Línea divisora */}
      <div className="border-t border-gray-700 mt-12"></div>

      {/* Pie de página inferior */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-sm gap-4">
        <p>&copy; 2025 Pet's Ride. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Términos de Servicio</a>
          <a href="#" className="hover:text-white">Política de Privacidad</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
