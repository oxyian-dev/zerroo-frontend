import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";
import { WorkDriveImage } from "../../../utils/util";

const ItemGroupList = () => {
    const render = []
    const filter = []
    const sortable = []
    filter[0] = filter[5] = false
    sortable[0] = sortable[5] = false
    render[0] = ({ value }) => (
        <IconButton component={Link} to={`/admin/item-groups/${value}/edit`}>
            <IconEdit />
        </IconButton>
    )
    render[5] = ({ value }) => value ? <WorkDriveImage auto='width' image={value} alt="Size Chart" /> : null
    const width = [100, 400]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Item Groups</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                customize={{ rowHeight: 125 }}
                sortable={sortable}
                render={render}
                filter={filter}
                width={width}
                ajax={{ url: '/api/item-groups' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Name", "field": "Name", "width": "400", "id": "Name" },
                    { "headerName": "Category", "field": "Category", "width": "200", "id": "Category" },
                    { "headerName": "Brand", "field": "Brand", "width": "200", "id": "Brand" },
                    { "headerName": "Specification", "field": "Specification", "width": "200", "id": "Specification" },
                    { "headerName": "Size Chart", "field": "Size Chart", "width": "200", "id": "Size Chart" }]}
            />
        </Stack>
    )
}
export default ItemGroupList;