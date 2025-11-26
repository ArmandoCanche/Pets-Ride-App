import React from "react";
import { Outlet } from "react-router-dom";
import NavigationHeader from "../../Components/NavigationHeader";

export default function LayoutClient() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationHeader userType="client" />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
