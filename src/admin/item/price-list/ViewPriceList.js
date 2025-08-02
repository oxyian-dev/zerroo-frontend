import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";

const ViewPriceList = () => {
    const filter = [];
    filter[0] = filter[10] = false;
    const datatype = [null, null, 'number', 'number', 'number', 'number', 'number', 'number', 'number'];
    const width = [100, 200, 100, 100, 100, 100, 120, 120, 120];
    const sortable = [false]
    const render = [];
    render[0] = ({ value }) => (
        <IconButton component={Link} to={`/admin/price-list/${value}/edit`}>
            <IconEdit />
        </IconButton>
    )
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Price Lists</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                sortable={sortable}
                render={render}
                datatype={datatype}
                filter={filter}
                width={width}
                ajax={{ url: '/api/price-lists' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "Mrp", "field": "Mrp", "width": "100", "id": "Mrp", "type": "number" },
                    { "headerName": "Price", "field": "Price", "width": "100", "id": "Price", "type": "number" },
                    { "headerName": "Cost", "field": "Cost", "width": "100", "id": "Cost", "type": "number" },
                    { "headerName": "Gst", "field": "Gst", "width": "100", "id": "Gst", "type": "number" },
                    { "headerName": "PV", "field": "PV", "width": "120", "id": "PV", "type": "number" },
                    { "headerName": "Items", "field": "Items", "width": "120", "id": "Items", "type": "number" },
                ]}
            />
        </Stack>
    )
}
export default ViewPriceList;