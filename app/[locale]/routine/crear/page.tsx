"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { getProducts } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PasoRutinaCard from "@/components/routines/PasoRutinaCard";
import { AnimatePresence, motion } from "motion/react";
import SearchBar from "@/components/routines/SearchBar";
import { Category } from "@/types/product";
import CardProducto from "@/components/routines/CardProducto";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export type CrearRutinaFormData = {
    name: string;
    objective: string;
    pasos: DescripcionPaso[];
}

type DescripcionPaso = {
    name: string;
    product: Product;
    description: string;
}

export default function CrearRutina() {

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const previousProductsSignatureRef = useRef<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
    const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
    const t = useTranslations("CrearRutina");
    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.product_type.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = !selectedCategory || product.category.includes(selectedCategory);

            return matchesSearch && matchesCategory;
        });
    }, [allProducts, searchTerm, selectedCategory]);

    const selectedProducts = useMemo(() => {
        return allProducts.filter((product) => selectedProductIds.has(product.id));
    }, [allProducts, selectedProductIds]);

    // Se hace una firma para evitar que useEffect se dispare por cambios en el array de productos que no sean realmente cambios en los productos (ej: cambio de referencia sin cambio de contenido)
    const productsSignature = useMemo(
        () => selectedProducts.map((product) => product.id).join(","),
        [selectedProducts]
    );

    useEffect(() => {
        const products = getProducts();
        setAllProducts(products);
    }, []);
    
    const { control, register, handleSubmit, reset, getValues } = useForm<CrearRutinaFormData>({
        defaultValues: {
            name: "",
            objective: "",
            pasos: []
        }
    });

    const { fields, move, remove } = useFieldArray({
        control,
        name: "pasos"
    });

    useEffect(() => {
        if (previousProductsSignatureRef.current === productsSignature) {
            return;
        }

        const currentValues = getValues();

        reset({
            name: currentValues.name ?? "",
            objective: currentValues.objective ?? "",
            pasos: selectedProducts.map((product) => {
                const existingStep = currentValues.pasos?.find((step) => step.product?.id === product.id);
                return {
                    name: existingStep?.name ?? "",
                    description: existingStep?.description ?? "",
                    product
                };
            })
        });

        previousProductsSignatureRef.current = productsSignature;
    }, [selectedProducts, productsSignature, getValues, reset]);

    const handleAddToRoutine = (product: Product) => {
        if (selectedProductIds.has(product.id)) {
            toast.info(`${product.name} ya fue agregado a tu rutina`);
            return;
        }

        setSelectedProductIds((prev) => new Set([...prev, product.id]));
        toast.success(`${product.name} agregado a la rutina`);
    };

    const handleRemoveProduct = (productId: string) => {
        setSelectedProductIds((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
        });
    };

    const handleMoveUp = (index: number) => {
        if (index > 0) {
            move(index, index - 1);
        }
    };

    const handleMoveDown = (index: number) => {
        if (index < fields.length - 1) {
            move(index, index + 1);
        }
    };

    const handleRemoveStep = (index: number) => {
        const stepProduct = fields[index]?.product as Product | undefined;
        if (stepProduct) {
            handleRemoveProduct(stepProduct.id);
        }
        remove(index);
    };

    const onSubmit = (data: CrearRutinaFormData) => {
        console.log("Form entregado", data);
    };

    return (
        <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
            <header className="mb-6 md:mb-8 text-center">
                <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {t("title")}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    {t("description")}
                </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
                <div className="space-y-6 md:sticky md:top-6 md:self-start md:max-w-sm">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl md:text-2xl">{t("routineInfo")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Nombre de la rutina</p>
                                <Input {...register("name")} placeholder={t("routineNamePlaceholder")} />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Objetivo de la rutina</p>
                                <Input {...register("objective")} placeholder="Objetivo de la rutina" />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Productos en la rutina</p>
                                <p className="text-sm text-foreground">{selectedProducts.length} productos seleccionados</p>
                                <Dialog open={isProductsDialogOpen} onOpenChange={setIsProductsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="outline" className="w-full">Seleccionar productos</Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[95vw] max-w-[95vw] lg:max-w-6xl max-h-[90vh] overflow-hidden p-4 sm:p-6 flex flex-col">
                                        <DialogHeader>
                                            <DialogTitle>Selecciona los productos de tu rutina</DialogTitle>
                                        </DialogHeader>

                                        <SearchBar
                                            searchTerm={searchTerm}
                                            selectedCategory={selectedCategory}
                                            onSearchChange={setSearchTerm}
                                            onCategoryChange={setSelectedCategory}
                                            compact
                                        />

                                        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {filteredProducts.length === 0 && (
                                                    <p className="text-center text-muted-foreground col-span-full">No hay productos que coincidan con la búsqueda.</p>
                                                )}

                                                {filteredProducts.map((product) => (
                                                    <CardProducto
                                                        key={product.id}
                                                        product={product}
                                                        onAddToRoutine={() => handleAddToRoutine(product)}
                                                        showButton
                                                        compact
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full">Crear Rutina</Button>
                </div>

                <div className="space-y-2 md:min-w-0">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Descripción de cada paso</h2>
                    {fields.length === 0 && (
                        <Card className="">
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">No hay pasos en la rutina. Agrega productos desde el selector para empezar.</p>
                            </CardContent>
                        </Card>
                    )}

                    <AnimatePresence initial={false} mode="popLayout">
                        {
                            fields.map((field, index) => {
                                const product = field.product as Product;

                                return (
                                    <motion.div
                                        key={field.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        <PasoRutinaCard
                                            index={index}
                                            totalSteps={fields.length}
                                            product={product}
                                            register={register}
                                            onMoveUp={() => handleMoveUp(index)}
                                            onMoveDown={() => handleMoveDown(index)}
                                            onRemove={() => handleRemoveStep(index)}
                                        />
                                    </motion.div>
                                )
                            })
                        }
                    </AnimatePresence>
                </div>
            </form>
        </div>
    )
}