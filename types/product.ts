import type { Comment } from "@/types/Comment";

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
    CREAM = "cream",
    CLEANSER = "cleanser",
    EYE_CREAM = "eye_cream",
    MASK = "mask",
    OIL = "oil",
    SERUM = "serum",
    ESSENCE = "essence",
    EXFOLIANT = "exfoliant",
    SUNSCREEN = "sunscreen",
    TONER = "toner",
    GEL = "gel",
    BALM = "balm",
    TREATMENT = "treatment",
    MAKEUP_REMOVER = "makeup_remover",
    MAKEUP = "makeup"
}

export enum ApprovalStatus {
  PENDING   = "pending",    // recién enviado, sin revisar
  APPROVED  = "approved",   // aprobado por admin, aún no publicado
  PUBLISHED = "published",  // visible en la plataforma
  REJECTED  = "rejected",   // rechazado por admin
  INACTIVE  = "inactive",   // eliminación lógica — no visible públicamente
}

export interface AuditInfo {
  action_by: string;       // ID o username del admin
  action_at: string;       // ISO date string
  reason?: string;         // motivo de rechazo (solo para REJECTED)
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
    comments?: Comment[];
}

//Productos propuestos por los usuarios, que aún no han sido validados por el equipo de administración
export interface ProposedProduct {
    id: string;
    name: string;
    brand: string;
    description: string;
    skin_type: SkinType[];
    product_type: ProductType;
    primary_category: Category;
    additional_categories?: Category[];
    ingredients: string[];
    image_url: string[];
    submitted_by?: string; // usuario que lo propuso
    submitted_at?: string;
    status: ApprovalStatus;
    audit?: AuditInfo;
}

export interface ModerationItem {
    id: string;
    user: string;
    userInitials: string;
    userAvatar?: string;
    action: string;
    excerpt: string;
    timeAgo: string;
    type: "report" | "flag" | "spam";
}

export interface ProductStats {
    total: number;
    pending: number;
    approved: number;
    published: number;
}