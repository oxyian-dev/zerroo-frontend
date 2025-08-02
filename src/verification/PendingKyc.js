import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IconList } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../components/ServerDataGrid";

const PendingKyc = () => {
    const render = [
        ({ value }) => (
            <IconButton component={Link} to={`/admin/kyc/details/${value}`}>
                <IconList />
            </IconButton>
        )
    ]
    const datatype = []
    datatype[1] = 'username'
    datatype[5] = 'dateTime'

    const width = [
        100
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Pending KYC</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                width={width}
                filter={[false]}
                sortable={[false]}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/verification/kyc/pending' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                    { "headerName": "Phone", "field": "Phone", "width": "200", "id": "Phone" },
                    { "headerName": "Email", "field": "Email", "width": "200", "id": "Email" },
                    { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" }]}
            />
        </Stack>
    )
}
export default PendingKyc;