import GridProductos from "./GridProductos";
import { useTranslations } from "next-intl";

export default function CrearRutina() {
    const t = useTranslations("CrearRutina");
    return (
        <div className="w-full px-4 md:px-6">
            <header className="mb-6 md:mb-8 text-center">
                <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {t("title")}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    {t("description")}
                </p>
            </header>
            <GridProductos />
        </div>
    );
}