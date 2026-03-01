// Aquí debería ir la lógica de las llamadas a la API, pero como no tenemos una API real, esta parte se ha dejado con datos dummy

// data/products.ts

import { Product, Category, SkinType } from "@/types/product";

export const products: Product[] = [
    {
        id: "1",
        name: "Toleriane Double Repair Face Moisturizer",
        brand: "La Roche-Posay",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.SENSIBLE],
        product_type: "crema hidratante",
        category: [Category.HIDRATACION],
        ingredients: ["ceramida-3", "niacinamida", "glicerina", "agua termal"],
        image_url: ["https://images-na.ssl-images-amazon.com/images/I/41oMKHKCJCL._UL500_.jpg"],
        rating: 4.7,
        review_count: 12453
    },
    {
        id: "2",
        name: "SA Smoothing Cleanser",
        brand: "CeraVe",
        skin_type: [SkinType.GRASA, SkinType.MIXTA, SkinType.TEXTURIZADA],
        product_type: "limpiador exfoliante",
        category: [Category.LIMPIEZA],
        ingredients: ["ácido salicílico", "ceramidas", "niacinamida", "ácido hialurónico"],
        image_url: ["https://www.lookfantastic.es/images?url=https://static.thcdn.com/productimg/original/12207663-1995074481347395.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover"],
        rating: 4.6,
        review_count: 9821
    },
    {
        id: "3",
        name: "Glycolic Acid 7% Toning Solution",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.GRASA],
        product_type: "tónico exfoliante",
        category: [Category.EXFOLIACION],
        ingredients: ["ácido glicólico", "aloe vera", "ginseng", "tasmanian pepperberry"],
        image_url: ["https://bebeautycol.com/cdn/shop/products/2FD69212-7EA4-4947-9824-9199F91146AE_1200x1200.jpg?v=1704781572"],
        rating: 4.5,
        review_count: 15890
    },
    {
        id: "4",
        name: "Advanced Génifique Serum",
        brand: "Lancôme",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.GRASA, SkinType.MIXTA],
        product_type: "suero antiedad",
        category: [Category.ANTI_EDAD],
        ingredients: ["ácido hialurónico", "bifidus extract", "vitamina C", "glicerina"],
        image_url: ["https://static.sweetcare.com/img/prd/488/v-638200523158559322/lancome-003003lc-4.webp"],
        rating: 4.8,
        review_count: 7342
    },
    {
        id: "5",
        name: "Hydro Boost Water Gel",
        brand: "Neutrogena",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.GRASA],
        product_type: "gel hidratante",
        category: [Category.HIDRATACION],
        ingredients: ["ácido hialurónico", "glicerina", "dimeticona", "olivato de sorbitán"],
        image_url: ["https://habibdroguerias.vtexassets.com/arquivos/ids/157438-800-auto?v=638459643757500000&width=800&height=auto&aspect=true"],
        rating: 4.6,
        review_count: 21456
    },
    {
        id: "6",
        name: "Cicaplast Baume B5",
        brand: "La Roche-Posay",
        skin_type: [SkinType.SENSIBLE, SkinType.IRRITADA, SkinType.SECA],
        product_type: "bálsamo reparador",
        category: [Category.REPARACION],
        ingredients: ["pantenol", "madecassoside", "manteca de karité", "zinc"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8OStExzMvoqxBSu1C-SznSXOSHd3jPd_l0Q&s"],
        rating: 4.9,
        review_count: 18765
    },
    {
        id: "7",
        name: "Green Tea Seed Serum",
        brand: "Innisfree",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA],
        product_type: "suero hidratante",
        category: [Category.HIDRATACION],
        ingredients: ["extracto de té verde", "niacinamida", "betaína", "glicerina"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrtZH8yRL54cwMzg3V5-Wa3-m-ffkjuCDnw&s"],
        rating: 4.5,
        review_count: 6432
    },
    {
        id: "8",
        name: "Vitamin C Suspension 23% + HA Spheres 2%",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.OPACA],
        product_type: "suero antioxidante",
        category: [Category.ANTIOXIDANTE],
        ingredients: ["ácido ascórbico", "ácido hialurónico", "escualano", "tocoferol"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWwYICcN2Ltwv4ucjZbmwUY81SuYRcrHLKg&s"],
        rating: 4.4,
        review_count: 11234
    },
    {
        id: "9",
        name: "Retinol 0.3% in Squalane",
        brand: "The Ordinary",
        skin_type: [SkinType.NORMAL, SkinType.MIXTA, SkinType.GRASA],
        product_type: "suero con retinol",
        category: [Category.ANTI_EDAD],
        ingredients: ["retinol", "escualano", "jojoba oil", "tomato extract"],
        image_url: ["https://cosmetis.com/media/catalog/product/c/t/ct204001-theordinary_retinol_2_squalene_serum_30ml.jpg"],
        rating: 4.6,
        review_count: 16789
    },
    {
        id: "10",
        name: "Ultra Facial Cream",
        brand: "Kiehl's",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA, SkinType.GRASA, SkinType.SENSIBLE],
        product_type: "crema hidratante",
        category: [Category.HIDRATACION],
        ingredients: ["escualano", "glicerina", "glacial glycoprotein", "urea"],
        image_url: ["https://http2.mlstatic.com/D_NQ_NP_704291-MLU54983799272_042023-O.webp"],
        rating: 4.8,
        review_count: 9543
    },
    {
        id: "11",
        name: "Effaclar Gel Limpiador Purificante",
        brand: "La Roche-Posay",
        skin_type: [SkinType.GRASA, SkinType.MIXTA, SkinType.ACNEICA],
        product_type: "limpiador facial",
        category: [Category.LIMPIEZA],
        ingredients: ["agua termal", "zinc PCA", "coco-betaína", "glicerina"],
        image_url: ["https://pielfarmaceutica.com/cdn/shop/files/effaclar_gel_x_400ml.png?v=1723645399"],
        rating: 4.7,
        review_count: 13221
    },
    {
        id: "12",
        name: "Hydrating Facial Cleanser",
        brand: "CeraVe",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.SENSIBLE],
        product_type: "limpiador facial",
        category: [Category.LIMPIEZA],
        ingredients: ["ceramidas", "ácido hialurónico", "glicerina", "colesterol"],
        image_url: ["https://cocorosey.net/cdn/shop/products/16_1800x.jpg?v=1653346366"],
        rating: 4.8,
        review_count: 20567
    },
    {
        id: "13",
        name: "Niacinamide 10% + Zinc 1%",
        brand: "The Ordinary",
        skin_type: [SkinType.GRASA, SkinType.MIXTA, SkinType.ACNEICA],
        product_type: "serum",
        category: [Category.ANTIOXIDANTE],
        ingredients: ["niacinamida", "zinc PCA", "tamarindus indica seed gum", "pentylene glycol"],
        image_url: ["https://bebeautycol.com/cdn/shop/products/image_33008b22-795b-41a9-bc5f-cbcc31a1f602_1024x1024.jpg?v=1704781533"],
        rating: 4.5,
        review_count: 18934
    },
    {
        id: "14",
        name: "Advanced Snail 96 Mucin Power Essence",
        brand: "COSRX",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA],
        product_type: "esencia",
        category: [Category.REPARACION],
        ingredients: ["mucina de caracol", "betaína", "butylene glycol", "arginina"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6AiLsjODpxkoXlXoXDN6bDwNvAD4B_zV8Mw&s"],
        rating: 4.7,
        review_count: 8765
    },
    {
        id: "15",
        name: "Mineral 89",
        brand: "Vichy",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.MIXTA, SkinType.GRASA, SkinType.SENSIBLE],
        product_type: "suero hidratante",
        category: [Category.HIDRATACION],
        ingredients: ["agua volcánica de Vichy", "ácido hialurónico", "glicerina", "carbómero"],
        image_url: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiQUy4b0kJxqUJApxBbU1EtEaOyt8HgnI-Qw&s"],
        rating: 4.9,
        review_count: 14234
    }
];