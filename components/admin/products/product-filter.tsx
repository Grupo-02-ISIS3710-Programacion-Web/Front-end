"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search} from "lucide-react";

import { ApprovalStatus, Category } from "@/types/product";
import { toLabel } from "@/lib/string-utils";

export interface ProductFiltersState {
    search: string;
    category: string;
    status: string;
}

interface ProductFiltersProps {
    filters: ProductFiltersState;
    onChange: (next: Partial<ProductFiltersState>) => void;
}

export function ProductFilters({ filters, onChange }: ProductFiltersProps) {
    const t = useTranslations("admin");

    return (
        <Card>
        <CardContent className="flex flex-col sm:flex-row gap-3 px-5 py-4 justify-between w-full">

            {/* Search */}
            <div className="relative flex-1 w-full sm:w-1/2">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                />
                <Input
                    placeholder={t("productsPage.filters.searchPlaceholder")}
                    value={filters.search}
                    onChange={(e) => onChange({ search: e.target.value })}
                    className="pl-9 h-9"
                />
            </div>

            <div className="flex justify-center md:justify-end gap-2 w-full sm:w-1/2">
                {/* Category */}
                <Select
                value={filters.category}
                onValueChange={(v) => onChange({ category: v })}
                >
                    <SelectTrigger className="h-9 w-full sm:w-40 min-w-1/3">
                        <SelectValue placeholder={t("productsPage.filters.allCategories")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            {t("productsPage.filters.allCategories")}
                        </SelectItem>
                        {Object.values(Category).map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {toLabel(cat)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select
                value={filters.status}
                onValueChange={(v) => onChange({ status: v })}
                >
                    <SelectTrigger className="h-9 w-full sm:w-40 min-w-1/3">
                        <SelectValue placeholder={t("productsPage.filters.allStatuses")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                        {t("productsPage.filters.allStatuses")}
                        </SelectItem>
                        {Object.values(ApprovalStatus).map((s) => (
                        <SelectItem key={s} value={s}>
                            {t(`productsPage.stats.${s}`)}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
        </Card>
    );
}