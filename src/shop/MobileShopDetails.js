import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import {
    IconArrowRight,
    IconBrandFacebook,
    IconBrandTwitter,
    IconBrandWhatsapp,
    IconCopy,
    IconShoppingCartPlus
} from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { isLoggedIn, isOrgUser } from "../auth/AuthProvider";
import config from "../config";
import { addToCart, getCart, getCartCount } from "../utils/CartUtil";
import { facebook, link, twitter, whatsapp } from "../utils/SocialShareUtil";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, findSum, href } from "../utils/util";
import ColorButton from "./ColorButton";
import SizeButton from "./SizeButton";

const MobileShopDetails = () => {
    const { id } = useParams();
    const [setLayout, layout] = useOutletContext()
    const [item, setItem] = useState({})
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [specifications, setSpecifications] = useState([])

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const [itemError, setItemError] = useState(null)
    const { enqueueSnackbar } = useSnackbar();

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
                            setAddedToCart(carts.map(item => item.item).indexOf(parseInt(id)) > -1)
                            setLayout({
                                ...layout,
                                title: data.item.title,
                                cart_count: findSum(carts, 'quantity')
                            })
                        })
                } else {
                    setAddedToCart(getCart().map(item => item.item).indexOf(parseInt(id)) > -1)
                    setLayout({
                        ...layout,
                        title: data.item.title,
                        cart_count: getCartCount()
                    })
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
                        setLayout({ ...layout, cart_count: layout.cart_count + 1 })
                    }
                })
                .finally(() => {
                    setSubmitting(false)
                    setAddedToCart(true)
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
    ) : itemError ? (
        <Box
            sx={{
                background: '#020202',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 3
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '4px',
                    p: 4,
                    textAlign: 'center'
                }}
            >
                <Typography sx={{ color: 'white', fontSize: '1.2rem', mb: 1, fontWeight: 700 }}>
                    Product Not Available
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,.68)', mb: 3 }}>
                    {itemError}
                </Typography>
                <Button component={Link} to="/shop" variant="outlined" sx={{ color: '#efcb77', borderColor: 'rgba(239,203,119,.4)' }}>
                    Back to Shop
                </Button>
            </Box>
        </Box>
    ) : (
        <Box sx={{ background: '#020202', minHeight: '100vh', pb: 10 }}>
            {/* Product Images Carousel */}
            <Box
                sx={{
                    position: 'relative',
                    '& .carousel .slide img': {
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    '& .carousel .control-arrow': {
                        background: 'rgba(0,0,0,.6)',
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                            background: 'rgba(0,0,0,.8)',
                        }
                    },
                    '& .carousel .control-dots .dot': {
                        background: 'rgba(255,255,255,.3)',
                        boxShadow: 'none',
                        '&.selected': {
                            background: '#efcb77',
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
                        showThumbs={false}
                        interval={5000}
                        transitionTime={600}
                    >
                        {item.images?.map(image => (
                            <WorkDriveImage 
                                image={image} 
                                alt={`${item.title} ${item.description}`} 
                                key={image} 
                            />
                        ))}
                    </Carousel>
                ) : (
                    <WorkDriveImage 
                        image={item.images?.[0]} 
                        alt={`${item.title} ${item.description}`} 
                    />
                )}
            </Box>

            {/* Product Info */}
            <Box sx={{ px: 3, pt: 4 }}>
                {/* Brand */}
                <Typography
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#efcb77',
                        mb: 1.5
                    }}
                >
                    {item.brand}
                </Typography>

                {/* Title */}
                <Typography
                    sx={{
                        fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                        lineHeight: 1.2,
                        fontWeight: 700,
                        color: 'white',
                        mb: 2,
                        letterSpacing: '-0.02em'
                    }}
                >
                    {item.title}
                </Typography>

                {/* Description */}
                <Typography
                    sx={{
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        color: 'rgba(255,255,255,.68)',
                        mb: 3
                    }}
                >
                    {item.description}
                </Typography>

                {/* Price Section */}
                <Box
                    sx={{
                        mb: 3,
                        pb: 3,
                        borderBottom: '1px solid rgba(255,255,255,.08)'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
                        <Typography
                            sx={{
                                fontSize: '2rem',
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
                                        fontSize: '1.2rem',
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
                                        px: 1.5,
                                        py: 0.5,
                                        fontSize: '0.75rem',
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
                            fontSize: '0.8rem',
                            color: '#51cf66',
                            fontWeight: 600,
                            mb: 0.5
                        }}
                    >
                        Inclusive of all taxes
                    </Typography>
                    {isLoggedIn() && (
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                color: '#efcb77',
                                fontWeight: 600
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
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'white',
                                mb: 1.5
                            }}
                        >
                            Colour:
                        </Typography>
                        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                            {colors.map(({ color_id, hex, id, title }) => (
                                color_id === item['color_id'] ? (
                                    <ColorButton
                                        selected={true}
                                        disableElevation
                                        disableRipple
                                        hex={hex}
                                        key={id} />
                                ) : (
                                    <ColorButton
                                        component={Link}
                                        hex={hex}
                                        key={id}
                                        to={`/p/${id}/${href(item.category)}/${href(title)}`}
                                        replace={true}
                                    />
                                )
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* Sizes */}
                {sizes.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'white',
                                mb: 1.5
                            }}
                        >
                            Select Size:
                        </Typography>
                        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                            {sizes.map(({ id, size_id, size, title }) => (
                                size_id === item['size_id'] ? (
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
                                        key={id}
                                        variant="outlined"
                                        replace={true}
                                    >
                                        {size}
                                    </SizeButton>
                                )
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* Stock Warning */}
                {item.quantity <= 5 && item.quantity !== 0 && (
                    <Typography
                        sx={{
                            fontSize: '0.85rem',
                            color: '#ff6b6b',
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        Only {item.quantity} available
                    </Typography>
                )}

                {/* Share Section */}
                <Box
                    sx={{
                        mb: 3,
                        pb: 3,
                        borderBottom: '1px solid rgba(255,255,255,.08)'
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                color: 'rgba(255,255,255,.82)',
                                fontWeight: 600
                            }}
                        >
                            Share:
                        </Typography>
                        <a target="_blank" rel="nofollow noopener noreferrer" href={whatsapp(item)}>
                            <IconButton
                                aria-label="Share on WhatsApp"
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    minWidth: '44px',
                                    minHeight: '44px',
                                    '&:hover': {
                                        color: '#efcb77',
                                        background: 'rgba(221,180,93,.1)'
                                    },
                                    '&:focus-visible': {
                                        outline: '2px solid #efcb77',
                                        outlineOffset: '2px'
                                    }
                                }}
                            >
                                <IconBrandWhatsapp size={20} />
                            </IconButton>
                        </a>
                        <a target="_blank" rel="nofollow noopener noreferrer" href={facebook(item)}>
                            <IconButton
                                aria-label="Share on Facebook"
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    minWidth: '44px',
                                    minHeight: '44px',
                                    '&:hover': {
                                        color: '#efcb77',
                                        background: 'rgba(221,180,93,.1)'
                                    },
                                    '&:focus-visible': {
                                        outline: '2px solid #efcb77',
                                        outlineOffset: '2px'
                                    }
                                }}
                            >
                                <IconBrandFacebook size={20} />
                            </IconButton>
                        </a>
                        <a target="_blank" rel="nofollow noopener noreferrer" href={twitter(item)}>
                            <IconButton
                                aria-label="Share on Twitter"
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    minWidth: '44px',
                                    minHeight: '44px',
                                    '&:hover': {
                                        color: '#efcb77',
                                        background: 'rgba(221,180,93,.1)'
                                    },
                                    '&:focus-visible': {
                                        outline: '2px solid #efcb77',
                                        outlineOffset: '2px'
                                    }
                                }}
                            >
                                <IconBrandTwitter size={20} />
                            </IconButton>
                        </a>
                        <IconButton
                            aria-label="Copy product link"
                            onClick={() => {
                                navigator.clipboard.writeText(link(item)).then(() => {
                                    enqueueSnackbar('Link copied to clipboard', { variant: 'success' })
                                })
                            }}
                            sx={{
                                color: 'rgba(255,255,255,.68)',
                                minWidth: '44px',
                                minHeight: '44px',
                                '&:hover': {
                                    color: '#efcb77',
                                    background: 'rgba(221,180,93,.1)'
                                },
                                '&:focus-visible': {
                                    outline: '2px solid #efcb77',
                                    outlineOffset: '2px'
                                }
                            }}
                        >
                            <IconCopy size={20} />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Specifications */}
                {specifications.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                fontSize: '1.1rem',
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
                                            fontSize: '0.85rem',
                                            color: 'rgba(255,255,255,.68)',
                                            minWidth: '120px'
                                        }}
                                    >
                                        {specification}:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.85rem',
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
            </Box>

            {/* Fixed Bottom Action Bar */}
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
                {item.quantity === 0 ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 2,
                            background: 'linear-gradient(180deg, rgba(255,107,107,.1), rgba(255,107,107,.05))',
                            border: '1px solid rgba(255,107,107,.3)',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#ff6b6b',
                                fontSize: '1.2rem',
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
                        Add to Cart
                    </LoadingButton>
                )}
            </Box>
        </Box>
    )
}

export default MobileShopDetails;

// Made with Bob
