"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProductFilters, ProductFiltersState } from "./product-filter";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { getProposedProducts } from "@/lib/api";
import { ApprovalStatus, ProductStats, ProposedProduct } from "@/types/product";
import { ProductStatsCards } from "./products-statscards";
import { Card, CardContent } from "@/components/ui/card";
import { ProductBulkBar } from "./product-bulkbar";
import { ProductTable } from "./product-table";
import { PaginationRow } from "./product-components-utils";
import { ProductDetailModal } from "./ProductDetailModal";
import { ProductRejectModal } from "./ProductRejectModal";
import { ProductDeleteModal } from "./ProductDeleteModal";
import { ProductEditDrawer } from "./ProductEditDrawer";

const PAGE_SIZE = 5;

interface ModalState {
    detail:  ProposedProduct | null;
    reject:  ProposedProduct | null;
    delete:  ProposedProduct | null;
    edit:    ProposedProduct | null;
}

const CLOSED: ModalState = { detail: null, reject: null, delete: null, edit: null };

export default function ProductManagementView() {
    const t = useTranslations("admin");
    const proposedProducts = getProposedProducts();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [bulkAction, setBulkAction] = useState("none");
    const [modal, setModal] = useState<ModalState>(CLOSED);
    const [products, setProducts] = useState<ProposedProduct[]>(proposedProducts);
    
    function openDetail(p: ProposedProduct) { setModal({ ...CLOSED, detail: p }); }
    function openReject(p: ProposedProduct) { setModal({ ...CLOSED, reject: p }); }
    function openDelete(p: ProposedProduct) { setModal({ ...CLOSED, delete: p }); }
    function openEdit(p: ProposedProduct)   { setModal({ ...CLOSED, edit: p }); }
    function closeAll()                     { setModal(CLOSED); }

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

    function updateStatus(
        id: string,
        status: ApprovalStatus,
        auditExtra?: { reason?: string },
    ) {
        setProducts((prev) =>
        prev.map((p) =>
            p.id === id
            ? {
                ...p,
                status,
                audit: {
                    action_by: "current_admin", // TODO: reemplazar con sesión real
                    action_at: new Date().toISOString(),
                    ...auditExtra,
                },
                }
            : p,
        ),
        );
    }
    
    function handleApprove(product: ProposedProduct) {
        updateStatus(product.id, ApprovalStatus.APPROVED);
        closeAll();
    }
    
    function handleRejectConfirm(product: ProposedProduct, reason: string) {
        updateStatus(product.id, ApprovalStatus.REJECTED, { reason });
        closeAll();
    }
    
    function handleDeleteConfirm(product: ProposedProduct) {
        // Eliminación lógica: cambia estado a INACTIVE
        updateStatus(product.id, ApprovalStatus.INACTIVE);
        setSelected((prev) => { const next = new Set(prev); next.delete(product.id); return next; });
        closeAll();
    }
    
    function handleEditSave(updated: ProposedProduct) {
        setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
        );
        closeAll();
    }
    
    function handleBulkApply() {
        if (bulkAction === "none" || selected.size === 0) return;
        const actionMap: Record<string, ApprovalStatus> = {
        approve: ApprovalStatus.APPROVED,
        publish: ApprovalStatus.PUBLISHED,
        reject:  ApprovalStatus.REJECTED,
        delete:  ApprovalStatus.INACTIVE,
        };
        const newStatus = actionMap[bulkAction];
        if (!newStatus) return;
        selected.forEach((id) => updateStatus(id, newStatus));
        setSelected(new Set());
        setBulkAction("none");
    }
    
    // When detail modal triggers approve/reject, pipe through respective modals
    function handleDetailApprove(product: ProposedProduct) {
        closeAll();
        setTimeout(() => handleApprove(product), 0);
    }
    
    function handleDetailReject(product: ProposedProduct) {
        setModal({ ...CLOSED, reject: product });
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
                    onView={openDetail}
                    onApprove={handleApprove}
                    onReject={openReject}
                    onEdit={openEdit}
                    onDelete={openDelete}
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

        {/* ── Modals & Drawer ── */}
        <ProductDetailModal
            product={modal.detail}
            open={!!modal.detail}
            onClose={closeAll}
            onApprove={handleDetailApprove}
            onReject={handleDetailReject}
        />
    
        <ProductRejectModal
            product={modal.reject}
            open={!!modal.reject}
            onClose={closeAll}
            onConfirm={handleRejectConfirm}
        />
    
        <ProductDeleteModal
            product={modal.delete}
            open={!!modal.delete}
            onClose={closeAll}
            onConfirm={handleDeleteConfirm}
        />
    
        <ProductEditDrawer
            product={modal.edit}
            open={!!modal.edit}
            onClose={closeAll}
            onSave={handleEditSave}
        />
        </div>
    )
}