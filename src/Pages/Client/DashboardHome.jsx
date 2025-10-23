import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationHeader from '../../Components/NavigationHeader';


export default function DashboardHome() {
  return (
    <div>
        <NavigationHeader userType="client" />
        <main>
            <h1>Hola</h1>
            <h2>Hola</h2>
        </main>
    </div>
  );
}
