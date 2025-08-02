import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import ServerDataGrid from "../../components/ServerDataGrid";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";

export default function Brands() {
    const render = []
    render[0] = ({ value }) => <IconButton component={Link} to={`/admin/brands/${value}/edit`}><IconEdit /></IconButton>

    const width = []
    width[0] = width[2] = 100

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">
                        Brands
                    </Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                render={render}
                ajax={{ url: "/api/brands" }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action", "type": "number" },
                    { "headerName": "Brand", "field": "Brand", "width": "200", "id": "Brand" },
                    { "headerName": "Items", "field": "Items", "width": "100", "id": "Items", "type": "number" },
                ]}
            />
        </Stack>
    )
}
