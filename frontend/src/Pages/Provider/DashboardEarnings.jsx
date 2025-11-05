import React from 'react';

export default function DashboardEarnings() {
  return (
    <div>
        <main className='flex  py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
              <div className='flex flex-col h-full gap-4 p-0  align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Reservas</h1>
                  <p className="text-gray-400">Administra tus reservas de servicios y citas</p>
              </div>
        </main>
    </div>
  );
}
