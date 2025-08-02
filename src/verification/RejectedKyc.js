import { Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IconList } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../components/ServerDataGrid";

const RejectedKyc = () => {
    const datatype = []
    datatype[1] = 'username'
    datatype[5] = datatype[6] = 'dateTime'
    const render = [({ value }) => (
        <IconButton component={Link} to={`/admin/kyc/details/${value}`}>
            <IconList />
        </IconButton>)
    ]
    render[7] = ({ value }) => <Tooltip title={value}><Typography>{value}</Typography></Tooltip>

    const width = [
        100
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Rejected KYC</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                width={width}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/verification/kyc/rejected' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                    { "headerName": "Phone", "field": "Phone", "width": "200", "id": "Phone" },
                    { "headerName": "Email", "field": "Email", "width": "200", "id": "Email" },
                    { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" },
                    { "headerName": "Action Time", "field": "Action Time", "width": "200", "id": "Action Time", "type": "dateTime" },
                    { "headerName": "Rejected By", "field": "Rejected By", "width": "200", "id": "Rejected By" },
                    { "headerName": "Reason", "field": "Reason", "width": "200", "id": "Reason" }
                ]}
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
export default RejectedKyc;