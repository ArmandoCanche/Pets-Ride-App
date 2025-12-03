import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, User, PawPrint, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { authService } from "../../services/authService";

export default function RegisterClient() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addr: "",
    city: "",
    zip: "",
    password: "",
    confirmPassword: "",
    petCount: "1",
    latitude: null,
    longitude: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // ÉXITO
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        setLoading(false);
        alert("¡Ubicación detectada con éxito!");
      },
      (error) => {
        // ERROR
        setLoading(false);
        console.error("Error GPS:", error);
        let msg = "No pudimos obtener tu ubicación.";
        if (error.code === 1) msg = "Permiso de ubicación denegado.";
        alert(`${msg} Por favor escribe tu dirección manualmente.`);
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Por favor completa los campos obligatorios (*)");
      return;
    }

    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Construir la dirección completa 
    const fullAddress = [formData.addr, formData.city, formData.zip ? `CP ${formData.zip}` : '']
      .filter(Boolean)
      .join(', ');

    setLoading(true);

    try {
      // Preparar objeto para el backend (Data Mapping)
      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'client',
        phone: formData.phone,
        address: fullAddress,
        latitude: formData.latitude, 
        longitude: formData.longitude
      };

      // Llamada al Servicio
      await authService.register(payload);
      
      // Éxito
      alert("Cuenta creada con éxito. Iniciando sesión...");
      navigate('/login/cliente');

    } catch (error) {
      const msg = error.response?.data?.message || 'Error al registrarse';
      alert(` ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] flex flex-col items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-10 bg-repeat"></div>
      
      <div className="flex flex-col items-center mb-6 text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-1">Pet's Ride</h1>
      </div>

      <div className="bg-white shadow-xl rounded-3xl max-w-2xl w-full relative z-10 p-10 border border-gray-100 mb-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="bg-[#fceeeb] p-3 rounded-2xl mb-3">
            <User className="w-8 h-8 text-[#f26644]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Únete a Pet’s Ride</h1>
          <p className="text-gray-500">Crea tu cuenta para encontrar el mejor cuidado para tus mascotas</p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit}>
          
          {/* SECCIÓN 1: INFO PERSONAL */}
          <div className="mb-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
              <User className="w-5 h-5 text-[#f26644]" />
              Información Personal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Nombre *</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Anna"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Apellido *</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Correo Electrónico *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Número de Teléfono *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="+52 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: UBICACIÓN */}
          <div className="mb-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
              <MapPin className="w-5 h-5 text-[#f26644]" />
              Ubicación
            </h2>
            {/* BOTÓN DE GEOLOCALIZACIÓN */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={handleGetLocation}
                    className="flex items-center justify-center gap-2 w-full border border-[#f26644] text-[#f26644] bg-[#f26644]/10 hover:bg-[#f26644]/20 py-2 rounded-xl font-medium transition"
                >
                    <MapPin className="w-4 h-4" />
                    {formData.latitude ? "Ubicación Guardada" : "Usar mi ubicación actual"}
                </button>
                {formData.latitude && (
                    <p className="text-xs text-center text-green-600 mt-1">
                        Coordenadas: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                    </p>
                )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Dirección *</label>
              <input
                name="addr"
                type="text"
                placeholder="Calle Principal 123"
                value={formData.addr}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Ciudad *</label>
                <input
                  name="city"
                  type="text"
                  placeholder="Cozumel"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Código Postal</label>
                <input
                  name="zip"
                  type="text"
                  placeholder="77600"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: MASCOTAS */}
          <div className="mb-6">
            <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
              <PawPrint className="w-5 h-5 text-[#f26644]" />
              Información de Mascotas
            </h2>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                ¿Cuántas mascotas tienes? *
              </label>
              <select
                name="petCount"
                value={formData.petCount}
                onChange={handleChange}
                className="w-full sm:w-auto mt-1 border border-gray-200 rounded-xl px-10 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#f26644]/60"
              >
                <option value="1">1 mascota</option>
                <option value="2">2 mascotas</option>
                <option value="3">3 mascotas</option>
                <option value="4">4 mascotas</option>
                <option value="5">5 o más</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Podrás agregar los perfiles después</p>
            </div>
          </div>

          {/* SECCIÓN 4: SEGURIDAD */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg border-b border-gray-400 pb-2">
              <LockKeyhole className="w-5 h-5 text-[#f26644]" />
              Seguridad
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-600">Contraseña *</label>
                <div className="relative mt-1">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60"
                  />
                  <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Mínimo 8 caracteres</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-gray-600">Confirmar Contraseña *</label>
                <div className="relative mt-1">
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#f26644] hover:bg-[#ff8c6d] text-white px-10 py-3 rounded-xl font-semibold transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
            
            <p className="text-xs text-gray-400 mt-3">
              ¿Ya tienes cuenta?{' '}
              <span onClick={() => navigate("/login/cliente")} className="font-semibold text-[#f26644] hover:underline cursor-pointer">
                Iniciar sesión
              </span>
            </p>
            
            <hr className="my-4 border-t border-gray-300" />
            
            <button
              type="button"
              onClick={() => navigate("/registro/prestador")}
              className="w-full border border-gray-300 text-gray-700 hover:bg-[#005c71] hover:text-white font-semibold px-10 py-3 rounded-xl transition"
            >
              Registrarse como Proveedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};