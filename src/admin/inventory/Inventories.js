import { Card, CardContent, Stack, Typography } from "@mui/material";
import ClientDataGrid from "../../components/ClientDataGrid";

const Inventories = () => {
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Inventories</Typography>
                </CardContent>
            </Card>
            <ClientDataGrid
                ajax={{ url: '/api/inventories' }}
                columns={[
                    { "headerName": "Inventory", "field": "Inventory", "width": "200", "id": "Inventory" },
                    { "headerName": "City", "field": "City", "width": "200", "id": "City" },
                    { "headerName": "Quantity", "field": "Quantity", "width": "200", "id": "Quantity", "type": "number" }
                ]}
            />
        </Stack>
    )
}
export default Inventories