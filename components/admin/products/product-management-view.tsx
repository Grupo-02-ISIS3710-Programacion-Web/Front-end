"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProductFilters, ProductFiltersState } from "./product-filter";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { getProposedProducts } from "@/lib/api";
import { ApprovalStatus, ProductStats } from "@/types/product";
import { ProductStatsCards } from "./products-statscards";

export default function ProductManagementView() {
    const t = useTranslations("admin");
    const proposedProducts = getProposedProducts();
    const [page, setPage] = useState(0);

    const stats: ProductStats = {
        total:     proposedProducts.length,
        pending:   proposedProducts.filter((p) => p.status === ApprovalStatus.PENDING).length,
        approved:  proposedProducts.filter((p) => p.status === ApprovalStatus.APPROVED).length,
        published: proposedProducts.filter((p) => p.status === ApprovalStatus.PUBLISHED).length,
    };

    const [filters, setFilters] = useState<ProductFiltersState>({
        search: "",
        category: "all",
        status: "all",
    });

    function handleFilterChange(next: Partial<ProductFiltersState>) {
        setFilters((prev) => ({ ...prev, ...next }));
        setPage(0);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">
                {t("productsPage.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
                {t("productsPage.subtitle")}
            </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {t("productsPage.export")}
            </Button>
            <Button size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                {t("productsPage.addNew")}
            </Button>
            </div>
        </div>

        <ProductStatsCards stats={stats}/>

        <ProductFilters filters={filters} onChange={handleFilterChange} />
        </div>
    )
}