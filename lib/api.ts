// Aquí debería ir la lógica de las llamadas a la API, pero como no tenemos una API real, esta parte se ha dejado con datos dummy

// data/products.ts

import { Product, Category, SkinType, ProductType, ProposedProduct, ApprovalStatus } from "@/types/product";
import { toLowerCaseAndReplaceHyphensWithSpaces } from "./string-utils";

const products: Product[] = [
    {
        id: "1",
        name: "Toleriane Double Repair Face Moisturizer",
        brand: "La Roche-Posay",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.SENSIBLE],
        product_type: ProductType.CREAM,
        category: [Category.HIDRATACION],
        ingredients: ["ceramida-3","niacinamida","glicerina","agua termal"],
        image_url: ["https://images-na.ssl-images-amazon.com/images/I/41oMKHKCJCL._UL500_.jpg"],
        description: "Crema hidratante ligera que fortalece la barrera cutánea y proporciona hidratación hasta por 48 horas.",
        rating: 4.7,
        review_count: 12453
    },

    {
        id: "2",
        name: "SA Smoothing Cleanser",
        brand: "CeraVe",
        skin_type: [SkinType.GRASA, SkinType.MIXTA, SkinType.TEXTURIZADA],
        product_type: ProductType.CLEANSER,
        category: [Category.LIMPIEZA],
        ingredients: ["ácido salicílico","ceramidas","niacinamida","ácido hialurónico"],
        image_url: ["https://www.lookfantastic.es/images?url=https://static.thcdn.com/productimg/original/12207663-1995074481347395.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover"],
        description: "Limpiador exfoliante con ácido salicílico que ayuda a suavizar la textura de la piel.",
        rating: 4.6,
        review_count: 9821
    },

        {
        id: "3",
        name: "Glycolic Acid 7% Toning Solution",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.GRASA],
        product_type: ProductType.TONER,
        category: [Category.EXFOLIACION],
        ingredients: ["ácido glicólico","aloe vera","ginseng","tasmanian pepperberry"],
        image_url: ["https://bebeautycol.com/cdn/shop/products/2FD69212-7EA4-4947-9824-9199F91146AE_1200x1200.jpg?v=1704781572"],
        description: "Tónico exfoliante con 7% de ácido glicólico que mejora la luminosidad.",
        rating: 4.5,
        review_count: 15890
    },

    {
        id: "4",
        name: "Advanced Génifique Serum",
        brand: "Lancôme",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.GRASA, SkinType.MIXTA],
        product_type: ProductType.SERUM,
        category: [Category.ANTI_EDAD],
        ingredients: ["ácido hialurónico","bifidus extract","vitamina C","glicerina"],
        image_url: ["https://static.sweetcare.com/img/prd/488/v-638200523158559322/lancome-003003lc-4.webp"],
        description: "Suero antiedad avanzado que mejora visiblemente la luminosidad.",
        rating: 4.8,
        review_count: 7342
    },

        {
        id: "5",
        name: "Hydro Boost Water Gel",
        brand: "Neutrogena",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.GRASA],
        product_type: ProductType.GEL,
        category: [Category.HIDRATACION],
        ingredients: ["ácido hialurónico","glicerina","dimeticona","olivato de sorbitán"],
        image_url: ["https://habibdroguerias.vtexassets.com/arquivos/ids/157438-800-auto?v=638459643757500000"],
        description: "Gel hidratante ligero con ácido hialurónico.",
        rating: 4.6,
        review_count: 21456
    },

    {
        id: "6",
        name: "Cicaplast Baume B5",
        brand: "La Roche-Posay",
        skin_type: [SkinType.SENSIBLE, SkinType.IRRITADA, SkinType.SECA],
        product_type: ProductType.BALM,
        category: [Category.REPARACION],
        ingredients: ["pantenol","madecassoside","manteca de karité","zinc"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8OStExzMvoqxBSu1C-SznSXOSHd3jPd_l0Q&s"],
        description: "Bálsamo reparador multiuso que calma y protege la piel.",
        rating: 4.9,
        review_count: 18765
    },

    {
        id: "7",
        name: "Green Tea Seed Serum",
        brand: "Innisfree",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA],
        product_type: ProductType.SERUM,
        category: [Category.HIDRATACION],
        ingredients: ["extracto de té verde","niacinamida","betaína","glicerina"],
        image_url: ["https://i0.wp.com/rosavainilla.co/wp-content/uploads/2020/08/gtss_new.webp"],
        description: "Suero hidratante con extracto de té verde.",
        rating: 4.5,
        review_count: 6432
    },

    {
        id: "8",
        name: "Vitamin C Suspension 23% + HA Spheres 2%",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.OPACA],
        product_type: ProductType.SERUM,
        category: [Category.ANTIOXIDANTE],
        ingredients: ["ácido ascórbico","ácido hialurónico","escualano","tocoferol"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWwYICcN2Ltwv4ucjZbmwUY81SuYRcrHLKg&s"],
        description: "Suero antioxidante con 23% de vitamina C pura.",
        rating: 4.4,
        review_count: 11234
    },

    {
        id: "9",
        name: "Retinol 0.3% in Squalane",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.GRASA],
        product_type: ProductType.SERUM,
        category: [Category.ANTI_EDAD],
        ingredients: ["retinol","escualano","jojoba oil","tomato extract"],
        image_url: ["https://cosmetis.com/media/catalog/product/c/t/ct204001-theordinary_retinol_2_squalene_serum_30ml.jpg"],
        description: "Suero con retinol al 0.3%.",
        rating: 4.6,
        review_count: 16789
    },

    {
        id: "10",
        name: "Ultra Facial Cream",
        brand: "Kiehl's",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA, SkinType.GRASA, SkinType.SENSIBLE],
        product_type: ProductType.CREAM,
        category: [Category.HIDRATACION],
        ingredients: ["escualano","glicerina","glacial glycoprotein","urea"],
        image_url: ["https://http2.mlstatic.com/D_NQ_NP_704291-MLU54983799272_042023-O.webp"],
        description: "Crema hidratante facial de uso diario.",
        rating: 4.8,
        review_count: 9543
    },

    {
        id: "11",
        name: "Effaclar Gel Limpiador Purificante",
        brand: "La Roche-Posay",
        skin_type: [SkinType.GRASA, SkinType.MIXTA, SkinType.ACNEICA],
        product_type: ProductType.CLEANSER,
        category: [Category.LIMPIEZA],
        ingredients: ["agua termal","zinc PCA","coco-betaína","glicerina"],
        image_url: ["https://pielfarmaceutica.com/cdn/shop/files/effaclar_gel_x_400ml.png?v=1723645399"],
        description: "Gel limpiador purificante.",
        rating: 4.7,
        review_count: 13221
    },

    {
        id: "12",
        name: "Hydrating Facial Cleanser",
        brand: "CeraVe",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.SENSIBLE],
        product_type: ProductType.CLEANSER,
        category: [Category.LIMPIEZA],
        ingredients: ["ceramidas","ácido hialurónico","glicerina","colesterol"],
        image_url: ["https://cocorosey.net/cdn/shop/products/16_1800x.jpg?v=1653346366"],
        description: "Limpiador facial suave.",
        rating: 4.8,
        review_count: 20567
    },

    {
        id: "13",
        name: "Niacinamide 10% + Zinc 1%",
        brand: "The Ordinary",
        skin_type: [SkinType.GRASA, SkinType.MIXTA, SkinType.ACNEICA],
        product_type: ProductType.SERUM,
        category: [Category.ANTIOXIDANTE],
        ingredients: ["niacinamida","zinc PCA","tamarindus indica seed gum"],
        image_url: ["https://bebeautycol.com/cdn/shop/products/image_33008b22-795b-41a9-bc5f-cbcc31a1f602_1024x1024.jpg?v=1704781533"],
        description: "Serum con niacinamida.",
        rating: 4.5,
        review_count: 18934
    },

    {
        id: "14",
        name: "Advanced Snail 96 Mucin Power Essence",
        brand: "COSRX",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA],
        product_type: ProductType.ESSENCE,
        category: [Category.REPARACION],
        ingredients: ["mucina de caracol","betaína","butylene glycol","arginina"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6AiLsjODpxkoXlXoXDN6bDwNvAD4B_zV8Mw&s"],
        description: "Esencia reparadora con mucina de caracol.",
        rating: 4.7,
        review_count: 8765
    },

    {
        id: "15",
        name: "Mineral 89",
        brand: "Vichy",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA, SkinType.GRASA, SkinType.SENSIBLE],
        product_type: ProductType.SERUM,
        category: [Category.HIDRATACION],
        ingredients: ["agua volcánica de Vichy","ácido hialurónico","glicerina"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQUy4b0kJxqUJApxBbU1EtEaOyt8HgnI-Qw&s"],
        description: "Suero hidratante que fortalece la barrera cutánea.",
        rating: 4.9,
        review_count: 14234
    }
];

