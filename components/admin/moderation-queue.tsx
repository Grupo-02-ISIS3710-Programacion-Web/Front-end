"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { ModerationItem } from "@/types/product";

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: reemplazar con fetch real cuando el endpoint esté listo

export const MODERATION_QUEUE: ModerationItem[] = [
    {
        id: "1",
        user: "Sarah Jenkins",
        userInitials: "SJ",
        action: "reported...",
        excerpt: '"This product contains harmful..."',
        timeAgo: "2m ago",
        type: "report",
    },
    {
        id: "2",
        user: "Mike Peters",
        userInitials: "MP",
        action: "flagged ...",
        excerpt: "Potentially promotional content...",
        timeAgo: "15m ago",
        type: "flag",
    },
    {
        id: "3",
        user: "David Wu",
        userInitials: "DW",
        action: "reported spam",
        excerpt: "Redirecting to external sale site...",
        timeAgo: "1h ago",
        type: "spam",
    },
];

// ─── ModerationCard ───────────────────────────────────────────────────────────

function ModerationCard({ item }: { item: ModerationItem }) {
    const isFlag = item.type === "flag";
    const t = useTranslations("admin");

    return (
        <div className="py-4 first:pt-0 last:pb-0">
        <div className="flex items-start gap-3 mb-2">
            <Avatar className="h-8 w-8 shrink-0">
            {item.userAvatar && (
                <AvatarImage src={item.userAvatar} alt={item.user} />
            )}
            <AvatarFallback className="text-xs">{item.userInitials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm leading-snug">
                <span className="font-medium">{item.user}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>
                </p>
                <span className="text-xs text-muted-foreground shrink-0">
                {item.timeAgo}
                </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 italic">
                {item.excerpt}
            </p>
            </div>
        </div>

        <div className="flex gap-2 ml-11">
            {isFlag ? (
            <>
                <Button
                size="sm"
                className="h-7 text-xs bg-secondary hover:bg-primary text-white"
                >
                {t("moderation.keep")}
                </Button>
                <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-destructive hover:bg-destructive/10"
                >
                {t("moderation.remove")}
                </Button>
            </>
            ) : (
            <>
                <Button
                size="sm"
                className="h-7 text-xs bg-secondary hover:bg-primary text-white"
                >
                {t("moderation.approve")}
                </Button>
                <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-destructive hover:bg-destructive/10"
                >
                {t("moderation.delete")}
                </Button>
            </>
            )}
        </div>
        </div>
    );
}

// ─── ModerationQueue ──────────────────────────────────────────────────────────

interface ModerationQueueProps {
    items?: ModerationItem[];
}

export function ModerationQueue({
    items = MODERATION_QUEUE,
}: ModerationQueueProps) {
    const t = useTranslations("admin");

    return (
        <Card>
        <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
                {t("moderation.title")}
            </CardTitle>
            <Button
                variant="link"
                className="h-auto p-0 text-sm text-primary font-medium"
            >
                {t("moderation.viewAll")}
            </Button>
            </div>
        </CardHeader>

        <Separator />

        <CardContent className="px-5 py-0 divide-y divide-border">
            {items.map((item) => (
            <ModerationCard key={item.id} item={item} />
            ))}
        </CardContent>
        </Card>
    );
}