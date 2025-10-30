import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Footer() {
  const navigate = useNavigate();

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
            <a href="https://www.instagram.com/petsride2025" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram size={24} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582693965191&mibextid=wwXIfr&rdid=tPF7gprbBKO7ieNu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17WvjB2RWY%2F%3Fmibextid%3DwwXIfr#" aria-label="Facebook" className="hover:text-blue-600">
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
            <li
              onClick={() => navigate("/login/cliente")}
              className="cursor-pointer hover:text-[#005c71] transition"
            >
              Buscar servicios
            </li>
            <li><a href="/como-funciona" className="hover:text-[#005c71]">Cómo Funciona</a></li>
            <li><a href="/centro-de-ayuda#preguntas-frecuentes" className="hover:text-[#005c71]">Preguntas frecuentes</a></li>
          </ul>
        </div>

        {/* Columna 3: Para Proveedores */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Para Proveedores</h4>
          <ul className="space-y-1 text-gray-400">
            <li
              onClick={() => navigate("/login/prestador")}
              className="cursor-pointer hover:text-[#005c71] transition"
            >
              Ofrecer servicios
            </li>
            <li><a href="#" className="hover:text-[#005c71]">Requisitos</a></li>
            <li><a href="#" className="hover:text-[#005c71]">Comisiones</a></li>
          </ul>
        </div>

        {/* Columna 4: Empresa */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Empresa</h4>
          <ul className="space-y-1 text-gray-400">
            <li
              onClick={() => navigate("/sobre-nosotros")}
              className="cursor-pointer hover:text-[#005c71] transition"
            >
              Sobre Nosotros
            </li>
            <li><a href="#" className="hover:text-[#005c71]">Blog</a></li>
            <li
              onClick={() => navigate("/contacto")}
              className="cursor-pointer hover:text-[#005c71] transition"
            >
              Contacto
            </li>
            <li><a href="/centro-de-ayuda" className="hover:text-[#005c71]">Centro de Ayuda</a></li>
          </ul>
        </div>
      </div>

      {/* Línea divisora */}
      <div className="border-t border-gray-700 mt-12"></div>

      {/* Pie de página inferior */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-sm gap-4">
        <p>&copy; 2025 Pet's Ride. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/terminos-de-servicio")}
            className="hover:text-[#005c71] font-small"
          >
            Términos de servicio
          </button>
          <button
            onClick={() => navigate("/politicas-de-privacidad")}
            className="hover:text-[#005c71] font-small"
          >
            Política de Privacidad
          </button>
          <button
            onClick={() => navigate("/cookies")}
            className="hover:text-[#005c71] font-small"
          >
            Cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
