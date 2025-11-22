import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import ScrollToTop from './Components/ScrollToTop';

// Importación de páginas de cliente
import DashboardHomeClient from './Pages/Client/DashboardHomeClient';
import LayoutClient from './Pages/Client/LayoutClient';
import DashboardServices from './Pages/Client/DashboardServices';
import DashboardBookings from './Pages/Client/DashboardBookings';
import DashboardPets from './Pages/Client/DashboardPets';
import DashboardMessages from './Pages/Client/DashboardMessages';
import LoginProvider from './Pages/Provider/LoginProvider';
import RegisterProvider from './Pages/Provider/RegisterProvider';

// Importación de páginas de proveedor
import LayoutProvider from './Pages/Provider/LayoutProvider';
import DashboardHomeProvider from './Pages/Provider/DashboardHomeProvider';
import DashboardMyServices from './Pages/Provider/DashboardMyServices';
import DashboardBookingsProvider from './Pages/Provider/DashboardBookingsProvider';
import DashboardEarnings from './Pages/Provider/DashboardEarnings';
import DashboardMessagesProvider from './Pages/Provider/DashboardMessagesProvider';
import RegisterClient from './Pages/Client/RegisterClient';
import LoginClient from './Pages/Client/LoginClient';

// Importación de páginas del footer
import AboutUs from './Footers/AboutUs';
import Contact from './Footers/Contact';
import PrivacyPolicy from './Footers/PrivacyP';
import ServiceTerm from './Footers/ServiceT';
import Cookies from './Footers/Cookies';
import HelpCenter from './Footers/HelpCenter';
import HowWorks from './Footers/HowWorks';

// Errores
import Error404 from './Pages/Error404';
import ForgotPassword from './Pages/ForgotPassword';
import ProfileClient from './Pages/Client/ProfileClient';
import SettingsClient from './Pages/Client/SettingsClient';



function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/cliente" element={<LoginClient />} />
        <Route path="/login/prestador" element={<LoginProvider />} />
        <Route path="/registro/cliente" element={<RegisterClient />} />
        <Route path="/registro/prestador" element={<RegisterProvider />} />

        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route path="/contacto" element={<Contact/>} />
        <Route path='/centro-de-ayuda' element={<HelpCenter/>} />
        <Route path='como-funciona' element={<HowWorks/>} />
        <Route path='/politicas-de-privacidad' element={<PrivacyPolicy/>} />
        <Route path='/terminos-de-servicio' element={<ServiceTerm/>} />
        <Route path='/cookies' element={<Cookies/>} />

        <Route path="/client" element={<LayoutClient />}>
          <Route index element={<DashboardHomeClient />} />
          <Route path="search" element={<DashboardServices />} />
          <Route path="bookings" element={<DashboardBookings />} />
          <Route path="pets" element={<DashboardPets />} />
          <Route path="messages" element={<DashboardMessages />} />
          <Route path="profile" element={<ProfileClient />} />
          <Route path="settings" element={<SettingsClient />} />
        </Route>

        <Route path="/provider" element={<LayoutProvider />}>
          <Route index element={<DashboardHomeProvider />} />
          <Route path="services" element={<DashboardMyServices />} />
          <Route path="bookings" element={<DashboardBookingsProvider />} />
          <Route path="earnings" element={<DashboardEarnings />} />
          <Route path="messages" element={<DashboardMessagesProvider />} />
          <Route path="profile" element={''} />
          <Route path="settings" element={''} />
        </Route>

        <Route path="*" element={<Error404/>} />
        <Route path='/recuperar-contraseña' element={<ForgotPassword/>} />
      </Routes>
    </>
  );
}

export default App;
