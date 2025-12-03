import React, {useState} from "react";
import {useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, User, LockKeyhole, Luggage, FileText, ShieldCheck, Eye, EyeOff, X } from "lucide-react";

export default function RegisterClient (){
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectChange = (e) => {
    const value = e.target.value;

    setSelectedServices((prev) =>
      prev.includes(value)
        ? prev.filter((service) => service !== value) // Si ya estaba, lo quita
        : [...prev, value] // Si no estaba, lo agrega
    );

    // Reseteamos el select para que se pueda volver a seleccionar
    e.target.value = "";
  };

  const removeService = (service) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Lógica para el registro de proveedor

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  async function handleSubmit(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName')?.value?.trim();
    const lastName  = document.getElementById('lastName')?.value?.trim();
    const email     = document.getElementById('email')?.value?.trim();
    const phone     = document.getElementById('phone')?.value?.trim();
    const addr      = document.getElementById('addr')?.value?.trim();
    const city      = document.getElementById('city')?.value?.trim();
    const zip       = document.getElementById('zip')?.value?.trim();

    if (!firstName || !lastName || !email || !password) {
      alert("Completa nombre, apellido, correo y contraseña.");
      return;
    }
    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const address = [addr, city, zip ? `CP ${zip}` : ''].filter(Boolean).join(', ');

    try {
      const resp = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          role: 'provider',
          phone,
          address
        })
      });

      if (resp.status === 201) {
        // COMENTARIO NyE de Luis: Alerta quitada para mejorar la UX
        // alert("✅ Solicitud enviada. Te llevamos al login de prestador…");
        return navigate('/login/prestador');
      } else {
        const err = await resp.json().catch(() => ({}));
        alert(`❌ ${err.message || 'No se pudo registrar el prestador'}`);
      }
    } catch {
      alert("⚠️ No se pudo conectar con el servidor (¿backend en :3001?).");
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] flex flex-col items-center justify-center px-4 relative">
      {/* Fondo con huellitas */}
      <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat"></div>
      <div className="flex flex-col items-center mb-6 text-center">
        <h1 className="m-10 text-4xl font-bold text-gray-800 mb-1">Pet's Ride</h1>
      </div>
      {/* Contenedor principal */}
      <div className="bg-white shadow-xl rounded-3xl max-w-2xl w-full relative z-10 p-10 border border-gray-100 mb-10">
        {/* Logo y título */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="bg-[#e5eef0] p-3 rounded-2xl mb-3">
            <Luggage className="w-8 h-8 text-[#005c71]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Conviértete en Prestador</h1>
          <p className="text-gray-500">
            Únete a nuestra red confiable de profesionales del cuidado de mascotas
          </p>
        </div>

        {/* Sección de información del negocio */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <Luggage className="w-5 h-5 text-[#005c71]" />
            Información del negocio
          </h2>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">Nombre del Negocio/Profesional *</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cuidado de Mascotas Felices"
                className="w-full border border-gray-200 rounded-xl pl-6 pr-2 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
              Tipo de Servicio Principal *
            </label>

            <select
              onChange={handleSelectChange}
              className="w-full sm:w-auto mt-1 border border-gray-200 rounded-xl px-6 py-2 text-gray-700 bg-white 
                        focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30 
                        appearance-none bg-[url('/chevron-down.svg')] bg-no-repeat bg-right bg-center"
            >
              <option value="">Selecciona una opción</option>
              <option value="Paseos">Paseos</option>
              <option value="Veterinaria">Veterinaria</option>
              <option value="Transporte">Transporte</option>
              <option value="Hotel">Hotel</option>
              <option value="Peluquería">Peluquería</option>
              <option value="Entrenamiento">Entrenamiento</option>
              <option value="Cuidado en casa">Cuidado en casa</option>
            </select>
            <p className="text-xs text-gray-400 mt-0">
              Se puede seleccionar más de un servicio
            </p>

            {selectedServices.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-[#005c71]/10 text-[#005c71] px-3 py-1 rounded-full text-sm font-medium border border-[#005c71]/30"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="hover:text-[#f26644] transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
              Años de Experiencia *
            </label>
            <select
              className="w-full sm:w-auto mt-1 border border-gray-200 rounded-xl px-6 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#005c71]/40 focus:border-[#005c71]/30 appearance-none bg-[url('/chevron-down.svg')] bg-no-repeat bg-right bg-center"
              defaultValue="0"
            >
              <option value="0">Selecciona tus años de experiencia</option>
              <option value="1">1-3 años</option>
              <option value="2">3-5 años</option>
              <option value="3">5-10 años</option>
              <option value="4">10+ años</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600 block">
              Biografía Profesional *
            </label>
            <textarea
              placeholder="Cuéntales a los clientes sobre tu experiencia, especialidades y pasión por el cuidado de mascotas..."
              className="w-full border border-gray-200 rounded-xl px-5 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400 resize-none"
            />
            <p className="text-xs text-gray-400 mt-0">
              Esto será visible para los clientes potenciales
            </p>
          </div>

        </div>

        {/* Sección de información personal */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <User className="w-5 h-5 text-[#005c71]" />
            Información Personal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Nombre *</label>
              <input id="firstName"
                type="text"
                placeholder="Juan"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Apellido *</label>
              <input id="lastName"
                type="text"
                placeholder="Pérez"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">Correo Electrónico *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input id="email"
                type="email"
                placeholder="prestador@ejemplo.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">Número de Teléfono *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input id="phone"
                type="tel"
                placeholder="+52 (555) 123-4567"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Sección de ubicación */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <MapPin className="w-5 h-5 text-[#005c71]" />
            Ubicación del Servicio
          </h2>
          <div>
            <label className="text-sm font-medium text-gray-600">Dirección del Negocio *</label>
            <input id="addr"
              type="text"
              placeholder="Calle Principal 123"
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Ciudad *</label>
              <input id="city"
                type="text"
                placeholder="Cozumel de San Miguel"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Código Postal *</label>
              <input id="zip"
                type="text"
                placeholder="77602"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Sección de certificado */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <FileText className="w-5 h-5 text-[#005c71]" />
            Certificaciones y Crecenciales
          </h2>
          <div className="mt-6 p-4 border border-gray-200 rounded-2xl bg-[#f9fbfa] backdrop-blur-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Certificados y Licencias</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div>
                <textarea
                  placeholder="Lista cualquier certificado, licencia o capacitación relevante (ej: Primeros auxilios para Mascotas, Licencia Veterinaria, etc.)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400 resize-none"
                />
              </div>
            </div>
            {/* Subida de archivos */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adjunta tus certificados
              </label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#005c71] file:text-white hover:file:bg-[#004a55]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Puedes subir uno o varios archivos (PDF, JPG, PNG). Tamaño máximo por archivo: 5MB.
              </p>
            </div>
            <div className="mt-4 space-y-4">
              {/* Primer checkbox */}
              <label className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-[#005c71] border-gray-300 rounded" />
                  <span className="text-gray-700 font-medium">Tengo seguro de responsabilidad civil</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">Requerido para la mayoría de los tipos de servicio</span>
              </label>

              {/* Segundo checkbox */}
              <label className="flex flex-col">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-[#005c71] border-gray-300 rounded" />
                  <span className="text-gray-700 font-medium">Acepto una verificación de antecedentes</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">Requerido para la verificación de la plataforma</span>
              </label>
            </div>
          </div>
        </div>

        {/* Seccion de Seguridad */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
            <LockKeyhole className="w-5 h-5 text-[#005c71]" />
            Seguridad
          </h2>
          <div>
            <div>
              {/* Contraseña */}
              <div>
                <label className="text-sm font-medium text-gray-600">Contraseña *</label>
                <div className="relative mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2h-4v-2zM5 11h14v10H5V11z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0v4" />
                  </svg>
                  <input id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 focus:border-[#005c71]/40"
                  />
                  {/* Icono ojo */}
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Debe tener al menos 8 caracteres</p>
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="text-sm font-medium text-gray-600">Confirmar Contraseña *</label>
                <div className="relative mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2h-4v-2zM5 11h14v10H5V11z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 focus:border-[#005c71]/40"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 border border-gray-200 rounded-2xl bg-[#f1f6f7] backdrop-blur-sm flex items-start gap-3">
                <ShieldCheck className="w-8 h-8 text-[#005c71] mt-0" />
                <p className="text-xs text-gray-500">
                  Al registrarte, aceptas nuestros Términos de Servicio y Políticas de Privacidad. Tu solicitud será revisada por nuestro equipo en 2-3 días hábiles.
                </p>
              </div>
            </div>
          </div>
        </div>
        

        {/* Botón final */}
        <div className="mt-8 text-center">
          <button onClick={handleSubmit} className="w-full border bg-[#005c71] hover:bg-[#279ab2] text-white px-10 py-3 rounded-xl font-semibold transition">
            Enviar Solicitud
          </button>
          <p className="text-xs text-gray-400 mt-3">
            ¿Ya tienes una cuenta?{' '}
            <span
              onClick={() => navigate("/login/prestador")}
              className="font-semibold text-[#005c71] hover:underline cursor-pointer"
            >
              Iniciar sesión
            </span>
          </p>
          <hr className="my-4 border-t border-gray-300" />
          <button
            onClick={() => navigate("/registro/cliente")}
            className="w-full border border-gray-300 text-gray-700 hover:bg-[#f26644] hover:text-white font-semibold px-10 py-3 rounded-xl transition">
            Registrarse como Cliente
          </button>
        </div>
      </div>
    </div>
  );
};
