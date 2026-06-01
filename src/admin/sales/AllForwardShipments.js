import { Chip, IconButton, Link } from "@mui/material"
import { IconRoute } from "@tabler/icons"
import ServerDataGrid from "../../components/ServerDataGrid"

const AllForwardShipments = () => {
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
    render[4] = ({ value }) => <Chip color={color[value] || 'default'} label={value} />
    render[7] = ({ value }) => value ? <IconButton target="_blank" href={value} component={Link}><IconRoute /></IconButton> : null

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
            datatype={datatype}
            render={render}
            ajax={{ url: '/api/shipments' }}
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
export default AllForwardShipments
