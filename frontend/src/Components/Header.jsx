import React, { useState } from "react";
import { BadgeQuestionMark, Heart, Menu, PawPrint, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-[#f26644] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo-h.png" alt="Pet's Ride Logo" style={{height: '5rem' }} />
        </div>

        {/* Menú principal - visible en pantallas medianas en adelante */}
        <nav className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <button
                onClick={() => navigate("/registro/cliente")}
                className="flex items-center gap-2 hover:text-[#f26644] transition"
            >
                <Search className="w-5 h-5" />
                Buscar cuidadores
            </button>

            <button
                onClick={() => navigate("/registro/prestador")}
                className="flex items-center gap-2 hover:text-[#f26644] transition"
            >
                <Heart className="w-5 h-5" />
                Hazte cuidador
            </button>

            <button
                onClick={() => navigate("/#servicios")}
                className="flex items-center gap-2 hover:text-[#f26644] transition"
            >
                <PawPrint className="w-5 h-5" />
                Nuestros servicios
            </button>
        </nav>

            {/* Ayuda - lado derecho */}
            <div className="hidden md:block">
            <button
                onClick={() => navigate("/centro-de-ayuda")}
                className="flex items-center gap-2 text-gray-700 hover:text-[#f26644] font-medium transition"
            >
                <BadgeQuestionMark className="w-5 h-5" />
                Ayuda
            </button>
            </div>

        {/* Botón menú para móviles */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <nav className="flex flex-col p-4 space-y-3 text-gray-700 font-medium">
            <button
              onClick={() => {
                navigate("/buscar-cuidadores");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Buscar cuidadores
            </button>
            <button
              onClick={() => {
                navigate("/hazte-cuidador");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Hazte cuidador
            </button>
            <button
              onClick={() => {
                navigate("/servicios");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Nuestros servicios
            </button>
            <button
              onClick={() => {
                navigate("/ayuda");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Ayuda
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
