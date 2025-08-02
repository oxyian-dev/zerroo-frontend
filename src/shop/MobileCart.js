import { Button, FormControl, Grid, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Box } from "@mui/system";
import { IconArrowRight, IconInfoCircle, IconX } from "@tabler/icons";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { isLoggedIn } from "../auth/AuthProvider";
import Counter from "../components/Counter";
import PopoverAdornment from "../components/PopoverAdornment";
import { changeCartQuantity, getCart, getCartCount, removeCartItem } from "../utils/CartUtil";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, findSum, href } from "../utils/util";

const MobileCart = () => {
    const [setLayout, layout] = useOutletContext()
    const [cart, setCart] = useState([])

    const { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        setLayout({ ...layout, title: 'Cart', back: false })
        if (isLoggedIn()) {
            fetcher('/api/carts')
                .then(r => r.json())
                .then(({ carts }) => {
                    setCart(carts)
                })
                .finally()
        } else {
            setCart(getCart())
        }
    }, [])

    const changeQuantity = ({ target }) => {
        if (isLoggedIn()) {
            let item = cart[target.name].item, quantity = target.value
            const body = new FormData()
            body.set('item', item)
            body.set('quantity', quantity)
            const tempCart = cart;
            fetcher('/api/carts/quantity', { method: 'put', body })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        setCart(res['carts'])
                    } else {
                        setCart(tempCart)
                        enqueueSnackbar('Error occurred try again', { variant: 'error' })
                    }
                })
        } else {
            changeCartQuantity(target.name, target.value)
            setCart(getCart())
        }
    }

    const removeItem = ({ target }) => {
        if (isLoggedIn()) {
            const form = new FormData()
            const { item, unique_id } = cart[target.value]
            form.set('item', item)
            if (unique_id) {
                form.set('uid', unique_id)
            }
            fetcher(`/api/carts`, { method: 'DELETE', body: form })
                .then(r => r.json())
                .then(({ status, carts }) => {
                    if (status === 'success') {
                        setCart(carts)
                        setLayout({ ...layout, cart_count: findSum(carts, 'quantity') })
                    }
                })
        } else {
            removeCartItem(target.value)
            setCart(getCart())
            setLayout({ ...layout, cart_count: getCartCount() })
        }
    }

    return (
        <Box>
            <Box mb={6}>
                {cart.length === 0 ? (
                    <Box display="flex" height="80vh" justifyContent="center" alignItems="center">
                        <Stack spacing={2}>
                            <Typography variant="button" fontSize={20}>Your cart is empty 😞</Typography>
                            <Button component={Link} to="/" variant="outlined" size="large">Go Back to Shopping</Button>
                        </Stack>
                    </Box>
                ) : cart.map((item, index) => (
                    <Box key={index}>
                        <Grid container>
                            <Grid item xs={4} p={1}>
                                {item.combo_id ? (
                                    <WorkDriveImage image={item.images[0]}
                                        alt={`${item.category} ${item.title} ${item.description}`} />
                                ) : (
                                    <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}>
                                        <WorkDriveImage
                                            image={item.images[0]}
                                            alt={`${item.category} ${item.title} ${item.description}`} />
                                    </Link>
                                )}

                            </Grid>
                            <Grid item xs={8} p={1}>
                                {item.combo_id ? (
                                    <React.Fragment>
                                        <Typography variant='h5'>{item.brand}</Typography>
                                        <Typography variant='h4'>{item.title}</Typography>
                                        <Typography variant='subtitle2'>{item.description}</Typography>
                                        <Typography noWrap overflow='hidden' display='inline'
                                            variant="subtitle1">₹{item.price}</Typography>
                                        {item.discount !== 0 && (
                                            <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                variant='subtitle1' sx={{ textDecoration: 'line-through' }}>₹{item.mrp}</Typography>
                                        )}
                                        {item.discount !== 0 && (
                                            <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                color={orange[700]}>({item.discount}% OFF)
                                            </Typography>)}
                                        {item.size && (
                                            <Typography ml={1} display='inline'>Size: {item.size}</Typography>)}
                                        {item.color && (
                                            <Typography ml={1} display='inline'>Color: {item.color}</Typography>)}
                                    </React.Fragment>
                                ) : (
                                    <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}
                                        style={{ textDecoration: 'none' }}>
                                        <Typography variant='h5'>{item.brand}</Typography>
                                        <Typography variant='h4'>{item.title}</Typography>
                                        <Typography variant='subtitle2'>{item.description}</Typography>
                                        <Typography noWrap overflow='hidden' display='inline'
                                            variant="subtitle1">₹{item.price}</Typography>
                                        {item.discount !== 0 && (
                                            <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                variant='subtitle1' sx={{ textDecoration: 'line-through' }}>₹{item.mrp}</Typography>
                                        )}
                                        {item.discount !== 0 && (
                                            <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                color={orange[700]}>({item.discount}% OFF)
                                            </Typography>
                                        )}
                                        {item.size && (
                                            <Typography ml={1} display='inline'>Size: {item.size}</Typography>
                                        )}
                                        {item.color && (
                                            <Typography ml={1} display='inline'>Color: {item.color}</Typography>
                                        )}
                                    </Link>
                                )}

                                <Grid container spacing={1} mt={1}>
                                    <Grid item xs={6}>
                                        {!item.combo_id && (<FormControl size="small" fullWidth>
                                            <Counter name={index} value={item.quantity} onChange={changeQuantity} />
                                        </FormControl>)}
                                        {item.combo_id && (
                                            <PopoverAdornment
                                                Icon={IconInfoCircle}
                                                content="This is a combo item, removing this will remove all the items in the combo" />
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button value={index} startIcon={<IconX />} variant="text" color="error"
                                            onClick={removeItem}>
                                            Remove
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>
            <Box p={1} mt={2} bgcolor="white">
                <Button disabled={cart.length === 0} component={Link} to="/address" variant="contained" size="large"
                    fullWidth endIcon={<IconArrowRight />}>
                    Select Address
                </Button>
            </Box>
        </Box>
    )
}
export default MobileCart;