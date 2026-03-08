"use client"

import UserInfo from "@/components/profile/userInfo"
import ProfileTabs from "@/components/profile/profileTabs"
import RoutineContent from "@/components/profile/routineContent"
import { ProductCard } from "@/components/products/product-card"
import { Heart, Sun, SlidersHorizontal, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { Product, Category } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { productsFavorites } from "@/lib/favorites"
import { routines } from "@/lib/routine"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

export default function Profile(){

    const t = useTranslations("Profile")

    const [activeTab, setActiveTab] = useState("routine")
    const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL")
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const ITEMS_PER_PAGE = 6
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

    const [routineDaily, setRoutineDaily] = useState("am")

    const tabs = [
        {id:"routine", label: t("myRoutine"), icon: Sun},
        {id:"favorites", label: t("myFavorites"), icon:Heart}
    ]

    const routine = [
        {id:"am", label: t("morning")},
        {id:"pm", label: t("evening")}
    ]

    const handleFavoriteSelect = (productIndex: number) => {
        const selectedProduct = productsFavorites[productIndex]
        if (!favoriteProducts.some(product => product.id === selectedProduct.id)) {
            setFavoriteProducts([...favoriteProducts, selectedProduct])
        }
    }

    const handleFavoriteDeselect = (productIndex: number) => {
        const deselectedProduct = productsFavorites[productIndex]
        setFavoriteProducts(
            favoriteProducts.filter(product => product.id !== deselectedProduct.id)
        )
    }

    const filteredRoutines = routines.filter((routine) =>
        routine.type.toLowerCase() === routineDaily
    )

    const filteredFavorites = productsFavorites.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE)
    }, [searchTerm])

    return( 
        <div>
            <div className="grid grid-cols-1 px-15 py-10 md:grid-cols-25 gap-y-10 md:gap-10 md:px-35 md:py-15 min-h-screen">

                <div className="col-span-6">
                    <UserInfo
                        name="Elara Vance"
                        city="San Francisco, CA"
                        skinType="Oily / Sensitive"
                        reviews={42}
                        posts={15}
                        bio="Currently focusing on barrier repair and hydration."
                        photo="/usuario.webp"
                    />
                </div>

                <div className="flex flex-col col-span-19 h-full gap-5">

                    <div>
                        <div className="flex flex-col rounded-2xl border border-gray-200 overflow-hidden h-full">

                            

                            <div className="grid grid-cols-1 sm:grid-cols-2 sm:h-15 bg-white">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    const isActive = activeTab === tab.id

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition
                                            ${isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            <Icon
                                                size={16}
                                                className={`${isActive ? "fill-current text-primary" : "text-gray-500"}`}
                                            />
                                            {tab.label}

                                            <span
                                                className={`absolute left-0 bottom-0 w-full h-[2px] rounded-full
                                                ${isActive ? "bg-primary" : "bg-gray-200"}`}
                                            />
                                        </button>
                                    )
                                })}
                            </div>

                            

                            {activeTab === "routine" && (
                                <div className="flex flex-col lg:flex-row bg-white gap-4 items-start lg:items-center justify-between p-4 lg:px-10">

                                    <div className="flex flex-wrap rounded-2xl border border-secondary p-1 gap-2 w-full lg:w-auto">
                                        {routine.map((routin) => {
                                            const dayRoutine = routineDaily === routin.id

                                            return (
                                                <Button
                                                    key={routin.id}
                                                    className={`text-black ${
                                                        dayRoutine
                                                        ? ""
                                                        : "bg-white border-primary hover:bg-secondary hover:text-primary-foreground"
                                                    }`}
                                                    onClick={() => setRoutineDaily(routin.id)}
                                                >
                                                    {routin.label}
                                                </Button>
                                            )
                                        })}
                                    </div>

                                    <Button className="bg-white text-primary hover:bg-white hover:underline w-full lg:w-auto">
                                        {t("addStep")}
                                    </Button>

                                </div>
                            )}

                            

                            {activeTab === "favorites" && (
                                <div className="flex flex-col lg:flex-row bg-white gap-4 items-start lg:items-center justify-between p-4 lg:px-10">

                                    <div className="flex items-center gap-2 w-full lg:w-96">

                                        <Input
                                            type="text"
                                            placeholder={t("searchProducts")}
                                            className="w-full"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />

                                        <Button variant="outline" size="icon">
                                            <Search className="h-4 w-4"/>
                                        </Button>

                                        <Button className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition">
                                            <SlidersHorizontal size={18} className="text-gray-600"/>
                                        </Button>

                                    </div>

                                    <Button className="bg-white text-primary hover:bg-white hover:underline w-full lg:w-auto">
                                        <Link href="/descubrir">
                                            {t("discoverMore")}
                                        </Link>
                                    </Button>

                                </div>
                            )}

                        </div>
                    </div>

                   

                    <div className="flex-1">

                        <div className="flex-1 rounded-2xl">
                            {activeTab === "routine" && (
                                <RoutineContent filteredRoutines={filteredRoutines}/>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                            {activeTab === "favorites" &&
                                filteredFavorites
                                .slice(0, visibleCount)
                                .map((product, index) => (
                                    <ProductCard 
                                        key={product.id}
                                        productIndex={index}
                                        product={product}
                                        onFavoriteSelect={handleFavoriteSelect}
                                        onFavoriteDeselect={handleFavoriteDeselect}
                                    />
                                ))
                            }

                        </div>

                        {activeTab === "favorites" &&
                            visibleCount < filteredFavorites.length && (
                            <div className="flex justify-center mt-8">

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                                    }
                                    className="px-8"
                                >
                                    {t("loadMore")}
                                </Button>

                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    )
}