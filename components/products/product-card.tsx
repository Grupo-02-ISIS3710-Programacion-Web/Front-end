"use client";

import { Product } from "@/types/product";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import StarRating from "./star-rating";
import { Stack } from "@mui/material";
import { FlaskConical, Heart, Smile } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toLowerCaseAndReplaceSpacesWithHyphens } from "@/lib/string-utils";
import { productsFavorites } from "@/lib/favorites";
import { useTranslations } from "next-intl";

interface ProductCardProps {
    productIndex: number;
    product: Product;
    onFavoriteSelect: (productIndex: number) => void;
    onFavoriteDeselect: (productIndex: number) => void;
}

export function ProductCard({
    productIndex,
    product,
    onFavoriteSelect,
    onFavoriteDeselect
}: ProductCardProps) {

    const t = useTranslations("ProductCard");

    const [toggleFavorite, setToggleFavorite] = useState(
        productsFavorites.some(p => p.id === product.id)
    );

    const handleClick = () => {
        setToggleFavorite(!toggleFavorite);

        if (toggleFavorite) {
        onFavoriteDeselect(productIndex);
        } else {
        onFavoriteSelect(productIndex);
        }
    };

    return (
        <Card className="p-0 h-full">

        <a href={`/descubrir/${toLowerCaseAndReplaceSpacesWithHyphens(product.name)}`}>
            <CardHeader className="bg-muted p-5 flex items-center justify-center">
            <div className="flex justify-center items-center w-full h-full">
                <Image
                src={product.image_url[0]}
                alt={product.name}
                width={250}
                height={250}
                unoptimized
                className="object-cover h-50 w-50 rounded-md"
                />
            </div>
            </CardHeader>
        </a>
        <CardContent className="pb-5">

            {/* brand + favorite */}
            <Stack
            direction={"row"}
            paddingBottom={1}
            justifyContent={"space-between"}
            alignItems={"center"}
            >
            <div className="text-primary font-bold">
                {product.brand}
            </div>

            <Button
                variant={toggleFavorite ? "secondary" : "outline"}
                size="sm"
                className="h-8 px-2 rounded-2xl"
                onClick={handleClick}
            >
                <Heart size={16} />
            </Button>
            </Stack>

            {/* product name */}

            <CardTitle>
            <a href={`/descubrir/${toLowerCaseAndReplaceSpacesWithHyphens(product.name)}`}>
                {product.name}
            </a>
            </CardTitle>

            {/* rating + info */}
            <CardDescription className="flex flex-col gap-1">
            <StarRating
                rating={product.rating}
                reviewCount={product.review_count}
                size={10}
                className="mb-1"
            />
            <Stack direction={"row"} gap={1} className="items-center-safe">
                <Smile className="text-primary" size={20}/>
                {t("productType")}: {t(`productTypes.${product.product_type}`)}
            </Stack>
            <Stack direction={"row"} gap={1} className="items-center-safe">
                <FlaskConical className="text-primary" size={20}/>
                {t("keyIngredient")}: {product.ingredients[0]}
            </Stack>
            </CardDescription>

        </CardContent>

        </Card>
    );
}