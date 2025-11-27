import { Link, NavLink, useNavigate } from 'react-router-dom'
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
import { useState, useEffect } from 'react' // Agregamos useEffect
import { ListItemIcon } from '@mui/material'

export default function NavigationHeader({ userType }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  
  const [isScrolled, setIsScrolled] = useState(false)

  const menuOpen = Boolean(anchorEl)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    handleMenuClose();
    setMobileMenuOpen(false);
    localStorage.removeItem("token");
    if (userType === "provider") {
      navigate("/login/prestador");
    } else {
      navigate("/login/cliente");
    }
  }

  const baseClasses = "text-md font-medium py-2 px-4 rounded-full border-2 transition-all";

  return (
    <header
      className={`flex flex-col w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/30 backdrop-blur-md shadow-sm border-b border-gray-200'
          : 'bg-white border-b border-gray-200'
      }`}
    >
        <div className="flex py-2 px-10 items-center justify-between md:px-5 lg:px-10 xl:px-25">
          <NavLink to="/" onClick={handleLinkClick} className="flex items-center hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Pet's Ride Logo" style={{ width: '5rem', height: '5rem' }} />
          </NavLink>

          <nav className="hidden md:flex items-center justify-text-center md:text-sm md:gap-0 lg:text-sm lg:gap-6 xl:text-sm xl:gap-12">
            {!userType && (
              <div className="xs:font-size-sm ">
                <NavLink
                  to="/services"
                  onClick={handleLinkClick}
                  className={({isActive}) => isActive ? `${baseClasses} text-purple-600 border-purple-600` : `${baseClasses} border-transparent hover:bg-gray-50`}
                >
                  Servicios
                </NavLink>
                <NavLink
                  to="/how-it-works"
                  onClick={handleLinkClick}
                  className={({isActive}) => isActive ? `${baseClasses} text-purple-600 border-purple-600` : `${baseClasses} border-transparent hover:bg-gray-50`}
                >
                  Cómo funciona
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={handleLinkClick}
                  className={({isActive}) => isActive ? `${baseClasses} text-purple-600 border-purple-600` : `${baseClasses} border-transparent hover:bg-gray-50`}
                >
                  Acerca de
                </NavLink>
              </div>
            )}
            {userType === "client" && (
              <>
                <NavLink to="/client" end onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-green-600 border-green-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Panel</NavLink>
                <NavLink to="/client/search" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-green-600 border-green-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Buscar servicios</NavLink>
                <NavLink to="/client/bookings" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-green-600 border-green-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Mis reservas</NavLink>
                <NavLink to="/client/pets" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-green-600 border-green-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Mis mascotas</NavLink>
                <NavLink to="/client/messages" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-green-600 border-green-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Mensajes</NavLink>
              </>
            )}
            {userType === "provider" && (
              <>
                <NavLink end to="/provider" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-orange-600 border-orange-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Panel</NavLink>
                <NavLink to="/provider/services" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-orange-600 border-orange-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Mis servicios</NavLink>
                <NavLink to="/provider/bookings" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-orange-600 border-orange-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Reservas</NavLink>
                <NavLink to="/provider/earnings" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-orange-600 border-orange-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Ganancias</NavLink>
                <NavLink to="/provider/messages" onClick={handleLinkClick} className={({isActive}) => isActive ? `${baseClasses} text-orange-600 border-orange-600` : `${baseClasses} border-transparent hover:bg-gray-50`}>Mensajes</NavLink>
              </>
            )}
            {userType === "admin" && (
              <>
                <Link to="/admin" onClick={handleLinkClick} className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Panel</Link>
                <Link to="/admin/users" onClick={handleLinkClick} className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Usuarios</Link>
                <Link to="/admin/providers" onClick={handleLinkClick} className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Proveedores</Link>
                <Link to="/admin/reports" onClick={handleLinkClick} className={({isActive}) => isActive ? "text-md font-medium text-blue-600 border-2 py-2 px-4 rounded-full" : "text-md font-medium py-2 px-4 rounded-full"}>Reportes</Link>
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
                  <MenuItem
                  component={Link}
                  to={`/${userType}/profile`}
                  onClick={handleMenuClose}>
                    <ListItemIcon><UserIcon fontSize="small" className="mr-2" /></ListItemIcon>
                    Perfil
                  </MenuItem>
                  <MenuItem
                  component={Link}
                  to={`/${userType}/settings`}
                  onClick={handleMenuClose}>
                    <ListItemIcon><SettingsIcon fontSize="small" className="mr-2" /></ListItemIcon>
                    Configuración
                  </MenuItem>
                  <MenuItem
                  onClick={handleLogOut}
                  sx={{color:'error.main'}}
                >
                  <ListItemIcon><LogOutIcon fontSize="small" className="mr-2" /></ListItemIcon>
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
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col gap-4 px-4">
              {!userType && (
                <>
                  <Link to="/services" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Servicios</Link>
                  <Link to="/how-it-works" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Cómo funciona</Link>
                  <Link to="/about" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Acerca de</Link>
                  <div className="flex flex-col gap-2 pt-2">
                    <Link to="/login/client"><Button variant="outlined" fullWidth>Iniciar sesión</Button></Link>
                    <Link to="/login/client"><Button variant="contained" color="primary" fullWidth>Comenzar</Button></Link>
                  </div>
                </>
              )}
              { userType === "client" && (
                  <>
                    <Link to="/client" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Panel</Link>
                    <Link to="/client/search" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Buscar servicios</Link>
                    <Link to="/client/bookings" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mis reservas</Link>
                    <Link to="/client/pets" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mis mascotas</Link>
                    <Link to="/client/messages" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mensajes</Link>
                    <div className="flex flex-col gap-2 pt-2 border-t">
                      <Link to="/client/profile" className="flex w-full justify-start">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0'}}>
                          <UserIcon className="mr-2 h-4 w-4" />
                          Perfil
                        </Button>
                      </Link>
                      <Link to="/client/settings">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0'}}>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Configuración
                        </Button>
                      </Link>
                      <Button onClick={handleLogOut} variant="ghost" sx={{fontFamily:'Poppins', justifyContent:'flex-start', paddingLeft:'0', color:'error.main'}}>
                          <LogOutIcon className="mr-2 h-4 w-4" />
                          Cerrar sesión
                        </Button>
                    </div>
                  </>
              )}
              { userType === "provider" && (
                  <>
                    <Link to="/provider" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Panel</Link>
                    <Link to="/provider/services" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mis servicios</Link>
                    <Link to="/provider/bookings" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Reservas</Link>
                    <Link to="/provider/earnings" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Ganancias</Link>
                    <Link to="/provider/messages" onClick={handleLinkClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Mensajes</Link>
                    <div className="flex flex-col gap-2 pt-2 border-t">
                      <Link to="/provider/profile" className="flex w-full justify-start">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0', justifyContent:'flex-start' }} className='w-full'>
                          <UserIcon className="mr-2 h-4 w-4" />
                          Perfil
                        </Button>
                      </Link>
                      <Link to="/provider/settings">
                        <Button variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0', justifyContent:'flex-start' }} className='w-full'>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Configuración
                        </Button>
                      </Link>
                      <Button onClick={handleLogOut} variant="ghost" sx={{fontFamily:'Poppins', paddingLeft:'0', justifyContent:'flex-start', color:'error.main' }} className='w-full'>
                          <LogOutIcon className="mr-2 h-4 w-4" />
                          Cerrar sesión
                        </Button>
                    </div>
                  </>
              )}
            </nav>
          </div>
        )}
    </header>
  )
}