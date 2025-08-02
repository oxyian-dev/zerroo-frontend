import { Card, CardContent, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { IconList } from "@tabler/icons";
import { Link } from "react-router-dom";
import ServerDataGrid from "../components/ServerDataGrid";

const RejectedBank = () => {
    const datatype = [
        null,
        'username',
        null,
        null,
        null,
        'dateTime',
        'dateTime',
    ]

    const render = [({ value }) => <IconButton component={Link} to={`/admin/bank/details/${value}`}><IconList /></IconButton>]
    render[8] = ({ value }) => <Tooltip title={value}><Typography>{value}</Typography></Tooltip>

    const width = [
        100
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Rejected Bank</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                width={width}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/verification/bank/rejected' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "200", "id": "Firstname" },
                    { "headerName": "Phone", "field": "Phone", "width": "200", "id": "Phone" },
                    { "headerName": "Email", "field": "Email", "width": "200", "id": "Email" },
                    { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" },
                    { "headerName": "Rejected Time", "field": "Rejected Time", "width": "200", "id": "Rejected Time", "type": "dateTime" },
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
export default RejectedBank;