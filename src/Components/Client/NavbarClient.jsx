import * as React from 'react';
import { Link } from 'react-router-dom';



export default function NavbarClient() {
  return (

    <>
        <div>
            <img src="logo.png" alt="Logo" />
            <h2>Pet's Ride</h2>
        </div>
        <nav>
            <Link to="/dashboard/cliente">Dashboard</Link>
            <Link to="/dashboard/find-services">Find Services</Link>
            <Link to="/dashboard/my-bookings">My Bookings</Link>
            <Link to="/dashboard/my-pets">My Pets</Link>
            <Link to="/dashboard/messages">Messages</Link>
        </nav>
    </>
  );
}
