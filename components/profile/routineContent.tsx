"use client"

import { Trash2, Sun, Moon } from "lucide-react"
import { Routine } from "@/types/routine"
import { useTranslations } from "next-intl"
import { getProducts } from "@/lib/api"
import { Product } from "@/types/product"

import { useEffect, useState } from "react"

export default function RoutineContent({
  filteredRoutines,
}: {
  filteredRoutines: Routine[]
}) {

  const productsAvailable = getProducts();

  const [products, setProducts] = useState<Product[]>([])
  const t = useTranslations("RoutineContent")

  function setProductsApi() {
    const productsData = getProducts()
    setProducts(productsData)
  }

  useEffect(() => {
    setProductsApi()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {filteredRoutines.map((routine) => (
        <div
          key={routine.id}
          className="relative group bg-white border border-gray-200 
                     rounded-2xl p-5 sm:p-6 shadow-sm 
                     hover:shadow-md transition-all duration-200"
        >
          <div className="flex justify-between items-start gap-4">

            <div className="flex flex-col gap-2 flex-1">

              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-medium
                    ${routine.type === "AM"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-indigo-100 text-indigo-600"}
                  `}
                >
                  {routine.type === "AM" ? <Sun size={14} /> : <Moon size={14} />}
                  {routine.type}
                </span>

                <span className="text-xs text-gray-400">
                  {routine.steps.length} {t("steps")}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {routine.name}
              </h2>

              <p className="text-sm text-gray-500">
                {routine.description}
              </p>

            </div>

            <button
              onClick={() => console.log("Delete routine", routine.id)}
              className="transition text-gray-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>

          </div>

          <div className="mt-4 flex flex-wrap gap-3">


            {routine.steps.map((step) => {
              const product = productsAvailable.find((prod) => prod.id === step.product)

              return (
                <div
                  key={step.id}
                  className="flex items-center gap-2 bg-gray-50 
                            border border-gray-200 rounded-xl px-3 py-2"
                >

                  <div className="w-6 h-6 rounded-full bg-rose-100 
                                  text-rose-600 text-xs flex items-center 
                                  justify-center font-semibold">
                    {step.order}
                  </div>

                  <span className="text-xs sm:text-sm text-gray-700">
                    {product?.name || "Producto no encontrado"}
                  </span>

                </div>
              )
            })}

          </div>

        </div>
      ))}
    </div>
  )
}