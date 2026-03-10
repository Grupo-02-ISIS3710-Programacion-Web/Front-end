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

export enum ProductType {
    CLEANSER = "cleanser",
    MOISTURIZER = "moisturizer",
    SERUM = "serum",
    ESSENCE = "essence",
    EXFOLIANT = "exfoliant",
    SUNSCREEN = "sunscreen",
    TONER = "toner",
    EXFOLIATING_CLEANSER = "exfoliating_cleanser",
    EXFOLIATING_TONER = "exfoliating_toner",
    EYE_CREAM = "eye_cream",
    MASK = "mask",
    OIL = "oil",
    ANTI_AGING_SERUM = "anti_aging_serum",
    HYDRATING_SERUM = "hydrating_serum",
    HYDRATING_GEL = "hydrating_gel",
    REPAIR_BALM = "repair_balm",
    ANTIOXIDANT_SERUM = "antioxidant_serum",
    RETINOL_SERUM = "retinol_serum",
    FACIAL_CLEANSER = "facial_cleanser",
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    skin_type: SkinType[];
    product_type: ProductType;
    category: Category[];
    ingredients: string[];
    rating: number;
    review_count: number;
    image_url: string[];
}

//Productos propuestos por los usuarios, que aún no han sido validados por el equipo de administración
export interface ProposedProduct {
    name: string
    brand: string
    skin_type: SkinType[]
    product_type: string
    primary_category: Category
    additional_categories?: Category[]
    ingredients: string[]
    image_url: string[]
}