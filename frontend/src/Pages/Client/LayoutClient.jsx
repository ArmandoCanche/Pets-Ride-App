import React from "react";
import { Outlet } from "react-router-dom";
import NavigationHeader from "../../Components/NavigationHeader";

export default function LayoutClient() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Barra superior con el header y menú de usuario */}
      <NavigationHeader userType="client" />

      {/* Contenido principal */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
