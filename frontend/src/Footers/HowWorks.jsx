import { PawPrint, Calendar, CreditCard, Star } from "lucide-react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function HowWorks() {
  const pasos = [
    {
      icon: <PawPrint className="w-10 h-10 text-[#f26644]" />,
      titulo: "1. Crea tu cuenta",
      descripcion:
        "Regístrate en Pet’s Ride con unos pocos clics y completa tu perfil para que podamos ofrecerte los mejores servicios para tu mascota."
    },
    {
      icon: <Calendar className="w-10 h-10 text-[#f26644]" />,
      titulo: "2. Encuentra el servicio ideal",
      descripcion:
        "Explora entre paseadores, veterinarios, cuidadores, entrenadores y más. Filtra por ubicación, disponibilidad y calificaciones."
    },
    {
      icon: <CreditCard className="w-10 h-10 text-[#f26644]" />,
      titulo: "3. Reserva y paga con seguridad",
      descripcion:
        "Agenda el servicio en el horario que prefieras y realiza tu pago directamente desde la app con total seguridad."
    },
    {
      icon: <Star className="w-10 h-10 text-[#f26644]" />,
      titulo: "4. Valora tu experiencia",
      descripcion:
        "Cuando finalice el servicio, califica a tu cuidador y comparte tu opinión para ayudar a otros dueños de mascotas."
    }
  ];

  return (
    <div>
        <Header/>

        <div className="min-h-screen bg-gray-50 pt-40 pb-16 px-6 md:px-20 ">
            <div className="max-w-5xl mx-auto text-center mb-14">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                ¿Cómo funciona Pet’s Ride para los clientes?
                </h1>
                <p className="text-gray-600 text-lg">
                Conecta con profesionales de confianza para el cuidado, transporte y bienestar de tu mascota. 
                Todo desde un solo lugar y en cuestión de minutos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pasos.map((paso, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center transition transform hover:-translate-y-1"
                >
                    <div className="flex justify-center mb-4">{paso.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{paso.descripcion}</p>
                </motion.div>
                ))}
            </div>

            <div className="text-center mt-16">
                <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-[#f26644] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#007e99] transition"
                >
                ¡Comienza ahora!
                </motion.button>
            </div>
        </div>

        <Footer/>
    </div>
    
  );
}
