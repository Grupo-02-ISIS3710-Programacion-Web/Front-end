"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductBulkBarProps {
    allSelected: boolean;
    hasSelection: boolean;
    bulkAction: string;
    from: number;
    to: number;
    total: number;
    onToggleAll: () => void;
    onBulkActionChange: (action: string) => void;
    onBulkApply: () => void;
}


export function ProductBulkBar({
    allSelected,
    hasSelection,
    bulkAction,
    from,
    to,
    total,
    onToggleAll,
    onBulkActionChange,
    onBulkApply,
}: ProductBulkBarProps) {
    const t = useTranslations("admin");

    return (
        <div className="flex items-center justify-between px-5 py-3 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center items-center justify-between gap-10 min-w-1/3">
                <div className="flex gap-2 items-center">
                    <Checkbox
                    checked={allSelected}
                    onCheckedChange={onToggleAll}
                    aria-label={t("productsPage.table.selectAll")}
                    />
                    <span className="text-md text-muted-foreground font-medium">
                        {t("productsPage.table.selectAll")}
                    </span>
                </div>

                <span className="text-md text-muted font-medium">|</span>
                
                <div className="flex gap-3 items-center">
                    <span className="text-md text-muted-foreground font-medium">
                        {t("productsPage.bulk.label")}
                    </span>
                    <Select value={bulkAction} onValueChange={onBulkActionChange}>
                        <SelectTrigger className="h-8 w-fit text-muted-foreground font-normal">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">{t("productsPage.bulk.selectAction")}</SelectItem>
                            <SelectItem value="approve">{t("productsPage.bulk.approve")}</SelectItem>
                            <SelectItem value="reject">{t("productsPage.bulk.reject")}</SelectItem>
                            <SelectItem value="publish">{t("productsPage.bulk.publish")}</SelectItem>
                            <SelectItem value="delete">{t("productsPage.bulk.delete")}</SelectItem>
                        </SelectContent>
                        </Select>
                        <Button
                            size="lg"
                            className="h-8 text-md"
                            disabled={!hasSelection || bulkAction === "none"}
                            onClick={onBulkApply}
                        >
                            {t("productsPage.bulk.apply")}
                        </Button>
                </div>
            </div>

        <p className="text-md text-muted-foreground hidden sm:block">
            {t("productsPage.showing", { from, to, total })}
        </p>
        </div>
    );
}