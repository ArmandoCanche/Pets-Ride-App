import React from "react";

export default function Team() {
  const team = [
    {
      name: "Leticia Tejero",
      role: "CEO",
      image: "Lae-Team.png",
    },
    {
      name: "Luis Lagunez",
      role: "Project Manager",
      image: "Luis-Team.png",
    },
    {
      name: "Jorge Canche",
      role: "DEV & Designer",
      image: "Jorge-Team.png",
    },
    {
      name: "Bryan Cetzal",
      role: "DEV & QA",
      image: "Bryan-Team.png",
    },
    {
      name: "Andrés Turriza",
      role: "Marketing & Análisis",
      image: "Andres-Team.png",
    },
  ];

  return (
    <section className="py-16 bg-[#f4f5f6]">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-12">
          Nuestro equipo directivo
        </h2>

        {/* Centramos los elementos dentro del grid */}
        <div className="flex flex-wrap justify-center gap-10">
        {team.map((person, index) => (
            <div key={index} className="flex flex-col items-center text-center">
            <img
                src={person.image}
                alt={person.name}
                className="w-40 h-40 md:w-44 md:h-44 rounded-full object-cover shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
            {/**<p className="text-sm text-gray-500 mt-1">{person.role}</p>*/}
            </div>
        ))}
        </div>
      </div>
    </section>
  );
}
