import ProductForm from "@/components/products/product-form";
import { Container } from "@mui/material";

export default function CreateProductPage() {
        return (
        <Container className="pt-10">
            <ProductForm/>
        </Container>
    );
}