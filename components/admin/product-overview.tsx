"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    Check,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import {
    Category,
    SkinType,
    ProductType,
    ApprovalStatus,
    type Product,
    type ProposedProduct,
} from "@/types/product";

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: reemplazar con fetch real cuando el endpoint esté listo

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Hydro Boost Gel",
        brand: "Neutrogena",
        description: "Gel hidratante de ácido hialurónico",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA],
        product_type: ProductType.GEL,
        category: [Category.HIDRATACION],
        ingredients: ["Aqua", "Hyaluronic Acid", "Glycerin"],
        rating: 4.5,
        review_count: 1204,
        image_url: [],
    },
    {
        id: "2",
        name: "Retinol Serum 2%",
        brand: "The Ordinary",
        description: "Suero de retinol para tratamiento anti-edad",
        skin_type: [SkinType.NORMAL, SkinType.GRASA],
        product_type: ProductType.SERUM,
        category: [Category.ANTI_EDAD, Category.REPARACION],
        ingredients: ["Retinol", "Squalane", "Glycerin"],
        rating: 4.2,
        review_count: 842,
        image_url: [],
    },
    {
        id: "3",
        name: "Mineral SPF 50",
        brand: "EltaMD",
        description: "Protector solar mineral de amplio espectro",
        skin_type: [SkinType.SENSIBLE, SkinType.ACNEICA],
        product_type: ProductType.SUNSCREEN,
        category: [Category.HIDRATACION],
        ingredients: ["Zinc Oxide", "Titanium Dioxide"],
        rating: 4.8,
        review_count: 432,
        image_url: [],
    },
];

