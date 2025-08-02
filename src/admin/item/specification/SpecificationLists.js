import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit, IconEditCircle } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";

const SpecificationLists = () => {
    const render = [({ value }) => (
        <IconButton
            component={Link}
            to={`/admin/item-specifications/list/${value}/edit`}
            startIcon={<IconEditCircle />}>
            <IconEdit />
        </IconButton>
    )]
    const filter = [false]
    const sortable = [false]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Specification Lists</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                render={render}
                filter={filter}
                sortable={sortable}
                ajax={{ url: '/api/item-specifications/list' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "Specifications", "field": "Specifications", "width": "200", "id": "Specifications" },
                    { "headerName": "Items", "field": "Items", "width": "200", "id": "Items" }]}
            />
        </Stack>
    )
}

export default SpecificationLists;