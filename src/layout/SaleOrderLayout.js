import { Backdrop, Box, Card, CardContent, CircularProgress, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import fetcher from "../utils/fetcher"

export default function SaleOrderLayout() {
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
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
            .finally(() => {
                setGenerating(false)
            })
    }

    const [count, setCount] = useState({})

    useEffect(() => {
        fetcher('/api/sale-orders/count')
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
                        <Typography textAlign="center" variant="h2">
                            Sale Orders
                        </Typography>
                    </CardContent>
                </Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={pathname.substring(pathname.lastIndexOf('/') + 1)}
                        onChange={(_, tab) => {
                            navigate(`/admin/sale-orders/${tab}`)
                        }}>
                        <Tab label={`All (${Object.values(count).reduce((a, b) => a + b, 0)})`} id="all" value="all" />
                        <Tab label={`Un Shipped (${count?.['Un Shipped'] || 0})`} id="un-shipped" value="un-shipped" />
                        <Tab label={`Shipped (${count?.['Shipped'] || 0})`} id="shipped" value="shipped" />
                    </Tabs>
                </Box>
                <Box>
                    <Outlet />
                </Box>
            </Stack>
        </Box>
    )
}
