"use client";

import { productsFavorites } from "@/lib/favorites";
import { Product } from "@/types/product";
import { useState } from "react";

type UseProductFavoriteParams = Readonly<{
    product: Product;
    productIndex: number;
    onFavoriteSelect: (productIndex: number) => void;
    onFavoriteDeselect: (productIndex: number) => void;
}>;

export function useProductFavorite({
    product,
    productIndex,
    onFavoriteSelect,
    onFavoriteDeselect,
}: UseProductFavoriteParams) {
    const [isFavorite, setIsFavorite] = useState(
        productsFavorites.some((favoriteProduct) => favoriteProduct.id === product.id)
    );

    const toggleFavorite = () => {
        setIsFavorite((prev) => {
            const next = !prev;

            if (prev) {
                // Preserve current behavior in ProductCard callbacks.
                onFavoriteDeselect(productIndex);
                onFavoriteDeselect(productIndex);
            } else {
                // Preserve current behavior in ProductCard callbacks.
                onFavoriteSelect(productIndex);
                onFavoriteSelect(productIndex);
            }

            return next;
        });
    };

    return {
        isFavorite,
        toggleFavorite,
    };
}
