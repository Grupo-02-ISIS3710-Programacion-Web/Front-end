"use client";
import StarRating from "@/components/products/star-rating";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getProductByName } from "@/lib/api";
import { capitalizeFirstLetter, toLowerCaseAndReplaceHyphensWithSpaces } from "@/lib/string-utils";
import { Container, Divider, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    const params = useParams();
    const productSlug = toLowerCaseAndReplaceHyphensWithSpaces(params.slug);
    const product = getProductByName(productSlug);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                        <Stack direction={"column"} gap={5} alignItems={"center"} className="min-w-2/5">
                            <div className="flex justify-center items-center w-full h-full">
                                <Image
                                    src={product.image_url[0]}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                    unoptimized={true}
                                    className="object-cover rounded-md"
                                />
                            </div>
                        </Stack>
                        <Stack direction={"column"} gap={2} alignItems={"baseline"}>
                            <div className="font-medium text-primary text-2xl">
                                {product.brand}
                            </div>
                            <div className="font-medium text-foreground text-3xl">
                                {product.name}
                            </div>
                            <div>
                                <StarRating rating={product.rating} reviewCount={product.review_count} />
                            </div>
                            <div>
                                {product.description}
                            </div>
                            <Stack direction={"row"} gap={2}>
                                <Button variant="outline" size="lg" className="w-fit">
                                    Agregar a favoritos
                                </Button>
                                <Button variant="default" size="lg" className="w-fit">
                                    Agregar a rutina
                                </Button>
                            </Stack>
                            <Divider className="w-full" />
                        </Stack>
                    </Stack>
                </Container>
            </Container>
        </div>
    );
}