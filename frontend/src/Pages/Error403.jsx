import { useNavigate } from "react-router-dom";

export default function Error403() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f8f8] text-center px-6">
      <img src="/error-1.png" alt="Error 404" className="w-160 mb-6" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Error 403</h1>
      <p className="text-lg text-gray-600 mb-6">
        ¡No tienes permiso de entrar aquí!
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#f26644] hover:bg-[#007e99] text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        Volver al inicio
      </button>
    </div>
  );
}
