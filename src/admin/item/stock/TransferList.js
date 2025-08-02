import { Button, Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";

const TransferList = () => {
    const datatype = []
    datatype[4] = 'dateTime'
    const filter = [false]
    const sortable = [false]
    const render = [({ value }) => <Button component={Link} to={`/admin/stocks/transfer/${value}`} variant='outlined'>Details</Button>]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Stock Transfer List</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                sortable={sortable}
                filter={filter}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/stocks/transfer' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Description", "field": "Description", "width": "200", "id": "Description" },
                    { "headerName": "Reason", "field": "Reason", "width": "200", "id": "Reason" },
                    { "headerName": "Owner", "field": "Owner", "width": "200", "id": "Owner" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "Quantity", "field": "Quantity", "width": "200", "id": "Quantity", "type": "number" }]}
            />
        </Stack>

    )
}
export default TransferList;