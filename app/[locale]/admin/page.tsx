import { ModerationQueue } from "@/components/admin/moderation-queue";
import { ProductInventory } from "@/components/admin/product-inventory";
import { StatCard } from "@/components/admin/stat-card";
import { Clipboard, Megaphone, Package, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminDashboardPage() {
    const t = useTranslations("admin");
    
    return (
        <div className="space-y-6">
    
        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <StatCard
            label={t("stats.totalUsers")}
            value="42,892"
            trend="+12.5%"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            route="/admin/users"
            />
            <StatCard
            label={t("stats.pendingPostReviews")}
            value="158"
            trend="24 New"
            trendVariant="warning"
            icon={<Clipboard className="h-4 w-4 text-muted-foreground" />}
            route="/admin/posts"
            />
            <StatCard
            label={t("stats.pendingProductReviews")}
            value="3"
            trend="3 New"
            trendVariant="warning"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            route="/admin/products"
            />
        </div>
    
        {/* ── Lower row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-4">
            <ModerationQueue />
            <ProductInventory />
        </div>
    
        </div>
    );
}