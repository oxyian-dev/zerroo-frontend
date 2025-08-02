import { Card, CardContent, Stack, Typography } from "@mui/material";
import ServerDataGrid from "../../../components/ServerDataGrid";

const ViewSpecifications = () => {
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Specifications</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                ajax={{ url: '/api/item-specifications' }}
                columns={[
                    { "headerName": "Type", "field": "Type", "width": "200", "id": "Type" },
                    { "headerName": "Value", "field": "Value", "width": "200", "id": "Value" }
                ]}
            />
        </Stack>
    )
}
export default ViewSpecifications;