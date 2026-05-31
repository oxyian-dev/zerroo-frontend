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
    const [total, setTotal] = useState(0);
    const [mrp, setMrp] = useState(0);
    const [discount, setDiscount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        fetcher('/api/carts')
            .then(r => r.json())
            .then(({ carts, purchase_wallet }) => {
                const safeCarts = Array.isArray(carts) ? carts : []
                setCart(safeCarts)
                setMrp(safeCarts.map(item => item.mrp * item.quantity).reduce((a, b) => a + b, 0))
                setDiscount(safeCarts.map(item => item.discount * item.quantity).reduce((a, b) => a + b, 0))
                setWallet(Number.isFinite(Number(purchase_wallet)) ? Number(purchase_wallet) : 0)
            })
    }, [])

    useEffect(() => {
        setTotal(cart.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0))
    }, [cart])

    const makePayment = () => {
        setLoading(true)
        const address = sessionStorage.getItem('address');
        if (!address || address === 'null') {
            enqueueSnackbar('Please select a delivery address', { variant: 'error' })
            setLoading(false)
            return
        }
        const body = new FormData();
        body.set('address', address)
        body.set('shipping', false)
        fetcher('/api/purchases', { method: 'POST', body })
            .then(r => r.json())
            .then(({ status, message = "Exception occurred" }) => {
                if (status === 'success') {
                    enqueueSnackbar("Your order is placed", { variant: 'success' })
                    navigate('/dashboard/your-orders')
                } else {
                    enqueueSnackbar(message?.trim() || "Exception occurred", { variant: 'error' })
                    setLoading(false)
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setLoading(false)
            })
    }

    return (
        <Container sx={{ mb: 4, px: { md: 10, xs: 3 } }}>
            <Box my={5} textAlign="center">
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <Typography
                        color="#efcb77"
                        fontSize={{ md: 18, xs: 16 }}
                        mr={2}
                        display="inline"
                        sx={{
                            letterSpacing: '0.16em',
                            transition: 'all 0.3s ease',
                            '&:hover': { color: '#f5dc97' }
                        }}
                    >
                        CART
                    </Typography>
                </Link>
                <Typography
                    fontSize={{ md: 18, xs: 16 }}
                    display="inline"
                    sx={{ color: 'rgba(255,255,255,.3)' }}
                >
                    ---------------
                </Typography>
                <Link to="/address" style={{ textDecoration: 'none' }}>
                    <Typography
                        color="#efcb77"
                        fontSize={{ md: 18, xs: 16 }}
                        mx={2}
                        display="inline"
                        sx={{
                            letterSpacing: '0.16em',
                            transition: 'all 0.3s ease',
                            '&:hover': { color: '#f5dc97' }
                        }}
                    >
                        ADDRESS
                    </Typography>
                </Link>
                <Typography
                    fontSize={{ md: 18, xs: 16 }}
                    display="inline"
                    sx={{ color: 'rgba(255,255,255,.3)' }}
                >
                    ---------------
                </Typography>
                <Typography
                    fontWeight="bold"
                    fontSize={{ md: 18, xs: 16 }}
                    ml={2}
                    display="inline"
                    sx={{
                        color: 'white',
                        letterSpacing: '0.16em'
                    }}
                >
                    PAYMENT
                </Typography>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={8} pr={5}>
                        <Typography
                            mb={2}
                            fontSize={{ md: 18, xs: 16 }}
                            variant="subtitle1"
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                letterSpacing: '0.05em'
                            }}
                        >
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
                        <Box
                            sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '4px',
                                p: { md: 3, xs: 2 }
                            }}
                        >
                            <Typography
                                fontWeight={700}
                                mb={2}
                                fontSize={{ md: 18, xs: 16 }}
                                variant="subtitle1"
                                sx={{
                                    color: 'white',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                Pricing Details:
                            </Typography>
                            <Stack spacing={1.5}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                        Total Items:
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                        {findSum(cart, 'quantity')}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                        Total MRP:
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                        ₹{inr(round(mrp))}/-
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: '#51cf66', fontSize: '0.95rem' }}>
                                        Discount on MRP:
                                    </Typography>
                                    <Typography sx={{ color: '#51cf66', fontSize: '0.95rem' }}>
                                        -₹{round(discount)}
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    pt={1.5}
                                    mt={1}
                                    sx={{ borderTop: '1px solid rgba(255,255,255,.08)' }}
                                >
                                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.05rem' }}>
                                        Total:
                                    </Typography>
                                    <Typography sx={{ color: '#efcb77', fontWeight: 700, fontSize: '1.05rem' }}>
                                        ₹{round(total)}/-
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    p={2}
                                    sx={{
                                        background: wallet >= total ? 'rgba(81,207,102,.1)' : 'rgba(255,107,107,.1)',
                                        border: wallet >= total ? '1px solid rgba(81,207,102,.3)' : '1px solid rgba(255,107,107,.3)',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                                        Wallet Balance:
                                    </Typography>
                                    <Typography sx={{ color: wallet >= total ? '#51cf66' : '#ff6b6b', fontWeight: 700, fontSize: '0.95rem' }}>
                                        ₹{inr(wallet)}/-
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.9rem' }}>
                                        {config.pvName}:
                                    </Typography>
                                    <Typography sx={{ color: '#efcb77', fontSize: '0.9rem', fontWeight: 600 }}>
                                        {round(cart.map(({ pv, quantity }) => pv * quantity).reduce((a, b) => a + b, 0))}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box mt={3}>
                                {wallet < total && (
                                    <Box
                                        mb={2}
                                        p={2}
                                        sx={{
                                            background: 'rgba(255,107,107,.1)',
                                            border: '1px solid rgba(255,107,107,.3)',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ff6b6b',
                                                fontWeight: 600,
                                                mb: 2,
                                                textAlign: 'center'
                                            }}
                                        >
                                            Insufficient Funds
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            component={Link}
                                            to="/dashboard/wallet-request"
                                            fullWidth
                                            aria-label="Raise Withdrawal Request"
                                            sx={{
                                                border: '1px solid #ff6b6b',
                                                color: '#ff6b6b',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    background: 'rgba(255,107,107,.1)',
                                                    borderColor: '#ff6b6b'
                                                }
                                            }}
                                        >
                                            Raise Withdrawal Request
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
                                    }}
                                    aria-label="Place Order"
                                    sx={{
                                        background: wallet < total
                                            ? 'rgba(255,255,255,.1)'
                                            : 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                        color: wallet < total ? 'rgba(255,255,255,.4)' : '#000',
                                        padding: { md: '18px 42px', xs: '16px 36px' },
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.22em',
                                        fontSize: { md: '0.78rem', xs: '0.72rem' },
                                        fontWeight: 700,
                                        boxShadow: wallet < total ? 'none' : '0 15px 35px rgba(221,180,93,.15)',
                                        transition: 'all 0.4s ease',
                                        borderRadius: 0,
                                        '&:hover': {
                                            transform: wallet < total ? 'none' : 'translateY(-5px)',
                                            boxShadow: wallet < total ? 'none' : '0 20px 50px rgba(221,180,93,.22)',
                                            background: wallet < total
                                                ? 'rgba(255,255,255,.1)'
                                                : 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
                                        },
                                        '&.Mui-disabled': {
                                            background: 'rgba(255,255,255,.1)',
                                            color: 'rgba(255,255,255,.4)'
                                        }
                                    }}
                                >
                                    Place Order
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default BrowserCheckout;
