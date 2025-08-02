import { Card, CardContent, Chip, IconButton, Link, Stack, Typography } from "@mui/material";
import { IconDownload } from "@tabler/icons";
import ServerDataGrid from "../../components/ServerDataGrid";
import PROXY from "../../utils/proxy";

export default function Invoice() {

    const datatype = []
    datatype[1] = 'dateTime'
    const render = []

    render[0] = ({ value }) => (
        <IconButton target="_blank" component={Link} href={`${PROXY}/api/invoices/pdf?ids=${value}`}><IconDownload /></IconButton>
    )

    render[4] = ({ value }) => {
        if (value === 'Unpaid') {
            return <Chip label={value} color="error" />
        } else if (value === 'Paid') {
            return <Chip label={value} color="success" />
        } else {
            <Chip label={value} />
        }
    }

    const width = [
        100,
        null,
        150,
        150,
        null,
        120,
        100
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Invoices</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                datatype={datatype}
                render={render}
                ajax={{ url: '/api/invoices' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "Invoice Id", "field": "Invoice Id", "width": "150", "id": "Invoice Id" },
                    { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
                    { "headerName": "Customer", "field": "Customer", "width": "200", "id": "Customer" },
                    { "headerName": "Price", "field": "Price", "width": "120", "id": "Price", "type": "number" },
                    { "headerName": "PV", "field": "PV", "width": "100", "id": "PV", "type": "number" }
                ]}
            />
        </Stack>
    )
}
