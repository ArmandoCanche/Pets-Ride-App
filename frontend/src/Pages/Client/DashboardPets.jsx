import { Pets, Search } from "@mui/icons-material"
import { Button, Input } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

import PetCard from "../../Components/PetCard"
import PetDetailModal from "../../Components/PetDetailModal"
import EditPetModal from "../../Components/EditPetModal"


export default function DashboardPets(){
    const [searchQuery, setSearchQuery] = useState("")
    const [petDetailModalOpen, setPetDetailModalOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState(null)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const pets = [
        {
          id: 1,
          name: "Max",
          species: "perro",
          breed: "Golden Retriever",
          age: 3,
          weight: 30,
          gender: "macho",
          specialNeeds: ["Alergia al pollo", "Requiere cepillado diario"],
          medicalHistory: "Vacunación completa 2024. Operado de ligamento cruzado en 2023. Toma condroprotectores.",
          imageUrl: null
        },
        {
          id: 2,
          name: "Luna",
          species: "gato",
          breed: "Persa",
          age: 2,
          weight: 4,
          gender: "hembra",
          specialNeeds: "Dieta renal, Cepillado de ojos",
          medicalHistory: "Esterilizada. Test de leucemia negativo. Chequeo anual pendiente para Noviembre.",
          imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 3,
          name: "Charlie",
          species: "perro",
          breed: "Labrador",
          age: 5,
          weight: 35,
          gender: "macho",
          specialNeeds: ["Displasia de cadera"],
          medicalHistory: "Tratamiento actual para otitis. Historial de dermatitis en verano.",
          imageUrl: null
        },
        {
          id: 4,
          name: "Bella",
          species: "gato",
          breed: "Siamés",
          age: 1,
          weight: 3,
          gender: "hembra",
          specialNeeds: [],
          medicalHistory: "",
          imageUrl: null
        },
        {
          id: 5,
          name: "Remi",
          species: "gato",
          breed: "Atigrado",
          age: 4,
          weight: 10,
          gender: "hembra",
          specialNeeds: "Dieta especial para sobrepeso",
          medicalHistory: "Control de peso mensual. Vacunación al día.",
          imageUrl: null
        }
      ];

    const filteredPets = pets.filter(
        (pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handlePetClick = (pet) => {
        setSelectedPet(pet)
        setPetDetailModalOpen(true)
    }

    const handleCreateNew = () => {
        setCreateModalOpen(true)
    }

    return (
    <>
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
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
                <Button onClick={handleCreateNew} sx={{textTransform: 'none' , padding: '10px 16px', fontFamily: 'Poppins, sans-serif',height:'100%', borderRadius:3, color:'#fff', border:'none',bgcolor:'#f37556', '&:hover': { bgcolor: '#f37556' } }}>
                  Agregar mascota
                </Button>
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
              <PetDetailModal open={petDetailModalOpen} onOpenChange={setPetDetailModalOpen} pet={selectedPet} />
            )}
            <EditPetModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
            pet={null}
            />

        </main>
    </>
    )
}