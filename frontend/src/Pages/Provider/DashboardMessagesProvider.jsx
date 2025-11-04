import { Chat } from '@mui/icons-material';
import React from 'react';

export default function DashboardMessagesProvider() {
  return (
    <div>
        <main className='flex  py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='flex flex-col gap-6'>
                  <h1 className='text-4xl font-bold'>Mis mensajes</h1>
                  <div className="flex flex-col items-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300 gap-15">
                    <h1 className="text-3xl font-bold text-gray-400">Próximamente</h1>
                    <Chat sx={{height:32, width:32, color:'grey'}}/>
                  </div>
            </div>
        </main>
    </div>
  );
}
