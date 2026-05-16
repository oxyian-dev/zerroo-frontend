import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { IconArrowRight, IconShoppingCart, IconX } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { isLoggedIn } from "../auth/AuthProvider";
import Counter from "../components/Counter";
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

    return loading ? (
        <Box 
            sx={{ 
                background: '#020202', 
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <CircularProgress sx={{ color: '#efcb77' }} size={60} />
        </Box>
    ) : (
        <Box sx={{ background: '#020202', minHeight: '100vh', py: { md: 10, xs: 6 } }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                {/* Progress Indicator */}
                <Box 
                    sx={{ 
                        mb: { md: 8, xs: 6 }, 
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { md: '0.9rem', xs: '0.8rem' },
                            fontWeight: 700,
                            color: '#efcb77',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase'
                        }}
                    >
                        Cart
                    </Typography>
                    <Box
                        sx={{
                            width: { md: '60px', xs: '40px' },
                            height: '2px',
                            background: 'rgba(255,255,255,.15)'
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: { md: '0.9rem', xs: '0.8rem' },
                            fontWeight: 600,
                            color: 'rgba(255,255,255,.5)',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase'
                        }}
                    >
                        Address
                    </Typography>
                    <Box
                        sx={{
                            width: { md: '60px', xs: '40px' },
                            height: '2px',
                            background: 'rgba(255,255,255,.15)'
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: { md: '0.9rem', xs: '0.8rem' },
                            fontWeight: 600,
                            color: 'rgba(255,255,255,.5)',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase'
                        }}
                    >
                        Payment
                    </Typography>
                </Box>

                {/* Page Title */}
                <Typography
                    sx={{
                        fontSize: { md: 'clamp(2rem, 4vw, 3.5rem)', xs: 'clamp(1.5rem, 6vw, 2rem)' },
                        lineHeight: 1.1,
                        fontWeight: 700,
                        color: 'white',
                        mb: { md: 6, xs: 4 },
                        letterSpacing: '-0.03em'
                    }}
                >
                    Your Cart Items
                </Typography>

                {cart.length > 0 ? (
                    <>
                        {/* Cart Table */}
                        <TableContainer
                            sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '4px',
                                mb: 4,
                                overflow: 'hidden'
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            background: 'rgba(255,255,255,.03)',
                                            borderBottom: '1px solid rgba(255,255,255,.08)'
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)',
                                                py: 3
                                            }}
                                        >
                                            Image
                                        </TableCell>
                                        <TableCell
                                            width={350}
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)'
                                            }}
                                        >
                                            Item Name
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)'
                                            }}
                                        >
                                            Size
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)'
                                            }}
                                        >
                                            Price
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)'
                                            }}
                                        >
                                            Quantity
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)'
                                            }}
                                        >
                                            Subtotal
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 700,
                                                fontSize: '1.05rem',
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                borderBottom: '1px solid rgba(255,255,255,.08)'
                                            }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: 'rgba(255,255,255,.02)'
                                                }
                                            }}
                                        >
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)',
                                                    py: 3
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '100px',
                                                        height: '100px',
                                                        overflow: 'hidden',
                                                        borderRadius: '4px',
                                                        border: '1px solid rgba(255,255,255,.08)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            borderColor: 'rgba(221,180,93,.3)',
                                                        }
                                                    }}
                                                >
                                                    {item.combo_id ? (
                                                        <WorkDriveImage 
                                                            width={100} 
                                                            image={item.images[0]}
                                                            alt={`${item.category} ${item.title} ${item.description}`} 
                                                        />
                                                    ) : (
                                                        <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}>
                                                            <WorkDriveImage 
                                                                width={100} 
                                                                image={item.images[0]}
                                                                alt={`${item.category} ${item.title} ${item.description}`} 
                                                            />
                                                        </Link>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                {item.combo_id ? (
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: 600,
                                                            color: 'white',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                ) : (
                                                    <Link 
                                                        to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1rem',
                                                                fontWeight: 600,
                                                                color: 'white',
                                                                mb: 0.5,
                                                                transition: 'color 0.3s ease',
                                                                '&:hover': {
                                                                    color: '#efcb77'
                                                                }
                                                            }}
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                        {isLoggedIn() && (
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.78rem',
                                                                    color: '#efcb77',
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                {config.pvName}: {item.pv}
                                                            </Typography>
                                                        )}
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        color: 'rgba(255,255,255,.82)'
                                                    }}
                                                >
                                                    {item.size}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: 700,
                                                            color: 'white',
                                                            display: 'inline',
                                                            mr: 1
                                                        }}
                                                    >
                                                        ₹{item.price}
                                                    </Typography>
                                                    {item.discount !== 0 && (
                                                        <>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.78rem',
                                                                    color: 'rgba(255,255,255,.5)',
                                                                    textDecoration: 'line-through',
                                                                    display: 'inline',
                                                                    mr: 1
                                                                }}
                                                            >
                                                                ₹{item.mrp}
                                                            </Typography>
                                                            <Box
                                                                component="span"
                                                                sx={{
                                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                                                    color: '#000',
                                                                    px: 1,
                                                                    py: 0.25,
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: 700,
                                                                    letterSpacing: '0.05em',
                                                                    borderRadius: '2px',
                                                                    display: 'inline-block'
                                                                }}
                                                            >
                                                                {item.discount}% OFF
                                                            </Box>
                                                        </>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <FormControl size="medium" fullWidth>
                                                    <Counter 
                                                        disabled={Boolean(item.combo_id)} 
                                                        name={index} 
                                                        value={item.quantity} 
                                                        onChange={changeQuantity} 
                                                    />
                                                    {item.combo_id && (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '0.78rem',
                                                                color: 'rgba(255,255,255,.5)',
                                                                mt: 1
                                                            }}
                                                        >
                                                            Combo quantity cannot be changed
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '1.05rem',
                                                        fontWeight: 700,
                                                        color: 'white'
                                                    }}
                                                >
                                                    ₹{round(item.quantity * item.price)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <Button 
                                                    value={index} 
                                                    startIcon={<IconX />} 
                                                    variant="text"
                                                    onClick={removeItem}
                                                    sx={{
                                                        color: '#ff6b6b',
                                                        fontSize: '0.78rem',
                                                        fontWeight: 600,
                                                        letterSpacing: '0.22em',
                                                        textTransform: 'uppercase',
                                                        '&:hover': {
                                                            background: 'rgba(255,107,107,.1)',
                                                            color: '#ff6b6b'
                                                        }
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                                {item.combo_id && (
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.78rem',
                                                            color: 'rgba(255,255,255,.5)',
                                                            mt: 1
                                                        }}
                                                    >
                                                        Removing this will remove all combo items
                                                    </Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {/* Summary Rows */}
                                    <TableRow>
                                        <TableCell 
                                            rowSpan={3} 
                                            colSpan={4}
                                            sx={{ borderBottom: 'none' }}
                                        />
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                borderBottom: '1px solid rgba(255,255,255,.08)',
                                                color: 'rgba(255,255,255,.82)',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                py: 2
                                            }}
                                        >
                                            Total MRP
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: '1px solid rgba(255,255,255,.08)',
                                                color: 'white',
                                                fontSize: '1.05rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            ₹{round(cart.map(({ mrp, quantity }) => mrp * quantity).reduce((a, b) => a + b, 0))}/-
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                borderBottom: '1px solid rgba(255,255,255,.08)',
                                                color: 'rgba(255,255,255,.82)',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                py: 2
                                            }}
                                        >
                                            Total Discount
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: '1px solid rgba(255,255,255,.08)',
                                                color: '#51cf66',
                                                fontSize: '1.05rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            -₹{round(cart.map(({ discount, quantity }) => discount * quantity).reduce((a, b) => a + b, 0))}/-
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                borderBottom: 'none',
                                                color: '#efcb77',
                                                fontSize: '1.05rem',
                                                fontWeight: 700,
                                                letterSpacing: '0.16em',
                                                textTransform: 'uppercase',
                                                py: 3
                                            }}
                                        >
                                            Total Amount
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderBottom: 'none',
                                                color: '#efcb77',
                                                fontSize: '1.25rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            ₹{round(cart.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0))}/-
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Checkout Button */}
                        {isLoggedIn() ? (
                            <Button
                                disabled={cart.length === 0}
                                component={Link}
                                to="/address"
                                variant="contained"
                                size="large"
                                fullWidth
                                endIcon={<IconArrowRight />}
                                sx={{
                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    color: '#000',
                                    padding: '18px 42px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.22em',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                    transition: 'all 0.4s ease',
                                    borderRadius: 0,
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(255,255,255,.1)',
                                        color: 'rgba(255,255,255,.4)'
                                    }
                                }}
                            >
                                Select Address
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to="/login?ref=/address"
                                variant="contained"
                                size="large"
                                fullWidth
                                endIcon={<IconArrowRight />}
                                sx={{
                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    color: '#000',
                                    padding: '18px 42px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.22em',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                    transition: 'all 0.4s ease',
                                    borderRadius: 0,
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    }
                                }}
                            >
                                Login to Continue
                            </Button>
                        )}
                    </>
                ) : (
                    /* Empty Cart State */
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 12,
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                            borderRadius: '4px'
                        }}
                    >
                        <IconShoppingCart 
                            size={80} 
                            style={{ 
                                color: 'rgba(255,255,255,.3)',
                                marginBottom: '24px'
                            }} 
                        />
                        <Typography
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: 'white',
                                mb: 2
                            }}
                        >
                            Your cart is empty
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                color: 'rgba(255,255,255,.68)',
                                mb: 4
                            }}
                        >
                            Add items to get started
                        </Typography>
                        <Button
                            component={Link}
                            to="/"
                            variant="contained"
                            size="large"
                            endIcon={<IconShoppingCart />}
                            sx={{
                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                color: '#000',
                                padding: '18px 42px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                transition: 'all 0.4s ease',
                                borderRadius: 0,
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                }
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default BrowserCart;

// Made with Bob