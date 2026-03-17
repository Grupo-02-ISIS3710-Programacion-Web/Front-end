"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    LayoutDashboard,
    Package,
    Users,
    Star,
    Megaphone,
    Settings,
    ExternalLink,
} from "lucide-react";

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { href: "/admin",               icon: LayoutDashboard, labelKey: "nav.dashboard"      },
    { href: "/admin/products",      icon: Package,          labelKey: "nav.products"       },
    { href: "/admin/users",         icon: Users,            labelKey: "nav.users"          },
    { href: "/admin/reviews",       icon: Star,             labelKey: "nav.reviews"        },
    { href: "/admin/advertisement", icon: Megaphone,        labelKey: "nav.advertisement"  },
    { href: "/admin/settings",      icon: Settings,         labelKey: "nav.settings"       },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminSidebar() {
    const t = useTranslations("admin");
    const pathname = usePathname();
    function isActive(href: string) {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    }

    return (
        <aside className="w-[220px] shrink-0 flex flex-col bg-background border-r h-full">

        {/* ── Brand ── */}
        <div className="px-5 py-4 flex items-center gap-3">
            <div className="flex gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                    className="dark:invert"
                    src="/skin4all_logo.svg"
                    alt="Skin4All logo"
                    width={20}
                    height={20}
                    priority
                />
                <h1 className="font-medium text-xl">Skin4All</h1>
            </div>
        </div>

        <Separator />

        {/* ── Nav items ── */}
        <nav className="flex-1 px-3 py-3 space-y-0.5" aria-label="Admin navigation">
            {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => (
            <Link
                key={href}
                href={href}
                className={`
                w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm
                transition-colors duration-150
                ${isActive(href)
                    ? "bg-primary text-white font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
                `}
            >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t(labelKey)}
            </Link>
            ))}
        </nav>

        <Separator />

        

        {/* ── View Site ── */}
        <div className="px-3 pb-4">
            <Button
            variant="default"
            className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2 text-sm"
            asChild
            >
            <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {t("viewSite")}
            </Link>
            </Button>
        </div>
        </aside>
    );
}