"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FormularioRegistroComponent } from "./Formulario";

export default function Registro() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10" style={{ backgroundImage: `url(/background-reg.png)`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <Card className="w-full max-w-xl border-primary/60">
                <CardHeader>
                    <CardTitle className="text-2xl">Empieza una nueva rutina ahora</CardTitle>
                    <CardDescription>Añádele brillo a tu piel</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormularioRegistroComponent />
                </CardContent>
            </Card>
        </div >
    )
}
