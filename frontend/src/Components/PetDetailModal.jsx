import { Avatar, Button, Chip, Dialog, DialogContent, Divider } from "@mui/material";
import { AlertCircle, Calendar, Heart, Weight } from "lucide-react";



export default function PetDetailModal({open, onOpenChange, pet}) {
  return (
    <Dialog 
    open={open}
    onClose={()=> onOpenChange(false)}
    slotProps={{
      paper:{
        sx:{
          borderRadius: "1rem",
          maxWidth:"600px",
          padding:3
        }
      }
    }}
    >
      <DialogContent
      sx={{
        display:"flex",
        flexDirection:"column",
        gap:'1rem'
      }}
      >
        <h3 className="text-2xl font-semibold">Información de la mascota</h3>
        <div className="flex items-center p-3 gap-4 rounded-lg border border-gray-300 ">
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
          <h3>Información básica</h3>
          <div>
            <div className="flex items-center justify-between p-3 rounded-lg ">
              <div className="flex items-center gap-2">
                <Calendar />
                <span>Edad</span>
              </div>
              <span>
                {pet.age} {pet.age === 1 ? "año" : "años"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Weight />
                <span>Peso</span>
              </div>
              <span>{pet.weight} kg</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Heart />
                <span>Raza</span>
              </div>
              <span>{pet.breed}</span>
            </div>
          </div>
        </div>


        {pet.specialNeeds && pet.specialNeeds.length > 0 && (
          <>
            <Divider />
            <h3>Necesidades especiales</h3>
            <div className="flex items-start gap-2">
              <AlertCircle />
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
        <div className="flex gap-2">
          <Button>Cerrar</Button>
          <Button>Editar mascota</Button>
        </div>

      </DialogContent>

    </Dialog>
  )
}