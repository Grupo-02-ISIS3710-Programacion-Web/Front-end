"use client";

import { Product } from "@/types/product";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type RoutineSummaryProps = Readonly<{
    addedProducts: Set<string>;
    products: Product[];
    onRemoveProduct?: (productId: string) => void;
}>;

export default function RoutineSummary({
    addedProducts,
    products,
    onRemoveProduct
}: RoutineSummaryProps) {
    const routineProducts = products.filter((p) => addedProducts.has(p.id));

    return (
        <div className="flex flex-col h-full gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-900">
                    Tu Rutina Personalizada
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {routineProducts.length} producto{routineProducts.length !== 1 && "s"} agregado{routineProducts.length !== 1 && "s"}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
                {routineProducts.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">
                        No has agregado ningún producto a tu rutina. Explora y agrega productos para verlos aquí.
                    </p>
                ) : (
                    routineProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex gap-3 p-3 bg-gray-50 rounded-lg items-start"
                        >
                            <div className="relative w-12 h-16 shrink-0">
                                <img
                                    src={product.image_url[0] || "/producto.jpg"}
                                    alt={product.name}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-900 truncate">
                                    {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {product.brand}
                                </p>
                            </div>
                            {onRemoveProduct && (
                                <button
                                    onClick={() => onRemoveProduct(product.id)}
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {routineProducts.length > 0 && (
                <Button className="w-full">
                    Guardar Rutina
                </Button>
            )}
        </div>
    );
}
