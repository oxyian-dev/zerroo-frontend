import { Backdrop, Box, Card, CardContent, CircularProgress, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import fetcher from "../utils/fetcher"

export default function ShipmentLayout() {
    const { enqueueSnackbar } = useSnackbar();

    const [generating, setGenerating] = useState(false)
    const generate = () => {
        setGenerating(true);
        fetcher(`/api/shipments/generate`, { method: 'POST' })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    enqueueSnackbar(`${res.count} Orders fetched. Reload to view.`, { variant: 'success' })
                } else {
                    enqueueSnackbar('Exception occurred', { variant: 'error' })
                }
                setGenerating(false)
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setGenerating(false)
            })
    }

    const [count, setCount] = useState({})

    useEffect(() => {
        fetcher('/api/shipments/count')
            .then(r => r.json())
            .then(setCount)
    }, [])

    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <Box>
            <Backdrop open={generating} sx={{ color: '#fff', zIndex: ({ zIndex }) => zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>
            <Stack spacing={2}>
                <Card>
                    <CardContent>
                        <Typography textAlign="center" variant="h2">Forward Shipments</Typography>
                    </CardContent>
                </Card>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={pathname.substring(pathname.lastIndexOf('/') + 1)}
                        onChange={(_, tab) => {
                            navigate(`/admin/shipments/${tab}`)
                        }}>
                        <Tab label={`All (${Object.values(count).reduce((a, b) => a + b, 0)})`} id="all" value="all" />
                        <Tab label={`Pending (${count?.['Pending'] || 0})`} id="pending" value="pending" />
                        {/* <Tab label={`Processing (${count?.['Processing'] || 0})`} id="processing" value="processing" />
                        <Tab label={`Picked Up (${count?.['Picked Up'] || 0})`} id="picked-up" value="picked-up" /> */}
                        <Tab label={`Dispatched (${count?.['Dispatched'] || 0})`} id="dispatched" value="dispatched" />
                        {/* <Tab label={`Delivered (${count?.['Delivered'] || 0})`} id="delivered" value="delivered" />
                        <Tab label={`RTO Pending (${count?.['RTO Pending'] || 0})`} id="rto-pending" value="rto-pending" />
                        <Tab label={`RTO Returned (${count?.['RTO Returned'] || 0})`} id="rto-returned" value="rto-returned" />
                        <Tab label={`Lost (${count?.['Lost'] || 0})`} id="lost" value="lost" />
                        <Tab label={`Exception (${count?.['Exception'] || 0})`} id="exception" value="exception" />
                        <Tab label={`Error (${count?.['Error'] || 0})`} id="error" value="error" /> */}
                    </Tabs>
                </Box>
                <Box>
                    <Outlet />
                </Box>
            </Stack>
        </Box>
    )
}