const proposedProducts: ProposedProduct[] = [
    {
        id: "p1",
        name: "Citrus Cleansing Oil",
        brand: "Heimish",
        skin_type: [SkinType.MIXTA, SkinType.GRASA],
        product_type: ProductType.OIL,
        primary_category: Category.LIMPIEZA,
        ingredients: ["Citrus Oil", "Sunflower Oil", "Vitamin E"],
        image_url: [],
        submitted_by: "maria_g",
        submitted_at: "2024-03-10T14:23:00Z",
        status: ApprovalStatus.PENDING,
    },
    {
        id: "p2",
        name: "Centella Calm Toner",
        brand: "Some By Mi",
        skin_type: [SkinType.SENSIBLE, SkinType.IRRITADA],
        product_type: ProductType.TONER,
        primary_category: Category.REPARACION,
        additional_categories: [Category.HIDRATACION],
        ingredients: ["Centella Asiatica", "Niacinamide", "Aqua"],
        image_url: [],
        submitted_by: "skinlover_92",
        submitted_at: "2024-03-11T09:10:00Z",
        status: ApprovalStatus.PENDING,
    },
    {
        id: "p3",
        name: "Vitamin C Glow Serum",
        brand: "Skinceuticals",
        skin_type: [SkinType.OPACA, SkinType.NORMAL],
        product_type: ProductType.SERUM,
        primary_category: Category.ANTIOXIDANTE,
        ingredients: ["Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
        image_url: [],
        submitted_by: "glowup_jess",
        submitted_at: "2024-03-12T17:45:00Z",
        status: ApprovalStatus.APPROVED,
    },
    {
        id: "p4",
        name: "Hydro Boost Gel",
        brand: "Neutrogena",
        skin_type: [SkinType.SECA, SkinType.MIXTA],
        product_type: ProductType.GEL,
        primary_category: Category.HIDRATACION,
        ingredients: ["Hyaluronic Acid", "Glycerin", "Aqua"],
        image_url: [],
        submitted_by: "hydra_fan",
        submitted_at: "2024-02-20T11:00:00Z",
        status: ApprovalStatus.PUBLISHED,
    },
    {
        id: "p5",
        name: "Retinol Serum 2%",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.GRASA],
        product_type: ProductType.SERUM,
        primary_category: Category.ANTI_EDAD,
        additional_categories: [Category.REPARACION],
        ingredients: ["Retinol", "Squalane", "Glycerin"],
        image_url: [],
        submitted_by: "skinscience",
        submitted_at: "2024-02-28T08:30:00Z",
        status: ApprovalStatus.PUBLISHED,
    },
    {
        id: "p6",
        name: "AHA 30% + BHA 2% Peeling",
        brand: "The Ordinary",
        skin_type: [SkinType.TEXTURIZADA, SkinType.ACNEICA],
        product_type: ProductType.EXFOLIANT,
        primary_category: Category.EXFOLIACION,
        ingredients: ["Glycolic Acid", "Salicylic Acid", "Aqua"],
        image_url: [],
        submitted_by: "chemist_corner",
        submitted_at: "2024-03-01T15:20:00Z",
        status: ApprovalStatus.REJECTED,
    },
];

export function getProducts(): Product[] {
    return products;
}

export function getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductByName(name: string): Product | undefined {
    return products.find(product => toLowerCaseAndReplaceHyphensWithSpaces(product.name) === toLowerCaseAndReplaceHyphensWithSpaces(name));
}

export function getProductsByCategory(category: Category | "ALL"): Product[] {
    if (category === "ALL") {
        return products;
    }
    return products.filter(product => product.category.includes(category));
}

export function getProposedProducts(): ProposedProduct[] {
    return proposedProducts;
}