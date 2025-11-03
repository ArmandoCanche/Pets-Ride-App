import { Search, Mail, MessageCircle, Calendar, CreditCard, BookOpen, Pill } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function HelpCenter() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        }
    }, [location]);

  return (
    <div>
        <Header/>
        <div className="bg-gray-50 min-h-screen flex flex-col items-center py-16 px-6 md:px-20 relative">
            {/* Fondo sutil de huellitas */}
            <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat z-0"></div>

            {/* Contenedor principal */}
            <div className="relative z-10 w-full max-w-6xl space-y-12">
                
                {/* Encabezado y buscador */}
                <div className="bg-white shadow-sm rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-[#f26644] mb-4 text-center">
                    ¿Cómo podemos ayudarte con el cuidado de tu mascota?
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                    <div className="flex items-center w-full md:w-2/3 bg-gray-100 rounded-full px-4 py-2">
                    <Search className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar artículos de ayuda, temas o preguntas..."
                        className="flex-grow bg-transparent outline-none text-gray-400"
                    />
                    </div>
                    <button className="bg-[#f26644] hover:bg-[#007e99] text-white font-semibold px-6 py-2 rounded-full transition">
                    Buscar
                    </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                    💡 Sugerencia: prueba con “agendar visita veterinaria”
                </p>
                </div>

                {/* Quick Links y Contacto */}
                <div className="grid md:grid-cols-2 gap-8">
                {/* Enlaces rápidos */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-[#f26644] mb-4">
                    Accesos rápidos
                    </h2>
                    <div className="space-y-3">
                    <button className="w-full flex items-center justify-between bg-[#fff5f2] hover:bg-[#ffe8e1] text-gray-700 font-medium p-4 rounded-xl transition">
                        <div className="flex items-center gap-3">
                        <Calendar className="text-[#f26644]" /> Agendar paseo o cita veterinaria
                        </div>
                        <span>›</span>
                    </button>

                    <button className="w-full flex items-center justify-between bg-[#fff5f2] hover:bg-[#ffe8e1] text-gray-700 font-medium p-4 rounded-xl transition">
                        <div className="flex items-center gap-3">
                        <Pill className="text-[#f26644]" /> Administrar recordatorios de medicación
                        </div>
                        <span>›</span>
                    </button>

                    <button className="w-full flex items-center justify-between bg-[#fff5f2] hover:bg-[#ffe8e1] text-gray-700 font-medium p-4 rounded-xl transition">
                        <div className="flex items-center gap-3">
                        <CreditCard className="text-[#f26644]" /> Actualizar método de pago
                        </div>
                        <span>›</span>
                    </button>

                    <button className="w-full flex items-center justify-between bg-[#fff5f2] hover:bg-[#ffe8e1] text-gray-700 font-medium p-4 rounded-xl transition">
                        <div className="flex items-center gap-3">
                        <BookOpen className="text-[#f26644]" /> Leer guía de inicio
                        </div>
                        <span>›</span>
                    </button>
                    </div>
                </div>

                {/* Contacto */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-[#f26644] mb-4">
                    Contactar soporte
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col items-center text-center border rounded-xl p-4 hover:shadow-sm transition">
                        <Mail className="text-[#f26644] mb-2" size={28} />
                        <p className="text-sm text-gray-600">Correo</p>
                        <p className="text-xs text-gray-500">Respondemos en 24h</p>
                        <button className="mt-3 bg-[#f26644] text-white px-4 py-2 rounded-full text-sm hover:bg-[#007e99] transition">
                        Enviar correo
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center border rounded-xl p-4 hover:shadow-sm transition">
                        <MessageCircle className="text-[#f26644] mb-2" size={28} />
                        <p className="text-sm text-gray-600">Chat en vivo</p>
                        <p className="text-xs text-gray-500">Lun–Vie, 9am–6pm</p>
                        <button className="mt-3 bg-[#f26644] text-white px-4 py-2 rounded-full text-sm hover:bg-[#007e99] transition">
                        Iniciar chat
                        </button>
                    </div>
                    </div>

                    {/* Formulario corto */}
                    <form className="space-y-3">
                    <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="w-full border border-gray-300 rounded-xl p-3 text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
                    />
                    <input
                        type="text"
                        placeholder="Asunto"
                        className="w-full border border-gray-300 rounded-xl p-3 text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
                    />
                    <textarea
                        rows="3"
                        placeholder="¿Cómo podemos ayudarte?"
                        className="w-full border border-gray-300 rounded-xl p-3 text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
                    />
                    <button className="bg-[#f26644] hover:bg-[#007e99] text-white font-semibold py-3 rounded-xl w-full transition">
                        Enviar mensaje
                    </button>
                    </form>
                </div>
                </div>

                {/* Preguntas frecuentes */}
                <section id="preguntas-frecuentes">
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-[#f26644] mb-6">
                            Preguntas frecuentes
                        </h2>

                        <div className="space-y-4">
                            <div className="border rounded-xl p-4">
                            <h3 className="font-medium text-gray-800">
                                ¿Cómo agrego una nueva mascota a mi perfil?
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Ve a <span className="font-semibold">Cuenta {'>'} Mascotas {'>'} Agregar mascota</span> 
                                y completa los datos. Puedes subir una foto y su historial de vacunación.
                            </p>
                            </div>

                            <div className="border rounded-xl p-4">
                            <h3 className="font-medium text-gray-800">
                                ¿Puedo configurar recordatorios de medicación?
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Sí. Ve a <span className="font-semibold">Salud {'>'} Medicamentos {'>'} Añadir recordatorio</span> 
                                y define la frecuencia, hora y tipo de notificación.
                            </p>
                            </div>

                            <div className="border rounded-xl p-4">
                            <h3 className="font-medium text-gray-800">
                                ¿Cómo actualizo mi información de pago?
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Abre <span className="font-semibold">Configuración {'>'} Facturación</span> para actualizar 
                                tu tarjeta, ver facturas o administrar tu suscripción.
                            </p>
                            </div>

                            <div className="border rounded-xl p-4">
                            <h3 className="font-medium text-gray-800">
                                ¿Mis datos están seguros?
                            </h3>
                            <p className="text-gray-500 text-sm mt-2">
                                Sí. Usamos cifrado de nivel industrial y nunca compartimos tu información
                                sin tu consentimiento. Consulta nuestra{' '}
                                <a href="/politicas-de-privacidad" className="text-[#f26644] hover:underline">
                                Política de Privacidad
                                </a>.
                            </p>
                            </div>
                        </div>
                        </div>
                </section>
                
            </div>
        </div>
        <Footer/>
    </div>
    
  );
}
