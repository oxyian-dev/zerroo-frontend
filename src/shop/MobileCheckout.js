import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControlLabel, FormGroup, Paper, Stack, Switch, Typography } from "@mui/material";
import { IconCash } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import fetcher from "../utils/fetcher";
import { findSum, inr, round } from "../utils/util";

const MobileCheckout = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [wallet, setWallet] = useState(0)
    const navigate = useNavigate()

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
            .catch((e) => {
                console.error(e)
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setLoading(false)
            })
    }

    useEffect(() => {
        fetcher('/api/carts')
            .then(r => r.json())
            .then(({ carts, purchase_wallet }) => {
                setWallet(purchase_wallet)
                setCart(carts)
            })
    }, [])

    const getTotalMrp = useMemo(() => {
        return () => cart.map(({ mrp, quantity }) => mrp * quantity).reduce((a, b) => a + b, 0)
    }, [cart])

    const getDiscountOnMRP = useMemo(() => {
        return () => cart.map(({ discount, quantity }) => discount * quantity).reduce((a, b) => a + b, 0)
    }, [cart])

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('price', total)
        params.set('address', sessionStorage.getItem('address'))
        fetcher(`/api/purchases/shipping?${params.toString()}`)
            .then(r => r.json())
            .then(({ shipping_charge }) => {
                setShipping(shipping_charge)
            })
    }, [cart])

    useEffect(() => {
        const total = cart.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0) + (shipping);
        setTotal(total)
    }, [cart])

    return (
        <Box p={3}>
            <Box
                sx={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                    border: '1px solid rgba(255,255,255,.08)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '4px',
                    p: 2
                }}
            >
                <Typography
                    fontWeight={700}
                    mb={2}
                    variant="subtitle1"
                    sx={{
                        color: 'white',
                        fontSize: '1rem',
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
                            ₹{getTotalMrp()}
                        </Typography>
                    </Box>
                    {getDiscountOnMRP() != 0 && (
                        <Box display="flex" justifyContent="space-between">
                            <Typography sx={{ color: '#51cf66', fontSize: '0.95rem' }}>
                                Discount on MRP:
                            </Typography>
                            <Typography sx={{ color: '#51cf66', fontSize: '0.95rem' }}>
                                -₹{getDiscountOnMRP()}
                            </Typography>
                        </Box>
                    )}
                    <Box display="flex" justifyContent="space-between">
                        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                            Shipping:
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                            ₹{shipping}/-
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
                            ₹{total}/-
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
                            ₹{inr(wallet)}
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
                {wallet < total && (
                    <Box
                        mt={2}
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
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}
                        >
                            Insufficient Funds
                        </Typography>
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/dashboard/wallet-request"
                            fullWidth
                            aria-label="Raise Wallet Request"
                            sx={{
                                border: '1px solid #ff6b6b',
                                color: '#ff6b6b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                minHeight: '44px',
                                '&:hover': {
                                    background: 'rgba(255,107,107,.1)',
                                    borderColor: '#ff6b6b'
                                }
                            }}
                        >
                            Raise Wallet Request
                        </Button>
                    </Box>
                )}
                <Box mt={3}>
                    <LoadingButton
                        disabled={wallet < total}
                        loading={loading}
                        startIcon={<IconCash />}
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            makePayment()
                        }}
                        aria-label="Make Payment"
                        sx={{
                            background: wallet < total
                                ? 'rgba(255,255,255,.1)'
                                : 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                            color: wallet < total ? 'rgba(255,255,255,.4)' : '#000',
                            padding: '16px 36px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.22em',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            boxShadow: wallet < total ? 'none' : '0 15px 35px rgba(221,180,93,.15)',
                            transition: 'all 0.4s ease',
                            borderRadius: 0,
                            minHeight: '44px',
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
                        Make Payment
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    )
}
export default MobileCheckout