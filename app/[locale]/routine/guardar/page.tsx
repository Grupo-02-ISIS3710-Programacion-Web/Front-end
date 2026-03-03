"use client";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
export default function CrearRutina(
    productosAgregar: Product[]
) {
    const { watch, register, handleSubmit } = useForm()
    return (
        <div>
            <form action="" onSubmit={handleSubmit(() => console.log("Form entregado"))}>
                <Input {...register("name")} placeholder="Nombre de la rutina" />
                <Button type="submit">Crear Rutina</Button>
            </form>
        </div>
    )
}