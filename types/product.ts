export enum Category {
    HIDRATACION = "hidratacion",
    LIMPIEZA = "limpieza",
    EXFOLIACION = "exfoliacion",
    ANTI_EDAD = "anti-edad",
    REPARACION = "reparacion",
    ANTIOXIDANTE = "antioxidante"
}

export enum SkinType {
    NORMAL = "normal",
    SECA = "seca",
    GRASA = "grasa",
    MIXTA = "mixta",
    SENSIBLE = "sensible",
    ACNEICA = "acneica",
    IRRITADA = "irritada",
    OPACA = "opaca",
    TEXTURIZADA = "texturizada"
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    skint_type: SkinType[];
    product_type: string;
    category: Category[];
    ingredients: string[];
    image_url: string[];
    rating?: number;
    review_count?: number;
}