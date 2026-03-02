"use client";
import { CategoriesCard } from "@/components/products/categories-card";
import { FilterHeader } from "@/components/products/filter-header";
import { Category, Product, SkinType } from "@/types/product";
import { useState } from "react";
import { products } from "@/lib/api";
import { ProductCard } from "@/components/products/product-card";

export default function DiscoveryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    skinTypes: SkinType[];
    brands: string[];
    ingredients: string[];
  }>({
    skinTypes: [],
    brands: [],
    ingredients: [],
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      product.category.includes(selectedCategory as Category);

    const productBrand = product.brand;
    const matchesBrand =
      filters.brands.length === 0 || filters.brands.includes(productBrand);

    const productSkinTypes = product.skin_type || [];

    const matchesSkinType =
      filters.skinTypes.length === 0 ||
      filters.skinTypes.some((skin) => productSkinTypes.includes(skin));

    const productIngredients = product.ingredients || [];
    const hasExcludedIngredient = filters.ingredients.some((excluded) =>
      productIngredients.includes(excluded)
    );

    return matchesCategory && matchesBrand && matchesSkinType && !hasExcludedIngredient;
  });
  
  const brands = Array.from(new Set(products.flatMap(product => product.brand)));
  const ingredients = Array.from(new Set(products.flatMap(product => product.ingredients)));

  const handleCategoryChange = async (category: Category | "ALL") => {
    console.log("Categoría seleccionada:", category);
    setSelectedCategory(category);
  }

  const handleFavoriteSelect = (productIndex: number) => {
    const selectedProduct = products[productIndex];
    if (!favoriteProducts.some(product => product.id === selectedProduct.id)) {
      setFavoriteProducts([...favoriteProducts, selectedProduct]);
    }
  }

  const handleFavoriteDeselect = (productIndex: number) => {
    const deselectedProduct = products[productIndex];
    setFavoriteProducts(favoriteProducts.filter(product => product.id !== deselectedProduct.id));
  }

  return (
    <div className=" flex justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-14 gap-8 justify-center px-10 lg:px-20 py-10">
        <div className="col-span-1 lg:col-span-4 w-full">
            <CategoriesCard currentCategory={selectedCategory} handleCategoryChange={handleCategoryChange}/>
        </div>
        <div className="col-pan-1 lg:col-span-10">
            <div className="flex flex-col gap-3">
              <FilterHeader brands={brands} ingredients={ingredients} onFiltersChange={setFilters} productCount={filteredProducts.length}/>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-max">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    productIndex={index} 
                    product={product}
                    onFavoriteSelect={handleFavoriteSelect}
                    onFavoriteDeselect={handleFavoriteDeselect}
                  />
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}