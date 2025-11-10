import React from 'react';
import StatsCard from '../../Components/StatsCard';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import MovingIcon from '@mui/icons-material/Moving';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function DashboardEarnings() {


  const stats = {
    totalEarnings: 2450,
    pendingBookings: 5,
    rating: 4.9,
    completedServices: 127,
  }

  return (
    <div>
        <main className='flex  py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
              <div className='flex flex-col h-full gap-4 p-0  align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Ganancias</h1>
                  <p className="text-gray-400">Administra tus ganancias de servicios y citas</p>
              </div>
              <div className='w-full h-auto grid grid-cols-12 gap-6'>
                <StatsCard title="Ganancias totales" value={`$ ${stats.totalEarnings}`} icon={AttachMoneyIcon} />
                <StatsCard title="Reservas pendientes" value={stats.pendingBookings} icon={CalendarTodayIcon} />
                <StatsCard title="Calificación" value={stats.rating} icon={StarBorderIcon} />
                <StatsCard title="Completados" value={stats.completedServices} icon={MovingIcon} />
              </div>
        </main>
    </div>
  );
}
