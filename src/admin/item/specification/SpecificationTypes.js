import { Card, CardContent, Stack, Typography } from "@mui/material";
import ServerDataGrid from "../../../components/ServerDataGrid";
const SpecificationTypes = () => {
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Specification Types</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                ajax={{ url: '/api/item-specifications/types' }}
                columns={[{ "headerName": "Type", "field": "Type", "width": "200", "id": "Type" }]}
            />
        </Stack>
    )
}
export default SpecificationTypes