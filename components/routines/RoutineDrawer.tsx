"use client";

import { Product } from "@/types/product";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import RoutineSummary from "./RoutineSummary";

type RoutineDrawerProps = Readonly<{
    addedProducts: Set<string>;
    products: Product[];
    onRemoveProduct?: (productId: string) => void;
}>;

export default function RoutineDrawer({
    addedProducts,
    products,
    onRemoveProduct
}: RoutineDrawerProps) {
    return (
        <div className="fixed bottom-6 right-6 md:hidden z-40">
            <Drawer>
                <DrawerTrigger asChild>
                    <button className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-colors group hover:scale-110">
                        <h3 className="text-lg font-bold">{addedProducts.size}</h3>
                    </button>
                </DrawerTrigger>
                <DrawerContent className="h-3/4">
                    <div className="p-6 h-full flex flex-col">
                        <RoutineSummary
                            addedProducts={addedProducts}
                            products={products}
                            onRemoveProduct={onRemoveProduct}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
