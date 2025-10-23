import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';



export default function NavbarClient() {
  return (

    <div className='flex justify-between items-center p-4 shadow-md'>
        <div className=''>
            <img src="/logo.png" alt="logo" style={{ height: '5rem', width: 'auto' }} />
        </div>
        <nav className='flex gap-6'>
            <Link to="/dashboard/cliente">Dashboard</Link>
            <Link to="/dashboard/find-services">Find Services</Link>
            <Link to="/dashboard/my-bookings">My Bookings</Link>
            <Link to="/dashboard/my-pets">My Pets</Link>
            <Link to="/dashboard/messages">Messages</Link>
        </nav>
        <div>
            <Avatar sx={{ bgcolor: 'gray'}}>N</Avatar>
        </div>
    </div>
  );
}
