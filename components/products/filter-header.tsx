"use client";
import { Box, CardContent, Stack } from "@mui/material";
import { Combobox, ComboboxInput, useComboboxAnchor } from "../ui/combobox";
import { Card } from "../ui/card";

export function FilterHeader() {
    const anchor = useComboboxAnchor()

    return (
        <Card className="p-0">
            <CardContent className="p-0">
                <Stack direction={"column"} gap={2} flexWrap="wrap" justifyContent={"space-between"} paddingLeft={2} alignContent={"right"} >
                    <Box flexDirection={"column"}>
                        <h2>Descubre productos</h2>
                        <p>Descubre los mejores productos para ti</p>
                    </Box>
                    <Stack direction={"row"} gap={2}>
                        <Combobox
                            multiple
                            autoHighlight
                        >
                            <ComboboxInput placeholder="Tipo de piel" className="bg-muted/20" />
                        </Combobox>
                        <Combobox
                            multiple
                            autoHighlight
                        >
                            <ComboboxInput placeholder="Marca" className="bg-muted/20"/>
                        </Combobox>
                        <Combobox
                            multiple
                            autoHighlight
                        >
                            <ComboboxInput placeholder="Condición de la piel" className="bg-muted/20"/>
                        </Combobox>
                        <Combobox
                            multiple
                            autoHighlight
                        >
                            <ComboboxInput placeholder="Excluir ingredientes" className="bg-muted/20"/>
                        </Combobox>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}