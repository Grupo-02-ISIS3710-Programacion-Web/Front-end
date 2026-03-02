"use client";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    const params = useParams();
    console.log(params.slug); // Aquí puedes usar el slug para cargar los detalles del producto correspondiente

    return (
        <div>
        <h1>Hello Page</h1>
        </div>
    );
}