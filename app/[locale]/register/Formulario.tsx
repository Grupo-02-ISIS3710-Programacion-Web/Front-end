"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useTranslations } from "next-intl";
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

export function FormularioRegistroComponent() {
    const t = useTranslations("registro");
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
    const haProbadoSkinCare = watch("probadoSkinCare");

    const selectClasses =
        "border-secondary bg-transparent h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";
    const inputPrimaryClasses =
        "border-secondary/60 focus-visible:border-primary focus-visible:ring-primary/40";
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <p className="text-sm font-medium">{t("campos.nombre.label")}</p>
                <Input type="text" className={inputPrimaryClasses} placeholder={t("campos.nombre.placeholder")} {...register("nombre")} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <p className="text-sm font-medium">{t("campos.fechaNacimiento.label")}</p>
                    <Input type="date" className={inputPrimaryClasses} {...register("fechaNacimiento")} />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium">{t("campos.tipoPiel.label")}</p>
                    <select className={selectClasses} {...register("tipoPiel")}>
                        <option value="">{t("campos.tipoPiel.placeholder")}</option>
                        {tiposPiel.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>{t(`campos.tipoPiel.opciones.${tipo.value}`)}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">{t("campos.probadoSkinCare.label")}</p>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        type="button"
                        className="border-secondary"
                        variant={haProbadoSkinCare ? "default" : "outline"}
                        onClick={() => setValue("probadoSkinCare", true, { shouldDirty: true })}
                    >
                        {t("campos.probadoSkinCare.si")}
                    </Button>
                    <Button
                        type="button"
                        className="border-secondary"
                        variant={haProbadoSkinCare ? "outline" : "default"}
                        onClick={() => setValue("probadoSkinCare", false, { shouldDirty: true })}
                    >
                        {t("campos.probadoSkinCare.no")}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">{t("campos.comoEnteroDeNosotros.label")}</p>
                <select className={selectClasses} {...register("comoEnteroDeNosotros")}>
                    <option value="">{t("campos.comoEnteroDeNosotros.placeholder")}</option>
                    {formasEnteroDeNosotros.map((forma) => (
                        <option key={forma.value} value={forma.value}>{t(`campos.comoEnteroDeNosotros.opciones.${forma.value}`)}</option>
                    ))}
                </select>
            </div>
            <hr className="border-primary" />
            <div className="space-y-2">
                <p className="text-sm font-medium">{t("campos.email.label")}</p>
                <Input type="email" placeholder={t("campos.email.placeholder")} className={inputPrimaryClasses} {...register("email")} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">{t("campos.contrasenia.label")}</p>
                <Input type="password" className={inputPrimaryClasses} placeholder={t("campos.contrasenia.placeholder")} {...register("contrasenia")} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium">{t("campos.confirmarContrasenia.label")}</p>
                <Input type="password" placeholder={t("campos.confirmarContrasenia.placeholder")} className={inputPrimaryClasses} {...register("confirmarContrasenia", { required: true, validate: (value) => value === watch("contrasenia") || t("validaciones.contraseniasNoCoinciden") })} />
                {errors.confirmarContrasenia && (
                    <span className="text-red-500">{errors.confirmarContrasenia.message}</span>
                )}
                <p className="text-gray-600 text-sm">
                    {t("legal.texto")} <Link href="/es/terminos-y-condiciones" className="text-pink-500">{t("legal.terminos")}</Link>
                </p>
            </div>

            <Button type="submit" className="w-full">
                {t("botones.crearCuenta")}
            </Button>
            <p className="text-center text-sm">{t("footer.yaTienesCuenta")} <Link href="/es/login" className="text-pink-500">{t("botones.iniciarSesion")}</Link></p>
        </form>
    )
}