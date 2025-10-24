import React from "react";
import { Outlet,Link } from "react-router-dom";
import NavigationHeader from '../../Components/NavigationHeader';

export default function LayoutClient() {
  return (
    <div>
      <NavigationHeader userType="client" />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
