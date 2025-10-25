"use client"

import { Link , NavLink} from 'react-router-dom'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  Pets as PawPrint,
  Menu as MenuIcon,
  Close as XIcon,
  Person as UserIcon,
  Settings as SettingsIcon,
  Logout as LogOutIcon,
} from '@mui/icons-material'
import { useState } from 'react'

export default function NavigationHeader({ userType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <header className="flex  flex-col w-full border-gray-200 shadow-sm">
      <>
        <div className="flex w-full py-2 px-10 items-center justify-between md:px-5 lg:px-10 xl:px-25">
          <NavLink to="/" className="flex items-center  hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Pet's Ride Logo" style={{ width: '5rem', height: '5rem' }} />
          </NavLink>

          <nav className="hidden md:flex  items-center justify-text-center md:text-xs md:gap-2  lg:text-sm lg:gap-6 xl:text-base xl:gap-12">
            {!userType && (
              <div className="xs:font-size-sm ">
                <NavLink to="/services" className={({isActive}) => isActive ? "text-md font-medium text-purple-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>
                  Servicios
                </NavLink>
                <NavLink to="/how-it-works" className={({isActive}) => isActive ? "text-md font-medium text-purple-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>
                  Cómo funciona
                </NavLink>
                <NavLink to="/about" className={({isActive}) => isActive ? "text-md font-medium text-purple-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>
                  Acerca de
                </NavLink>
              </div>
            )}
            {userType === "client" && (
              <>
                <NavLink to="/client" end className={({isActive}) => isActive ? "text-md font-medium text-green-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Panel</NavLink>
                <NavLink to="/client/search" className={({isActive}) => isActive ? "text-md font-medium text-green-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Buscar servicios</NavLink>
                <NavLink to="/client/bookings" className={({isActive}) => isActive ? "text-md font-medium text-green-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Mis reservas</NavLink>
                <NavLink to="/client/pets" className={({isActive}) => isActive ? "text-md font-medium text-green-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Mis mascotas</NavLink>
                <NavLink to="/client/messages" className={({isActive}) => isActive ? "text-md font-medium text-green-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Mensajes</NavLink>
              </>
            )}
            {userType === "provider" && (
              <>
                <NavLink end to="/provider" className={({isActive}) => isActive ? "text-md font-medium text-orange-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Panel</NavLink>
                <NavLink to="/provider/services" className={({isActive}) => isActive ? "text-md font-medium text-orange-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Mis servicios</NavLink>
                <NavLink to="/provider/bookings" className={({isActive}) => isActive ? "text-md font-medium text-orange-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Reservas</NavLink>
                <NavLink to="/provider/earnings" className={({isActive}) => isActive ? "text-md font-medium text-orange-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Ganancias</NavLink>
                <NavLink to="/provider/messages" className={({isActive}) => isActive ? "text-md font-medium text-orange-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Mensajes</NavLink>
              </>
            )}
            {userType === "admin" && (
              <>
                <Link to="/admin" className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Panel</Link>
                <Link to="/admin/users" className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Usuarios</Link>
                <Link to="/admin/providers" className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Proveedores</Link>
                <Link to="/admin/reports" className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Reportes</Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!userType ? (
              <>
                <Link to="/login/client">
                  <Button variant="outlined">Iniciar sesión</Button>
                </Link>
                <Link to="/login/client">
                  <Button variant="contained" color="primary">Comenzar</Button>
                </Link>
              </>
            ) : (
              <>
                <Button onClick={handleMenuOpen} className="p-0">
                  <Avatar alt="User avatar" src="/placeholder.svg?height=40&width=40">
                    {userType === "client" ? "C" : userType === "provider" ? "P" : "A"}
                  </Avatar>
                </Button>
                <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>
                    <UserIcon fontSize="small" className="mr-2" />
                    <Link to={`/${userType}/profile`}>Perfil</Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <SettingsIcon fontSize="small" className="mr-2" />
                    <Link to={`/${userType}/settings`}>Configuración</Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <LogOutIcon fontSize="small" className="mr-2" />
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4 px-4">
              {!userType && (
                <>
                  <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Servicios</Link>
                  <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Cómo funciona</Link>
                  <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Acerca de</Link>
                  <div className="flex flex-col gap-2 pt-2">
                    <Link to="/login/client"><Button variant="outlined" fullWidth>Iniciar sesión</Button></Link>
                    <Link to="/login/client"><Button variant="contained" color="primary" fullWidth>Comenzar</Button></Link>
                  </div>
                </>
              )}
              { userType === "client" && (
                  <>
                    <Link to="/client" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Panel</Link>
                    <Link to="/client/search" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Buscar servicios</Link>
                    <Link to="/client/bookings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mis reservas</Link>
                    <Link to="/client/pets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mis mascotas</Link>
                    <Link to="/client/messages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mensajes</Link>
                    <div className="flex flex-col gap-2 pt-2 border-t">
                      <Link href="/client/profile" className="flex w-full justify-start">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0'}}>
                          <UserIcon className="mr-2 h-4 w-4" />
                          Perfil
                        </Button>
                      </Link>
                      <Link href="/client/settings">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0'}}>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Configuración
                        </Button>
                      </Link>
                      <Link href="/login/client">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', justifyContent:'flex-start', paddingLeft:'0'}}>
                          <LogOutIcon className="mr-2 h-4 w-4" />
                          Cerrar sesión
                        </Button>
                      </Link>
                    </div>
                  </>
              )}
              { userType === "provider" && (
                  <>
                    <Link to="/provider" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Panel</Link>
                    <Link to="/provider/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mis servicios</Link>
                    <Link to="/provider/bookings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Reservas</Link>
                    <Link to="/provider/earnings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Ganancias</Link>
                    <Link to="/provider/messages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mensajes</Link>
                    <div className="flex flex-col gap-2 pt-2 border-t">
                      <Link href="/provider/profile" className="flex w-full justify-start">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0', justifyContent:'flex-start' }} className='w-full'>
                          <UserIcon className="mr-2 h-4 w-4" />
                          Perfil
                        </Button>
                      </Link>
                      <Link href="/provider/settings">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0', justifyContent:'flex-start' }} className='w-full'>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Configuración
                        </Button>
                      </Link>
                      <Link href="/login/provider">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0', justifyContent:'flex-start' }} className='w-full'>
                          <LogOutIcon className="mr-2 h-4 w-4" />
                          Cerrar sesión
                        </Button>
                      </Link>
                    </div>
                  </>
              )}
              { userType === "admin" && (
                  <>
                    <Link to="/admin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Panel</Link>
                    <Link to="/admin/users" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Usuarios</Link>
                    <Link to="/admin/providers" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Proveedores</Link>
                    <Link to="/admin/reports" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Reportes</Link>
                  </>
              )}
            </nav>
          </div>
        )}
      </>
    </header>
  )
}
