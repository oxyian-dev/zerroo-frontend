import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../../components/ServerDataGrid";

const ViewColor = () => {
    const render = []
    render[0] = ({ value }) => (
        <IconButton component={Link} to={`/admin/variants/color/${value}/edit`}>
            <IconEdit />
        </IconButton>
    );
    render[2] = ({ value }) => <Box bgcolor={`#${value}`} width={100} height={100} />

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Colour List</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                sortable={[false, true, false]}
                filter={[false, true, true, false]}
                render={render}
                ajax={{ url: '/api/variants/colors' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action", },
                    { "headerName": "Color", "field": "Color", "width": "200", "id": "Color" },
                    { "headerName": "Hex", "field": "Hex", "width": "200", "id": "Hex" },
                    { "headerName": "Items", "field": "Items", "width": "200", "id": "Items", "type": "number" }
                ]}
            />
        </Stack>
    )
}
export default ViewColor;