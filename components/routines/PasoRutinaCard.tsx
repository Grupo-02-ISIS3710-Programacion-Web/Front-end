import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CardProducto from "@/components/routines/CardProducto";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

type PasoRutinaFormShape = {
    name: string;
    objective: string;
    pasos: {
        name: string;
        description: string;
        product: Product;
    }[];
};

type PasoRutinaCardProps = Readonly<{
    index: number;
    totalSteps: number;
    product: Product;
    register: UseFormRegister<PasoRutinaFormShape>;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onRemove: () => void;
}>;

export default function PasoRutinaCard({
    index,
    totalSteps,
    product,
    register,
    onMoveUp,
    onMoveDown,
    onRemove
}: PasoRutinaCardProps) {
    return (
        <Card className="gap-3">
            <CardContent className="space-y-3 pt-6">
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg md:text-xl">Paso {index + 1}</CardTitle>

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
                    <p className="text-sm font-medium text-muted-foreground">Nombre del paso</p>
                    <Input {...register(`pasos.${index}.name`)} placeholder="Nombre del paso" />
                </div>

                <CardProducto product={product} showButton={false} compact />

                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Descripción del paso</p>
                    <Textarea {...register(`pasos.${index}.description`)} placeholder="Descripción del paso" />
                </div>
            </CardContent>
        </Card>
    );
}
