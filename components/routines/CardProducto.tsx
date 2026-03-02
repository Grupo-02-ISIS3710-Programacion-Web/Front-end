import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Product } from "@/types/product";

type CardProductoProps = Readonly<{
    product: Product;
    onAddToRoutine?: () => void;
    showButton?: boolean;
}>;

const getCategoryLabel = (category: string): string => {
    const categoryMap: Record<string, string> = {
        hidratacion: "HYDRATION",
        limpieza: "CLEANSER",
        exfoliacion: "EXFOLIANT",
        "anti-edad": "ANTI-AGING",
        reparacion: "REPAIR",
        antioxidante: "ANTIOXIDANT"
    };
    return categoryMap[category] || category.toUpperCase();
};

export default function CardProducto({
    product,
    onAddToRoutine,
    showButton = true
}: CardProductoProps) {
    const primaryCategory = product.category[0] || "";
    const imageUrl = product.image_url[0] || "/producto.jpg";
    
    return (
        <Card className="w-full bg-white shadow-sm">
            <div className="flex items-start p-4 gap-4">
                
                {/* Image */}
                <div className="relative w-16 h-20 shrink-0">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="object-contain"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-3">
                    {/* Header with title and badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base text-gray-900 leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5 wrap-break-word">
                                {product.brand} • {product.product_type}
                            </p>
                        </div>
                        <span className="inline-flex max-w-full px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded uppercase wrap-break-word whitespace-normal">
                            {getCategoryLabel(primaryCategory)}
                        </span>
                    </div>

                    {/* Add to Routine button */}
                    {showButton && (
                        <button 
                            onClick={onAddToRoutine}
                            disabled={!onAddToRoutine}
                            className="flex flex-wrap items-center gap-1.5 text-pink-500 hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-fit group"
                        >
                            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium wrap-break-word whitespace-normal text-left">Añadir a rutina</span>
                        </button>
                    )}
                </div>

            </div>
        </Card>
    );
}