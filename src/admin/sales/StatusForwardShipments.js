import { Chip, IconButton, Link } from "@mui/material"
import { IconPackage, IconRoute } from "@tabler/icons"
import { Link as Route, useParams } from "react-router-dom"
import ServerDataGrid from "../../components/ServerDataGrid"

const StatusForwardShipments = ({ status = useParams()['status'] }) => {
    const isHold = status === 'hold'
    const color = {
        "Pending": "error",
        "Hold": "warning",
        "Dispatched": "success"
    }

    const datatype = []
    datatype[0] = 'username'
    datatype[2] = 'dateTime'
    datatype[6] = 'url'
    const render = []
    if (isHold) {
        render[0] = ({ value }) => <IconButton component={Route} to={`/admin/shipments/${value}/dispatch`}><IconPackage /></IconButton>
    }
    render[4] = ({ value }) => <Chip color={color[value] || 'default'} label={value} />
    render[8] = ({ value }) => <IconButton target="_blank" href={value} component={Link}><IconRoute /></IconButton>

    const width = isHold ? [
        100,
        null,
        null,
        null,
        140,
        140,
        140,
        300,
    ] : [
        null,
        null,
        null,
        140,
        140,
        140,
        300,
    ]

    const columns = isHold ? [
        { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
        { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
        { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
        { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
        { "headerName": "Shipping Status", "field": "Shipping Status", "width": "140", "id": "Shipping Status" },
        { "headerName": "Transporter", "field": "Transporter", "width": "140", "id": "Transporter" },
        { "headerName": "Courier", "field": "Courier", "width": "140", "id": "Courier" },
        { "headerName": "Track", "field": "Track", "width": "300", "id": "Track" }
    ] : [
        { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
        { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
        { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
        { "headerName": "Shipping Status", "field": "Shipping Status", "width": "140", "id": "Shipping Status" },
        { "headerName": "Transporter", "field": "Transporter", "width": "140", "id": "Transporter" },
        { "headerName": "Courier", "field": "Courier", "width": "140", "id": "Courier" },
        { "headerName": "Track", "field": "Track", "width": "300", "id": "Track" }
    ]

    return (
        <ServerDataGrid
            width={width}
            refresh={status}
            datatype={datatype}
            render={render}
            ajax={{ url: `/api/shipments/status/${status}` }}
            componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500, autoFocus: true }
                }
            }}
            columns={columns}
        />
    )
}
export default StatusForwardShipments
