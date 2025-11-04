import { Pets, Search } from "@mui/icons-material"
import { Button, Input } from "@mui/material"
import { div } from "framer-motion/client"
import { useState } from "react"
import { Link } from "react-router-dom"

import PetCard from "../../Components/PetCard"


export default function DashboardPets(){
    const [searchQuery, setSearchQuery] = useState("")
    const [petDetailModalOpen, setPetDetailModalOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState(null)

    const pets = [
        {
        name: "Max",
        species: "perro",
        breed: "Golden Retriever",
        age: 3,
        weight: 30,
        specialNeeds: ["Allergies", "Medication"],
        },
        {
        name: "Luna",
        species: "gato",
        breed: "Persian",
        age: 2,
        weight: 4,
        },
        {
        name: "Charlie",
        species: "perro",
        breed: "Labrador",
        age: 5,
        weight: 35,
        specialNeeds: ["Hip dysplasia"],
        },
        {
        name: "Bella",
        species: "gato",
        breed: "Siamese",
        age: 1,
        weight: 3,
        },
    ]

    const filteredPets = pets.filter(
        (pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handlePetClick = (pet) => {
        setSelectedPet(pet)
        setPetDetailModalOpen(true)
    }

    return (
    <>
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            {/* Buscador + Botón agregar una nueva mascota. */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-row flex-1 border-2 border-gray-400 bg-white rounded-xl items-center w-full'>
                <Search sx={{ width:20, mx:1, color: '#9ca3af', }}/>
                <Input 
                placeholder="Buscar mascotas por nombre o raza"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{  width:'100%', fontFamily:'Poppins, sans-serif', fontSize:15, color:'#374151', fontWeight:500 }}
                disableUnderline
                size="medium"
                />
              </div>
              <Link to={""}>
                  <Button sx={{textTransform: 'none' , padding: '10px 16px', fontFamily: 'Poppins, sans-serif',height:'100%', borderRadius:3, color:'#fff', border:'none',bgcolor:'#f37556', '&:hover': { bgcolor: '#f37556' } }}>
                    Agregar mascota
                  </Button>
              </Link>
            </div>

            {filteredPets.length > 0 ? (
              <div className="grid sm: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPets.map((pet) => (
                  <div key={pet.name} onClick={() => handlePetClick(pet)}>
                    <PetCard {...pet} />
                  </div>
                ))}
              </div>
            ):(
              <div className="flex flex-col items-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300 gap-10">
                <Pets sx={{height:64, width:64, color:'#888888ff'}}/>
                <p className="text-2xl font-medium text-gray-400">
                  {searchQuery ? "No se encontraron mascotas que coincidan con tu búsqueda."
                  : "Aún no has agregado mascotas"}
                </p>
              </div>
            )}

            {selectedPet && (
              // Modal
              ("")
            )}

        </main>
    </>
    )
}