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
        <Box m={1}>
            <Typography fontWeight={600} mb={1} fontSize={18} variant="subtitle1">
                Pricing Details:
            </Typography>
            <Stack spacing={0.5}>
                <Typography>Total Items: {findSum(cart, 'quantity')}</Typography>
                <Typography>
                    Total MRP: ₹{getTotalMrp()}
                </Typography>
                {getDiscountOnMRP() != 0 && (
                    <Typography>
                        Discount on MRP:
                        ₹{getDiscountOnMRP()}
                    </Typography>)}
                <Typography>
                    Shipping: ₹{shipping}/-
                </Typography>
                <Typography>
                    Total: ₹{total}/-
                </Typography>
                <Typography>
                    Wallet Balance: ₹{inr(wallet)}
                </Typography>
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
                <Typography>
                    {config.pvName}: {round(cart.map(({ pv, quantity }) => pv * quantity).reduce((a, b) => a + b, 0))}
                </Typography>
            </Stack>
            <Box mt={2}>
                <LoadingButton
                    disabled={wallet < total}
                    loading={loading}
                    startIcon={<IconCash />}
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        makePayment()
                    }}>
                    Make Payment
                </LoadingButton>
            </Box>
        </Box>
    )
}
export default MobileCheckout