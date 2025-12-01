import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff, Calendar, Briefcase, Users, TrendingUp, Lock } from "lucide-react";
import { authService } from "../../services/authService";

export default function LoginProvider() {
  const navigate = useNavigate();
  
  // Estados controlados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Completa correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      // 1. Usamos el servicio centralizado
      const data = await authService.login({ email, password });

      // 2. Verificación de seguridad de rol
      if (data.user.role !== 'provider' && data.user.role !== 'admin') {
        alert('Esta cuenta no está registrada como Proveedor. Por favor usa el acceso de Clientes.');
        setLoading(false);
        return;
      }

      // 3. GUARDADO CRÍTICO DE SESIÓN
      // Guardamos tanto el token como el objeto usuario.
      // Esto es lo que el Dashboard busca para no sacarte.
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 4. Redirección
      navigate('/provider'); 

    } catch (error) {
      console.error(error);
      // Axios pone el mensaje de error del backend aquí
      const msg = error.response?.data?.message || 'Credenciales inválidas o error de conexión';
      alert(`${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] flex items-center justify-center px-4 relative">
      {/* Fondo con huellitas */}
      <div className="absolute inset-0 bg-[url('/bg-l.jpg')] opacity-10 bg-repeat"></div>

      {/* Contenedor de dos columnas */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start max-w-6xl w-full gap-10 mb-8">
        
        {/* Columna izquierda - solo visible en pantallas grandes */}
        <div className="hidden lg:flex flex-1 flex-col text-left">
          <h1 className="mt-4 text-4xl font-bold text-gray-800 mb-8">Pet's Ride</h1>
          <h2 className="mt-4 text-5xl font-bold text-gray-800 mb-4">
            Gestiona tu negocio de cuidado de mascotas
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Accede a tu panel de proveedor para administrar servicios, reservas y conectar con clientes.
          </p>

          {/* Beneficios */}
          <div className="space-y-2">
            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#dde9e7] p-3 rounded-2xl flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#005c71]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-800">Gestión de Reservas</h1>
                <p className="text-xs text-gray-500">
                  Administra tu calendario y reservas en un solo lugar.
                </p>
              </div>
            </div>

            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#fceeeb] p-3 rounded-2xl flex-shrink-0">
                <Users className="w-5 h-5 text-[#f26644]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-800">Conecta con Clientes</h1>
                <p className="text-xs text-gray-500">
                  Accede a una red de dueños de mascotas en tu área.
                </p>
              </div>
            </div>

            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#dde9e7] p-3 rounded-2xl flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-[#005c71]" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-800">Haz Crecer tu Negocio</h1>
                <p className="text-xs text-gray-500">
                  Herramientas para aumentar tus ingresos y reputación.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="flex-1 bg-white shadow-xl rounded-3xl w-full max-w-xl p-10 border border-gray-100">
          {/* Logo y título */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="bg-[#dde9e7] p-3 rounded-full mb-3">
              <Briefcase className="w-8 h-8 text-[#005c71]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Portal Proveedores</h1>
            <p className="text-gray-500">
              Ingresa a tu cuenta para gestionar tus servicios
            </p>
          </div>

          {/* Formulario de Inicio de sesión */}
          <form onSubmit={handleLogin} className="mb-6">
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@ejemplo.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Contraseña</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005c71]/60"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Enlace de recuperación */}
              <div className="text-right mt-2">
                <a
                  onClick={() => navigate("/recuperar-contraseña", { state: { from: "prestador" } })}
                  className="text-xs text-[#005c71] hover:underline font-medium cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Botón Submit */}
            <div className="mt-6 text-center">
                <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#005c71] hover:bg-[#279ab2] text-white px-10 py-3 rounded-xl font-semibold transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                {loading ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-400 mt-3">
              ¿No tienes cuenta?{" "}
              <span
                onClick={() => navigate("/registro/prestador")}
                className="font-semibold text-[#005c71] hover:underline cursor-pointer"
              >
                Regístrate
              </span>
            </p>

            {/* Línea con "o" */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t-2 border-gray-200"></div>
              <span className="mx-3 text-gray-400">o</span>
              <div className="flex-grow border-t-2 border-gray-200"></div>
            </div>

            <button
              onClick={() => navigate("/login/cliente")}
              className="w-full border border-gray-300 text-gray-700 hover:bg-[#f26644] hover:text-white font-semibold px-10 py-3 rounded-xl transition"
            >
              Ingresa como Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}