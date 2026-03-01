"use client"
import UserInfo from "./componente/userInfo"    
import ProfileTabs from "./componente/profileTabs"
import RoutineContent from "./componente/routineContent"
import FavoritesContent from "./componente/favoritesContent"
import ForumContent from "./componente/forumContent"
import { useState} from "react"


export default function Profile(){
    const [activeTab, setActiveTab] = useState("routine")
    const productsList = [
        {
            "code": "4001638098069",
            "status": "success",
            "product": {
            "_id": "4001638098069",
            "product_name": "Ratanhia Mondwater",
            "brands": "Weleda",
            "quantity": "50 ml",
            "product_type": "beauty",
            "countries": "Australia, Netherlands",
            "ingredients": [
                { "id": "en:alcohol", "text": "Alcohol" },
                { "id": "en:water", "text": "Water (Aqua)" },
                { "id": "en:lactose", "text": "Lactose" }
            ],
            "images": {
                "front_url": "https://images.openbeautyfacts.org/images/products/400/163/809/8069/front_en.8.400.jpg"
            }
            }
        },
        {
            "code": "4001638098070",
            "status": "success",
            "product": {
            "_id": "4001638098070",
            "product_name": "Calendula Toothpaste",
            "brands": "Weleda",
            "quantity": "75 ml",
            "product_type": "beauty",
            "countries": "Germany",
            "ingredients": [
                { "id": "en:water", "text": "Water" },
                { "id": "en:calendula-extract", "text": "Calendula Extract" }
            ],
            "images": {
                "front_url": "https://images.openbeautyfacts.org/images/products/400/163/809/8069/front_en.8.400.jpg"
            }
            }
        },
        {
            "code": "4001638098071",
            "status": "success",
            "product": {
            "_id": "4001638098071",
            "product_name": "Arnica Massage Oil",
            "brands": "Weleda",
            "quantity": "100 ml",
            "product_type": "beauty",
            "countries": "Spain",
            "ingredients": [
                { "id": "en:sesame-oil", "text": "Sesame Oil" },
                { "id": "en:arnica-extract", "text": "Arnica Extract" }
            ],
            "images": {
                "front_url": "https://images.openbeautyfacts.org/images/products/400/163/809/8069/front_en.8.400.jpg"
            }
            }
        },
        {
            "code": "4001638098072",
            "status": "success",
            "product": {
            "_id": "4001638098072",
            "product_name": "Skin Food Cream",
            "brands": "Weleda",
            "quantity": "30 ml",
            "product_type": "beauty",
            "countries": "France",
            "ingredients": [
                { "id": "en:sunflower-oil", "text": "Sunflower Oil" },
                { "id": "en:chamomile-extract", "text": "Chamomile Extract" }
            ],
            "images": {
                "front_url": "https://images.openbeautyfacts.org/images/products/400/163/809/8069/front_en.8.400.jpg"
            }
            }
        },
        {
            "code": "4001638098073",
            "status": "success",
            "product": {
            "_id": "4001638098073",
            "product_name": "Lavender Relaxing Oil",
            "brands": "Weleda",
            "quantity": "100 ml",
            "product_type": "beauty",
            "countries": "Italy",
            "ingredients": [
                { "id": "en:lavender-oil", "text": "Lavender Oil" },
                { "id": "en:almond-oil", "text": "Almond Oil" }
            ],
            "images": {
                "front_url": "https://images.openbeautyfacts.org/images/products/400/163/809/8069/front_en.8.400.jpg"
            }
            }
        }
    ]
 
    return( 
        <div>
            <div className="grid grid-cols-1 md:grid-cols-25 gap-y-10 md:gap-10 px-35 py-15 min-h-screen">
                <div className="col-span-6 ">
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

                <div className="flex flex-col col-span-19  h-full gap-5">
                    <div className=" h-35">
                        <ProfileTabs
                         activeTab={activeTab}
                         setActiveTab={setActiveTab}/>
                    </div>
                    
                    <div className=" flex-1">
                        <div className=" flex-1  rounded-2xl">
                            {activeTab === "routine" && <RoutineContent productList={productsList}/>}
                            {activeTab === "favorites" && <FavoritesContent />}
                            {activeTab === "forum" && <ForumContent />}
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>

    )
}