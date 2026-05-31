import { Card, CardContent, Chip, Stack, Typography } from "@mui/material"
import ServerDataGrid from "../components/ServerDataGrid"
import { WorkDriveImage } from "../utils/util"

const WalletRequests = () => {
    const datatype = [
        'dateTime',
        'number',
        'date',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "dateTime"
    ]

    const width = [
        200,
        100,
        150,
        150,
        150,
        150,
        150,
        150,
        150,
        300,
        150,
    ]
    const color = {
        "Rejected": "error",
        "Approved": "success",
        "Pending": "warning"
    }
    const render = []
    render[7] = ({ value }) => <WorkDriveImage image={value} auto="width" />
    render[8] = ({ value }) => <Chip label={value} color={color[value]} />

    return (
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <Typography variant="h2" textAlign="center">Wallet Withdrawal Request History</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                customize={{ rowHeight: 150 }}
                width={width}
                datatype={datatype}
                render={render}
                ajax={{ url: '/api/verification/wallet-requests' }}
                columns={[
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
                    { "headerName": "Date", "field": "Date", "width": "150", "id": "Date", "type": "date" },
                    { "headerName": "Bank", "field": "Bank", "width": "150", "id": "Bank" },
                    { "headerName": "Method", "field": "Method", "width": "150", "id": "Method" },
                    { "headerName": "Depositor", "field": "Depositor", "width": "150", "id": "Depositor" },
                    { "headerName": "Transaction Id", "field": "Transaction Id", "width": "150", "id": "Transaction Id" },
                    { "headerName": "Proof", "field": "Proof", "width": "150", "id": "Proof" },
                    { "headerName": "Status", "field": "Status", "width": "150", "id": "Status" },
                    { "headerName": "Remark", "field": "Remark", "width": "300", "id": "Remark" },
                    { "headerName": "Action Time", "field": "Action Time", "width": "150", "id": "Action Time", "type": "dateTime" }
                ]}
            />
        </Stack>
    )
}

export default WalletRequests
