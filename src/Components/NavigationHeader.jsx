"use client"

import { Link } from 'react-router-dom'
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
    <header className="flex  w-full border-gray-200 shadow-sm">
      <div className="container mx-auto">
        <div className="flex py-2 px-10 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Pet's Ride Logo" style={{ width: '5rem', height: 'auto' }} />
          </Link>

          <nav className="hidden md:flex  items-center gap-8">
            {!userType && (
              <>
                <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Services
                </Link>
                <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
                <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </>
            )}
            {userType === "client" && (
              <>
                <Link to="/client" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/client/search" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Find Services</Link>
                <Link to="/client/bookings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">My Bookings</Link>
                <Link to="/client/pets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">My Pets</Link>
                <Link to="/client/messages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Messages</Link>
              </>
            )}
            {userType === "provider" && (
              <>
                <Link to="/provider" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/provider/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">My Services</Link>
                <Link to="/provider/bookings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Bookings</Link>
                <Link to="/provider/earnings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Earnings</Link>
                <Link to="/provider/messages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Messages</Link>
              </>
            )}
            {userType === "admin" && (
              <>
                <Link to="/admin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/admin/users" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Users</Link>
                <Link to="/admin/providers" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Providers</Link>
                <Link to="/admin/reports" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Reports</Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!userType ? (
              <>
                <Link to="/login/client">
                  <Button variant="outlined">Sign In</Button>
                </Link>
                <Link to="/login/client">
                  <Button variant="contained" color="primary">Get Started</Button>
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
                    <Link to={`/${userType}/profile`}>Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <SettingsIcon fontSize="small" className="mr-2" />
                    <Link to={`/${userType}/settings`}>Settings</Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <LogOutIcon fontSize="small" className="mr-2" />
                    Log out
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
            <nav className="flex flex-col gap-4">
              {!userType && (
                <>
                  <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</Link>
                  <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">How It Works</Link>
                  <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</Link>
                  <div className="flex flex-col gap-2 pt-2">
                    <Link to="/login/client"><Button variant="outlined" fullWidth>Sign In</Button></Link>
                    <Link to="/login/client"><Button variant="contained" color="primary" fullWidth>Get Started</Button></Link>
                  </div>
                </>
              )}
              {/* Aquí puedes replicar la navegación móvil para client/provider/admin usando Link + Buttons */}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
