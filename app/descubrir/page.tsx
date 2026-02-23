import { CategoriesCard } from "@/components/products/categories-card";

export default function DiscoveryPage() {
  return (
    <div className="flex gap-7 justify-begin p-12 w-full">
            <div className="flex flex-col col-span-7">
                <CategoriesCard />
            </div>
            <div className=" flex flex-col col-span-full">
                
            </div>
    </div>
  );
}