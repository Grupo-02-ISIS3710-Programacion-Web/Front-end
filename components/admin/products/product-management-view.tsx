"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProductFilters, ProductFiltersState } from "./product-filter";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { getProposedProducts } from "@/lib/api";
import { ApprovalStatus, ProductStats } from "@/types/product";
import { ProductStatsCards } from "./products-statscards";
import { Card, CardContent } from "@/components/ui/card";
import { ProductBulkBar } from "./product-bulkbar";
import { ProductTable } from "./product-table";
import { PaginationRow } from "./product-components-utils";

const PAGE_SIZE = 5;

export default function ProductManagementView() {
    const t = useTranslations("admin");
    const proposedProducts = getProposedProducts();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [bulkAction, setBulkAction] = useState("none");

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

    const filtered = proposedProducts.filter((p) => {
        const matchSearch =
            filters.search === "" ||
            p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.brand.toLowerCase().includes(filters.search.toLowerCase());
            const matchCat =
            filters.category === "all" || p.primary_category === filters.category;
            const matchStatus =
            filters.status === "all" || p.status === filters.status;
            return matchSearch && matchCat && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    const from = filtered.length === 0 ? 0 : page * PAGE_SIZE + 1;
    const to = Math.min(page * PAGE_SIZE + PAGE_SIZE, filtered.length);

    const allVisibleSelected =
    visible.length > 0 && visible.every((p) => selected.has(p.id));

    function toggleAll() {
        setSelected((prev) => {
        const next = new Set(prev);
        if (allVisibleSelected) {
            visible.forEach((p) => next.delete(p.id));
        } else {
            visible.forEach((p) => next.add(p.id));
        }
        return next;
        });
    }
    function toggleOne(id: string) {
        setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
        });
    }

    function handleBulkApply() {
        // TODO: conectar con API
        console.log("Bulk action:", bulkAction, "on:", [...selected]);
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

        <Card>
            <CardContent className="p-0">
                <ProductBulkBar
                    allSelected={allVisibleSelected}
                    hasSelection={selected.size > 0}
                    bulkAction={bulkAction}
                    from={from}
                    to={to}
                    total={filtered.length}
                    onToggleAll={toggleAll}
                    onBulkActionChange={setBulkAction}
                    onBulkApply={handleBulkApply}
                />

                <ProductTable
                    products={visible}
                    selected={selected}
                    onToggleOne={toggleOne}
                />

                <PaginationRow
                    page={page}
                    totalPages={totalPages}
                    from={from}
                    to={to}
                    total={filtered.length}
                    onPrev={() => setPage((p) => p - 1)}
                    onNext={() => setPage((p) => p + 1)}
                    labelShowing={t("productsPage.showing", { from, to, total: filtered.length })}
                    labelPrev={t("pagination.prev")}
                    labelNext={t("pagination.next")}
                />
            </CardContent>
        </Card>
        </div>
    )
}