import * as React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Increíble servicio. Sarah cuida a Max como si fuera suyo. Siempre recibo fotos y actualizaciones durante los paseos.",
      name: "María González",
      role: "Dueña de Max",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      text: "La mejor plataforma para encontrar cuidadores de confianza. Mis gatos están felices y yo tranquilo cuando viajo.",
      name: "Carlos Rodríguez",
      role: "Dueño de Luna y Sol",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      text: "El proceso de reserva es súper fácil y los proveedores están todos verificados. 100% recomendado para cualquier dueño de mascota.",
      name: "Ana Martínez",
      role: "Dueña de Rocky",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="bg-[#f7fbfb] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Encabezado */}
        <div className="mb-10">
          <span className="text-sm font-medium text-[#005c71] border border-[#005c71] px-3 py-1 rounded-full">
              Testimonios
            </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            Lo que Dicen Nuestros Clientes
          </h2>
          <p className="text-gray-600 mt-2">
            Miles de dueños de mascotas confían en Pet's Ride <br/> para el cuidado de sus compañeros
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-left"
            >
              <FormatQuoteIcon sx={{ color: "#a0c4c7", fontSize: 32 }} />
              <div className="flex gap-1 my-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#ff9933", fontSize: 20 }} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
