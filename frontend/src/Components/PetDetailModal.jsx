import { Avatar, Button, Dialog, DialogContent, Divider, Chip } from "@mui/material";
import { AlertCircle, Calendar, Heart, Weight, FileText, Mars, Venus, PawPrint } from "lucide-react";
import { useState } from "react";
import EditPetModal from "./EditPetModal";

export default function PetDetailModal({ open, onOpenChange, pet }) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (!pet) return null;

  const handleEditClick = () => {
    onOpenChange(false);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    onOpenChange(true);
  };


  const GenderIcon = pet.gender === 'macho' ? Mars : pet.gender === 'hembra' ? Venus : PawPrint;
  const genderColor = pet.gender === 'macho' ? 'text-blue-600' : pet.gender === 'hembra' ? 'text-pink-600' : 'text-gray-600';

  const needsArray = Array.isArray(pet.specialNeeds)
    ? pet.specialNeeds
    : pet.specialNeeds && typeof pet.specialNeeds === 'string'
      ? pet.specialNeeds.split(',').filter(n => n.trim() !== '')
      : [];

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onOpenChange(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: "1.5rem", padding: 1 } }
        }}
      >
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: '1.5rem' }}>
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-2xl font-bold text-gray-800">Expediente de Mascota</h3>
                <span className="text-sm text-gray-500">ID: #{pet.id || 'N/A'}</span>
            </div>
            <Chip 
                label={pet.species ? pet.species.toUpperCase() : 'MASCOTA'} 
                size="small"
                sx={{ bgcolor: 'black', color: 'white', fontWeight: 700 }} 
            />
          </div>

          <div className="flex items-center p-4 gap-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
            <Avatar
              src={pet.imageUrl}
              alt={pet.name}
              sx={{ width: 80, height: 80, fontSize: '3rem', bgcolor: 'white', border: '1px solid #e2e8f0' }}
            >
              {pet.species === "perro" ? "🐶" : pet.species === "gato" ? "🐱" : "🐾"}
            </Avatar>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800">{pet.name}</h2>
              <p className="text-slate-500 font-medium text-lg">{pet.breed}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatBox icon={Calendar} label="Edad" value={`${pet.age} años`} />
            <StatBox icon={Weight} label="Peso" value={`${pet.weight} kg`} />
            <StatBox
                icon={GenderIcon}
                label="Género"
                value={pet.gender}
                iconColor={genderColor}
                capitalize
            />
          </div>

          <Divider />

          {/* INFORMACIÓN CLÍNICA */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                Información Médica
            </h3>

            {/* Necesidades Especiales */}
            {needsArray.length > 0 ? (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-orange-800 font-bold text-sm">
                        <AlertCircle className="w-4 h-4" />
                        NECESIDADES ESPECIALES
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {needsArray.map((need, idx) => (
                            <span key={idx} className="bg-white text-orange-700 px-3 py-1 rounded-lg text-sm border border-orange-200 font-medium shadow-sm">
                                {need}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-sm text-gray-400 italic pl-2 border-l-2 border-gray-200">
                    No se registraron necesidades especiales.
                </div>
            )}

            {/* Historial Médico */}
            {pet.medicalHistory && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                     <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold text-sm">
                        <FileText className="w-4 h-4" />
                        HISTORIAL / NOTAS
                    </div>
                    <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-wrap">
                        {pet.medicalHistory}
                    </p>
                </div>
            )}
          </div>

          {/* ACCIONES */}
          <div className="flex gap-3 pt-2">
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

      <EditPetModal open={editModalOpen} onOpenChange={handleEditModalClose} pet={pet} />
    </>
  );
}

function StatBox({ icon: Icon, label, value, iconColor = "text-[#005c71]", capitalize = false }) {
    return (
        <div className="flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">{label}</span>
            <div className={`flex items-center gap-2 ${iconColor}`}>
                <Icon className="w-4 h-4" />
                <span className={`text-gray-700 font-bold ${capitalize ? 'capitalize' : ''}`}>{value || '--'}</span>
            </div>
        </div>
    );
}