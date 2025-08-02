import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../components/ServerDataGrid";

const Transporters = () => {

    const render = [
        ({ value }) => <IconButton component={Link} to={`/admin/transporters/${value}/edit`}><IconEdit /></IconButton >
    ]

    const width = [
        100,
        200,
        200,
        100
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Transporters</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                sortable={[false]}
                filter={[false]}
                render={render}
                ajax={{ url: '/api/transporters' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Transporter", "field": "Transporter", "width": "200", "id": "Transporter" },
                    { "headerName": "Inventory", "field": "Inventory", "width": "200", "id": "Inventory" },
                    { "headerName": "Couriers", "field": "Couriers", "width": "100", "id": "Couriers", "type": "number" }]}
            />
        </Stack>
    )
}
export default Transporters