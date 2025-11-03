import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ServiceTerm (){
  const navigate = useNavigate();

  return (
    <div>
        <Header/>
        <div className="bg-gray-50 min-h-screen flex flex-col items-center py-16 px-6 md:px-20 relative">
            {/* Fondo sutil de huellitas */}
            <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat z-0"></div>

            {/* Contenido */}
            <div className="relative z-10 w-full max-w-4xl bg-white shadow-md rounded-2xl p-8 md:p-12">
                <h1 className="text-3xl font-bold text-[#f26644] mb-6 text-center">
                Términos de Servicio
                </h1>

                <p className="text-gray-600 mb-4">
                Bienvenido a <span className="font-semibold">Pet's Ride</span>. Al acceder o utilizar
                nuestros servicios, aceptas los presentes Términos de Servicio. Por favor,
                léelos cuidadosamente antes de usar nuestra plataforma.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                1. Aceptación de los Términos
                </h2>
                <p className="text-gray-600 text-jestify mb-4">
                Al crear una cuenta o utilizar cualquier servicio ofrecido por Pet's Ride,
                confirmas que has leído, entendido y aceptado estos Términos. Si no estás de
                acuerdo, no podrás usar la plataforma.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                2. Servicios ofrecidos
                </h2>
                <p className="text-gray-600 text-jestify mb-4">
                Pet's Ride actúa como un intermediario entre usuarios y proveedores de
                servicios para mascotas, tales como paseos, transporte, alojamiento, cuidado y
                entrenamiento. No somos responsables directos de los servicios prestados por
                terceros.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                3. Responsabilidad del usuario
                </h2>
                <p className="text-gray-600 text-jestify mb-4">
                Los usuarios deben proporcionar información veraz y actualizada. Cualquier uso
                indebido, fraude o comportamiento inapropiado puede resultar en la suspensión
                o eliminación de la cuenta.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                4. Pagos y comisiones
                </h2>
                <p className="text-gray-600 text-jestify mb-4">
                Los pagos por servicios se gestionan a través de nuestra plataforma. Pet's Ride
                puede aplicar una comisión por el uso del sistema. Los proveedores son
                responsables de cumplir con las normativas fiscales aplicables.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                5. Limitación de responsabilidad
                </h2>
                <p className="text-gray-600 text-jestify mb-4">
                Pet's Ride no se hace responsable de pérdidas, daños o inconvenientes derivados
                de los servicios ofrecidos por terceros. Sin embargo, trabajamos constantemente
                para garantizar la seguridad y confianza de todos nuestros usuarios.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                6. Cambios en los términos
                </h2>
                <p className="text-gray-600 text-jestify mb-4">
                Pet's Ride puede modificar estos Términos en cualquier momento. Las versiones
                actualizadas estarán disponibles en nuestro sitio web. El uso continuado de la
                plataforma implica la aceptación de los cambios.
                </p>

                <h2 className="text-xl font-semibold text-[#f26644] mt-8 mb-2">
                7. Contacto
                </h2>
                <p className="text-gray-600 text-jestify mb-8">
                Si tienes preguntas o inquietudes sobre estos Términos, puedes contactarnos en{" "}
                <span className="font-semibold">soporte@petsride.com</span>.
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
