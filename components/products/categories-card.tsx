import { Stack } from "@mui/material";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Cat, Droplets, LayoutDashboard, Pipette, SoapDispenserDroplet, Sun } from "lucide-react";
import { Category } from "@/types/product";

interface CategoriesCardProps {
    handleCategoryChange: (category: Category | "ALL") => void;
    currentCategory?: Category | "ALL";
}

interface CategoriesCardDesktopMobileProps {
    handleCategoryChange: (category: Category | "ALL") => void;
    isCategorySelected: (category: Category | "ALL") => boolean;
}

const categories = [
    {
        icon: <LayoutDashboard />,
        label: "Todos los productos",
        value: "ALL",
        description: "Descubre todos los productos disponibles en nuestra plataforma"
    },
    {
        icon: <SoapDispenserDroplet />,
        label: "Limpiadores faciales",
        value: Category.LIMPIEZA,
        description: "Encuentra los mejores limpiadores para tu piel"
    },
    {
        icon: <Droplets />,
        label: "Cremas hidratantes",
        value: Category.HIDRATACION,
        description: "Hidrata tu piel con cremas y lociones"
    },
    {
        icon: <Pipette />,
        label: "Serums",
        value: Category.ANTIOXIDANTE,
        description: "Potencia tu rutina con serums especializados"
    },
    {
        icon: <Pipette />,
        label: "Esencias",
        value: Category.REPARACION,
        description: "Potencia tu rutina con esencias reparadoras"
    },
    {
        icon: <Sun />,
        label: "Exfoliación",
        value: Category.EXFOLIACION,
        description: "Renueva tu piel con exfoliantes químicos y físicos"
    }
] as const;

export function CategoriesCard({currentCategory, handleCategoryChange}: CategoriesCardProps) {
    const isSelected = (categoryName: string) => {
        return currentCategory === categoryName
    }

    return ( 
        <>
            <div className="hidden lg:block">
                <CategoriesCardDesktop handleCategoryChange={handleCategoryChange} isCategorySelected={isSelected}/>
            </div>
            <div className="block lg:hidden">
                <CategoriesCardMobile handleCategoryChange={handleCategoryChange} isCategorySelected={isSelected}/>
            </div>
        </>
    )
}

export function CategoriesCardDesktop({ handleCategoryChange, isCategorySelected}: CategoriesCardDesktopMobileProps) {

    return (
        <div className="px-1">
            <Card className="mx-auto px-0">
                <CardHeader>
                    <CardTitle className="text-foreground">
                        Categorías
                    </CardTitle>
                    <CardDescription>
                        Explora productos por categorías
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Stack direction={"column"}>
                        <ButtonGroup
                            orientation="vertical"
                            aria-label="Media controls"
                            className="h-full w-full"
                        >
                            {categories.map((category, index)=>(
                                <Button 
                                    key={index} 
                                    className={` flex justify-baseline w-full hover:bg-secondary py-5 ${isCategorySelected(category.value) ? "bg-secondary text-secondary-foreground " : "bg-muted/20 text-foreground"}`} 
                                    onClick={() => handleCategoryChange(category.value)}
                                >
                                    <div>{category.icon}</div>
                                    <div>{category.label}</div>
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}

export function CategoriesCardMobile({ handleCategoryChange, isCategorySelected}: CategoriesCardDesktopMobileProps) {

    return (
        <div className="px-1 flex justify-begin gap-1 overflow-auto">
            {categories.map((category, index)=>(
                                <Button 
                                    key={index} 
                                    className={` flex justify-baseline w-fit hover:bg-secondary py-5 ${isCategorySelected(category.value) ? "bg-secondary text-secondary-foreground " : "bg-muted text-foreground"}`} 
                                    onClick={() => handleCategoryChange(category.value)}
                                >
                                    <div>{category.icon}</div>
                                    <div>{category.label}</div>
                                </Button>
                            ))}
        </div>
    )

}