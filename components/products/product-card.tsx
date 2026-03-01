"use client";
import { Product } from "@/types/product";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import StarRating from "./star-rating";
import { Stack } from "@mui/material";
import { FlaskConical, Heart, Smile } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface ProductCardProps {
    productIndex: number;
    product: Product;
    onFavoriteSelect: (productIndex: number) => void;
    onFavoriteDeselect: (productIndex: number) => void;
}

export function ProductCard({productIndex, product, onFavoriteSelect, onFavoriteDeselect}: ProductCardProps) {
    const [toggleFavorite, setToggleFavorite] = useState(false);
    const handleClick = () => {
        setToggleFavorite(!toggleFavorite);
        if (toggleFavorite) {
            onFavoriteDeselect(productIndex);
        } else {
            onFavoriteSelect(productIndex);
        }
    }

    return (
        <Card className="p-0 h-full">
            <a href="#">
                <CardHeader className="bg-muted p-5 flex items-center justify-center">
                    <div className="flex justify-center items-center w-full h-full">
                        <Image
                            src={product.image_url[0]}
                            alt={product.name}
                            width={250}
                            height={250}
                            unoptimized={true}
                            className="object-cover h-50 w-50 rounded-md"
                        />
                    </div>
                </CardHeader>
            </a>
            <CardContent className="pb-5">
                <Stack direction={"row"} paddingBottom={2} justifyContent={"space-between"} alignItems={"center"}>
                    <div className="text-primary font-bold">{product.brand}</div>
                    <Button 
                        variant={toggleFavorite ? "destructive" : "outline"} 
                        size="sm" 
                        className="h-8 px-2 rounded-2xl"
                        onClick={handleClick}
                    >
                        <Heart size={16} />
                    </Button>
                </Stack>
                <CardTitle>
                    <a href="#">{product.name}</a>
                </CardTitle>
                <CardDescription>
                    <StarRating
                        rating={product.rating}
                        reviewCount={product.review_count}
                        size={10}
                    />
                    <Stack direction={"row"} gap={1} className="items-center-safe">
                        <Smile className="text-primary" size={20}/> Tipo de prducto: {product.product_type}
                    </Stack>
                    <Stack direction={"row"} gap={1} className="items-center-safe">
                        <FlaskConical className="text-primary" size={20}/> Ingrediente clave: {product.ingredients[0]}
                    </Stack>
                </CardDescription>
            </CardContent>
        </Card>
    )
}