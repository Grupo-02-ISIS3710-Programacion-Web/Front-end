import { Stack } from "@mui/material";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Droplets, LayoutDashboard, Pipette, SoapDispenserDroplet, SprayCan, Sun } from "lucide-react";
import { Category } from "@/types/product";

interface CategoriesCardProps {
    currentCategory?: Category | "ALL";
}

interface CategoriesCardDesktopMobileProps {
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
        label: "Limpiadores",
        value: Category.LIMPIEZA,
        description: "Encuentra los mejores limpiadores para tu piel"
    },
    {
        icon: <Droplets />,
        label: "Hidratantes",
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
        icon: <SprayCan />,
        label: "Reparación",
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

export function CategoriesCard({currentCategory}: CategoriesCardProps) {
    const isSelected = (categoryName: string) => {
        return currentCategory === categoryName
    }

    return ( 
        <>
            <div className="hidden lg:block">
                <CategoriesCardDesktop  isCategorySelected={isSelected}/>
            </div>
            <div className="block lg:hidden">
                <CategoriesCardMobile  isCategorySelected={isSelected}/>
            </div>
        </>
    )
}

export function CategoriesCardDesktop({  isCategorySelected}: CategoriesCardDesktopMobileProps) {

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
                                    className={`flex justify-baseline w-full hover:bg-secondary py-5 ${isCategorySelected(category.value) ? "bg-secondary text-secondary-foreground " : "bg-muted/20 text-foreground"}`}
                                    asChild
                                >
                                    <a href={category.value === "ALL" ? "/descubrir": `?category=${category.value}`} className="flex justify-baseline ">
                                        <div>{category.icon}</div>
                                        <div>{category.label}</div>
                                    </a>
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}

export function CategoriesCardMobile({isCategorySelected}: CategoriesCardDesktopMobileProps) {

    return (
        <div className="px-1 flex justify-begin gap-1 overflow-auto">
            {categories.map((category, index)=>(
                                <Button 
                                    key={index} 
                                    className={` flex justify-baseline w-fit hover:bg-secondary py-5 ${isCategorySelected(category.value) ? "bg-secondary text-secondary-foreground " : "bg-muted text-foreground"}`} 
                                    onClick={() => handleCategoryChange(category.value)}
                                    asChild
                                >
                                    <a href={category.value === "ALL" ? "/descubrir": `?category=${category.value}`} className="flex justify-baseline ">
                                        <div>{category.icon}</div>
                                        <div>{category.label}</div>
                                    </a>
                                </Button>
                            ))}
        </div>
    )

}