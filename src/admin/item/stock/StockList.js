import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link as Route } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";
import fetcher from "../../../utils/fetcher";
import { WorkDriveImage } from "../../../utils/util";

const StockList = () => {
    const { enqueueSnackbar } = useSnackbar();

    const render = [
        ({ value }) => <WorkDriveImage image={value} auto='width' alt="" />,
        ({ value }) => <Link component={Route} to={`/admin/items?search=${value}`}>{value}</Link>
    ]
    const datatype = [];
    datatype[4] = 'number'
    const filter = [false]
    const sortable = [false]

    const editable = []
    editable[2] = true

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Stock List</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                editable={editable}
                render={render}
                filter={filter}
                sortable={sortable}
                ajax={{ url: '/api/stocks' }}
                customize={{ rowHeight: 125 }}
                datatype={datatype}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                experimentalFeatures={{ aggregation: true, newEditingApi: true }}
                aggregation={{
                    model: {
                        "Quantity": "sum"
                    },
                }}
                columns={[
                    { "headerName": "Image", "field": "Image", "width": "200", "id": "Image" },
                    { "headerName": "SKU", "field": "SKU", "width": "200", "id": "SKU" },
                    { "headerName": "Location", "field": "Location", "width": "200", "id": "Location" },
                    { "headerName": "Title", "field": "Title", "width": "200", "id": "Title" },
                    { "headerName": "Quantity", "field": "Quantity", "width": "200", "id": "Quantity", "type": "number" },
                    { "headerName": "Inventory", "field": "Inventory", "width": "200", "id": "Inventory" },
                    { "headerName": "Category", "field": "Category", "width": "200", "id": "Category" },
                    { "headerName": "Size", "field": "Size", "width": "200", "id": "Size" },
                ]}
                processRowUpdate={async params => {
                    const { id, Location } = params;
                    const body = new FormData();
                    body.set('location', Location);
                    const response = await fetcher(`/api/stocks/${id}/location`, { method: 'put', body })
                    const { status } = await response.json();
                    if (status === 'success') {
                        enqueueSnackbar('Location updated', { variant: 'success' })
                    }
                    return params
                }}
            />
        </Stack>
    )
}
export default StockList;