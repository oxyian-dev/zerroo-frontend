import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { IconList } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../components/ServerDataGrid";

const VerifiedKyc = () => {
    const datatype = []
    datatype[1] = 'username'
    datatype[5] = datatype[6] = 'dateTime'
    const render = [({ value }) => <IconButton component={Link} to={`/admin/kyc/details/${value}`}><IconList /></IconButton>]

    const width = [
        100
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Verified KYC</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                width={width}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/verification/kyc/verified' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                    { "headerName": "Phone", "field": "Phone", "width": "200", "id": "Phone" },
                    { "headerName": "Email", "field": "Email", "width": "200", "id": "Email" },
                    { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" },
                    { "headerName": "Action Time", "field": "Action Time", "width": "200", "id": "Action Time", "type": "dateTime" },
                    { "headerName": "Verified By", "field": "Verified By", "width": "200", "id": "Verified By" }]}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
            />
        </Stack>
    )
}
export default VerifiedKyc;