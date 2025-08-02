import { Chip, IconButton, Link } from "@mui/material"
import { IconRoute } from "@tabler/icons"
import { useParams } from "react-router-dom"
import ServerDataGrid from "../../components/ServerDataGrid"

const StatusForwardShipments = ({ status = useParams()['status'] }) => {
    const datatype = []
    datatype[0] = 'username'
    datatype[2] = 'dateTime'
    datatype[6] = 'url'
    const render = []
    render[4] = ({ value }) => <Chip label={value} />
    render[8] = ({ value }) => <IconButton target="_blank" href={value} component={Link}><IconRoute /></IconButton>

    const width = [
        null,
        null,
        null,
        140,
        140,
        140,
        300,
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
            columns={[
                { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                { "headerName": "Shipping Status", "field": "Shipping Status", "width": "140", "id": "Shipping Status" },
                { "headerName": "Transporter", "field": "Transporter", "width": "140", "id": "Transporter" },
                { "headerName": "Courier", "field": "Courier", "width": "140", "id": "Courier" },
                { "headerName": "Track", "field": "Track", "width": "300", "id": "Track" }
            ]}
        />
    )
}
export default StatusForwardShipments