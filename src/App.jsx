import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage'
import DashboardHomeClient from './Pages/Client/DashboardHomeClient'

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
        <Route
          path="/dashboard/cliente"
          element={<DashboardHomeClient/>}
        />
        <Route
          path="/dashboard/proveedor"
          element={<HomePage/>}
        />
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
