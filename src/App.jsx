import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage'
import DashboardHomeClient from './Pages/Client/DashboardHomeClient'
import LayoutClient from './Pages/Client/LayoutClient'

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
            element={''}
          />
          <Route
            path="bookings"
            element={''}
          />
          <Route
            path="pets"
            element={''}
          />
          <Route
            path="messages"
            element={''}
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