export const PROPOSED_PRODUCTS: ProposedProduct[] = [
    {
        id: "p1",
        name: "Citrus Cleansing Oil",
        brand: "Heimish",
        skin_type: [SkinType.MIXTA, SkinType.GRASA],
        product_type: ProductType.OIL,
        primary_category: Category.LIMPIEZA,
        ingredients: ["Citrus Oil", "Sunflower Oil", "Vitamin E"],
        image_url: [],
        submitted_by: "maria_g",
        submitted_at: "2024-03-10T14:23:00Z",
        status: ApprovalStatus.PENDING,
    },
    {
        id: "p2",
        name: "Centella Calm Toner",
        brand: "Some By Mi",
        skin_type: [SkinType.SENSIBLE, SkinType.IRRITADA],
        product_type: ProductType.TONER,
        primary_category: Category.REPARACION,
        additional_categories: [Category.HIDRATACION],
        ingredients: ["Centella Asiatica", "Niacinamide", "Aqua"],
        image_url: [],
        submitted_by: "skinlover_92",
        submitted_at: "2024-03-11T09:10:00Z",
        status: ApprovalStatus.PENDING,
    },
    {
        id: "p3",
        name: "Vitamin C Glow Serum",
        brand: "Skinceuticals",
        skin_type: [SkinType.OPACA, SkinType.NORMAL],
        product_type: ProductType.SERUM,
        primary_category: Category.ANTIOXIDANTE,
        ingredients: ["Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
        image_url: [],
        submitted_by: "glowup_jess",
        submitted_at: "2024-03-12T17:45:00Z",
        status: ApprovalStatus.APPROVED,
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convierte un enum value a label legible: "anti-edad" → "Anti-edad" */
function toLabel(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
}

function formatDate(iso?: string) {
    if (!iso) return "—";
    return new Intl.DateTimeFormat("es", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
}

// ─── CategoryBadge ────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: Category }) {
    return (
        <Badge className="text-[10px] font-medium capitalize bg-secondary ">
            {toLabel(category)}
        </Badge>
    );
}

function ProductTypeBadge({ value }: { value: string }) {
    return (
        <Badge variant="outline" className="text-[10px] font-medium capitalize">
            {toLabel(value.replace(/_/g, " "))}
        </Badge>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 4;

function usePagination<T>(items: T[]) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(items.length / PAGE_SIZE);
    const visible = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    return { page, setPage, totalPages, visible };
}

// ─── Published products table ─────────────────────────────────────────────────

function PublishedTable({
    products,
    total,
}: {
    products: Product[];
    total: number;
}) {
    const t = useTranslations("admin");
    const { page, setPage, totalPages, visible } = usePagination(products);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-5 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground w-[200px]">
                            {t("products.colName")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colBrand")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colType")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colCategory")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colReviews")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground pr-5 text-right">
                            {t("products.colActions")}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {visible.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="pl-5 py-3">
                                <p className="font-medium text-sm leading-tight">{product.name}</p>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {product.brand}
                            </TableCell>
                            <TableCell>
                                <ProductTypeBadge value={product.product_type} />
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {product.category.map((cat) => (
                                        <CategoryBadge key={cat} category={cat} />
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {product.review_count.toLocaleString()}
                            </TableCell>
                            <TableCell className="pr-5">
                                <div className="flex items-center justify-end gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                                    aria-label={t("actions.edit")}
                                                >
                                                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>{t("actions.edit")}</p></TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                    aria-label={t("actions.delete")}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>{t("actions.delete")}</p></TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationRow
                page={page}
                totalPages={totalPages}
                visibleCount={visible.length}
                total={total}
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            />
        </>
    );
}

// ─── Proposed products table ──────────────────────────────────────────────────

function ProposedTable({ products }: { products: ProposedProduct[] }) {
    const { page, setPage, totalPages, visible } = usePagination(products);
    const t = useTranslations("admin");

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-5 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground w-[190px]">
                            Producto
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colBrand")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colType")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colCategory")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                            {t("products.colSubmittedBy")}
                        </TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground pr-5 text-right">
                            {t("products.colActions")}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {visible.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell className="pl-5 py-3">
                                <p className="font-medium text-sm leading-tight">{product.name}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                    {formatDate(product.submitted_at)}
                                </p>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {product.brand}
                            </TableCell>
                            <TableCell>
                                <ProductTypeBadge value={product.product_type} />
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    <CategoryBadge category={product.primary_category} />
                                    {product.additional_categories?.map((cat) => (
                                        <CategoryBadge key={cat} category={cat} />
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {product.submitted_by ?? "—"}
                            </TableCell>
                            <TableCell className="pr-5">
                                <div className="flex items-center justify-end gap-1">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-primary"
                                                    aria-label="Aprobar producto"
                                                >
                                                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>Aprobar</p></TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                    aria-label="Rechazar producto"
                                                >
                                                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>Rechazar</p></TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationRow
                page={page}
                totalPages={totalPages}
                visibleCount={visible.length}
                total={products.length}
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            />
        </>
    );
}

// ─── Shared pagination row ────────────────────────────────────────────────────

function PaginationRow({
    page,
    totalPages,
    visibleCount,
    total,
    onPrev,
    onNext,
}: {
    page: number;
    totalPages: number;
    visibleCount: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}) {
    const t = useTranslations("admin");
    return (
        <div className="flex items-center justify-between px-5 py-3 border-t">
            <p className="text-xs text-muted-foreground">
                {t("products.showing", { count: visibleCount, total })}
            </p>
            <div className="flex gap-1.5">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    disabled={page === 0}
                    onClick={onPrev}
                >
                    <ChevronLeft className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                    {t("pagination.prev")}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    disabled={page >= totalPages - 1}
                    onClick={onNext}
                >
                    {t("pagination.next")}
                    <ChevronRight className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
                </Button>
            </div>
        </div>
    );
}


interface ProductOverviewProps {
    products?: Product[];
    proposedProducts?: ProposedProduct[];
}

export function ProductOverview({
    products = PRODUCTS,
    proposedProducts = PROPOSED_PRODUCTS,
}: ProductOverviewProps) {
    const t = useTranslations("admin");

    return (
        <Card>
            <CardHeader className="pb-3 pt-5 px-5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                        {t("products.overviewTitle")}
                    </CardTitle>
                    <Button
                        size="sm"
                        className="bg-secondary text-secondary-foreground gap-1.5"
                    >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("products.addProduct")}
                    </Button>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-0">
                <Tabs defaultValue="published">
                    <div className="px-5 pt-3">
                        <TabsList className="h-8">
                            <TabsTrigger value="published" className="text-xs h-7 gap-1.5">
                                {t("products.published")}
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                    {products.length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="proposed" className="text-xs h-7 gap-1.5">
                                {t("products.proposed")}
                                {proposedProducts.length > 0 && (
                                    <Badge className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground">
                                        {proposedProducts.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="published" className="mt-0">
                        <PublishedTable products={products} total={products.length} />
                    </TabsContent>

                    <TabsContent value="proposed" className="mt-0">
                        <ProposedTable products={proposedProducts} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}