import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex py-20 items-center bg-gray-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">

        {/* TEXTO */}
        <div>

          {/* badge */}
          <span className="bg-secondary text-xs px-3 py-1 rounded-full font-medium text-gray-700">
            CUIDADO DE LA PIEL RESPALDADO POR EXPERTOS
          </span>

          {/* titulo */}
          <h1 className="mt-4 text-5xl font-bold leading-tight text-gray-900">
            Tu viaje de <br />
            <span className="text-primary">Skincare</span> empieza aquí
          </h1>

          {/* descripcion */}
          <p className="mt-6 text-gray-600 max-w-lg">
            Únete a una comunidad de más de 50 mil entusiastas. 
            Haz seguimiento a tu progreso, encuentra la rutina perfecta
            para tu tipo de piel y descubre productos que realmente funcionan.
          </p>

          {/* botón + usuarios */}
          <div className="flex items-center gap-6 mt-8">

            <button className="flex items-center gap-2 bg-primary hover:bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md transition">
              Registrate
              <ArrowRight size={18}/>
            </button>

            {/* avatares */}
            <div className="flex items-center gap-3">

              <div className="flex -space-x-3">
                <img src="/avatar1.png" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="/avatar2.jpeg" className="w-8 h-8 rounded-full border-2 border-white"/>
                <img src="/avatar3.webp" className="w-8 h-8 rounded-full border-2 border-white"/>
              </div>

              <span className="text-sm text-gray-600">
                <span className="font-semibold">50k+</span> personas confían en nosotros
              </span>

            </div>

          </div>

        </div>

      
        <div className="relative flex justify-center">

            <Image
              src="/skincare_home.png"
              alt="Productos de skincare"
              width={500}
              height={400}
              className="rounded-2xl object-cover"
            />

        </div>

      </div>

    </div>
  )
}