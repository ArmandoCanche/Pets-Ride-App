import React from "react";
import Footer from "../Components/Footer";
import Team from "../Components/Team";
import Header from "../Components/Header";

export default function AboutUs() {
  return (
    <div>
        <Header/>
        {/* Información sobre la empresa */}
        <section className="w-full bg-white">
            {/* Imagen de fondo */}
            <div className="relative w-full h-72 md:h-96">
                <img
                src="ab-1.jpeg"
                alt="Sobre Pet's Ride"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Contenedor de texto */}
            <div className="max-w-4xl mx-auto bg-white -mt-20 md:-mt-28 p-8 md:p-12 rounded-2xl relative z-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sobre Pet's Ride</h2>
                <p className="text-gray-700 text-lg mb-4">
                Te damos la bienvenida a la red de cuidadores, paseadores y proveedores de servicios
                para mascotas más confiable y amorosa de México.
                </p>

                <p className="text-gray-700 mb-4">
                En Pet’s Ride creemos que toda mascota merece recibir atención con cariño y profesionalismo,
                y nuestra misión es facilitarte el acceso a los mejores servicios para tu compañero peludo.
                </p>

                <p className="text-gray-700 mb-4">
                Nacimos con la idea de conectar a dueños responsables con cuidadores, veterinarios y transportistas
                de confianza, integrando tecnología, seguridad y amor por los animales en un solo lugar.
                </p>

                <p className="text-gray-700">
                Nuestra comunidad crece día a día, ayudando a más personas a ofrecer y encontrar servicios
                que transforman la vida de sus mascotas. Pet’s Ride: porque ellos también merecen lo mejor.
                </p>
            </div>
        </section> 

        {/* Información sobre el equipo */}
        <Team/>
        <Footer/>
    </div> 
  );
};
