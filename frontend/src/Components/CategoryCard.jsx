import React from 'react'; // <-- 1. NECESITAS IMPORTAR REACT


export default function CategoryCard({category, icon: Icon, colorText, colorBg}){
    return (
        <div className="flex flex-col items-center h-full border-2 border-gray-200 rounded-lg p-6 gap-4 bg-white col-span-3 lg:col-span-3 xl:col-span-3">
            <div
            >
                {Icon && (
                <Icon sx={{
                    background:colorBg,
                    color:colorText,
                    fontSize:'3.5rem',
                    padding:'0.7rem',
                    borderRadius:'0.8rem'
                }} />
                )}
            </div>
            <p className="text-md font-medium text-center">{category}</p>
        </div>
    )
};

