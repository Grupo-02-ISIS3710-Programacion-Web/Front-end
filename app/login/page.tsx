"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Login(){

}


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

