import { Avatar, Button, Chip, Dialog, DialogContent, Divider } from "@mui/material";
import { AlertCircle, Calendar, Heart, Weight } from "lucide-react";
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
          <h3 className="text-2xl font-semibold">Información de la mascota</h3>
          <div className="flex items-center p-5 gap-4 rounded-lg border border-gray-300 ">
            <Avatar sx={{height:64, width:64}}>
              {pet.species === "perro" ? "🐶" : pet.species === "gato" ? "🐱" : "🐾"}
            </Avatar>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{pet.name}</h3>
              <p className="text-sm text-gray-400">{pet.breed}</p>
              <Chip label={pet.species === "perro" ? "Perro" : "Gato"} sx={{color:'white', background:'black'}}/>
            </div>
          </div>

          <Divider />


          {/* Detalles de la mascota */}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-500">Información básica</h3>
            <div>
              <div className="flex items-center justify-between p-3 rounded-lg ">
                <div className="flex items-center gap-2">
                  <Calendar  className="h-5 w-5 text-gray-500"/>
                  <span className="text-gray-500">Edad</span>
                </div>
                <span className="font-semibold">
                  {pet.age} {pet.age === 1 ? "año" : "años"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Weight className="h-5 w-5 text-gray-500"/>
                  <span className="text-gray-500">Peso</span>
                </div>
                <span className="font-semibold">{pet.weight} kg</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-gray-500"/>
                  <span className="text-gray-500">Raza</span>
                </div>
                <span className="font-semibold">{pet.breed}</span>
              </div>
            </div>
          </div>


          {pet.specialNeeds && pet.specialNeeds.length > 0 && (
            <>
              <Divider />
              <h3 className="text-base font-semibold text-gray-500">Necesidades especiales</h3>
              <div className="flex items-start gap-3 border-1 p-4 rounded-lg border-orange-300 bg-orange-100 ">
                <AlertCircle className="text-orange-600"/>
                <div className="flex-1">
                  <ul>
                    {pet.specialNeeds.map((need,index) => (
                      <li key={index} className="text-sm font-medium">
                        • {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 w-full">
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