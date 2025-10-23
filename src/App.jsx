import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage'
import DashboardHomeClient from './Pages/Client/DashboardHomeClient'
import LayoutClient from './Pages/Client/LayoutClient'
import DashboardServices from './Pages/Client/DashboardServices'
import DashboardBookings from './Pages/Client/DashboardBookings'
import DashboardPets from './Pages/Client/DashboardPets'
import DashboardMessages from './Pages/Client/DashboardMessages'
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
          element={<HomePage/>}
        />
        <Route
          path="/login/proveedor"
          element={<HomePage/>}
        />

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
