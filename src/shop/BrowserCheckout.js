import { LoadingButton } from "@mui/lab";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Box } from "@mui/system";
import { IconCash } from "@tabler/icons";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, findSum, href, inr, round } from "../utils/util";

const BrowserCheckout = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [cart, setCart] = useState([])
    const [wallet, setWallet] = useState(0)
    const [loading, setLoading] = useState(false);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [mrp, setMrp] = useState(0);
    const [discount, setDiscount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        fetcher('/api/carts')
            .then(r => r.json())
            .then(({ carts, purchase_wallet }) => {
                setCart(carts)
                setMrp(carts.map(item => item.mrp * item.quantity).reduce((a, b) => a + b, 0))
                setDiscount(carts.map(item => item.discount * item.quantity).reduce((a, b) => a + b, 0))
                setWallet(purchase_wallet)
                const params = new URLSearchParams();
                params.set('price', total)
                params.set('address', sessionStorage.getItem('address'))
            })
        fetcher(`/api/purchases/shipping`)
            .then(r => r.json())
            .then(({ shipping_charge }) => {
                setShipping(shipping_charge)
            })
    }, [])

    useEffect(() => {
        setTotal(cart.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0) + (shipping))
    }, [shipping, cart])

    const makePayment = () => {
        setLoading(true)
        const address = sessionStorage.getItem('address');
        const body = new FormData();
        body.set('address', address)
        body.set('shipping', true)
        fetcher('/api/purchases', { method: 'POST', body })
            .then(r => r.json())
            .then(({ status, message = "Exception occurred" }) => {
                if (status === 'success') {
                    enqueueSnackbar("Your order is placed", { variant: 'success' })
                    navigate('/dashboard/your-orders')
                } else {
                    enqueueSnackbar(message, { variant: 'error' })
                    setLoading(false)
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setLoading(false)
            })
    }

    return (
        <Container sx={{ mb: 4 }}>
            <Box my={5} textAlign="center">
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <Typography color="primary" fontSize={18} mr={2} display="inline">CART</Typography>
                </Link>
                ---------------
                <Link to="/address" style={{ textDecoration: 'none' }}>
                    <Typography color="primary" fontSize={18} mx={2} display="inline">ADDRESS</Typography>
                </Link>
                ---------------
                <Typography fontWeight="bold" fontSize={18} ml={2} display="inline">PAYMENT</Typography>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography mb={1} fontSize={18} variant="subtitle1">
                            Order Details:
                        </Typography>
                        <Grid container>
                            {cart.map(item => (
                                <Grid item xs={6} key={item.item}>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={4} p={1}>
                                                {item.combo_id ? (
                                                    <WorkDriveImage
                                                        image={item.images[0]}
                                                        alt={`${item.category} ${item.title}`} />
                                                ) : (
                                                    <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}>
                                                        <WorkDriveImage
                                                            image={item.images[0]}
                                                            alt={`${item.category} ${item.title}`} />
                                                    </Link>
                                                )}
                                            </Grid>
                                            <Grid item xs={8} p={1}>
                                                {item.combo_id ? (
                                                    <React.Fragment>
                                                        <Typography color="primary" variant='h5'>{item.brand}</Typography>
                                                        <Typography variant='h4'>{item.title}</Typography>
                                                        <Typography noWrap overflow='hidden' display='inline'
                                                            variant="subtitle1">₹{item.price}</Typography>
                                                        {item.price !== item.mrp && (
                                                            <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                                variant='subtitle1' sx={{ textDecoration: 'line-through' }}>
                                                                ₹{item.mrp}
                                                            </Typography>)}
                                                        {item.discount !== 0 && (
                                                            <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                                color={orange[700]}>
                                                                ({item.discount}% OFF)
                                                            </Typography>)}
                                                        {item.size && (
                                                            <Typography>Size: {item.size}</Typography>
                                                        )}
                                                        <Typography>Quantity: {item.quantity}</Typography>
                                                    </React.Fragment>
                                                ) : (
                                                    <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}
                                                        style={{ textDecoration: 'none' }}>
                                                        <Typography color="primary" variant='h5'>{item.brand}</Typography>
                                                        <Typography variant='h4'>{item.title}</Typography>
                                                        <Typography noWrap overflow='hidden' display='inline'
                                                            variant="subtitle1">₹{item.price}</Typography>
                                                        {item.price !== item.mrp && (
                                                            <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                                variant='subtitle1' sx={{ textDecoration: 'line-through' }}>
                                                                ₹{item.mrp}
                                                            </Typography>)}
                                                        {item.discount !== 0 && (
                                                            <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                                color={orange[700]}>
                                                                ({item.discount}% OFF)
                                                            </Typography>)}
                                                        {item.size && (
                                                            <Typography>Size: {item.size}</Typography>)}
                                                        <Typography>Quantity: {item.quantity}</Typography>
                                                    </Link>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography fontWeight={700} mb={1} fontSize={18} variant="subtitle1">
                            Pricing Details:
                        </Typography>
                        <Stack spacing={0.5}>
                            <Typography>Total Items: {findSum(cart, 'quantity')}</Typography>
                            <Typography>
                                Total MRP: ₹{inr(round(mrp))}/-
                            </Typography>
                            <Typography>
                                Discount on MRP:
                                ₹{round(discount)}
                            </Typography>
                            <Typography>
                                Shipping: ₹{round(shipping)}/-
                            </Typography>
                            <Typography>
                                Total: ₹{round(total)}/-
                            </Typography>
                            <Typography>
                                Wallet Balance: ₹{inr(wallet)}/-
                            </Typography>
                            <Typography>
                                {config.pvName}: {round(cart.map(({ pv, quantity }) => pv * quantity).reduce((a, b) => a + b, 0))}
                            </Typography>
                        </Stack>
                        <Box mt={2}>
                            {wallet < total && (
                                <Box mb={2} display="flex" alignItems="center">
                                    <Typography color="error.main" mr={2}>
                                        Insufficient Funds
                                    </Typography>
                                    <Button variant="contained" component={Link} to="/dashboard/wallet-request">
                                        Raise Wallet Request
                                    </Button>
                                </Box>
                            )}
                            <LoadingButton
                                disabled={wallet < total}
                                loading={loading}
                                startIcon={<IconCash />}
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    makePayment()
                                }}>
                                Place Order
                            </LoadingButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default BrowserCheckout;