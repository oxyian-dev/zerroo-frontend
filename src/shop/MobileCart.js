import { Button, FormControl, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IconArrowRight, IconInfoCircle, IconShoppingCart, IconX } from "@tabler/icons";
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
        <Box sx={{ background: '#020202', minHeight: '100vh', pb: 12 }}>
            <Box sx={{ px: 3, pt: 3 }}>
                {cart.length === 0 ? (
                    /* Empty Cart State */
                    <Box
                        sx={{
                            display: 'flex',
                            minHeight: '70vh',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Stack spacing={3} alignItems="center">
                            <IconShoppingCart 
                                size={80} 
                                style={{ 
                                    color: 'rgba(255,255,255,.3)'
                                }} 
                            />
                            <Typography
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    textAlign: 'center'
                                }}
                            >
                                Your cart is empty
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '0.95rem',
                                    color: 'rgba(255,255,255,.68)',
                                    textAlign: 'center'
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
                                    padding: '16px 36px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.22em',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                    transition: 'all 0.4s ease',
                                    borderRadius: 0,
                                    minHeight: '56px',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    }
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    /* Cart Items */
                    <Stack spacing={3}>
                        {cart.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                    border: '1px solid rgba(255,255,255,.08)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(221,180,93,.2)',
                                    }
                                }}
                            >
                                <Grid container>
                                    {/* Product Image */}
                                    <Grid item xs={4}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                aspectRatio: '1/1',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {item.combo_id ? (
                                                <WorkDriveImage 
                                                    image={item.images[0]}
                                                    alt={`${item.category} ${item.title} ${item.description}`} 
                                                />
                                            ) : (
                                                <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}>
                                                    <WorkDriveImage
                                                        image={item.images[0]}
                                                        alt={`${item.category} ${item.title} ${item.description}`} 
                                                    />
                                                </Link>
                                            )}
                                        </Box>
                                    </Grid>

                                    {/* Product Info */}
                                    <Grid item xs={8}>
                                        <Box sx={{ p: 2 }}>
                                            {item.combo_id ? (
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.7rem',
                                                            fontWeight: 700,
                                                            color: '#efcb77',
                                                            letterSpacing: '0.15em',
                                                            textTransform: 'uppercase',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: 600,
                                                            color: 'white',
                                                            mb: 0.5,
                                                            lineHeight: 1.3
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.8rem',
                                                            color: 'rgba(255,255,255,.68)',
                                                            mb: 1.5,
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                </React.Fragment>
                                            ) : (
                                                <Link 
                                                    to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.7rem',
                                                            fontWeight: 700,
                                                            color: '#efcb77',
                                                            letterSpacing: '0.15em',
                                                            textTransform: 'uppercase',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '1rem',
                                                            fontWeight: 600,
                                                            color: 'white',
                                                            mb: 0.5,
                                                            lineHeight: 1.3,
                                                            transition: 'color 0.3s ease',
                                                            '&:hover': {
                                                                color: '#efcb77'
                                                            }
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.8rem',
                                                            color: 'rgba(255,255,255,.68)',
                                                            mb: 1.5,
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                </Link>
                                            )}

                                            {/* Price */}
                                            <Box sx={{ mb: 1.5 }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1.1rem',
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
                                                                fontSize: '0.85rem',
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
                                                                fontSize: '0.65rem',
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

                                            {/* Size and Color */}
                                            <Box sx={{ mb: 2 }}>
                                                {item.size && (
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.8rem',
                                                            color: 'rgba(255,255,255,.68)',
                                                            display: 'inline',
                                                            mr: 2
                                                        }}
                                                    >
                                                        Size: <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{item.size}</Box>
                                                    </Typography>
                                                )}
                                                {item.color && (
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.8rem',
                                                            color: 'rgba(255,255,255,.68)',
                                                            display: 'inline'
                                                        }}
                                                    >
                                                        Color: <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{item.color}</Box>
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Quantity and Remove */}
                                            <Grid container spacing={1.5}>
                                                <Grid item xs={6}>
                                                    {!item.combo_id ? (
                                                        <FormControl size="small" fullWidth>
                                                            <Counter 
                                                                name={index} 
                                                                value={item.quantity} 
                                                                onChange={changeQuantity} 
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <PopoverAdornment
                                                            Icon={IconInfoCircle}
                                                            content="This is a combo item, removing this will remove all the items in the combo" 
                                                        />
                                                    )}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button 
                                                        value={index} 
                                                        startIcon={<IconX size={18} />} 
                                                        variant="text"
                                                        onClick={removeItem}
                                                        fullWidth
                                                        sx={{
                                                            color: '#ff6b6b',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600,
                                                            letterSpacing: '0.1em',
                                                            textTransform: 'uppercase',
                                                            minHeight: '44px',
                                                            '&:hover': {
                                                                background: 'rgba(255,107,107,.1)',
                                                                color: '#ff6b6b'
                                                            }
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>

            {/* Fixed Bottom Checkout Bar */}
            {cart.length > 0 && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0,0,0,.85)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderTop: '1px solid rgba(255,255,255,.08)',
                        p: 2,
                        zIndex: 1000
                    }}
                >
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
                            padding: '16px 36px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                            transition: 'all 0.4s ease',
                            borderRadius: 0,
                            minHeight: '56px',
                            '&:hover': {
                                transform: 'translateY(-3px)',
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
                </Box>
            )}
        </Box>
    )
}

export default MobileCart;

// Made with Bob