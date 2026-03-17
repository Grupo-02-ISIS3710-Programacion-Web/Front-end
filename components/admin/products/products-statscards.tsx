import { ProductStats } from "@/types/product";
import { useTranslations } from "next-intl";
import MiniStatCard from "./ministatcard";
import { Check, Package } from "lucide-react";

export function ProductStatsCards({ stats }: { stats: ProductStats }) {
    const t = useTranslations("admin");
    
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MiniStatCard
                label={t("productsPage.stats.total")}
                value={stats.total}
                iconBg="bg-primary/10"
                icon={<Package className="h-5 w-5 text-primary" aria-hidden="true" />}
            />
            <MiniStatCard
                label={t("productsPage.stats.pending")}
                value={stats.pending}
                iconBg="bg-amber-50"
                icon={<Package className="h-5 w-5 text-amber-500" aria-hidden="true" />}
            />
            <MiniStatCard
                label={t("productsPage.stats.approved")}
                value={stats.approved}
                iconBg="bg-blue-50"
                icon={<Check className="h-5 w-5 text-blue-500" aria-hidden="true" />}
            />
            <MiniStatCard
                label={t("productsPage.stats.published")}
                value={stats.published}
                iconBg="bg-emerald-50"
                icon={<Check className="h-5 w-5 text-emerald-500" aria-hidden="true" />}
            />
        </div>
    );
}