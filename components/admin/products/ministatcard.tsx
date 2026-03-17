import { Card, CardContent } from "@/components/ui/card";

export default function MiniStatCard({
    icon,
    label,
    value,
    iconBg,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    iconBg: string;
}) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 px-5 py-4">
                <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
                >
                {icon}
                </div>
                <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium leading-tight">
                    {label}
                </p>
                <p className="text-2xl font-semibold tracking-tight leading-tight mt-0.5">
                    {value.toLocaleString()}
                </p>
                </div>
            </CardContent>
        </Card>
    );
}