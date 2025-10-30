import { useNavigate } from "react-router-dom";

export default function Error503() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f8f8] text-center px-6">
      <img src="/error-2.png" alt="Error 404" className="w-160 mb-6" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Error 503</h1>
      <p className="text-lg text-gray-600 mb-6">
        El servidor está tomando una siesta... ¡vuelve pronto!
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
