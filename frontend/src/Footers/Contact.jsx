import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Contact() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Contenedor principal del contenido */}
      <div className="relative bg-gray-50 flex flex-col items-center py-16 px-6 md:px-20">
        {/* Fondo de huellitas solo detrás del contenido */}
        <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat z-0"></div>

        {/* Contenido real */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          {/* Encabezado */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#f26644] mb-4 text-center">
            ¡Nos encantará saber de ti!
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mb-10">
            ¿Tienes dudas, sugerencias o quieres colaborar con Pet’s Ride?
            Completa el formulario o contáctanos por tus medios favoritos.
          </p>

          <div className="grid md:grid-cols-2 gap-10 w-full">
            {/* Formulario */}
            <form className="bg-white p-8 rounded-2xl shadow-md flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="border text-gray-400 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
                required
              />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="border text-gray-400 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
                required
              />
              <input
                type="text"
                placeholder="Asunto"
                className="border text-gray-400 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
              />
              <textarea
                placeholder="Tu mensaje"
                rows="5"
                className="border text-gray-400 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#f26644]"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-[#f26644] hover:bg-[#007e99] text-white font-semibold py-3 rounded-xl transition"
              >
                Enviar mensaje
              </button>
            </form>

            {/* Información de contacto */}
            <div className="flex flex-col justify-center space-y-6 bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contáctanos directamente</h2>
              <p className="text-gray-600">
                Estamos aquí para ayudarte y asegurarnos de que tú y tu mascota tengan la mejor experiencia.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-[#f26644]" /> contacto@petsride.mx
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-[#f26644]" /> +52 1 998 555 0000
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#f26644]" /> Abu Dabi, Emiratos Árabes Unidos
                </div>
              </div>

              <div className="pt-4 text-center">
                <h3 className="font-semibold text-gray-800 mb-3">Síguenos en redes</h3>
                <div className="flex items-center justify-center gap-4 ">
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
            </div>
          </div>

          {/* Mensaje final */}
          <p className="mt-16 text-center text-gray-500 text-sm max-w-xl">
            En Pet's Ride, tu tranquilidad y la felicidad de tu mascota son nuestra prioridad
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
