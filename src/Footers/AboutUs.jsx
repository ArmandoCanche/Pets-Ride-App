import React from "react";
import Footer from "../Components/Footer";
import Team from "../Components/Team";
import Header from "../Components/Header";
import { BriefcaseMedical, Car, Cat, Dog, Goal, Scissors } from 'lucide-react';


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
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sobre Pet's Ride</h2>
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

              <div className="mt-15">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Conectamos corazones, un paseo a la vez.</h2>
                <p className="text-gray-700 text-justify text-lg mb-4">
                Creemos que cada mascota merece atención, cariño y seguridad en cada etapa de su vida. Ya sea que necesites un paseo diario, transporte seguro, atención veterinaria o un lugar donde tu peludo se sienta como en casa, encontrarás al proveedor ideal para ti, tu mascota y tu estilo de vida.
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Nuestros aliados Pet’s Ride ofrecen:
                  </h3>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="text-2xl"><Dog /></span> Paseo de mascotas
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl"><Cat /></span> Cuidado y alojamiento de mascotas
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl"><Car /></span> Transporte especializado
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl"><BriefcaseMedical /></span> Servicios veterinarios
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl"><Scissors /></span> Estética y bienestar animal
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl"><Goal /></span> Entrenamiento y adiestramiento
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-15">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Porque ellos también merecen lo mejor.</h2>
                <p className="text-gray-700 text-justify text-lg mb-4">
                Tus mascotas también son parte de tu familia, y en Pet's Ride compartimos ese sentimiento. Por eso,
                reunimos a los cuidadores, paseadores, y profesionales más confiables, con la pasión y el compromiso de brindar amor en cada servicio.
                <br/>
                Creemos que cuando cuidamos bien de ellos, también hacemos un mundo mejor para nosotros.
                </p>
              </div>
            </div>
        </section> 

        {/* Información sobre el equipo */}
        <Team/>
        <Footer/>
    </div> 
  );
};
