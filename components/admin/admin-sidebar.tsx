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
    MessageSquareHeart,
    Menu,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { href: "/admin",               icon: LayoutDashboard, labelKey: "nav.dashboard"      },
    { href: "/admin/products",      icon: Package,          labelKey: "nav.products"       },
    { href: "/admin/users",         icon: Users,            labelKey: "nav.users"          },
    // { href: "/admin/reviews",       icon: Star,             labelKey: "nav.reviews"        },
    { href: "/admin/advertisement", icon: Megaphone,        labelKey: "nav.advertisement"  },
    { href: "/admin/posts",      icon: MessageSquareHeart,         labelKey: "nav.posts"       },
    { href: "/admin/settings",      icon: Settings,         labelKey: "nav.settings"       },
] as const;



function BrandLogo() {
    return (
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0">
            <Image
                className="dark:invert"
                src="/skin4all_logo.svg"
                alt="Skin4All logo"
                width={20}
                height={20}
                priority
            />
        </div>
    );
}

function useIsActive() {
    const pathname = usePathname();
    return (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };
}

function NavFull({ onNavigate }: { onNavigate?: () => void }) {
    const t = useTranslations("admin");
    const isActive = useIsActive();
    
    return (
        <nav className="flex-1 px-3 py-3 space-y-0.5" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => (
            <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`
                w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm
                transition-colors duration-150
                ${isActive(href)
                ? "bg-emerald-500 text-white font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
            `}
            >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {t(labelKey)}
            </Link>
        ))}
        </nav>
    );
}

function NavIconOnly() {
    const t = useTranslations("admin");
    const isActive = useIsActive();

    return (
    <TooltipProvider delayDuration={100}>
        <nav className="flex-1 px-2 py-3 space-y-1" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => (
            <Tooltip key={href}>
            <TooltipTrigger asChild>
                <Link
                href={href}
                className={`
                    flex items-center justify-center h-9 w-9 mx-auto rounded-md
                    transition-colors duration-150
                    ${isActive(href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }
                `}
                aria-label={t(labelKey)}
                >
                <Icon className="h-4 w-4 " aria-hidden="true" />
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-muted text-muted [&>svg]:hidden">
                <p className="text-muted-foreground">{t(labelKey)}</p>
            </TooltipContent>
            </Tooltip>
        ))}
        </nav>
    </TooltipProvider>
    );
}

function DesktopSidebar() {
    const t = useTranslations("admin");
    
    return (
        <aside className="hidden md:flex flex-col bg-background border-r h-full
        w-[56px] lg:w-[220px] shrink-0 transition-all duration-200">
    
        {/* Brand */}
        <div className="px-2 lg:px-5 py-4 flex items-center gap-3 overflow-hidden">
            <BrandLogo />
            <div className="hidden lg:block overflow-hidden">
            <p className="text-md font-semibold leading-tight text-foreground whitespace-nowrap">Skin4All</p>
            </div>
        </div>
    
        <Separator />
    
        {/* Nav — icon only on md, full on lg */}
        <div className="hidden lg:flex flex-col flex-1">
            <NavFull />
        </div>
        <div className="flex lg:hidden flex-col flex-1">
            <NavIconOnly />
        </div>
    
        <Separator />
    
        {/* View Site */}
        <div className="px-2 lg:px-3 pb-4">
            {/* lg: full button */}
            <Button
            variant="default"
            className="hidden lg:flex w-full bg-foreground text-background hover:bg-foreground/90 gap-2 text-sm"
            asChild
            >
            <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {t("viewSite")}
            </Link>
            </Button>
    
            {/* md: icon only */}
            <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="lg:hidden h-9 w-9 bg-foreground text-background hover:bg-foreground/90"
                    asChild
                >
                    <Link href="/" target="_blank" rel="noopener noreferrer" aria-label={t("viewSite")}>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>{t("viewSite")}</p></TooltipContent>
            </Tooltip>
            </TooltipProvider>
        </div>
        </aside>
    );
}

export function MobileSidebarTrigger() {
    const t = useTranslations("admin");
    
    return (
        <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
            </Button>
        </SheetTrigger>
    
        <SheetContent side="left" className="w-55 p-0 flex flex-col">
            <SheetHeader className="px-5 py-4 border-b">
            <SheetTitle className="flex items-center gap-3">
                <BrandLogo />
                <div className="text-left">
                <p className="text-md text-foreground font-semibold leading-tight">Skin4All</p>
                </div>
            </SheetTitle>
            </SheetHeader>
    
            {/* Pass SheetClose trigger via onNavigate to auto-close on link click */}
            <NavFull />
    
            <Separator />
    
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
        </SheetContent>
        </Sheet>
    );
}

export function AdminSidebar() {
    return <DesktopSidebar />;
}