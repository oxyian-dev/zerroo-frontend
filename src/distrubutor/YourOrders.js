import Masonry from '@mui/lab/Masonry'
import { Box, Button, Card, CardContent, Chip, Divider, Grid, IconButton, Link, Paper, Stack, Typography } from "@mui/material"
import { orange } from "@mui/material/colors"
import React, { useEffect, useState } from "react"
import { Link as Route } from "react-router-dom"
import Loader from '../components/Loader'
import fetcher from "../utils/fetcher"
import PROXY from '../utils/proxy'
import { WorkDriveImage, href, toDate } from "../utils/util"
import { IconDownload } from '@tabler/icons'

const YourOrders = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetcher('/api/purchases')
            .then(r => r.json())
            .then(setData)
    }, [])

    const color = {
        "Un Shipped": "error",
        "Shipped": "info",
        "Dispatched": "success"
    }

    return data === null ? (
        <Loader />
    ) : (
        <React.Fragment>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h2" textAlign="center">Your Orders</Typography>
                </CardContent>
            </Card>
            {data.orders.length === 0 ? (
                <Box>
                    <Typography textAlign="center">
                        No orders
                    </Typography>
                </Box>
            ) : (
                <Masonry columns={{ md: 2, xs: 1 }} spacing={2}>
                    {data.orders.map(({ invoice_id, order_id, time, items, total }) => (
                        <Box key={order_id} width="100%">
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box display="flex" justifyContent="left" alignItems="center">
                                            <Typography fontWeight="bold">ID: {order_id}</Typography>
                                            {invoice_id && (
                                                <IconButton
                                                    variant="contained"
                                                    color="primary"
                                                    component={Link}
                                                    href={`${PROXY}/api/purchases/download?invoice_id=${invoice_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <IconDownload />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography fontWeight="bold" textAlign="center">Date: {toDate(time)}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {items.map(({
                                            image = null,
                                            title = '',
                                            description = '',
                                            price = 0,
                                            discount = 0,
                                            mrp = 0,
                                            size = '',
                                            status = '',
                                            item_id,
                                            category = '',
                                            track = null
                                        }, key) => (
                                            <Grid container spacing={1} key={key} mb={1}>
                                                <Grid item xs={4}>
                                                    <WorkDriveImage image={image} />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Stack spacing={0.5}>
                                                        <Link component={Route} to={`/p/${item_id}/${href(category)}/${href(title)}`}>
                                                            <Typography fontWeight={600}>{title}</Typography>
                                                        </Link>
                                                        <Typography variant="caption" display={{ md: 'block', xs: 'none' }}>{description}</Typography>
                                                        <Typography display={{ md: 'block', xs: 'none' }} fontWeight={600}>{category}</Typography>
                                                        <Typography noWrap overflow='hidden' display='inline' variant="subtitle1">
                                                            ₹{price}
                                                        </Typography>
                                                        {discount > 0 && (
                                                            <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                                color={orange[700]}>
                                                                ({discount}% OFF)
                                                            </Typography>
                                                        )}
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <Stack spacing={0.5}>
                                                                    {size && <Typography>Size: {size}</Typography>}
                                                                    <Chip
                                                                        color={color[status]}
                                                                        sx={{ alignSelf: 'start' }}
                                                                        label={status} />
                                                                </Stack>
                                                            </Grid>
                                                            {track && (
                                                                <Grid item xs={6} textAlign="right" alignSelf="end">
                                                                    <Button
                                                                        variant="outlined"
                                                                        component={Link}
                                                                        href={track}
                                                                        target="_blank">Track</Button>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid item xs={12} textAlign="center">
                                            <Typography fontWeight="bold">Total: ₹{total}</Typography>
                                        </Grid>
                                    </Grid>
                                    {invoice_id && (
                                        <Grid container justifyContent="right" mt={2}>
                                            <Grid item>
                                                <IconButton
                                                    variant="contained"
                                                    color="primary"
                                                    component={Link}
                                                    href={`${PROXY}/api/purchases/download?invoice_id=${invoice_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <IconDownload />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        </Box>
                    ))}
                </Masonry>

            )}
        </React.Fragment>
    )
}
export default YourOrders;
