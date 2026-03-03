"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product"
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PasoRutinaCard from "@/components/routines/PasoRutinaCard";
import { AnimatePresence, motion } from "motion/react";

function filtrarProductosPorIds(ids: string[], productos: Product[]): Product[] {
    const idsSet = new Set(ids);
    return productos.filter(producto => idsSet.has(producto.id));
}

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

    const allProducts = products as Product[];
    const previousProductsSignatureRef = useRef<string>("");

    const searchParams = useSearchParams();
    const productIds = searchParams.get("products");
    const idsArray = useMemo(() => (productIds ? productIds.split(",") : []), [productIds]);

    const filteredProducts = useMemo(
        () => filtrarProductosPorIds(idsArray, allProducts),
        [idsArray, allProducts]
    );

    // Se hace una firma para evitar que useEffect se dispare por cambios en el array de productos que no sean realmente cambios en los productos (ej: cambio de referencia sin cambio de contenido)
    const productsSignature = useMemo(
        () => filteredProducts.map((product) => product.id).join(","),
        [filteredProducts]
    );

    const { control, register, handleSubmit, reset, getValues } = useForm<CrearRutinaFormData>({
        defaultValues: {
            name: "",
            objective: "",
            pasos: filteredProducts.map((product) => ({
                name: "",
                description: "",
                product
            }))
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
            pasos: filteredProducts.map((product) => {
                const existingStep = currentValues.pasos?.find((step) => step.product?.id === product.id);
                return {
                    name: existingStep?.name ?? "",
                    description: existingStep?.description ?? "",
                    product
                };
            })
        });

        previousProductsSignatureRef.current = productsSignature;
    }, [filteredProducts, productsSignature, getValues, reset]);

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
        remove(index);
    };

    const onSubmit = (data: CrearRutinaFormData) => {
        console.log("Form entregado", data);
    };

    return (
        <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
            <header className="mb-6 md:mb-8 text-center">
                <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Finaliza tu rutina personalizada
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    Revisa y ajusta la descripción de cada paso de tu rutina. Puedes cambiar el orden, editar los detalles o eliminar pasos antes de guardar tu rutina personalizada.
                </p>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
                <div className="space-y-6 md:sticky md:top-6 md:self-start md:max-w-sm">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl md:text-2xl">Información de la rutina</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Nombre de la rutina</p>
                                <Input {...register("name")} placeholder="Nombre de la rutina" />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Objetivo de la rutina</p>
                                <Input {...register("objective")} placeholder="Objetivo de la rutina" />
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full">Crear Rutina</Button>
                </div>

                <div className="space-y-4 md:min-w-0">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Descripción de cada paso</h2>
                    {fields.length === 0 && (
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground">No hay pasos en la rutina. Regresa y agrega productos.</p>
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