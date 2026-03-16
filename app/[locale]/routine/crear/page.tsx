"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { Routine, RoutineStep } from "@/types/routine";
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

type CrearRutinaFormDataInternal = {
    name: string;
    description: string;
    type: string;
    steps: {
        id: string;
        name: string;
        order: number;
        product: Product;
        notes: string;
    }[];
};

export type CrearRutinaFormData = CrearRutinaFormDataInternal;

const generateId = () => Math.random().toString(36).substring(2, 11);

export default function CrearRutina() {

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const previousProductsSignatureRef = useRef<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
    const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
    const searchParams = useSearchParams();
    
    const tCreate = useTranslations("CrearRutina");
    const tRoutine = useTranslations("GuardarRutina");
    const tSteps = useTranslations("GuardarRutina.steps");

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
        const preselectedId = searchParams.get("product");
        if (preselectedId && products.some((p) => p.id === preselectedId)) {
            setSelectedProductIds(new Set([preselectedId]));
        }
    }, []);
    
    const { control, register, handleSubmit, reset, getValues, setValue, watch } = useForm<CrearRutinaFormData>({
        defaultValues: {
            name: "",
            description: "",
            type: "am",
            steps: []
        }
    });

    const selectedTimeOfDay = watch("type");

    const { fields, move, remove } = useFieldArray({
        control,
        name: "steps"
    });

    useEffect(() => {
        if (previousProductsSignatureRef.current === productsSignature) {
            return;
        }

        const currentValues = getValues();

        reset({
            name: currentValues.name ?? "",
            description: currentValues.description ?? "",
            type: currentValues.type ?? "am",
            steps: selectedProducts.map((product, index) => {
                const existingStep = currentValues.steps?.find((step) => step.product.id === product.id);
                return {
                    id: existingStep?.id ?? generateId(),
                    name: existingStep?.name ?? "",
                    order: index,
                    product: product,
                    notes: existingStep?.notes ?? ""
                };
            })
        });

        previousProductsSignatureRef.current = productsSignature;
    }, [selectedProducts, productsSignature, getValues, reset]);

    const handleAddToRoutine = (product: Product) => {
        if (selectedProductIds.has(product.id)) {
            toast.info(tRoutine("toast.alreadyAdded", { name: product.name }));
            return;
        }

        setSelectedProductIds((prev) => new Set([...prev, product.id]));
        toast.success(tRoutine("toast.added", { name: product.name }));
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
        const routine: Routine = {
            id: generateId(),
            name: data.name,
            description: data.description,
            type: data.type,
            steps: data.steps.map((step, index) => ({
                id: step.id,
                name: step.name,
                order: index,
                product: step.product.id,
                notes: step.notes
            }))
        };
        console.log("Form entregado", routine);
    };

    return (
        <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
            <header className="mb-6 md:mb-8 text-center">
                <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {tCreate("title")}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    {tCreate("description")}
                </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-[minmax(320px,380px)_1fr] md:items-start">
                <div className="space-y-6 md:sticky md:top-6 md:self-start">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl md:text-2xl">{tCreate("routineInfo")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">{tRoutine("infoCard.nameLabel")}</p>
                                <Input {...register("name")} placeholder={tSteps("routineNamePlaceholder")} />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">{tRoutine("infoCard.descriptionLabel")}</p>
                                <Textarea {...register("description")} placeholder={tRoutine("infoCard.descriptionPlaceholder")} rows={4} />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">{tRoutine("infoCard.timeOfDayLabel")}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        type="button"
                                        variant={selectedTimeOfDay === "am" ? "default" : "outline"}
                                        onClick={() => setValue("type", "am")}
                                    >
                                        {tRoutine("infoCard.timeOfDay.am")}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={selectedTimeOfDay === "pm" ? "default" : "outline"}
                                        onClick={() => setValue("type", "pm")}
                                    >
                                        {tRoutine("infoCard.timeOfDay.pm")}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full">{tRoutine("submitButton")}</Button>
                </div>

                <div className="space-y-3 md:min-w-0">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{tSteps("title")}</h2>
                        <Dialog open={isProductsDialogOpen} onOpenChange={setIsProductsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="outline">{tRoutine("infoCard.selectProductsButton")}</Button>
                            </DialogTrigger>
                            <DialogContent className="w-[95vw] max-w-[95vw] lg:max-w-6xl max-h-[90vh] overflow-hidden p-4 sm:p-6 flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>{tRoutine("productDialog.title")}</DialogTitle>
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
                                            <p className="text-center text-muted-foreground col-span-full">{tRoutine("productDialog.noResults")}</p>
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
                    <p className="text-sm text-muted-foreground">{tRoutine("infoCard.productsSelected", { count: selectedProducts.length })}</p>
                    {fields.length === 0 && (
                        <Card className="">
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">{tSteps("empty")}</p>
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