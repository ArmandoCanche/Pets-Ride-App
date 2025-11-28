import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Shield, Heart, Star, Eye, EyeOff } from "lucide-react";
import { authService } from "../../services/authService";

export default function LoginClient() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Por favor completa correo y contraseña.');
      return;
    }

    try {
      setLoading(true);
      const data = await authService.login({ email, password });

      // GUARDADO CORRECTO EN LOCALSTORAGE
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirigir según rol
      if (data.user.role === 'provider') {
         navigate('/provider/dashboard'); 
      } else {
         navigate('/client');
      }

    } catch (error) {
      // Axios guarda el error del backend en error.response.data
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      alert(`${message}`);
    } finally {
      setLoading(false);
    }
  }
  // -----------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbfb] to-[#f9fcfc] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[url('/bg-l.jpg')] opacity-10 bg-repeat"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start max-w-6xl w-full gap-10 mb-8">
        
        {/* Columna izquierda (Sin cambios visuales) */}
        <div className="hidden lg:flex flex-1 flex-col text-left">
          <h1 className="mt-4 text-4xl font-bold text-gray-800 mb-8">Pet's Ride</h1>
          <h2 className="mt-4 text-5xl font-bold text-gray-800 mb-4">
            Bienvenido de vuelta a Pet's Ride
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Encuentra los mejores servicios para el cuidado de tus mascotas con proveedores verificados y confiables.
          </p>

          <div className="space-y-2">
            <div className="p-2 flex items-start gap-3">
              <div className="bg-[#fceeeb] p-3 rounded-2xl flex-shrink-0">
                <Shield className="w-5 h-5 text-[#f26644]" />
              </div>
              <div>
                <h1 className="text-md font-semibold text-gray-800">Prestadores Verificados</h1>
                <p className="text-sm text-gray-500">Todos nuestros proveedores pasan por verificación.</p>
              </div>
            </div>
            {/* ... (Resto de los items visuales igual) ... */}
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="flex-1 bg-white shadow-xl rounded-3xl w-full max-w-xl p-10 border border-gray-100">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="bg-[#fceeeb] p-3 rounded-full mb-3">
              <Heart className="w-8 h-8 text-[#f26644]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Iniciar Sesión</h1>
            <p className="text-gray-500">Ingresa a tu cuenta para encontrar servicios</p>
          </div>

          <form onSubmit={handleLogin} className="mb-6">
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                {/* 5. CORRECCIÓN: Input Controlado por React */}
                <input 
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email} // Vinculado al estado
                  onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60 text-gray-500 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Contraseña</label>
              <div className="relative mt-1">
                {/* ... SVG del candado ... */}
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f26644]/60"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="text-right mt-2">
                <a onClick={() => navigate("/recuperar-contraseña")} className="text-xs text-[#f26644] hover:underline font-medium cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#f26644] hover:bg-[#ff8c6d] text-white px-10 py-3 rounded-xl font-semibold transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Entrando...' : 'Iniciar sesión'}
              </button>

              <p className="text-xs text-gray-400 mt-3">
                ¿No tienes cuenta?{" "}
                <span onClick={() => navigate("/registro/cliente")} className="font-semibold text-[#f26644] hover:underline cursor-pointer">
                  Regístrate
                </span>
              </p>
            </div>
          </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t-2 border-gray-200"></div>
              <span className="mx-3 text-gray-400">o</span>
              <div className="flex-grow border-t-2 border-gray-200"></div>
            </div>

            <button
              onClick={() => navigate("/login/prestador")}
              className="w-full border border-gray-300 text-gray-700 hover:bg-[#005c71] hover:text-white font-semibold px-10 py-3 rounded-xl transition"
            >
              Ingresa como Prestador
            </button>
        </div>
      </div>
    </div>
  );
}