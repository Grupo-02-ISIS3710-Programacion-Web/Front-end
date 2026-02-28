"use client";
import { CategoriesCard } from "@/components/products/categories-card";
import { FilterHeader } from "@/components/products/filter-header";
import { Category } from "@/types/product";
import { useState } from "react";

export default function DiscoveryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");

  const handleCategoryChange = async (category: Category | "ALL") => {
    console.log("Categoría seleccionada:", category);
    setSelectedCategory(category);
  }

  return (
    <div className=" flex justify-center">
      <div className="w-full lg:w-10/12 grid grid-cols-1 lg:grid-cols-11 gap-8 justify-center px-11 py-10">
        <div className="col-span-1 lg:col-span-3 w-full">
            <CategoriesCard currentCategory={selectedCategory} handleCategoryChange={handleCategoryChange}/>
        </div>
        <div className="col-pan-1 lg:col-span-8">
            <FilterHeader />
        </div>
      </div>
    </div>
  );
}