import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Cookies() {
  const navigate = useNavigate();

  return (
    <div>
        <Header/>

        <div className="bg-gray-50 min-h-screen flex flex-col items-center py-16 px-6 md:px-20 relative">
            {/* Fondo con huellitas sutil */}
            <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat z-0"></div>

            {/* Contenedor principal */}
            <div className="relative z-10 w-full max-w-4xl bg-white shadow-md rounded-2xl p-8 md:p-12">
                <h1 className="text-3xl font-bold text-[#f26644] mb-6 text-center">
                Política de Cookies
                </h1>

                <p className="text-gray-600 text-justify mb-4">
                En <span className="font-semibold">Pet's Ride</span> utilizamos cookies para mejorar tu experiencia,
                ofrecerte contenido personalizado y analizar el uso de nuestra plataforma.
                Al continuar navegando, aceptas el uso de cookies de acuerdo con esta política.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                1. ¿Qué son las cookies?
                </h2>
                <p className="text-gray-600 text-justify mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                cuando visitas un sitio web. Permiten recordar tus preferencias, mejorar el
                rendimiento del sitio y personalizar la experiencia de navegación.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                2. Tipos de cookies que usamos
                </h2>
                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                    <span className="font-semibold text-justify">Cookies esenciales:</span> necesarias para el correcto
                    funcionamiento de la plataforma (inicio de sesión, navegación segura, etc.).
                </li>
                <li>
                    <span className="font-semibold text-justify">Cookies de rendimiento:</span> nos ayudan a entender
                    cómo los usuarios interactúan con Pet's Ride para mejorar nuestros servicios.
                </li>
                <li>
                    <span className="font-semibold text-justify">Cookies de personalización:</span> recuerdan tus
                    preferencias y configuraciones.
                </li>
                <li>
                    <span className="font-semibold text-justify">Cookies publicitarias:</span> se utilizan para mostrar
                    anuncios relevantes basados en tus intereses.
                </li>
                </ul>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                3. Cómo controlar las cookies
                </h2>
                <p className="text-gray-600 text-justify mb-4">
                Puedes aceptar, rechazar o eliminar las cookies desde la configuración de tu
                navegador. Ten en cuenta que al deshabilitar algunas cookies, ciertas funciones
                de la plataforma podrían no funcionar correctamente.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                4. Cookies de terceros
                </h2>
                <p className="text-gray-600 text-justify mb-4">
                Algunas cookies son gestionadas por servicios externos, como Google Analytics o
                proveedores de publicidad. Estas cookies están sujetas a las políticas de
                privacidad de dichos terceros.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                5. Actualizaciones de esta política
                </h2>
                <p className="text-gray-600 text-justify mb-8">
                Pet's Ride puede modificar esta Política de Cookies en cualquier momento. La
                versión más reciente siempre estará disponible en nuestra plataforma, con la
                fecha de última actualización visible.
                </p>

                <div className="text-center">
                <button
                    onClick={() => navigate("/")}
                    className="bg-[#f26644] hover:bg-[#005c71] text-white px-8 py-3 rounded-full font-semibold transition"
                >
                    Volver al inicio
                </button>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
    
  );
};

