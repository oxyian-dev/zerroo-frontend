import { Card, CardContent, IconButton, Stack, Switch, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../components/ServerDataGrid";
import fetcher from "../../utils/fetcher";
import { WorkDriveImage } from "../../utils/util";

const CategoryList = () => {
    const { enqueueSnackbar } = useSnackbar();

    function handleDisplayChange(id, display, event) {
        fetcher(`/api/categories/${id}/display?display=${display}`, { method: 'PUT' })
            .then(r => r.json())
            .then(({ status }) => {
                if (status === 'success') {
                    if (display) {
                        enqueueSnackbar('Category Shown', { variant: 'success' })
                    } else {
                        enqueueSnackbar('Category Hidden', { variant: 'warning' })
                    }
                } else {
                    enqueueSnackbar('Exception', { variant: 'error' })
                    event.target = !display
                }
            })
            .catch(() => {
                enqueueSnackbar('Some error occurred', { variant: 'error' })
                event.target = !display
            })
    }

    const sortable = [
        false,
        null,
        false
    ]

    const filter = [
        false,
        null,
        false
    ]

    const datatype = []
    datatype[4] = 'boolean'

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Categories</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                sortable={sortable}
                filter={filter}
                datatype={datatype}
                customize={{ rowHeight: 125 }}
                render={[
                    ({ value }) => (
                        <IconButton
                            component={Link}
                            to={`/admin/categories/${value}/edit`}
                        >
                            <IconEdit />
                        </IconButton>
                    ),
                    null,
                    ({ value }) => value ? <WorkDriveImage auto='width' image={value} alt="" /> : null,
                    null,
                    ({ value, id }) => (
                        <Switch
                            defaultChecked={value}
                            onClick={event => {
                                handleDisplayChange(id, event.target.checked, event)
                            }}
                        />)
                ]}
                ajax={{ url: '/api/categories' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Category", "field": "Category", "width": "200", "id": "Category" },
                    { "headerName": "Image", "field": "Image", "width": "200", "id": "Image" },
                    { "headerName": "Parent", "field": "Parent", "width": "200", "id": "Parent" },
                    { "headerName": "Display", "field": "Display", "width": "200", "id": "Display", "type": "boolean" },
                    { "headerName": "Stocks", "field": "quantity", "width": "200", "id": "Stocks" },
                ]}
            />
        </Stack>
    )
}
export default CategoryList;