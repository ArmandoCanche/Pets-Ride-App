import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function DashboardHomeClient() {
  return (
    <>
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='w-full h-auto grid grid-cols-12 gap-4'>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white align-items-center justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Reservas totales</h1>
                      <h1 className='text-5xl font-bold'>5</h1>
                  </div>
                  <div>
                      <CalendarTodayIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white align-items-center justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Próximas</h1>
                      <h1 className='text-5xl font-bold'>3</h1>
                  </div>
                  <div>
                      <AccessTimeIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white align-items-center justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Mis mascotas</h1>
                      <h1 className='text-5xl font-bold'>2</h1>
                  </div>
                  <div>
                      <PetsIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white align-items-center justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Favoritos</h1>
                      <h1 className='text-5xl font-bold'>5</h1>
                  </div>
                  <div>
                      <FavoriteBorderIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
            </div>

            <div className='w-full h-auto grid grid-cols-12 gap-4'>

              <div className='flex flex-col h-full border-2 gap-5 border-gray-200 rounded-lg p-10 bg-white align-items-center justify-between col-span-12  xl:col-span-8'>
                <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
                <div className='flex flex-col h-full border-2 border-gray-200 rounded-lg p-10 bg-white align-items-center justify-between col-span-12  xl:col-span-8'>
                </div>
              </div>

              <div className='flex flex-col h-full border-2 border-gray-200 rounded-lg p-10 bg-white align-items-center justify-between col-span-12  xl:col-span-4'>
                  <h1 className='text-2xl font-semibold'>MIS MASCOTAS</h1>
              </div>
            </div>
        </main>
    </>
  );
}
