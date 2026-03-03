"use client"
import { Droplet } from "lucide-react";
import {useState} from "react"

type UserInfoProps = {
  name: string
  city: string
  skinType: string
  reviews: number
  posts: number
  bio: string
  photo: string
}

export default function UserInfo({
  name,
  city,
  skinType,
  reviews,
  posts,
  bio,
  photo
}: UserInfoProps) {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden ">

    
        <div className="h-30 bg-gradient-to-r from-pink-200 to-slate-200"></div>

        
        <div className="flex justify-center -mt-16">
            <div className="w-30 h-30 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                <img
                    src="/usuario.webp"
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

    
        <h2 className="text-2xl font-bold text-center mt-4">
            {name}
        </h2>

        <p className="text-gray-500 text-center">
            {city}
        </p>

        <div className="flex justify-center mt-4">
            
            <span className="bg-accent bg-secondary flex gap-2 items-center text-dark
             px-4 py-1 rounded-full">
            <Droplet size={14} className="fill-white stroke-white" />
            {skinType}
            </span>
        </div>

    
        <div className="flex justify-around mt-6 border-t pt-4">
            <div className="text-center">
            <p className="text-xl font-bold">{reviews}</p>
            <p className="text-gray-500 text-sm">REVIEWS</p>
            </div>

            <div className="text-center">
            <p className="text-xl font-bold">{posts}</p>
            <p className="text-gray-500 text-sm">POSTS</p>
            </div>
        </div>

      
        <p className="mt-4 text-gray-600 text-sm text-center">
            {bio}
        </p>


        <div className="py-6 px-6">


            <button className="
                mt-6
                w-full
                border
                border-gray-300
                text-gray-700
                py-3
                rounded-xl
                flex
                items-center
                justify-center
               
                hover:bg-gray-100
                transition
                ">
                ✏️ Edit Profile
            </button>
        </div>

    </div>
  )
}