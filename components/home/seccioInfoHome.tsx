import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function SeccionInfoHome(){

    const t = await getTranslations("SeccionInfoHome")

    return(
        <div className="grid md:grid-cols-2 gap-10 items-center h-full">

          <div className="flex flex-col justify-center">

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

            <div className="flex items-center gap-6 mt-8">

              <button className="flex items-center gap-2 bg-primary hover:bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md transition">
                {t("register")}
                <ArrowRight size={18}/>
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
              src="/skincare_home.png"
              alt="Productos de skincare"
              width={520}
              height={420}
              className="rounded-2xl object-cover shadow-lg"
            />

          </div>

        </div>
    )
}