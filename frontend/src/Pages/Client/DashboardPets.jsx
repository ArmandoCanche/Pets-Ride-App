import { useState, useEffect } from "react";
import { Pets, Search } from "@mui/icons-material";
import { Button, Input, CircularProgress } from "@mui/material";
import { differenceInYears, parseISO } from "date-fns";

// Componentes
import PetCard from "../../Components/PetCard";
import PetDetailModal from "../../Components/PetDetailModal";
import EditPetModal from "../../Components/EditPetModal";

// Servicio
import { petsService } from "../../services/petsService";

export default function DashboardPets() {
    // 1. ESTADOS
    const [searchQuery, setSearchQuery] = useState("");
    const [pets, setPets] = useState([]); // Array vacío inicial
    const [loading, setLoading] = useState(true);
    
    // Estados de Modales
    const [petDetailModalOpen, setPetDetailModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    // 2. CARGAR MASCOTAS (API)
    const fetchPets = async () => {
        try {
            setLoading(true);
            const data = await petsService.getAll();
            
            // MAPEO: Convertir DB (snake_case) a UI (camelCase)
            const mappedPets = data.map(pet => ({
                id: pet.pet_id,
                name: pet.name,
                species: pet.species,
                breed: pet.breed || "No especificada",
                // Calculamos la edad si hay fecha, si no mostramos N/A
                age: pet.birth_date 
                    ? differenceInYears(new Date(), new Date(pet.birth_date)) 
                    : "N/A",
                weight: pet.weight_kg,
                gender: "N/A", // Dato no existente en tu DB actual, placeholder
                specialNeeds: pet.medical_notes, // Mapeamos notas médicas aquí
                medicalHistory: pet.medical_notes,
                imageUrl: pet.photo_url 
            }));

            setPets(mappedPets);
        } catch (error) {
            console.error("Error al cargar mascotas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    // 3. FILTRADO (Sobre los datos reales)
    const filteredPets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // HANDLERS
    const handlePetClick = (pet) => {
        setSelectedPet(pet);
        setPetDetailModalOpen(true);
    };

    const handleCreateNew = () => {
        setCreateModalOpen(true);
    };

    // Función para refrescar la lista cuando el modal de "Crear/Editar" termine
    const handleModalSuccess = () => {
        fetchPets();
        setCreateModalOpen(false);
        setPetDetailModalOpen(false);
    };

    return (
        <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            {/* BARRA SUPERIOR */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-row flex-1 border-2 border-gray-400 bg-white rounded-xl items-center w-full'>
                    <Search sx={{ width: 20, mx: 1, color: '#9ca3af' }} />
                    <Input
                        placeholder="Buscar mascotas por nombre o raza"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#374151', fontWeight: 500 }}
                        disableUnderline
                        size="medium"
                    />
                </div>
                <Button 
                    onClick={handleCreateNew} 
                    sx={{ textTransform: 'none', padding: '10px 16px', fontFamily: 'Poppins, sans-serif', height: '100%', borderRadius: 3, color: '#fff', border: 'none', bgcolor: '#f37556', '&:hover': { bgcolor: '#f37556' } }}
                >
                    Agregar mascota
                </Button>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <CircularProgress sx={{ color: '#f37556' }} />
                </div>
            ) : filteredPets.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPets.map((pet) => (
                        <div key={pet.id} onClick={() => handlePetClick(pet)} className="cursor-pointer">
                            <PetCard {...pet} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300 gap-10">
                    <Pets sx={{ height: 64, width: 64, color: '#888888ff' }} />
                    <p className="text-2xl font-medium text-gray-400 text-center px-4">
                        {searchQuery 
                            ? "No se encontraron mascotas que coincidan con tu búsqueda."
                            : "Aún no has agregado mascotas."}
                    </p>
                </div>
            )}

            {/* MODALES */}
            {selectedPet && (
                <PetDetailModal 
                    open={petDetailModalOpen} 
                    onOpenChange={setPetDetailModalOpen} 
                    pet={selectedPet} 
                />
            )}
            
            <EditPetModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                pet={null}
                onSuccess={handleModalSuccess} 
            />
        </main>
    );
}