import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../../components/ServerDataGrid";

const ViewSize = () => {
    const render = [];
    render[0] = ({ value }) =>
        <IconButton component={Link} to={`/admin/variants/size/${value}/edit`}>
            <IconEdit />
        </IconButton>
    const filter = [false, true, false, false]
    const sortable = [false]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Size List</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                filter={filter}
                sortable={sortable}
                render={render}
                ajax={{ url: '/api/variants/sizes' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Size", "field": "Size", "width": "200", "id": "Size" },
                    { "headerName": "Index", "field": "Index", "width": "200", "id": "Index" },
                    { "headerName": "Items", "field": "Items", "width": "200", "id": "Items" }]}
            />
        </Stack>
    )
}
export default ViewSize;