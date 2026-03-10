'use client';
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, SkinType, ProductType } from "@/types/product";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputGroup, InputGroupTextarea } from "../ui/input-group";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, useComboboxAnchor } from "../ui/combobox";
import { Fragment } from "react";

export const createProductSchema = z.object({
    name: z.string().min(3),
    brand: z.string().min(2),
    skin_type: z
        .array(z.enum(SkinType))
        .min(1),
    product_type: z.union([
        z.enum(ProductType),
        z.string().min(3)
    ]),
    primary_category: z.enum(Category),
    additional_categories: z
        .array(z.enum(Category))
        .optional()
        .default([]),
    ingredients: z
        .array(z.string().min(2))
        .min(1),
    image_url: z
        .array(z.string().url())
        .min(1)
    })
    .refine(
    (data) => !data.additional_categories.includes(data.primary_category),
    {
        message: "La categoría principal no puede estar repetida en las adicionales",
        path: ["additional_categories"]
    }
);

type FormValues = z.infer<typeof createProductSchema>;

export default function ProductForm() {
    const t = useTranslations("CreateProductPage");
    const tCat = useTranslations("Categories");
    const tProdType = useTranslations("ProductTypes");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const categories = Object.values(Category);
    const skinTypes = Object.values(SkinType);
    const productTypes = Object.values(ProductType);

    function onSubmit(data: FormValues) {
        console.log(data)
        toast.success("Producto enviado para revisión ✅", {
            description: "Un administrador revisará la propuesta."
        })
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            brand: "",
            skin_type: [],
            product_type: undefined,
            primary_category: undefined,
            additional_categories: [],
            ingredients: [],
            image_url: []
        }
    })

    const selectedPrimaryCat = form.watch("primary_category");

    const additionalCategoryOptions = categories.filter((c) => c !== selectedPrimaryCat);

    const anchor = useComboboxAnchor();

    return (
        <Card className="w-full md:w-3/4 mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-3xl">{t("title")}</CardTitle>
                <div className="w-full flex justify-center">
                    <CardDescription className="text-center w-11/12">{t("submitDisclaimer")}</CardDescription>
                </div>
            </CardHeader>
            <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                    <FieldGroup>

                        <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-primary" htmlFor="name">
                                {t("productName")}
                            </FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                placeholder={t("productNamePlaceholder")}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                        />


                        <Controller
                        name="brand"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="text-primary" htmlFor="brand">
                                    {t("brand")}
                                </FieldLabel>

                                <Input
                                    {...field}
                                    id="brand"
                                    placeholder="La Roche Posay"
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}/>
                        
                        <Stack direction={isMobile?"column":"row"} gap={4}>
                            {/* PRIMARY CATEGORY */}

                            <Controller
                            name="primary_category"
                            control={form.control}
                            render={({ field, fieldState }) => (

                                <Field>
                                    <FieldLabel className="text-primary">
                                        {t("primaryCategory")}
                                    </FieldLabel>

                                    <Select 
                                        name={field.name} 
                                        value={field.value} 
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id="product-form-primary-category" aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder={t("primaryCategoryPlaceholder")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => (
                                                <SelectItem key={c} value={c}>{tCat(`${c}.label`)}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                            />

                            {/* ADDITIONAL CATEGORIES */}
                            <Controller
                            name="additional_categories"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="text-primary">{t("additionalCategories")}</FieldLabel>

                                <Combobox
                                    items={additionalCategoryOptions}
                                    multiple
                                    autoHighlight
                                    value={field.value ?? []}
                                    onValueChange={field.onChange}
                                    disabled={!selectedPrimaryCat}
                                >
                                    
                                    <ComboboxChips ref={anchor} className="w-full">
                                        <ComboboxValue>
                                            {(values) => (
                                            <Fragment>
                                                {values.map((value: string) => (
                                                <ComboboxChip key={value}>{tCat(`${value}.label`)}</ComboboxChip>
                                                ))}

                                                <ComboboxChipsInput
                                                placeholder={
                                                    t("additionalCategoriesPlaceholder")
                                                }
                                                aria-invalid={fieldState.invalid}
                                                className="min-w-24 flex-1"
                                                />
                                            </Fragment>
                                            )}
                                        </ComboboxValue>

                                        <ComboboxTrigger className="ml-auto text-muted-foreground" />
                                    </ComboboxChips>

                                    <ComboboxContent anchor={anchor}>
                                    <ComboboxList>
                                        {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {tCat(`${item}.label`)}
                                        </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                            />
                        </Stack>
                            <Controller
                            name="product_type"
                            control={form.control}
                            render={({ field, fieldState }) => (

                                <Field data-invalid={fieldState.invalid}>

                                    <FieldLabel className="text-primary" htmlFor="product_type">
                                        {t("productType")}
                                    </FieldLabel>

                                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="product_type" aria-invalid={fieldState.invalid}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productTypes.map((p) => (
                                                <SelectItem key={p} value={p}>{tProdType(`${p}`)}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                            />


                    


                    {/* INGREDIENTS */}

                    <Controller
                    name="ingredients"
                    control={form.control}
                    render={({ field, fieldState }) => (

                        <Field data-invalid={fieldState.invalid}>

                        <FieldLabel className="text-primary">
                            {t("ingredients")}
                        </FieldLabel>

                        <InputGroup>

                            <InputGroupTextarea
                            placeholder={t("ingredientsPlaceholder")}
                            rows={3}
                            value={field.value.join(", ")}
                            onChange={(e) =>
                                field.onChange(
                                e.target.value
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter(Boolean)
                                )
                            }
                            />

                        </InputGroup>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}

                        </Field>

                    )}
                    />


                    {/* IMAGE URL */}

                    <Controller
                    name="image_url"
                    control={form.control}
                    render={({ field, fieldState }) => (

                        <Field data-invalid={fieldState.invalid}>

                        <FieldLabel className="text-primary">
                            {t("imageUrl")}
                        </FieldLabel>

                        <Input
                            placeholder="https://..."
                            value={field.value[0] ?? ""}
                            onChange={(e) =>
                            field.onChange([e.target.value])
                            }
                        />

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}

                        </Field>

                    )}
                    />

                    </FieldGroup>
                </CardContent>
            </form>

            <CardFooter>

                <Field orientation="horizontal">

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        form="product-form"
                    >
                        Submit
                    </Button>

                </Field>

            </CardFooter>
        </Card>
    )
}