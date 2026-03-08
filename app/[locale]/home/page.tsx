import Image from "next/image"
import LandingProductCard from "@/components/home/landingProductCard"
import { ArrowRight } from "lucide-react"
import { getProducts } from "@/lib/api"
import CommentHome from "@/components/home/commenthome"
import SeccionInfoHome from "@/components/home/seccioInfoHome"
import { getTranslations } from "next-intl/server"

export default async function Home() {

  const t = await getTranslations("Home")

  const products = getProducts().slice(0,3)

  return (

    <div className="bg-gray-50 overflow-hidden">

      {/* Informacion */}
      <div className="min-h-screen flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SeccionInfoHome/>
        </div>
      </div>

      {/* Productos */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("topProducts")}
              </h2>

              <p className="text-gray-500 mt-2">
                {t("topProductsDescription")}
              </p>
            </div>

            <button className="text-primary font-semibold flex items-center gap-2 hover:underline">
              {t("seeAllProducts")} <ArrowRight size={18} />
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
            {products.map((product) => (
              <LandingProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>

      {/* Comentarios */}
      <div>
        <CommentHome/>
      </div>

    </div>

  )
}