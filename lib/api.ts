// Aquí debería ir la lógica de las llamadas a la API, pero como no tenemos una API real, esta parte se ha dejado con datos dummy

// data/products.ts

import { Product, Category, SkinType } from "@/types/product";
import { Routine } from "@/types/routine";
import { toLowerCaseAndReplaceHyphensWithSpaces } from "./string-utils";

const products: Product[] = [
    {
        id: "1",
        name: "Toleriane Double Repair Face Moisturizer",
        brand: "La Roche-Posay",
        skin_type: [SkinType.NORMAL, SkinType.SECA, SkinType.SENSIBLE],
        product_type: "crema hidratante",
        category: [Category.HIDRATACION],
        ingredients: ["ceramida-3", "niacinamida", "glicerina", "agua termal"],
        image_url: ["https://images-na.ssl-images-amazon.com/images/I/41oMKHKCJCL._UL500_.jpg"],
        description: "Crema hidratante ligera que fortalece la barrera cutánea y proporciona hidratación hasta por 48 horas. Formulada con ceramida-3, niacinamida y agua termal para calmar y proteger la piel sensible.",
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
        description: "Limpiador exfoliante con ácido salicílico que ayuda a suavizar la textura de la piel y destapar poros sin comprometer la barrera cutánea. Ideal para piel grasa, mixta o con textura irregular.",
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
        description: "Tónico exfoliante con 7% de ácido glicólico que mejora la luminosidad y textura de la piel. Ayuda a reducir manchas y líneas finas con uso constante.",
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
        description: "Suero antiedad avanzado que mejora visiblemente la luminosidad y firmeza de la piel. Contiene ácido hialurónico y extracto de bifidus para reforzar la barrera cutánea.",
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
        description: "Gel hidratante ligero con ácido hialurónico que aporta hidratación intensa sin sensación grasa. Perfecto para piel normal a grasa.",
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
        description: "Bálsamo reparador multiuso que calma, protege y repara la piel irritada o sensibilizada. Enriquecido con pantenol y madecassoside.",
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
        image_url: ["https://i0.wp.com/rosavainilla.co/wp-content/uploads/2020/08/gtss_new.webp?fit=800%2C800&ssl=1", "https://koreanskincare.com/cdn/shop/files/467013853_18466105798037010_9177982332670859662_n.jpg?v=1738151086", "https://nudieglow.com/cdn/shop/files/INNISFREE-Green-Tea-Seed-Hyaluronic-Serum-NEW-Nudie-Glow-Australia_1000x.jpg?v=1698228961", "https://www.koreanbeauty.es/cdn/shop/files/innisfree-Green-Tea-Seed-Hyaluronic-Serum-80ml-1.png?v=1743600651&width=1080", "https://www.beautymonster.store/cdn/shop/files/InnisfreeGreenTeaSeedSerum80ml_1.png?v=1694588390&width=1200", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJm5zqr4UzHKABU-OZX91eIn5iizJ33ubiQ&s"],
        description: "Suero hidratante con extracto de té verde que revitaliza y equilibra la piel, proporcionando hidratación profunda y efecto calmante.",
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
        description: "Suero antioxidante con 23% de vitamina C pura que mejora la luminosidad y combate los signos del envejecimiento. Contiene ácido hialurónico para mantener la hidratación.",
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
        description: "Suero con retinol al 0.3% que ayuda a reducir líneas finas, mejorar textura y unificar el tono. Ideal para introducir el retinol progresivamente.",
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
        description: "Crema hidratante facial de uso diario que proporciona hidratación prolongada y fortalece la barrera de la piel en todo tipo de piel.",
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
        description: "Gel limpiador purificante que elimina el exceso de grasa y limpia profundamente los poros sin resecar la piel.",
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
        description: "Limpiador facial suave que elimina impurezas mientras mantiene la hidratación natural de la piel gracias a sus ceramidas y ácido hialurónico.",
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
        description: "Serum con niacinamida y zinc que ayuda a regular el exceso de sebo, reducir imperfecciones y mejorar la apariencia de los poros.",
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
        description: "Esencia reparadora con 96% de mucina de caracol que mejora la elasticidad, hidrata profundamente y ayuda a reparar la piel dañada.",
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
        description: "Suero hidratante con agua volcánica y ácido hialurónico que fortalece la barrera cutánea y protege contra agresores externos.",
        rating: 4.9,
        review_count: 14234
    }
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

// ─── Routines ────────────────────────────────────────────────────────────────

const routines: Routine[] = [
    {
        id: "r1",
        name: "Rutina básica de mañana",
        description: "Rutina sencilla de 3 pasos para comenzar el día con la piel limpia e hidratada.",
        type: "am",
        skinType: SkinType.NORMAL,
        steps: [
            { id: "r1s1", name: "Limpieza suave", order: 0, product: "12", notes: "Usar con agua tibia, masajear en círculos durante 30 segundos." },
            { id: "r1s2", name: "Hidratación express", order: 1, product: "5", notes: "Aplicar una cantidad del tamaño de un guisante sobre el rostro limpio." },
            { id: "r1s3", name: "Sérum de refuerzo", order: 2, product: "15", notes: "Dar toquecitos suaves para favorecer la absorción." }
        ]
    },
    {
        id: "r2",
        name: "Rutina antiaging de noche",
        description: "Rutina nocturna enfocada en regeneración celular y reducción de líneas finas.",
        type: "pm",
        skinType: SkinType.SECA,
        steps: [
            { id: "r2s1", name: "Limpieza profunda", order: 0, product: "2", notes: "Masajear sobre piel húmeda para activar el ácido salicílico." },
            { id: "r2s2", name: "Retinol", order: 1, product: "9", notes: "Aplicar solo 2-3 noches por semana al inicio para acondicionar la piel." },
            { id: "r2s3", name: "Crema barrera", order: 2, product: "1", notes: "Cerrar la rutina con una capa generosa para hidratar durante la noche." }
        ]
    },
    {
        id: "r3",
        name: "Rutina para piel grasa AM",
        description: "Controla el exceso de sebo y mantiene los poros limpios durante el día.",
        type: "am",
        skinType: SkinType.GRASA,
        steps: [
            { id: "r3s1", name: "Limpieza purificante", order: 0, product: "11", notes: "Aclarar con agua fría para cerrar los poros." },
            { id: "r3s2", name: "Sérum regulador", order: 1, product: "13", notes: "Aplicar 3-4 gotas en toda la cara tras la limpieza." },
            { id: "r3s3", name: "Hidratación ligera", order: 2, product: "5", notes: "Una fina capa es suficiente; evitar el contorno de ojos." }
        ]
    },
    {
        id: "r4",
        name: "Rutina reparadora de noche",
        description: "Repara y calma la piel sensible o irritada mientras descansas.",
        type: "pm",
        skinType: SkinType.SENSIBLE,
        steps: [
            { id: "r4s1", name: "Limpieza delicada", order: 0, product: "12", notes: "Sin frotar; aclarar con agua tibia." },
            { id: "r4s2", name: "Esencia reparadora", order: 1, product: "14", notes: "Dar toquecitos con las yemas hasta absorción completa." },
            { id: "r4s3", name: "Bálsamo sellador", order: 2, product: "6", notes: "Aplicar una capa fina sobre la crema o directamente sobre zonas irritadas." }
        ]
    },
    {
        id: "r5",
        name: "Rutina luminosidad AM",
        description: "Vitamina C y antioxidantes para un tono uniforme y piel radiante durante el día.",
        type: "am",
        skinType: SkinType.OPACA,
        steps: [
            { id: "r5s1", name: "Limpieza exfoliante suave", order: 0, product: "2", notes: "Usar solo 3 veces por semana para evitar irritación." },
            { id: "r5s2", name: "Vitamina C", order: 1, product: "8", notes: "Aplicar por la mañana antes de la hidratación para máxima protección antioxidante." },
            { id: "r5s3", name: "Hidratación con FPS", order: 2, product: "10", notes: "Complementar con protector solar encima." }
        ]
    },
    {
        id: "r6",
        name: "Rutina exfoliante de noche",
        description: "Exfolia suavemente y permite que la piel se renueve durante el sueño.",
        type: "pm",
        skinType: SkinType.TEXTURIZADA,
        steps: [
            { id: "r6s1", name: "Limpieza", order: 0, product: "11", notes: "Primer paso para retirar maquillaje y contaminantes del día." },
            { id: "r6s2", name: "Tónico exfoliante", order: 1, product: "3", notes: "Aplicar con algodón o directamente con las manos tras la limpieza." },
            { id: "r6s3", name: "Hidratación intensa", order: 2, product: "1", notes: "Hidratar bien después del ácido glicólico para calmar la piel." }
        ]
    },
    {
        id: "r7",
        name: "Rutina coreana de 5 pasos AM",
        description: "Inspirada en el K-beauty para máxima hidratación y efecto glass skin.",
        type: "am",
        skinType: SkinType.MIXTA,
        steps: [
            { id: "r7s1", name: "Limpieza acuosa", order: 0, product: "12", notes: "Primera limpieza suave para retirar residuos nocturnos." },
            { id: "r7s2", name: "Esencia baba caracol", order: 1, product: "14", notes: "Dar palmaditas suaves para potenciar absorción." },
            { id: "r7s3", name: "Sérum té verde", order: 2, product: "7", notes: "Aplicar una capa fina y dejar absorber 1 minuto." },
            { id: "r7s4", name: "Hidratación mineral", order: 3, product: "15", notes: "Mezclar con la crema o aplicar solo para un extra de hidratación." },
            { id: "r7s5", name: "Crema hidratante", order: 4, product: "10", notes: "Sellar toda la rutina con una capa de crema." }
        ]
    },
    {
        id: "r8",
        name: "Rutina anti-imperfecciones PM",
        description: "Combate el acné y las imperfecciones durante la noche sin resecar la piel.",
        type: "pm",
        skinType: SkinType.ACNEICA,
        steps: [
            { id: "r8s1", name: "Limpieza purificante", order: 0, product: "11", notes: "Masajear durante 60 segundos para mayor eficacia." },
            { id: "r8s2", name: "Regulador de sebo", order: 1, product: "13", notes: "Extender por toda la zona T y mentón." },
            { id: "r8s3", name: "Tónico AHA", order: 2, product: "3", notes: "Aplicar con algodón evitando el contorno de ojos." },
            { id: "r8s4", name: "Bálsamo reparador", order: 3, product: "6", notes: "Usar solo en zonas irritadas o con granitos activos." }
        ]
    },
    {
        id: "r9",
        name: "Rutina antiedad avanzada AM",
        description: "Combina antioxidantes y activos antiaging para retrasar los signos de la edad.",
        type: "am",
        skinType: SkinType.NORMAL,
        steps: [
            { id: "r9s1", name: "Limpieza hidratante", order: 0, product: "12", notes: "Usar temperatura templada para no alterar la barrera cutánea." },
            { id: "r9s2", name: "Sérum antiedad", order: 1, product: "4", notes: "Aplicar 5-6 gotas con leve masaje ascendente." },
            { id: "r9s3", name: "Vitamina C", order: 2, product: "8", notes: "Aplicar encima del sérum para potenciar el efecto antioxidante." },
            { id: "r9s4", name: "Crema diaria", order: 3, product: "1", notes: "Finalizar con la crema hidratante para fijar los activos." }
        ]
    },
    {
        id: "r10",
        name: "Rutina piel seca intensa PM",
        description: "Nutrición profunda para pieles secas o muy secas que necesitan recuperar la barrera lipídica.",
        type: "pm",
        skinType: SkinType.SECA,
        steps: [
            { id: "r10s1", name: "Limpieza sin sulfatos", order: 0, product: "12", notes: "Aclarar con agua templada, nunca fría ni caliente." },
            { id: "r10s2", name: "Esencia reparadora", order: 1, product: "14", notes: "Aplicar abundantemente sobre piel semi-húmeda para sellar la hidratación." },
            { id: "r10s3", name: "Sérum mineral", order: 2, product: "15", notes: "Mezclar con unas gotas de aceite facial si la piel está muy seca." },
            { id: "r10s4", name: "Crema nutritiva", order: 3, product: "10", notes: "Aplicar en cantidad generosa y dar masaje hasta absorción." },
            { id: "r10s5", name: "Bálsamo sellador", order: 4, product: "6", notes: "Terminar con una capa fina sobre las zonas más resecas (mejillas, comisuras)." }
        ]
    }
];

export function getRoutines(): Routine[] {
    return routines;
}

export function getRoutineById(id: string): Routine | undefined {
    return routines.find(routine => routine.id === id);
}