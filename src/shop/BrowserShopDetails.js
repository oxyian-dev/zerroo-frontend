import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { IconArrowRight, IconShoppingCartPlus } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { isLoggedIn, isOrgUser } from "../auth/AuthProvider";
import config from "../config";
import { addToCart, getCart, getCartCount } from "../utils/CartUtil";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, href } from "../utils/util";
import ColorButton from "./ColorButton";
import SizeButton from "./SizeButton";

const BrowserShopDetails = () => {
    const { id } = useParams()
    const [item, setItem] = useState({})
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const [itemError, setItemError] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const [specifications, setSpecifications] = useState([])
    const [setLayout, layout] = useOutletContext()

    useEffect(() => {
        setLoading(true)
        setItemError(null)
        fetcher(`/api/listing/items/${id}`)
            .then(r => r.json())
            .then(data => {
                if (!data || !data.item || !data.item.id) {
                    throw new Error('Item details are unavailable')
                }
                setItem(data.item)
                setSizes(Array.isArray(data.sizes) ? data.sizes : [])
                setColors(Array.isArray(data.colors) ? data.colors : [])
                setSpecifications(Array.isArray(data.specifications) ? data.specifications : [])
                if (isLoggedIn()) {
                    fetcher('/api/carts')
                        .then(r => r.json())
                        .then(({ carts }) => {
                            setAddedToCart(carts.map(({ item }) => item).indexOf(parseInt(id)) > -1)
                        })
                } else {
                    setAddedToCart(getCart().map(({ item }) => item).indexOf(parseInt(id)) > -1)
                }
            })
            .catch((error) => {
                console.log(error)
                setItem({})
                setSizes([])
                setColors([])
                setSpecifications([])
                setItemError('This product is unavailable right now.')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    function add() {
        if (!item?.id) {
            enqueueSnackbar('This product is unavailable right now.', { variant: 'error' })
            return
        }
        setSubmitting(true)
        if (isLoggedIn()) {
            const body = new FormData()
            body.set('item', item.id)
            fetcher('/api/carts', { method: 'POST', body: body })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        enqueueSnackbar('Item added to Cart', { variant: 'success' })
                    }
                })
                .finally(() => {
                    setSubmitting(false)
                    setAddedToCart(true)
                    setLayout({ ...layout, cart_count: (layout.cart_count || 0) + 1 })
                })
        } else {
            addToCart({
                type: 'item',
                item: item.id,
                title: item.title,
                description: item.description,
                category: item.category,
                brand: item.brand,
                price: item.price,
                mrp: item.mrp,
                discount: item.discount,
                images: item.images,
                quantity: 1,
                size: item.size,
                size_id: item.size_id,
                sizes: sizes,
                color: item.color,
                color_id: item.color_id,
                hex: item.hex,
                time: new Date().getTime()
            })
            setSubmitting(false)
            setAddedToCart(true)
            setLayout({ ...layout, cart_count: getCartCount() })
        }
    }

    return loading ? (
        <Box sx={{ background: '#020202', minHeight: '100vh', py: { md: 10, xs: 6 } }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                <Grid container spacing={{ md: 6, xs: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                aspectRatio: '1/1'
                            }}
                        >
                            <Skeleton 
                                variant="rectangular" 
                                width="100%" 
                                height="100%"
                                sx={{ 
                                    bgcolor: 'rgba(255,255,255,.1)',
                                    borderRadius: 0
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '4px',
                                p: { md: 6, xs: 4 }
                            }}
                        >
                            <Stack spacing={3}>
                                <Skeleton 
                                    variant="text" 
                                    width="40%" 
                                    height={40}
                                    sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                />
                                <Skeleton 
                                    variant="text" 
                                    width="80%" 
                                    height={60}
                                    sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                />
                                <Skeleton 
                                    variant="text" 
                                    width="90%" 
                                    height={30}
                                    sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                />
                                <Skeleton 
                                    variant="text" 
                                    width="50%" 
                                    height={50}
                                    sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Skeleton 
                                        variant="circular" 
                                        width={50} 
                                        height={50}
                                        sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                    />
                                    <Skeleton 
                                        variant="circular" 
                                        width={50} 
                                        height={50}
                                        sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                    />
                                    <Skeleton 
                                        variant="circular" 
                                        width={50} 
                                        height={50}
                                        sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                                    />
                                </Box>
                                <Skeleton 
                                    variant="rectangular" 
                                    width="100%" 
                                    height={60}
                                    sx={{ bgcolor: 'rgba(255,255,255,.1)', borderRadius: 0 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    ) : itemError ? (
        <Box sx={{ background: '#020202', minHeight: '100vh', py: { md: 10, xs: 6 } }}>
            <Container maxWidth={false} sx={{ maxWidth: '900px', px: { md: 10, xs: 3 } }}>
                <Box
                    sx={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                        border: '1px solid rgba(255,255,255,.08)',
                        borderRadius: '4px',
                        p: { md: 6, xs: 4 },
                        textAlign: 'center'
                    }}
                >
                    <Typography sx={{ color: 'white', fontSize: { md: '1.4rem', xs: '1.2rem' }, mb: 1.5, fontWeight: 700 }}>
                        Product Not Available
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,.68)', mb: 3 }}>
                        {itemError}
                    </Typography>
                    <Button component={Link} to="/shop" variant="outlined" sx={{ color: '#efcb77', borderColor: 'rgba(239,203,119,.4)' }}>
                        Back to Shop
                    </Button>
                </Box>
            </Container>
        </Box>
    ) : (
        <Box sx={{ background: '#020202', minHeight: '100vh', py: { md: 10, xs: 6 } }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                <Grid container spacing={{ md: 6, xs: 4 }}>
                    {/* Product Images */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: 'rgba(221,180,93,.3)',
                                },
                                '& .carousel .slide img': {
                                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                },
                                '& .carousel:hover .slide img': {
                                    transform: 'scale(1.05)',
                                },
                                '& .carousel .control-arrow': {
                                    background: 'rgba(0,0,0,.5)',
                                    backdropFilter: 'blur(8px)',
                                    '&:hover': {
                                        background: 'rgba(0,0,0,.7)',
                                    }
                                },
                                '& .carousel .thumbs-wrapper': {
                                    margin: '20px 0',
                                },
                                '& .carousel .thumb': {
                                    border: '2px solid rgba(255,255,255,.08)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(221,180,93,.3)',
                                    },
                                    '&.selected': {
                                        borderColor: '#efcb77',
                                    }
                                }
                            }}
                        >
                            {item.images?.length > 1 ? (
                                <Carousel
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    showArrows={true}
                                    swipeable={true}
                                    showStatus={false}
                                    interval={5000}
                                    transitionTime={600}
                                    renderThumbs={() => (
                                        item?.images.map((image, id) => (
                                            <WorkDriveImage
                                                key={id}
                                                image={image}
                                                alt={`${item.title} ${item.description}`}
                                            />
                                        )))}
                                >
                                    {item.images?.map(image => (
                                        <WorkDriveImage
                                            image={image}
                                            alt={`${item.title} ${item.description}`}
                                            key={image} />
                                    ))}
                                </Carousel>
                            ) : (
                                <WorkDriveImage
                                    key={id}
                                    image={item.images?.[0]}
                                    alt={`${item.title} ${item.description}`}
                                />
                            )}
                        </Box>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '4px',
                                p: { md: 6, xs: 4 },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Brand */}
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.25em',
                                    fontSize: { md: '0.85rem', xs: '0.75rem' },
                                    fontWeight: 700,
                                    color: '#efcb77',
                                    mb: 2
                                }}
                            >
                                {item.brand}
                            </Typography>

                            {/* Title */}
                            <Typography
                                sx={{
                                    fontSize: { md: 'clamp(1.8rem, 3vw, 2.5rem)', xs: '1.5rem' },
                                    lineHeight: 1.2,
                                    fontWeight: 700,
                                    color: 'white',
                                    mb: 3,
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                {item.title}
                            </Typography>

                            {/* Description */}
                            <Typography
                                sx={{
                                    fontSize: { md: '1.05rem', xs: '0.95rem' },
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,.68)',
                                    mb: 4
                                }}
                            >
                                {item.description}
                            </Typography>

                            {/* Price Section */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <Typography
                                        sx={{
                                            fontSize: { md: '2.5rem', xs: '2rem' },
                                            fontWeight: 700,
                                            color: 'white'
                                        }}
                                    >
                                        ₹{item.price}
                                    </Typography>
                                    {item.discount > 0 && (
                                        <>
                                            <Typography
                                                sx={{
                                                    fontSize: { md: '1.5rem', xs: '1.2rem' },
                                                    color: 'rgba(255,255,255,.5)',
                                                    textDecoration: 'line-through'
                                                }}
                                            >
                                                ₹{item.mrp}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                                    color: '#000',
                                                    px: 2,
                                                    py: 0.5,
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.1em',
                                                    borderRadius: '2px'
                                                }}
                                            >
                                                {item.discount}% OFF
                                            </Box>
                                        </>
                                    )}
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: '0.85rem',
                                        color: '#51cf66',
                                        fontWeight: 600
                                    }}
                                >
                                    Inclusive of all taxes
                                </Typography>
                                {isLoggedIn() && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.95rem',
                                            color: '#efcb77',
                                            fontWeight: 600,
                                            mt: 1
                                        }}
                                    >
                                        {config.pvName}: {item.pv}
                                    </Typography>
                                )}
                            </Box>

                            {/* Colors */}
                            {colors.length > 0 && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: 'white',
                                            mb: 2
                                        }}
                                    >
                                        Colour:
                                    </Typography>
                                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                                        {colors.map(({
                                            color_id,
                                            color,
                                            hex,
                                            title
                                        }) => color_id === item['color_id'] ? (
                                            <ColorButton
                                                selected={true}
                                                disableElevation
                                                disableRipple
                                                hex={hex}
                                                color={color}
                                                key={color_id}
                                            />
                                        ) : (
                                            <ColorButton
                                                component={Link}
                                                hex={hex}
                                                key={color_id}
                                                color={color}
                                                to={`/p/${id}/${href(item.category)}/${href(title)}`}
                                                replace={true}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {/* Sizes */}
                            {sizes.length > 0 && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: 'white',
                                            mb: 2
                                        }}
                                    >
                                        Select Size:
                                    </Typography>
                                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                                        {sizes.map(({
                                            id,
                                            size_id,
                                            size,
                                            title
                                        }) => size_id === item['size_id'] ? (
                                            <SizeButton
                                                disableElevation
                                                disableRipple
                                                key={id}
                                                selected={true}
                                                variant="contained">{size}</SizeButton>
                                        ) : (
                                            <SizeButton
                                                component={Link}
                                                to={`/p/${id}/${href(item.category)}/${href(title)}`}
                                                replace={true}
                                                key={id}
                                                variant="outlined">
                                                {size}
                                            </SizeButton>
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {/* Stock Warning */}
                            {item.quantity <= 5 && item.quantity !== 0 && (
                                <Typography
                                    sx={{
                                        fontSize: '0.9rem',
                                        color: '#ff6b6b',
                                        fontWeight: 600,
                                        mb: 3
                                    }}
                                >
                                    Only {item.quantity} available
                                </Typography>
                            )}

                            {/* Specifications */}
                            {specifications.length > 0 && (
                                <Box sx={{ mb: 4 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1.2rem',
                                            fontWeight: 700,
                                            color: 'white',
                                            mb: 2
                                        }}
                                    >
                                        Specifications:
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {specifications.map(({ id, specification, value }) => (
                                            <Box
                                                key={id}
                                                sx={{
                                                    display: 'flex',
                                                    gap: 2,
                                                    py: 1,
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.95rem',
                                                        color: 'rgba(255,255,255,.68)',
                                                        minWidth: '140px'
                                                    }}
                                                >
                                                    {specification}:
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.95rem',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {value}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {/* Add to Cart Button */}
                            <Box sx={{ mt: 'auto' }}>
                                {item.quantity === 0 ? (
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                            py: 4,
                                            background: 'linear-gradient(180deg, rgba(255,107,107,.1), rgba(255,107,107,.05))',
                                            border: '1px solid rgba(255,107,107,.3)',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#ff6b6b',
                                                fontSize: '1.5rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em'
                                            }}
                                        >
                                            Out of Stock
                                        </Typography>
                                    </Box>
                                ) : addedToCart ? (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        component={Link}
                                        to="/cart"
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
                                        Go to Cart
                                    </Button>
                                ) : (
                                    <LoadingButton
                                        disabled={isOrgUser()}
                                        startIcon={<IconShoppingCartPlus />}
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        loading={submitting}
                                        onClick={() => add()}
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
                                        Add to Cart
                                    </LoadingButton>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default BrowserShopDetails;

// Made with Bob
