import { useTranslations } from "next-intl";
import { Container } from "@mui/material";

export default function CreateProductPage() {
    const t = useTranslations("CreateProductPage");

    return (
        <Container className="pt-10">
            <h1>{t("title")}</h1>
        </Container>
    );
}