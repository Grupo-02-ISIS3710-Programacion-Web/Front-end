import Image from "next/image";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const exploreLinks = [
    { href: "/descubrir", key: "bestSellers" },
    { href: "/descubrir", key: "ingredientLab" },
    { href: "/community", key: "forums" },
] as const;

const communityLinks = [
    { href: "/ToS", key: "communityRules" },
    { href: "/community", key: "hallOfFame" },
    { href: "/community", key: "verifiedExperts" },
] as const;

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="border-t border-border bg-muted/35">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <section>
                        <Link href="/" className="inline-flex items-center gap-2 text-foreground">
                            <Image src="/skin4all_logo.svg" alt="Skin4All logo" width={20} height={20} />
                            <span className="text-2xl font-bold tracking-tight">{t("brand")}</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-base text-muted-foreground">{t("description")}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-foreground">{t("exploreTitle")}</h3>
                        <nav className="mt-4 flex flex-col gap-2.5" aria-label={t("exploreTitle")}>
                            {exploreLinks.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className="w-fit text-base text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {t(`explore.${item.key}`)}
                                </Link>
                            ))}
                        </nav>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-foreground">{t("communityTitle")}</h3>
                        <nav className="mt-4 flex flex-col gap-2.5" aria-label={t("communityTitle")}>
                            {communityLinks.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className="w-fit text-base text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {t(`community.${item.key}`)}
                                </Link>
                            ))}
                        </nav>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-foreground">{t("newsletterTitle")}</h3>
                        <form className="mt-4 flex items-center gap-2">
                            <Input
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                aria-label={t("emailPlaceholder")}
                                className="h-11 rounded-xl bg-muted"
                            />
                            <Button type="submit" size="icon" className="h-11 w-11 rounded-xl" aria-label={t("send")}>
                                <Send size={18} />
                            </Button>
                        </form>
                    </section>
                </div>

                <div className="mt-10 border-t border-border pt-6 text-center">
                    <p className="text-base text-primary">{t("copyright")}</p>
                </div>
            </div>
        </footer>
    );
}