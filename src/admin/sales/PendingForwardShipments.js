import { Button, IconButton, Link, Stack } from "@mui/material"
import { IconDownload, IconPackage } from "@tabler/icons"
import { useState } from "react"
import { Link as Route } from "react-router-dom"
import ServerDataGrid from "../../components/ServerDataGrid"
import PROXY from "../../utils/proxy"
import fetcher from "../../utils/fetcher"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

export default function PendingForwardShipments() {
    const datatype = [null, null, null, 'dateTime', 'username']
    const render = []
    render[0] = ({ value }) => (
        <IconButton component={Route} to={`/admin/shipments/${value}/dispatch`}><IconPackage /></IconButton>
    )
    render[1] = ({ value }) => (
        <IconButton component={Link} href={`${PROXY}/api/invoices/pdf?ids=${value}`}><IconDownload /></IconButton>
    )
    render[2] = ({ value }) => (
        <Button
            onClick={() => hold(value)}
            variant="outlined"
            color="warning"
            size="small">
            Hold
        </Button>
    )

    const width = [100, 100, 100]

    const [selected, setSelected] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const hold = (id) => {
        fetcher(`/api/shipments/${id}/hold`, { method: "put" })
            .then(r => r.json())
            .then(res => {
                if (res.status === 'success') {
                    enqueueSnackbar("Shipment Put On Hold", { variant: 'success' })
                    navigate('/admin/shipments/hold')
                } else {
                    enqueueSnackbar('Exception occurred', { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
    }

    return (
        <Stack spacing={2}>
            <Button
                onClick={() => {
                    window.open(`${PROXY}/api/invoices/pdf?ids=${selected}`)
                }}
                disabled={selected.length == 0}
                variant="outlined"
                color="primary"
                endIcon={<IconDownload />}>
                Download Picklist
            </Button>
            <ServerDataGrid
                checkboxSelection={true}
                width={width}
                filter={[false]}
                sortable={[false]}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/shipments/status/pending' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Dispatch", "field": "Dispatch", "width": "100", "id": "Dispatch" },
                    { "headerName": "Download", "field": "Download", "width": "100", "id": "Download" },
                    { "headerName": "Hold", "field": "Hold", "width": "100", "id": "Hold" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Customer", "field": "Customer", "width": "200", "id": "Customer" },
                    { "headerName": "City", "field": "City", "width": "200", "id": "City" },
                    { "headerName": "State", "field": "State", "width": "200", "id": "State" }]}
                onSelection={setSelected}
            />
        </Stack>
    )
}
