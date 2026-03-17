import { Product, SkinType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CardProducto from "@/components/routines/CardProducto";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";

type PasoRutinaFormShape = {
    name: string;
    description: string;
    type: string;
    skinType: SkinType;
    steps: {
        id: string;
        name: string;
        order: number;
        product: Product;
        notes: string;
    }[];
};

type PasoRutinaCardProps = Readonly<{
    index: number;
    totalSteps: number;
    product: Product;
    stepId: string;
    register: UseFormRegister<PasoRutinaFormShape>;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onRemove: () => void;
}>;

export default function PasoRutinaCard({
    index,
    totalSteps,
    product,
    stepId,
    register,
    onMoveUp,
    onMoveDown,
    onRemove
}: PasoRutinaCardProps) {
    const t = useTranslations("GuardarRutina.steps");
    return (
        <Card className="gap-3">
            <CardContent className="space-y-3 pt-4">
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg md:text-xl">{t("stepNumber", { number: index + 1 })}</CardTitle>

                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={onMoveUp}
                            disabled={index === 0}
                            aria-label="Mover paso arriba"
                        >
                            <ArrowUp />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={onMoveDown}
                            disabled={index === totalSteps - 1}
                            aria-label="Mover paso abajo"
                        >
                            <ArrowDown />
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon-sm"
                            onClick={onRemove}
                            aria-label="Eliminar paso"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{t("nameLabel")}</p>
                    <Input {...register(`steps.${index}.name`)} placeholder={t("namePlaceholder")} />
                </div>

                <CardProducto product={product} showButton={false} compact />

                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{t("descriptionLabel")}</p>
                    <Textarea {...register(`steps.${index}.notes`)} placeholder={t("descriptionPlaceholder")} />
                </div>
            </CardContent>
        </Card>
    );
}
