"use client";
import { CategoriesCard } from "@/components/products/categories-card";
import { FilterHeader } from "@/components/products/filter-header";
import { Category } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@mui/material";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductDiscovery } from "@/lib/hooks/use-product-discovery";

export default function DiscoveryPage() {
  const t = useTranslations("DiscoveryPage");
  const router = useRouter();

  const params = useSearchParams();
  const selectedCategory = params.get("category") ? (params.get("category") as Category) : "ALL";
  const {
    setFilters,
    filteredProducts,
    brands,
    ingredients,
    handleFavoriteSelect,
    handleFavoriteDeselect,
  } = useProductDiscovery(selectedCategory);

  return (
    <Container className=" flex justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-14 gap-8 justify-center py-10">

        <div className="col-span-1 lg:col-span-4 w-full">
          <CategoriesCard currentCategory={selectedCategory} />
        </div>

        <div className="col-pan-1 lg:col-span-10">
          <div className="flex flex-col gap-3">
            <FilterHeader brands={brands} ingredients={ingredients} onFiltersChange={setFilters} productCount={filteredProducts.length} />

            {filteredProducts.length === 0 && (
              <div className="flex flex-col justify-center gap-5 pt-5 md:pt-10">
                <h2 className="text-center">
                  {t("didNotFindProduct")}
                </h2>
                <div className="w-full flex justify-center">
                  <Button variant={"secondary"} className="w-fit flex p-6" onClick={() => router.push("/descubrir/crear-producto")}>
                    <BadgePlus />
                    <div className="md:text-lg">{t("addProduct")}</div>
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-max">
              {filteredProducts.map((product, index) => (
                <div key={index} className="w-11/12 lg:w-full pl-10 md:pl-0">
                  <ProductCard
                    productIndex={index}
                    product={product}
                    onFavoriteSelect={handleFavoriteSelect}
                    onFavoriteDeselect={handleFavoriteDeselect}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
}