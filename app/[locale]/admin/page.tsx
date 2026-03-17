import { ModerationQueue } from "@/components/admin/moderation-queue";
import { ProductInventory } from "@/components/admin/product-inventory";
import { StatCard } from "@/components/admin/stat-card";
import { Megaphone, Package, Star, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminDashboardPage() {
    const t = useTranslations("admin");
    
    return (
        <div className="space-y-6">
    
        {/* ── Stat cards ── */}
        <div className="flex gap-4">
            <StatCard
            label={t("stats.totalUsers")}
            value="42,892"
            trend="+12.5%"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
            label={t("stats.activePosts")}
            value="1,402"
            trend="+4.2%"
            icon={<Star className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
            label={t("stats.pendingReviews")}
            value="158"
            trend="24 New"
            trendVariant="warning"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
            label={t("stats.monthlyRevenue")}
            value="$12,450"
            trend="+8.1%"
            icon={<Megaphone className="h-4 w-4 text-muted-foreground" />}
            />
        </div>
    
        {/* ── Lower row ── */}
        <div className="grid grid-cols-[1fr_1.6fr] gap-4">
            <ModerationQueue />
            <ProductInventory />
        </div>
    
        </div>
    );
}