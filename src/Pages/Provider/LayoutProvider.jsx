import React from "react";
import { Outlet,Link } from "react-router-dom";
import NavigationHeader from '../../Components/NavigationHeader';

export default function LayoutProvider() {
  return (
    <div>
      <NavigationHeader userType="provider" />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
