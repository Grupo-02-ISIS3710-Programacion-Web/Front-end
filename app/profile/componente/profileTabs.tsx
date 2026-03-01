"use client"
import { Heart, Sun, MessageSquare, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search} from "lucide-react";
import { useState } from "react"

type Props = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ProfileTabs({ activeTab, setActiveTab }: Props){
    
    const [routineDaily, setRoutineDaily] = useState("am")

    const tabs = [
        {id:"routine", label: "My Routine", icon: Sun},
        {id:"favorites", label: "My Favorites", icon:Heart},
        {id:"forum", label: "Forun Posts", icon: MessageSquare}

    ]

    const routines = [
        {id:"am", label: "Morning (AM)"},
        {id:"pm", label: "Evening (PM)"}
    ]


    return (
        <div className="flex flex-col rounded-2xl border border-grey-200 overflow-hidden h-full">
          
            <div className="grid grid-cols-3 bg-white flex-1">
              { tabs.map((tab) =>{

                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium
                            ${isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"}
                        `}
                        >
                        <Icon size={16} className={`${ isActive ? "fill-current text-primary" : "text-gray-500"}`}/>
                        {tab.label}

                        {(isActive && (
                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full" />
                        )) || (<span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-200 rounded-full" />) }

                         
                    </button>
                )
              })

              }

            </div>


            {activeTab == "routine" && <div className="flex bg-white justify-between flex-1 items-center px-10 ">
                <div className="flex rounded-2xl border border-secundary overflow-hidden p-1 gap-2">
                    
                      { 

                        routines.map((routine)=>{
                            const dayRoutine = routineDaily === routine.id
                            return(
                               
                            
                            <Button 
                                key ={routine.id}
                            
                                className={`text-black  ${dayRoutine ? "": " bg-white border-primary hover:bg-secondary hover:text-primary-foreground"}`}
                                onClick={() => setRoutineDaily(routine.id)}>
                                    {routine.label}
                            </Button>
                            )

                        })
                        
                        
                      }

                    
                </div>
                <div>
                    <Button className="bg-white text-primary hover:bg-white hover:underline">
                    + Agregar paso
                    </Button>
                </div>
            </div>
            }

            {activeTab == "favorites" && <div className="flex bg-white justify-between flex-1 items-center px-10 ">
                <div className="flex rounded-2xl  overflow-hidden p-1 gap-2 w-80">
                    
                       <div className="flex items-center gap-2 w-full">
                            <Input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full"
                            />
                            <Button variant="outline" size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition">
                                {/* Puedes usar lucide-react */}
                                <SlidersHorizontal size={18} className="text-gray-600" />
                            </Button>
                        </div>

                    
                </div>
                <div>
                    <Button className="bg-white text-primary hover:bg-white hover:underline">
                      Descubre más productos
                    </Button>
                </div>
            </div>
            }


        </div>
    )
}