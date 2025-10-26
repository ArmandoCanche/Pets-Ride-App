import React from 'react';

// Icons MUI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
// Routers...
import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';

export default function DashboardHomeClient() {
  return (
    <>
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='w-full h-auto grid grid-cols-12 gap-6'>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white  justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Reservas totales</h1>
                      <h1 className='text-5xl font-bold'>5</h1>
                  </div>
                  <div>
                      <CalendarTodayIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white  justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Próximas</h1>
                      <h1 className='text-5xl font-bold'>3</h1>
                  </div>
                  <div>
                      <AccessTimeIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white  justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Mis mascotas</h1>
                      <h1 className='text-5xl font-bold'>2</h1>
                  </div>
                  <div>
                      <PetsIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
              <div className='flex flex-row h-full border-2 border-gray-200 rounded-lg px-10 py-15 bg-white  justify-between col-span-12 lg:col-span-6 xl:col-span-3'>
                  <div className='flex flex-col gap-3'>
                      <h1 className='text-md text-gray-400 font-medium'>Favoritos</h1>
                      <h1 className='text-5xl font-bold'>5</h1>
                  </div>
                  <div>
                      <FavoriteBorderIcon sx={{background:'#e6eff1', color:'#005c71', fontSize:'3.5rem', padding:'0.7rem', borderRadius:'0.8rem'}} />
                  </div>
              </div>
            </div>
            {/* Segunda sección */}
            <div className='w-full h-auto grid grid-cols-12 gap-4'>

              {/* Sección PRÓXIMAS RESERVAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white  justify-between col-span-12  xl:col-span-8'>
                <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>

                {/* Card de la reserva primera */}
                <div className='flex flex-col h-full border-2 border-gray-200 rounded-lg px-10 py-5 gap-5 bg-white  justify-between col-span-12  xl:col-span-8 '>
                  <div className='flex flex-row justify-between items-center'>
                    <div>
                      <h1 className='text-lg font-semibold'>Dog Walking</h1>
                      <p className='text-md text-gray-400 font-medium'>Sarah Johnson</p>
                    </div>
                    <div className='flex px-2 py-1 border-1 border-[#005c71] rounded-2xl bg-[#e6eff1]'>
                      <p className='text-sm'> Confirmed </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center'>
                      <PetsIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>Pet: <span className='text-black'>Max</span></span>
                    </div>
                    <div className='flex items-center'>
                      <CalendarTodayIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>March 15, 2025</span>
                    </div>
                    <div className='flex items-center'>
                      <AccessTimeIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>10:00 AM - 11:00 AM</span>
                    </div>
                    <div className='flex items-center'>
                      <LocationOnOutlinedIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>Central Park Area</span>
                    </div>
                    <div className='flex items-center'>
                      <AttachMoneyOutlinedIcon sx={{color:'#000000ff', fontSize:'2rem', marginRight:'0.5rem'}} />
                      <span className='text-xl font-medium '>25</span>
                    </div>
                  </div>
                  <div className='w-full h-full grid grid-cols-12 gap-4'>
                    <button className='bg-white text-black border border-gray-300 px-6 py-2 rounded-2xl hover:bg-orange-500 hover:text-white hover:font-medium transition-colors lg:col-span-4 xl:col-span-4 col-span-12'>Details</button>
                    <button className='bg-white text-black border border-gray-300 px-6 py-2 rounded-2xl hover:bg-orange-500 hover:text-white hover:font-medium transition-colors lg:col-span-4 xl:col-span-4 col-span-12'>Reschedule</button>
                    <button className='bg-red-500 text-white px-6 py-2 rounded-2xl hover:bg-red-700 transition-colors lg:col-span-4 xl:col-span-4 col-span-12'>Cancel</button>
                  </div>
                </div>

                {/* Card de la reserva segunda */}
                <div className='flex flex-col h-full border-2 border-gray-200 rounded-lg px-10 py-5 gap-5 bg-white  justify-between col-span-12  xl:col-span-8 '>
                  <div className='flex flex-row justify-between items-center'>
                    <div>
                      <h1 className='text-lg font-semibold'>Dog Walking</h1>
                      <p className='text-md text-gray-400 font-medium'>Sarah Johnson</p>
                    </div>
                    <div className='flex px-2 py-1 border-1 border-[#005c71] rounded-2xl bg-[#e6eff1]'>
                      <p className='text-sm'> Confirmed </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center'>
                      <PetsIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>Pet: <span className='text-black'>Max</span></span>
                    </div>
                    <div className='flex items-center'>
                      <CalendarTodayIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>March 15, 2025</span>
                    </div>
                    <div className='flex items-center'>
                      <AccessTimeIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>10:00 AM - 11:00 AM</span>
                    </div>
                    <div className='flex items-center'>
                      <LocationOnOutlinedIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
                      <span className='text-md font-medium text-gray-400'>Central Park Area</span>
                    </div>
                    <div className='flex items-center'>
                      <AttachMoneyOutlinedIcon sx={{color:'#000000ff', fontSize:'2rem', marginRight:'0.5rem'}} />
                      <span className='text-xl font-medium '>25</span>
                    </div>
                  </div>
                  <div className='w-full h-full grid grid-cols-12 gap-4'>
                    <button className='bg-white text-black border border-gray-300 px-6 py-2 rounded-2xl hover:bg-orange-500 hover:text-white hover:font-medium transition-colors lg:col-span-4 xl:col-span-4 col-span-12'>Details</button>
                    <button className='bg-white text-black border border-gray-300 px-6 py-2 rounded-2xl hover:bg-orange-500 hover:text-white hover:font-medium transition-colors lg:col-span-4 xl:col-span-4 col-span-12'>Reschedule</button>
                    <button className='bg-red-500 text-white px-6 py-2 rounded-2xl hover:bg-red-700 transition-colors lg:col-span-4 xl:col-span-4 col-span-12'>Cancel</button>
                  </div>
                </div>
              </div>

              {/* Sección MIS MASCOTAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12  xl:col-span-4'>

                  <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-2xl font-semibold'>MIS MASCOTAS</h1>
                    <NavLink to='/mis-mascotas' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
                  </div>

                  <div className='flex flex-col h-full border-2 border-gray-200 rounded-lg p-10 bg-white  justify-between'>
                    <div></div>
                    <div></div>
                  </div>

              </div>
            </div>
        </main>
    </>
  );
}
