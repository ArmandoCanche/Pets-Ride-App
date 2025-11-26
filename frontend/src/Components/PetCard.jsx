

import { Chip } from "@mui/material";


export default function PetCard({ name, species, breed, age, imageUrl, weight, specialNeeds, onClick }) {
  return (
    <div onClick={onClick} className='flex flex-col h-full border-3 border-gray-200 rounded-lg  bg-white overflow-hidden 
        hover:border-[#b154c0]
        hover:scale-105
        transition duration-300 ease-in-out'>
        <div className="relative h-48 w-full bg-gray-100   hover:border-[#b154c0]
               hover:scale-105
               transition duration-300 ease-in-out">
            {imageUrl ? (
                <img src={imageUrl ||"/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
            ) : (
                <div className="h-full w-full flex items-center justify-center text-6xl">
                    {species === "perro" ? "🐶" : species === "gato" ? "🐱" : "🐾"}
                </div>
            )}
        </div>

        <div className="p-5">
            <div className="space-y-3">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                    <p className="text-sm text-muted-foreground">{breed}</p>
                </div>
                <div className="flex gap-2">
                    <Chip color="secondary" variant="outlined" label={species} />
                    <Chip color="secondary" variant="outlined" label={`${age} ${age === 1 ? "año" : "años"}`} />
                    {weight && <Chip color="secondary" variant="outlined" label={`${weight} kg`} /> }
                </div>

                {specialNeeds && specialNeeds.length > 0 && (
                    <div className="pt-2 border-t">
                        <p className="text-cs text-muted-foreground mb-1"> Necesidades especiales:</p>
                        <div className="flex flex-wrap gap-2">
                            {specialNeeds.map((need) => (
                                <Chip key={need} color="error" variant="outlined" label={need} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
