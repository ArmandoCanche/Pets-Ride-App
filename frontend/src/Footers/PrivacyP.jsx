import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenedor principal */}
      <main className="relative flex-1 px-6 md:px-20 py-16 max-w-5xl mx-auto">
        {/* Fondo sutil */}
        <div className="absolute inset-0 bg-[url('/bg-r.jpg')] opacity-5 bg-repeat -z-10"></div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#f26644] mb-6 text-center">
          Políticas de Privacidad
        </h1>

        <p className="text-gray-700 mb-6">
          En <strong>Pet's Ride</strong> nos tomamos muy en serio la privacidad de nuestros usuarios. A continuación, se detallan nuestras políticas sobre la recopilación, uso y protección de tus datos.
        </p>

        {/* Secciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Información que recopilamos</h2>
          <p className="text-gray-700 text-justify mb-2">
            Recopilamos información que tú nos proporcionas directamente, como tu nombre, correo electrónico, información de contacto y datos sobre tus mascotas cuando utilizas nuestros servicios.
          </p>
          <p className="text-gray-700 text-justify">
            También podemos recopilar información automáticamente a través de cookies y registros de actividad en nuestra plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Cómo usamos tu información</h2>
          <p className="text-gray-700 text-justify mb-2">
            Utilizamos tus datos para ofrecerte nuestros servicios, responder a tus consultas, mejorar nuestra plataforma y enviarte información relevante sobre productos y promociones.
          </p>
          <p className="text-gray-700 text-justify">
            Nunca vendemos tus datos a terceros sin tu consentimiento explícito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Seguridad de la información</h2>
          <p className="text-gray-700 text-justify">
            Implementamos medidas técnicas y administrativas para proteger tus datos contra accesos no autorizados, pérdidas o divulgación indebida.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Derechos del usuario</h2>
          <p className="text-gray-700 text-justify">
            Puedes solicitar acceso, corrección o eliminación de tus datos personales en cualquier momento contactándonos a <strong>contacto@petsride.mx</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Cambios en la política</h2>
          <p className="text-gray-700 text-justify">
            Nos reservamos el derecho de actualizar estas políticas de privacidad. Cualquier cambio será notificado en nuestra plataforma y entrará en vigor inmediatamente después de su publicación.
          </p>
        </section>

        <p className="text-gray-500 mt-10 text-center text-sm">
          Última actualización: 27 de octubre de 2025
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
