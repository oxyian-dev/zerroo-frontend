import { Box, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link as Route, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import fetcher from "../../utils/fetcher";
import { WorkDriveImage, inr, toDateTime } from "../../utils/util";

export default function SaleOrderDetails({ id = useParams()['id'] }) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetcher(`/api/sale-orders/${id}`)
            .then(r => r.json())
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Box position="relative">
            <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
                <Grid container mb={3}>
                    <Grid item xs={6}>
                        <Typography variant="h3">Sale Order</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" mb={2}>Order ID: {data.order_id}</Typography>
                        <Typography variant="h5">Order Time: {toDateTime(data.time)}</Typography>
                    </Grid>
                </Grid>
                <Grid container mb={3} spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Typography fontWeight="bold">Billing Address</Typography>
                        <Typography>{data.billing_firstname} {data.billing_lastname}</Typography>
                        <Typography>{data.billing_phone}</Typography>
                        <Typography>{data.billing_address_1}</Typography>
                        <Typography>{data.billing_address_2}</Typography>
                        <Typography>{data.billing_city}</Typography>
                        <Typography>{data.billing_postcode}</Typography>
                        <Typography>{data.billing_state}</Typography>
                        <Typography>{data.billing_country}</Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography fontWeight="bold">Shipping Address</Typography>
                        <Typography>{data.shipping_firstname} {data.shipping_lastname}</Typography>
                        <Typography>{data.shipping_phone}</Typography>
                        {data.shipping_alt_phone && <Typography>{data.shipping_alt_phone}</Typography>}
                        <Typography>{data.shipping_address_1}</Typography>
                        <Typography>{data.shipping_address_2}</Typography>
                        <Typography>{data.shipping_city}</Typography>
                        <Typography>{data.shipping_postcode}</Typography>
                        <Typography>{data.shipping_landmark}</Typography>
                        <Typography>{data.shipping_state}</Typography>
                        <Typography>{data.shipping_country}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map(({ image, title, sku, mrp, price, discount, quantity }, i) =>
                            <TableRow key={i}>
                                <TableCell sx={{ maxWidth: '100px', minWidth: '100px' }}>
                                    <WorkDriveImage image={image} />
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap>{title}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Link noWrap component={Route} to={`/admin/items?search=${sku}`}>{sku}</Link>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap>{quantity}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap overflow='hidden' display='inline'
                                        variant="subtitle1">₹{price}</Typography>
                                    {discount !== 0 && <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                        variant='subtitle1'
                                        sx={{ textDecoration: 'line-through' }}>₹{mrp}</Typography>}
                                    {discount !== 0 &&
                                        <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                            color={orange[700]}>({discount}% OFF)</Typography>}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1" noWrap>₹{inr(quantity * price)}</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell colSpan={3} rowSpan={5} />
                            <TableCell colSpan={2}>
                                <Typography noWrap>Total Quantity: </Typography>
                            </TableCell>
                            <TableCell>{inr(data.items.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0))}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography noWrap>Total MRP: </Typography>
                            </TableCell>
                            <TableCell>₹{inr(data.items.map(({ mrp, quantity }) => mrp * quantity).reduce((a, b) => a + b, 0))}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography noWrap>Total Discount: </Typography>
                            </TableCell>
                            <TableCell>₹{inr(data.items.map(({ price, mrp, quantity }) => quantity * (mrp - price)).reduce((a, b) => a + b, 0))}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography noWrap>Total: </Typography>
                            </TableCell>
                            <TableCell>₹{inr(data.items.map(({ price, quantity }) => quantity * price).reduce((a, b) => a + b, 0))}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
