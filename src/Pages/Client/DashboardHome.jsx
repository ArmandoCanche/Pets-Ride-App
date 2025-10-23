import React from 'react';
import NavbarClient from '../../Components/Client/NavbarClient';
import { Outlet } from 'react-router-dom';


export default function DashboardHome() {
  return (
    <div>
      <NavbarClient/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
