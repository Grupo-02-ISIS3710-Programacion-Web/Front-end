"use client";
import ImageCarousel from "@/components/products/image-carousel";
import StarRating from "@/components/products/star-rating";
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getProductByName } from "@/lib/api";
import { capitalizeFirstLetter, toLowerCaseAndReplaceHyphensWithSpaces } from "@/lib/string-utils";
import { Category } from "@/types/product";
import { Chip, Container, Divider, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { 
    BadgeInfo, 
    Droplets, 
    Heart, 
    Pipette, 
    SoapDispenserDroplet, 
    Sparkles, 
    SprayCan, 
    Sun 
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetailPage() {
    const params = useParams();

    let slug: string;
    if (Array.isArray(params.slug)) {
    slug = params.slug.join('-');
    console.log("Slug is an array, joined to:", slug);
    } else if (typeof params.slug === 'string') {
        slug = params.slug;
    } else {
        slug = '';
    }
    const productSlug = toLowerCaseAndReplaceHyphensWithSpaces(slug);
    const product = getProductByName(productSlug);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [toggleFavorite, setToggleFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const handleFavoriteClick = () => {
        setToggleFavorite(!toggleFavorite);
        // if (toggleFavorite) {
        //     onFavoriteDeselect(productIndex);
        // } else {
        //     onFavoriteSelect(productIndex);
        // }
    }

    const getCategoryIcon = (category: Category) => {
        if (category === Category.LIMPIEZA) {
            return <SoapDispenserDroplet className="text-primary" />;
        } else if (category === Category.HIDRATACION) {
            return <Droplets className="text-primary" />;
        } else if (category === Category.ANTIOXIDANTE) {
            return <Pipette className="text-primary" />;
        } else if (category === Category.REPARACION) {
            return <SprayCan className="text-primary" />;
        } else if (category === Category.EXFOLIACION) {
            return <Sun className="text-primary" />;
        } else if (category === Category.ANTI_EDAD) {
            return <Sparkles className="text-primary" />;
        }
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.image_url.length);
    }

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.image_url.length) % product.image_url.length);
    }

    const changeImageIndex = (index: number) => {
        setCurrentImageIndex(index);
    }

    if (!product) {
        return (
            <div>
                <h1>Product not found</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-baseline justify-center">
            <Container className="py-10" maxWidth="md">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-secondary font-normal" href="/descubrir">Descubrir</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-secondary" />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-secondary font-normal" href={`/descubrir?category=${product.category[0]}`}>{capitalizeFirstLetter(product.category[0])}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-secondary"/>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-secondary font-normal" href={`/descubrir/${params.slug}`}>{product.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <Container >
                    <Stack direction={isMobile ? "column" : "row"} gap={8} paddingTop={5}>
                        {/* imagenes */}
                        <Stack direction={"column"} gap={5} alignItems={"center"}>

                            <ImageCarousel imagesURL={product.image_url} currentIndex={currentImageIndex} altText={product.name} onNextImage={handleNextImage} onPreviousImage={handlePreviousImage} />
                            
                            {product.image_url.length > 1 && <div className={`flex justify-center items-center w-fit max-w-1`}>
                                <Carousel opts={{ loop: true }} className="w-60 md:w-xs">
                                    <CarouselContent>
                                        {product.image_url.map((url, index) => (
                                            <CarouselItem key={index}  className="basis-1/3 md:basis-1/4">
                                                <div className="flex justify-center items-center cursor-pointer h-full" onClick={() => changeImageIndex(index)}>
                                                    <Image
                                                        src={url}
                                                        alt={product.name}
                                                        width={70}
                                                        height={70}
                                                        unoptimized={true}
                                                        className={`object-cover max-h-70 max-w-70 rounded-md ${currentImageIndex === index ? "" : "opacity-50"}`}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {product.image_url.length > 4 && (
                                        <div>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </div>
                                    )}
                                </Carousel>
                            </div>}
                        </Stack>

                        {/* info del producto */}
                        <Stack direction={"column"} gap={2} alignItems={"baseline"}>
                            <h3 className="font-medium text-primary">
                                {product.brand}
                            </h3>
                            <h2 className="font-medium text-foreground ">
                                {product.name}
                            </h2>
                            <div>
                                <StarRating rating={product.rating} reviewCount={product.review_count} />
                            </div>
                            <div>
                                {product.description}
                            </div>

                            
                            <Divider className="w-full" />
                            <Stack direction={"row"} gap={5} justifyContent={"space-between"} alignItems={"center"} flexWrap="wrap">
                                <Stack direction={"row"} gap={1} alignItems={"center"} flexWrap="wrap">
                                    <div className="rounded-full bg-primary/30 p-1">
                                        {getCategoryIcon(product.category[0])}
                                    </div>
                                    <div className="text-sm flex flex-col">
                                        <p>Categoría</p>
                                        <p className="text-foreground">{capitalizeFirstLetter(product.category[0])}</p>
                                    </div>
                                </Stack>
                                <Stack direction={"row"} gap={1} alignItems={"center"} flexWrap="wrap">
                                    <div className="rounded-full bg-primary/30 p-1">
                                        <BadgeInfo className="text-primary" />
                                    </div>
                                    <div className="text-sm flex flex-col">
                                        <p>Tipo de producto</p>
                                        <p className="text-foreground">{capitalizeFirstLetter(product.product_type)}</p>
                                    </div>
                                </Stack>
                            </Stack>
                            <Divider className="w-full" />

                            {/* botones para añadir a rutina y favorito */}
                            <Stack direction={"row"} gap={2} alignItems={"center"}>
                                <Button size="lg" className="w-fit">
                                    Agregar a una rutina
                                </Button>
                                <Button 
                                    variant={toggleFavorite ? "secondary" : "outline"} 
                                    size="sm" 
                                    className="px-2 rounded-2xl"
                                    onClick={handleFavoriteClick}
                                >
                                    <Heart size={20} />
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>

                <Container maxWidth="md">
                    <Stack direction={"column"} gap={2} alignItems={"baseline"} paddingTop={5}>
                        <h3 className="font-medium text-foreground">
                            Ingredientes Detallados
                        </h3>
                        <Stack direction={"row"} gap={1} flexWrap="wrap" className="w-full">
                            {product.ingredients.map((ingredient, index) => (
                                <Chip 
                                sx={{
                                    backgroundColor: "var(--secondary)",
                                    color: "var(--secondary-foreground)",
                                }}
                                key={index} 
                                label={`${capitalizeFirstLetter(ingredient)}`} 
                            />
                            ))}
                        </Stack>
                    </Stack>

                    {/* TODO: sección de product reviews */}
            </Container>
                
            </Container>
            
        </div>
    );
}