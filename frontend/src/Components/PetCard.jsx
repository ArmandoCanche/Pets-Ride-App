import { Chip } from "@mui/material";
import { Mars, Venus, PawPrint } from "lucide-react";

export default function PetCard({ name, species, breed, age, imageUrl, weight, specialNeeds, gender, onClick }) {

  const needsArray = Array.isArray(specialNeeds)
    ? specialNeeds
    : specialNeeds && typeof specialNeeds === 'string'
      ? specialNeeds.split(',').filter(n => n.trim() !== '')
      : [];

  const GenderIcon = gender === 'macho' ? Mars : gender === 'hembra' ? Venus : PawPrint;
  const genderColor = gender === 'macho' ? 'text-blue-500' : gender === 'hembra' ? 'text-pink-500' : 'text-gray-500';

  return (
    <div onClick={onClick} className='group flex flex-col h-full border-3 border-gray-200 rounded-2xl bg-white overflow-hidden hover:border-[#b154c0] hover:scale-102 transition-all duration-300 cursor-pointer'>
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
            {imageUrl ? (
                <img src={imageUrl} alt={name} className="object-cover w-full h-full group-hover:scale-110 transition duration-500" />
            ) : (
                <div className="h-full w-full flex items-center justify-center text-6xl bg-gray-50 group-hover:scale-110 transition duration-500">
                    {species === "perro" ? "🐶" : species === "gato" ? "🐱" : "🐾"}
                </div>
            )}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                <GenderIcon className={`w-5 h-5 ${genderColor}`} />
            </div>
        </div>

        <div className="p-5 flex flex-col gap-3">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#b154c0] transition-colors">{name}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-600 capitalize">{species}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{breed}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
                <Chip size="small" label={`${age} ${age == 1 ? "año" : "años"}`} sx={{ bgcolor: '#f3f4f6', fontWeight: 500 }} />
                {weight && <Chip size="small" label={`${weight} kg`} sx={{ bgcolor: '#f3f4f6', fontWeight: 500 }} /> }
            </div>
            {needsArray.length > 0 && (
                <div className="pt-3 mt-auto border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Cuidados:</p>
                    <div className="flex flex-wrap gap-1.5">
                        {needsArray.slice(0, 2).map((need, index) => (
                            <span key={index} className="text-[10px] px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 font-medium truncate max-w-[100px]">
                                {need}
                            </span>
                        ))}
                        {needsArray.length > 2 && (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                                +{needsArray.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}