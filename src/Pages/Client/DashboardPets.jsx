import { Search } from "@mui/icons-material"
import { Button, Input } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"


export default function DashboardPets(){
    const [searchQuery, setSearchQuery] = useState("")
    const [petDetailModalOpen, setPetDetailModalOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState(null)

    const pets = [
        {
        name: "Max",
        species: "dog",
        breed: "Golden Retriever",
        age: 3,
        weight: 30,
        specialNeeds: ["Allergies", "Medication"],
        },
        {
        name: "Luna",
        species: "cat",
        breed: "Persian",
        age: 2,
        weight: 4,
        },
        {
        name: "Charlie",
        species: "dog",
        breed: "Labrador",
        age: 5,
        weight: 35,
        specialNeeds: ["Hip dysplasia"],
        },
        {
        name: "Bella",
        species: "cat",
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
              <div className='relative flex-1'>
                <Search/>
                <Input 
                placeholder="Buscar mascotas por nombre o raza"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{paddingLeft:4, height:10}}
                />

              </div>
              <Link to={""}>
                <Button
                    sx={{
                      textTransform: 'none' ,
                      borderColor: '#eb9902ff',
                      backgroundColor:'#eb9902ff',
                      fontWeight:500,
                      color: '#ffffffff',
                      borderRadius:3
                    }} variant='outlined' className='w-full bg-transparent'
                >Agregar nueva mascota</Button>
              </Link>
            </div>

        </main>
    </>
    )
}