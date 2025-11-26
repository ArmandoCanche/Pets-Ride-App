import { Avatar, Button, Chip, Dialog, DialogContent, Divider } from "@mui/material";
import { AlertCircle, Calendar, Heart, Weight, FileText,  Mars, Venus, PawPrint } from "lucide-react"; // Agregué nuevos iconos de Lucide
import { useState } from "react";
import EditPetModal from "./EditPetModal";

export default function PetDetailModal({open, onOpenChange, pet}) {

  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleEditClick = () => {
    onOpenChange(false)
    setEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    onOpenChange(true);
  }

  // Helper para el icono de género
  const GenderIcon = pet.gender === 'macho' ? Mars : pet.gender === 'hembra' ? Venus : PawPrint;

  return (
    <>
      <Dialog 
      open={open}
      onClose={()=> onOpenChange(false)}
      slotProps={{
        paper:{
          sx:{
            borderRadius: "1rem",
            maxWidth:"600px",
            width:"500px",
            padding:3
          }
        }
      }}
      >
        <DialogContent
        sx={{
          display:"flex",
          flexDirection:"column",
          gap:'1.5rem'
        }}
        >
          {/* ENCABEZADO */}
          <div className="flex justify-between items-start">
              <div>
                  <h3 className="text-2xl font-semibold">Detalles de la mascota</h3>
                  <span className="text-sm text-gray-500">Ficha técnica completa</span>
              </div>
              <Chip 
                label={pet.species.charAt(0).toUpperCase() + pet.species.slice(1)} 
                sx={{color:'white', background:'black', fontWeight: 600}}
              />
          </div>

          {/* TARJETA PRINCIPAL */}
          <div className="flex items-center p-4 gap-5 rounded-xl bg-gray-50 border border-gray-200">
            <Avatar 
                sx={{
                    height: 80, 
                    width: 80, 
                    fontSize: '2.5rem',
                    bgcolor: 'white',
                    border: '2px solid #e5e7eb'
                }}
            >
              {pet.species === "perro" ? "🐶" : pet.species === "gato" ? "🐱" : "🐾"}
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
              <span className="text-gray-500 font-medium">{pet.breed}</span>
            </div>
          </div>

          {/* GRID DE ESTADÍSTICAS (MEJORA UX: Lectura rápida horizontal) */}
          <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <span className="text-xs text-gray-400 uppercase font-bold mb-1">Edad</span>
                  <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-[#005c71]"/>
                      <span className="font-semibold">{pet.age} años</span>
                  </div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <span className="text-xs text-gray-400 uppercase font-bold mb-1">Peso</span>
                  <div className="flex items-center gap-2 text-gray-700">
                      <Weight className="h-4 w-4 text-[#005c71]"/>
                      <span className="font-semibold">{pet.weight} kg</span>
                  </div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <span className="text-xs text-gray-400 uppercase font-bold mb-1">Género</span>
                  <div className="flex items-center gap-2 text-gray-700">
                      <GenderIcon className="h-4 w-4 text-[#005c71]"/>
                      <span className="font-semibold capitalize">{pet.gender || "N/A"}</span>
                  </div>
              </div>
          </div>

          <Divider />

          {/* SECCIÓN CLÍNICA */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" /> Información Clínica
            </h3>

            {/* 1. ALERTAS (Necesidades Especiales) */}
            {pet.specialNeeds && pet.specialNeeds.length > 0 ? (
                <div className="flex items-start gap-3 border border-orange-200 p-4 rounded-xl bg-orange-50">
                    <AlertCircle className="text-orange-600 h-5 w-5 mt-0.5 flex-shrink-0"/>
                    <div className="flex-1">
                        <span className="block text-sm font-bold text-orange-800 mb-1">Necesidades Especiales</span>
                        <ul className="list-disc list-inside text-sm text-orange-900">
                            {pet.specialNeeds.map((need, index) => (
                            <li key={index}>{need}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-400 italic pl-1">Sin necesidades especiales registradas.</p>
            )}

            {/* 2. HISTORIAL MÉDICO (Nuevo Campo Agregado) */}
            {pet.medicalHistory && (
                <div className="flex items-start gap-3 border border-blue-200 p-4 rounded-xl bg-blue-50">
                    <FileText className="text-blue-600 h-5 w-5 mt-0.5 flex-shrink-0"/>
                    <div className="flex-1">
                        <span className="block text-sm font-bold text-blue-800 mb-1">Historial Médico / Vacunas</span>
                        <p className="text-sm text-blue-900 whitespace-pre-line">
                            {pet.medicalHistory}
                        </p>
                    </div>
                </div>
            )}
          </div>

          {/* BOTONES (Tus colores originales) */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 w-full mt-auto">
            <Button
            variant="outlined"
            sx={{ 
                fontFamily:'Poppins, sans-serif',
                flex : {xs: 'auto', sm:'1'},
                width: {xs : '100%', sm: 'auto'},
                alignSelf: { xs: 'stretch', sm: 'center' },
                color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#eb9902ff',
                    color: '#fff',
                    borderColor: '#f7ae26ff',
                }
              }}
              onClick={() => onOpenChange(false)}
            >Cerrar</Button>
            <Button
              variant="contained"
              sx={{ 
                fontFamily:'Poppins, sans-serif',
                flex : {xs: 'auto', sm:'1'},
                width: {xs : '100%', sm: 'auto'},
                alignSelf : { xs: 'stretch', sm: 'center' },
                color: '#ffffffff', background:'#0b80d9ff',
                fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#045a9cff',
                    color: '#fff'
                }
              }}
              onClick={handleEditClick}
            >Editar mascota</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <EditPetModal
      open={editModalOpen}
      onOpenChange={handleEditModalClose}
      pet={pet}
      />
    </>
  )
}