import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { navigate } from "next/dist/client/components/segment-cache/navigation"
import Link from "next/link"

export default function SeccionInfoHome(){

    const t = useTranslations("SeccionInfoHome")

    return(
        <div className="grid md:grid-cols-2  items-center h-full">

          <div className="flex flex-col justify-center px-6">

            <span className="bg-secondary text-xs px-3 py-1 rounded-full font-medium text-gray-700 w-fit">
              {t("badge")}
            </span>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-gray-900">
              {t("title1")} <br />
              <span className="text-primary">{t("title2")}</span> {t("title3")}
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg">
              {t("description")}
            </p>

            <div className="flex items-center gap-3 mt-8">

              <button className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-3 rounded-xl shadow-md transition"
              >
                <Link href="/login">
                 {t("register")}
                </Link>
                <ArrowRight size={18}/>
              </button>

              <button className="flex items-center gap-2 bg-foreground  text-white px-4 py-3 rounded-xl shadow-md transition">
                <Link href="/descubrir">
                 {t("explorer")}
                </Link>
              </button>

              <div className="flex items-center gap-3">

                <div className="flex -space-x-3">
                  <img src="/avatar1.png" className="w-8 h-8 rounded-full border-2 border-white"/>
                  <img src="/avatar2.jpeg" className="w-8 h-8 rounded-full border-2 border-white"/>
                  <img src="/avatar3.webp" className="w-8 h-8 rounded-full border-2 border-white"/>
                </div>

                <span className="text-sm text-gray-600">
                  <span className="font-semibold">50k+</span> {t("trusted")}
                </span>

              </div>

            </div>

          </div>

          <div className="flex justify-center items-center h-full">

            <Image
              src="https://bebeautycol.com/cdn/shop/products/image_33008b22-795b-41a9-bc5f-cbcc31a1f602_1024x1024.jpg?v=1704781533"
              alt="Productos de skincare"
              width={505}
              height={300}
              className="rounded-2xl object-cover shadow-lg"
              unoptimized={true}
            />

          </div>

        </div>
    )
}