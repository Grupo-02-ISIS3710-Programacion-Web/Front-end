import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
    label: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
    trendVariant?: "positive" | "warning";
    route?: string;
}

export function StatCard({
    label,
    value,
    trend,
    icon,
    trendVariant = "positive",
    route = "#"
}: StatCardProps) {
    return (
        <Card className="flex-1 min-w-0">
            <a href={route}>
                <CardContent className="pt-5 pb-5 px-5">
                    <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-muted">{icon}</div>
                    {trendVariant === "warning" ? (
                        <Badge
                        variant="outline"
                        className="text-primary border-primary bg-secondary/10 text-xs font-medium"
                        >
                        {trend}
                        </Badge>
                    ) : (
                        <span className="text-xs font-medium text-primary">{trend}</span>
                    )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{label}</p>
                    <p className="text-2xl font-semibold tracking-tight">{value}</p>
                </CardContent>
            </a>
        </Card>
    );
}