import React, { useState } from "react";
import { BadgeQuestionMark, Heart, Menu, PawPrint, User, X } from "lucide-react";
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
          <img src="/logo-h.png" alt="Pet's Ride Logo" style={{ height: "5rem" }} />
        </div>

        {/* Menú desktop */}
        <nav className="hidden md:flex space-x-10 text-gray-700 font-medium">
          <button
            onClick={() => navigate("/registro/cliente")}
            className="flex items-center gap-2 hover:text-[#f26644] transition"
          >
            <Heart className="w-5 h-5" />
            Hazte cliente
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

        {/* Login + Ayuda desktop */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/login/cliente")}
            className="flex items-center gap-2 hover:text-[#f26644] transition"
          >
            <User className="w-5 h-5" />
            Login
          </button>

          <button
            onClick={() => navigate("/centro-de-ayuda")}
            className="flex items-center gap-2 text-gray-700 hover:text-[#f26644] font-medium transition"
          >
            <BadgeQuestionMark className="w-5 h-5" />
            Ayuda
          </button>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <nav className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
            <button
              onClick={() => {
                navigate("/registro/cliente");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Hazte cliente
            </button>

            <button
              onClick={() => {
                navigate("/registro/prestador");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Hazte cuidador
            </button>

            <button
              onClick={() => {
                navigate("/#servicios");
                setMenuOpen(false);
              }}
              className="hover:text-[#f26644]"
            >
              Nuestros servicios
            </button>

            <button
              onClick={() => {
                navigate("/login/cliente");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:text-[#f26644]"
            >
              <User className="w-5 h-5" />
              Login
            </button>

            <button
              onClick={() => {
                navigate("/centro-de-ayuda");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:text-[#f26644]"
            >
              <BadgeQuestionMark className="w-5 h-5" />
              Ayuda
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
