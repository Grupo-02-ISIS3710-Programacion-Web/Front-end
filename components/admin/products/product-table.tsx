"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Check, Package, Pencil, Trash2, X } from "lucide-react";

import { ApprovalStatus, type ProposedProduct } from "@/types/product";
import { ApprovalStatusBadge, CategoryBadge, ProductTypeBadge } from "./product-components-utils";
import { formatDate } from "@/lib/string-utils";

interface ProductTableProps {
    products: ProposedProduct[];
    selected: Set<string>;
    onToggleOne: (id: string) => void;
}

function RowActions({ product }: { product: ProposedProduct }) {
    const t = useTranslations("admin");

    return (
        <div className="flex items-center justify-end gap-1">
        <TooltipProvider>
            {/* Approve — solo para pending */}
            {product.status === ApprovalStatus.PENDING && (
            <Tooltip>
                <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary"
                    aria-label={t("actions.approve")}
                >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
                </TooltipTrigger>
                <TooltipContent><p>{t("actions.approve")}</p></TooltipContent>
            </Tooltip>
            )}

            {/* Reject — para pending y approved */}
            {(product.status === ApprovalStatus.PENDING ||
            product.status === ApprovalStatus.APPROVED) && (
            <Tooltip>
                <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    aria-label={t("actions.reject")}
                >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
                </TooltipTrigger>
                <TooltipContent><p>{t("actions.reject")}</p></TooltipContent>
            </Tooltip>
            )}

            {/* Edit — siempre */}
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

            {/* Delete — siempre */}
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
    );
}

export function ProductTable({ products, selected, onToggleOne }: ProductTableProps) {
    const t = useTranslations("admin");

    return (
        <div className="overflow-x-auto">
        <Table>
            <TableHeader>
            <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5 w-10" />
                <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground min-w-50">
                {t("products.colName")}
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                {t("products.colCategory")}
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                {t("products.colType")}
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                {t("productsPage.table.submittedBy")}
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                {t("products.colStatus")}
                </TableHead>
                <TableHead className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground pr-5 text-right">
                {t("products.colActions")}
                </TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
            {products.length === 0 ? (
                <TableRow>
                <TableCell
                    colSpan={7}
                    className="text-center py-12 text-muted-foreground text-sm"
                >
                    {t("productsPage.empty")}
                </TableCell>
                </TableRow>
            ) : (
                products.map((product) => (
                <TableRow
                    key={product.id}
                    className={selected.has(product.id) ? "bg-muted/40" : ""}
                >
                    {/* Checkbox */}
                    <TableCell className="pl-5">
                    <Checkbox
                        checked={selected.has(product.id)}
                        onCheckedChange={() => onToggleOne(product.id)}
                        aria-label={`${t("productsPage.table.select")} ${product.name}`}
                    />
                    </TableCell>

                    {/* Name + brand + date */}
                    <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <Package className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <div>
                        <p className="font-medium text-sm leading-tight">{product.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            {product.brand} · {formatDate(product.submitted_at)}
                        </p>
                        </div>
                    </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                    <div className="flex flex-wrap gap-1">
                        <CategoryBadge category={product.primary_category} />
                        {product.additional_categories?.map((cat) => (
                        <CategoryBadge key={cat} category={cat} />
                        ))}
                    </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                    <ProductTypeBadge value={product.product_type} />
                    </TableCell>

                    {/* Submitted by */}
                    <TableCell className="text-sm text-muted-foreground">
                    {product.submitted_by ?? "—"}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                    <ApprovalStatusBadge
                        status={product.status}
                        label={t(`products.stats.${product.status}`)}
                    />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-5">
                    <RowActions product={product} />
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
        </div>
    );
}