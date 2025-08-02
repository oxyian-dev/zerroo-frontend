import {
    Box,
    Button,
    Container,
    FormControl,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { IconArrowRight, IconShoppingCart, IconX } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { isLoggedIn } from "../auth/AuthProvider";
import Counter from "../components/Counter";
import Loader from "../components/Loader";
import config from "../config";
import { changeCartQuantity, getCart, getCartCount, removeCartItem } from "../utils/CartUtil";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, findSum, href, round } from "../utils/util";

const BrowserCart = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [setLayout, layout] = useOutletContext()

    useEffect(() => {
        if (isLoggedIn()) {
            fetcher('/api/carts')
                .then(r => r.json())
                .then(({ carts }) => {
                    setCart(carts)
                    setLoading(false)
                })
                .finally()
        } else {
            setCart(getCart())
            setLoading(false)
        }
    }, [])

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
                    }
                })
                .finally(() => {
                    setLayout({ ...layout, cart_count: layout.cart_count - 1 })
                })
        } else {
            removeCartItem(target.value)
            setCart(getCart())
            setLayout({ ...layout, cart_count: getCartCount() })
        }
    }

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
                        setLayout({ ...layout, cart_count: findSum(res['carts'], 'quantity') })
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

    return (
        loading ? (
            <Loader />
        ) : (
            <Container sx={{ my: '3rem' }}>
                <Box my={3} textAlign="center">
                    <Typography fontWeight="bold" fontSize={18} mr={2} display="inline">CART</Typography>
                    ---------------
                    <Typography fontSize={18} mx={1} display="inline">ADDRESS</Typography>
                    ---------------
                    <Typography fontSize={18} ml={2} display="inline">PAYMENT</Typography>
                </Box>
                <Typography variant="subtitle1" fontSize={24}>
                    Your Cart Items
                </Typography>
                {cart.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell width={350}>Item Name</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Subtotal</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {item.combo_id ? (
                                                <WorkDriveImage width={100} image={item.images[0]}
                                                    alt={`${item.category} ${item.title} ${item.description}`} />
                                            ) : (
                                                <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}>
                                                    <WorkDriveImage width={100} image={item.images[0]}
                                                        alt={`${item.category} ${item.title} ${item.description}`} />
                                                </Link>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.combo_id ? (
                                                <Typography variant='h3'>{item.title}</Typography>
                                            ) : (
                                                <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}
                                                    style={{ textDecoration: 'none' }}>
                                                    <Typography variant='h3'>{item.title}</Typography>
                                                    {isLoggedIn() && (
                                                        <Typography>{config.pvName}: {item.pv}</Typography>
                                                    )}
                                                </Link>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Typography noWrap variant='subtitle1'>{item.size}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography noWrap overflow='hidden' display='inline'
                                                variant="subtitle1">₹{item.price}</Typography>
                                            {item.discount !== 0 && (
                                                <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                    variant='subtitle1'
                                                    sx={{ textDecoration: 'line-through' }}>₹{item.mrp}</Typography>
                                            )}
                                            {item.discount !== 0 && (
                                                <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                    color={orange[700]}>
                                                    ({item.discount}% OFF)
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <FormControl size="medium" fullWidth>
                                                <Counter disabled={Boolean(item.combo_id)} name={index} value={item.quantity} onChange={changeQuantity} />
                                                {item.combo_id && (
                                                    <Typography>Combo Item's quantity cannot be changed</Typography>
                                                )}
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <Typography noWrap overflow='hidden' display='inline'
                                                variant="subtitle1">₹{round(item.quantity * item.price)}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button value={index} startIcon={<IconX />} variant="text" color="error"
                                                onClick={removeItem}>
                                                Remove
                                            </Button>
                                            {item.combo_id && (
                                                <Typography>
                                                    This is a combo item, removing this will remove all the items in the combo
                                                </Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} colSpan={4} />
                                    <TableCell colSpan={2}>Total MRP</TableCell>
                                    <TableCell>
                                        ₹{round(cart.map(({ mrp, quantity }) => mrp * quantity).reduce((a, b) => a + b, 0))}/-
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total Discount</TableCell>
                                    <TableCell>
                                        ₹{round(cart.map(({ discount, quantity }) => discount * quantity).reduce((a, b) => a + b, 0))}/-
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell>
                                        ₹{round(cart.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0))}/-
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box mb={2}>
                        <Button
                            component={Link}
                            to="/"
                            variant="contained"
                            size="large"
                            fullWidth endIcon={<IconShoppingCart />}>
                            Continue Shopping
                        </Button>
                    </Box>
                )}
                {isLoggedIn() ? (
                    <Button
                        disabled={cart.length === 0}
                        component={Link}
                        to="/address"
                        variant="contained"
                        size="large"
                        fullWidth endIcon={<IconArrowRight />}>
                        Select Address
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        to="/login?ref=/address"
                        variant="contained"
                        size="large"
                        fullWidth endIcon={<IconArrowRight />}>
                        Login to Continue
                    </Button>
                )}
            </Container>
        ))
}

export default BrowserCart