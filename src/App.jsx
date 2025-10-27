import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage'

// Importacion de páginas de cliente
import DashboardHomeClient from './Pages/Client/DashboardHomeClient'
import LayoutClient from './Pages/Client/LayoutClient'
import DashboardServices from './Pages/Client/DashboardServices'
import DashboardBookings from './Pages/Client/DashboardBookings'
import DashboardPets from './Pages/Client/DashboardPets'
import DashboardMessages from './Pages/Client/DashboardMessages'
import LoginProvider from './Pages/Provider/LoginProvider'
import RegisterProvider from './Pages/Provider/RegisterProvider'

// Importacion de páginas de proveedor
import LayoutProvider from './Pages/Provider/LayoutProvider'
import DashboardHomeProvider from './Pages/Provider/DashboardHomeProvider'
import DashboardMyServices from './Pages/Provider/DashboardMyServices'
import DashboardBookingsProvider from './Pages/Provider/DashboardBookingsProvider'
import DashboardEarnings from './Pages/Provider/DashboardEarnings'
import DashboardMessagesProvider from './Pages/Provider/DashboardMessagesProvider'
import RegisterClient from './Pages/Client/RegisterClient'
import LoginClient from './Pages/Client/LoginClient'

// Importacion de páginas del footer
import AboutUs from './Footers/AboutUs'

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage/>}
        />
        <Route
          path="/login/cliente"
          element={<LoginClient/>}
        />
        <Route
          path="/login/prestador"
          element={<LoginProvider/>}
        />
        <Route
          path="/registro/cliente"
          element={<RegisterClient/>}
        />
        <Route
          path="/registro/prestador"
          element={<RegisterProvider/>}
        />

        {/* Gestión de rutas del footer */}
        <Route
          path="/sobre-nosotros"
          element={<AboutUs/>}
        />

        {/* Gestión de rutas de cliente */}
        <Route path="/client" element={<LayoutClient />}>
          <Route
            index
            element={<DashboardHomeClient/>}
          />
          <Route
            path="search"
            element={<DashboardServices />}
          />
          <Route
            path="bookings"
            element={<DashboardBookings />}
          />
          <Route
            path="pets"
            element={<DashboardPets />}
          />
          <Route
            path="messages"
            element={<DashboardMessages />}
          />
        </Route>

        {/* Gestión de rutas de proveedor */}
        <Route path="/provider" element={<LayoutProvider />}>
          <Route
            index
            element={<DashboardHomeProvider />}
          />
          <Route
            path="services"
            element={<DashboardServices />}
          />
          <Route
            path="bookings"
            element={<DashboardBookings />}
          />
          <Route
            path="earnings"
            element={<DashboardPets />}
          />
          <Route
            path="messages"
            element={<DashboardMessages />}
          />
        </Route>




        /*Aquí podría poner una ruta 404 not found, estilado claro*/
        <Route
          path="*"
          element={''}
        />
      </Routes>
    </>
  )
}

export default App
