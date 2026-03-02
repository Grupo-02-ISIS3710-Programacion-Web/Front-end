import GridProductos from "./GridProductos";


export default function CrearRutina() {

    return (
        <div className="w-full px-4 md:px-6">
            <header className="mb-6 md:mb-8 text-center">
                <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Crea Tu Rutina Ideal
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    Explora productos, filtra por categoría y guarda una rutina personalizada para tu piel.
                </p>
            </header>
            <GridProductos />
        </div>
    );
}