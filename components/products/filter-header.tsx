"use client";
import { Box, CardContent, Chip, Stack, Typography } from "@mui/material";
import { 
    Combobox, 
    ComboboxInput,
    ComboboxItem, 
    ComboboxList, 
    ComboboxContent 
} from "../ui/combobox";
import { Card } from "../ui/card";
import { SkinType } from "@/types/product";
import { capitalizeFirstLetter } from "@/lib/string-utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";


interface FilterHeaderProps {
    brands: string[];
    ingredients: string[];
    productCount: number;
    onFiltersChange: (filters: {
        skinTypes: SkinType[];
        brands: string[];
        ingredients: string[];
    }) => void;
}

export function FilterHeader({brands, ingredients, productCount, onFiltersChange}: FilterHeaderProps) {
    const skinTypes = Object.values(SkinType);
    const [selectedSkinTypes, setSelectedSkinTypes] = useState<SkinType[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    useEffect(() => {
        onFiltersChange({
            skinTypes: selectedSkinTypes,
            brands: selectedBrands,
            ingredients: selectedIngredients
        });
    }, [selectedSkinTypes, selectedBrands, selectedIngredients, onFiltersChange]);

    const handleDeleteChip = (item:string | SkinType, type: "skinType" | "brand" | "ingredient") => {
        if (type === "skinType") {
            setSelectedSkinTypes(selectedSkinTypes.filter(skinType => skinType !== item));
        } else if (type === "brand") {
            setSelectedBrands(selectedBrands.filter(brand => brand !== item));
        } else if (type === "ingredient") {
            setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== item));
        }
    }

    const resetFilters = () => {
        setSelectedSkinTypes([]);
        setSelectedBrands([]);
        setSelectedIngredients([]);
    }

    return (
        <Card className="p-0">
            <CardContent className="p-0">
                <Stack direction={"column"} gap={2} flexWrap="wrap" justifyContent={"space-between"} paddingLeft={2} alignContent={"right"} >
                    {/* header */}
                    <Stack direction={"row"} gap={2} alignItems={"baseline"} justifyContent={"space-between"}>
                        <Box flexDirection={"column"}>
                            <h2>Descubre productos</h2>
                            <p>Descubre los mejores productos para ti</p>
                        </Box>
                        <Typography className="body italic text-muted-foreground/50 px-5">
                            Mostrando {productCount} producto{productCount !== 1 ? "s" : ""}
                        </Typography>
                    </Stack>

                    {/* filters comboboxes */}
                    <Stack direction={"row"} gap={2}>
                        <Combobox
                            items={skinTypes}
                            multiple
                            autoHighlight
                            value={selectedSkinTypes}
                            onValueChange={(value) => setSelectedSkinTypes(value)}
                        >
                            <ComboboxInput placeholder="Tipo de piel" className="bg-muted/20" />
                            <ComboboxContent>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {capitalizeFirstLetter(item)}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        <Combobox
                            items={brands}
                            multiple
                            autoHighlight
                            value={selectedBrands}
                            onValueChange={(value) => setSelectedBrands(value)}
                        >
                            <ComboboxInput placeholder="Marca" className="bg-muted/20"/>
                            <ComboboxContent>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {capitalizeFirstLetter(item)}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        <Combobox
                            items={ingredients}
                            multiple
                            autoHighlight
                            value={selectedIngredients}
                            onValueChange={(value) => setSelectedIngredients(value)}
                        >
                            <ComboboxInput placeholder="Excluir ingredientes" className="bg-muted/20"/>
                            <ComboboxContent>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {capitalizeFirstLetter(item)}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        <Button onClick={resetFilters} className="text-sm font-normal">Limpiar filtros</Button>
                    </Stack>

                    {/* chips */}
                    <Stack direction={"row"} gap={1} flexWrap="wrap">
                        {selectedSkinTypes.map(skin => (
                            <Chip
                                sx={{
                                    backgroundColor: "var(--border)",
                                    color: "var(--muted-foreground)",
                                    border: "1px solid var(--border)",
                                    "& .MuiChip-deleteIcon:hover": {
                                    color: "var(--secondary)",
                                    },
                                }}
                                key={skin} 
                                label={`Piel ${skin}`} 
                                onDelete={() => handleDeleteChip(skin, 'skinType')}
                            />
                        ))}
                        {selectedBrands.map(brand => (
                            <Chip 
                                sx={{

                                    border: "1px solid var(--border)",
                                    "& .MuiChip-deleteIcon:hover": {
                                    color: "var(--secondary)",
                                    },
                                }}
                                key={brand} 
                                label={`Marca: ${capitalizeFirstLetter(brand)}`} 
                                onDelete={() => handleDeleteChip(brand, 'brand')}
                            />
                        ))}
                        {selectedIngredients.map(ingredient => (
                            <Chip
                                sx={{

                                    border: "1px solid var(--border)",
                                    "& .MuiChip-deleteIcon:hover": {
                                    color: "var(--secondary)",
                                    },
                                }} 
                                key={ingredient} 
                                label={`Excluir: ${capitalizeFirstLetter(ingredient)} `}
                                onDelete={() => handleDeleteChip(ingredient, 'ingredient')}
                            />
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}