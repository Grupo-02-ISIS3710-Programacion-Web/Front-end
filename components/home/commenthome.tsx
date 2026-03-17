"use client"

import { Check, MessageCircle, Heart } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function CommentHome(){

    const t = useTranslations("CommentHome")

    return(

        <div className="flex flex-col  bg-gray-50">
            
            <div className="flex flex-cols max-w-7xl mx-auto px-5 mt-23 mb-24 grid md:grid-cols-2 gap-14 items-start">

                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-md">
                        {t("description")}
                    </p>
                    <ul className="space-y-5 mb-8 py-5">
                        <li className="flex items-center gap-3 text-gray-700">
                            <div className="w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center">
                                <Check size={14} className="text-pink-600"/>
                            </div>
                            <span>{t("feature1")}</span>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <div className="w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center">
                                <Check size={14} className="text-pink-600"/>
                            </div>
                            <span>{t("feature2")}</span>
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <div className="w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center">
                                <Check size={14} className="text-pink-600"/>
                            </div>
                            <span>{t("feature3")}</span>
                        </li>
                    </ul>
                    <button className="bg-foreground text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                        <Link href="/comunidad">
                         {t("visitCommunity")}
                        </Link> 
                    </button>
                </div>



                <div className="space-y-4">

                    
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-start">
                        <img src="/avatar1.png" className="w-10 h-10 rounded-full"/>
                        <div>
                            <div className="text-sm text-pink-500 mb-1">
                                #Acné · hace 5 minutos
                            </div>
                            <p className="font-semibold text-gray-900 mb-2">
                                {t("post1")}
                            </p>
                            <div className="flex items-center gap-5 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={14}/>
                                    24 {t("replies")}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart size={14}/>
                                    156 {t("likes")}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-start">
                        <img src="/avatar2.jpeg" className="w-10 h-10 rounded-full"/>
                        <div>
                            <div className="text-sm text-orange-500 mb-1">
                                #Transformación · hace 2 horas
                            </div>
                            <p className="font-semibold text-gray-900 mb-2">
                                {t("post2")}
                            </p>
                            <div className="flex items-center gap-5 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={14}/>
                                    89 {t("replies")}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart size={14}/>
                                    432 {t("likes")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-start">
                        <img src="/avatar3.webp" className="w-10 h-10 rounded-full"/>
                        <div>
                            <div className="text-sm text-purple-500 mb-1">
                                #Ciencia · ayer
                            </div>
                            <p className="font-semibold text-gray-900 mb-2">
                                {t("post3")}
                            </p>
                            <div className="flex items-center gap-5 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={14}/>
                                    12 {t("replies")}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart size={14}/>
                                    88 {t("likes")}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

       
            <div className="min-h-foreground flex items-center bg-primary mt-5 py-20">
            
                <div className="max-w-4xl mx-auto px-6 text-center w-full">
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a1c2e] mb-8 leading-tight">
                        {t("ctaTitle")}
                    </h2>

                    <p className="text-[#1a1c2e]/70 text-xl mb-12 max-w-2xl mx-auto">
                        {t("ctaDescription")}
                    </p>

                    <div className="flex flex-col py-10 sm:flex-row justify-center items-center gap-4">

                        <input
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            className="w-full max-w-md px-8 py-3 bg-white rounded-full border-none outline-none text-gray-700 shadow-md"
                        />

                        <button className="flex p-5 bg-foreground text-white px-12 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg ">
                            {t("joinNow")}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}