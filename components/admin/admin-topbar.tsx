"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell, Search } from "lucide-react";
import { MobileSidebarTrigger } from "./admin-sidebar";

interface AdminUser {
  name: string;
  initials: string;
  role: string;
  avatar?: string;
}

interface AdminTopbarProps {
  user?: AdminUser;
  notificationCount?: number;
}


export function AdminTopbar({
    user = { name: "Alex Rivera", initials: "AR", role: "Super Admin" },
    notificationCount = 3,
    }: AdminTopbarProps) {
    const t = useTranslations("admin");

    return (
        <header className="h-14 shrink-0 bg-background border-b flex items-center gap-4 px-6">

            <MobileSidebarTrigger />

        {/* ── Search ── */}
        <div className="relative flex-1 max-w-md">
            <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
            />
            <Input
            type="search"
            placeholder={t("search.placeholder")}
            className="pl-9 h-9 bg-muted border-0 focus-visible:ring-1"
            aria-label={t("search.placeholder")}
            />
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-2 ml-auto">

            {/* Notifications */}
            <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            aria-label={t("notifications.label")}
            >
            <Bell className="h-4 w-4" aria-hidden="true" />
            {notificationCount > 0 && (
                <span
                className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"
                aria-label={t("notifications.unread", { count: notificationCount })}
                />
            )}
            </Button>

            {/* User dropdown */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className="flex items-center gap-2.5 hover:bg-muted rounded-lg px-2 py-1.5 transition-colors"
                aria-label={t("user.menuLabel")}
                >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium leading-tight">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight uppercase tracking-wider">
                    {user.role}
                    </p>
                </div>
                <Avatar className="h-8 w-8">
                    {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                    <AvatarFallback className="bg-primary text-white text-xs font-medium">
                    {user.initials}
                    </AvatarFallback>
                </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem>{t("user.profile")}</DropdownMenuItem>
                <DropdownMenuItem>{t("nav.settings")}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                {t("user.logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </header>
    );
}