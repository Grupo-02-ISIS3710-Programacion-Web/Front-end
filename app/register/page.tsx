"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { tiposPiel } from "@/lib/constants/TipoPiel";
import { formasEnteroDeNosotros } from "@/lib/constants/FormasDeContacto";
export type FormularioRegistro = {
    nombre: string;
    fechaNacimiento: string;
    tipoPiel: string;
    probadoSkinCare: boolean;
    comoEnteroDeNosotros: string;
    email: string;
    contrasenia: string;
    confirmarContrasenia: string;
}

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

export function FormularioRegistroComponent() {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormularioRegistro>({
        defaultValues: {
            nombre: "",
            fechaNacimiento: "",
            tipoPiel: "",
            probadoSkinCare: false,
            comoEnteroDeNosotros: "",
            email: "",
            contrasenia: "",
            confirmarContrasenia: "",
        }
    });

    const onSubmit: SubmitHandler<FormularioRegistro> = data => console.log(data);
    const contraseniaActual = watch("contrasenia");
    const contraseniaConfirmacion = watch("confirmarContrasenia");

    const selectClasses =
        "border-secondary bg-transparent h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";
    const inputPrimaryClasses =
        "border-secondary/60 focus-visible:border-primary focus-visible:ring-primary/40";
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <p className="text-sm font-medium">Nombre</p>
                <Input type="text" className={inputPrimaryClasses} placeholder="Pepito" {...register("nombre")} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <p className="text-sm font-medium">Fecha de nacimiento</p>
                    <Input type="date" className={inputPrimaryClasses} {...register("fechaNacimiento")} />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium">Tipo de piel</p>
                    <select className={selectClasses} {...register("tipoPiel")}>
                        <option value="">Selecciona tu tipo de piel</option>
                        {tiposPiel.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">¿Alguna vez has probado productos de skincare?</p>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        className="border-secondary"
                        variant={watch("probadoSkinCare") ? "default" : "outline"}
                        onClick={() => setValue("probadoSkinCare", true, { shouldDirty: true })}
                    >
                        Sí
                    </Button>
                    <Button
                        type="button"
                        className="border-secondary"
                        variant={!watch("probadoSkinCare") ? "default" : "outline"}
                        onClick={() => setValue("probadoSkinCare", false, { shouldDirty: true })}
                    >
                        No
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">¿Cómo te enteraste de nosotros?</p>
                <select className={selectClasses} {...register("comoEnteroDeNosotros")}>
                    <option value="">Selecciona una opción</option>
                    {formasEnteroDeNosotros.map((forma) => (
                        <option key={forma.value} value={forma.value}>{forma.label}</option>
                    ))}
                </select>
            </div>
            <hr className="border-primary" />
            <div className="space-y-2">
                <p className="text-sm font-medium">Email</p>
                <Input type="email" placeholder="pepito@ejemplo.com" className={inputPrimaryClasses} {...register("email")} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Contraseña</p>
                <Input type="password" className={inputPrimaryClasses} placeholder="********" {...register("contrasenia")} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">Confirmar contraseña</p>
                <Input type="password" placeholder="********" className={inputPrimaryClasses} {...register("confirmarContrasenia", { required: true, validate: (value) => value === watch("contrasenia") || "Las contraseñas no coinciden" })} />
                {errors.confirmarContrasenia && (
                    <span className="text-red-500">{errors.confirmarContrasenia.message}</span>
                )}
                <p className="text-gray-600 text-sm">La contraseña debe tener al menos 8 caracteres. Al crear una cuenta aceptas nuestros <Link href="/terminos-y-condiciones" className="text-pink-500">Términos y condiciones</Link></p>
            </div>

            <Button type="submit" className="w-full">
                Crear cuenta
            </Button>
            <p className="text-center text-sm">¿Ya tienes una cuenta? <Link href="/login" className="text-pink-500">Inicia sesión aquí</Link></p>
        </form>
    )
}