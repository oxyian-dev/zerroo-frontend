import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
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
import Loader from "../components/Loader";
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
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true)
        fetcher(`/api/listing/items/${id}`)
            .then(r => r.json())
            .then(item => {
                setItem(item.item)
                setSizes(item.sizes)
                setColors(item.colors)
                setSpecifications(item.specifications)
                if (isLoggedIn()) {
                    fetcher('/api/carts')
                        .then(r => r.json())
                        .then(({ carts }) => {
                            setAddedToCart(carts.map(item => item.item).indexOf(parseInt(id)) > -1)
                            setLayout({
                                ...layout,
                                title: item.item.title,
                                cart_count: findSum(carts, 'quantity')
                            })
                        })
                } else {
                    setAddedToCart(getCart().map(item => item.item).indexOf(parseInt(id)) > -1)
                    setLayout({
                        ...layout,
                        title: item.item.title,
                        cart_count: getCartCount()
                    })
                }
            })
            .catch(console.log)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    function add() {
        setSubmitting(true)
        if (isLoggedIn()) {
            const body = new FormData()
            body.set('item', item.id)
            fetcher('/api/carts', { method: 'POST', body: body })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        enqueueSnackbar('Item added to MobileCart', { variant: 'success' })
                        setLayout({ ...layout, cart_count: layout.cart_count + 1 })
                    }
                })
                .finally(() => {
                    setSubmitting(true)
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
        <Loader />
    ) : (
        <Box minHeight="100vh">
            {item.images?.length > 1 ? (
                <Carousel
                    infiniteLoop={true}
                    autoPlay={true}
                    showArrows={true}
                    swipeable={true}
                    showStatus={false}
                    showThumbs={false}
                >
                    {item.images?.map(image => (
                        <WorkDriveImage image={image} alt={`${item.title} ${item.description}`} key={image} />
                    ))}
                </Carousel>
            ) : (
                <WorkDriveImage image={item.images?.[0]} alt={`${item.title} ${item.description}`} />
            )}

            <Box p={1}>
                <Box p={1}>
                    <Typography mb={1} noWrap variant='h5'>{item.brand}</Typography>
                    <Typography variant='h2' mb={2}>{item.title}</Typography>
                    <Typography mb={2} variant='subtitle1'>{item.description}</Typography>
                    <Typography
                        color="primary.main"
                        mb={2}
                        noWrap
                        overflow='hidden'
                        display='inline'
                        variant="subtitle1">
                        ₹{item.price}
                    </Typography>
                    {item.discount !== 0 && (
                        <Typography
                            noWrap
                            overflow='hidden'
                            ml={0.5}
                            display='inline'
                            variant='subtitle1'
                            sx={{ textDecoration: 'line-through' }}>₹{item.mrp}</Typography>
                    )}
                    {item.discount !== 0 && (
                        <Typography
                            noWrap
                            display='inline'
                            ml={0.5}
                            variant="subtitle1"
                            color={orange[700]}>
                            ({item.discount}% OFF)
                        </Typography>
                    )}
                    <Typography variant="subtitle1" color="success.dark">Inclusive of all taxes</Typography>
                    {isLoggedIn() && (
                        <Typography variant="subtitle1">{config.pvName}: {item.pv}</Typography>
                    )}
                </Box>
                {colors.length > 0 && (
                    <Box p={1}>
                        <Typography variant="body1" mb={1}>Colour</Typography>
                        <Stack direction="row" spacing={1}>
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
                {sizes.length > 0 && (
                    <Box p={1}>
                        <Typography variant="body1" mb={1}>Select Size:</Typography>
                        <Stack direction="row" spacing={1}>
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
                <Box p={1}>
                    <Stack direction="row">
                        <Box alignItems="center" display="flex" justifyContent="center">
                            <Typography>Share:</Typography>
                        </Box>
                        <a target="_blank" rel="nofollow noopener noreferrer" href={whatsapp(item)}>
                            <IconButton>
                                <IconBrandWhatsapp />
                            </IconButton>
                        </a>
                        <a target="_blank" rel="nofollow noopener noreferrer" href={facebook(item)}>
                            <IconButton>
                                <IconBrandFacebook />
                            </IconButton>
                        </a>
                        <a target="_blank" rel="nofollow noopener noreferrer" href={twitter(item)}>
                            <IconButton>
                                <IconBrandTwitter />
                            </IconButton>
                        </a>
                        <IconButton onClick={() => {
                            navigator.clipboard.writeText(link(item)).then(() => {
                                enqueueSnackbar('Link copied to clipboard', { variant: 'success' })
                            })
                        }}>
                            <IconCopy />
                        </IconButton>
                    </Stack>
                </Box>
                {item.quantity <= 5 && item.quantity !== 0 && (
                            <Typography variant="subtitle1" color="error.dark">
                                Only {item.quantity} available
                            </Typography>
                )}
                {specifications.length > 0 && (
                    <Box p={1}>
                        <Typography variant="h5">Specifications:</Typography>
                        {specifications.map(({ id, specification, value }) => (
                            <Box key={id}>
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="body2">{specification}: </Typography>
                                    <Typography variant="subtitle1">{value}</Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Box>
                )}
                <Box sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '.5rem'
                }}>
                    {item.quantity === 0 ? (
                        <Typography
                            color="error.main"
                            variant="h3"
                            textAlign="center"
                        >
                            Out of Stock
                        </Typography>
                    ) : addedToCart ? (
                        <Button color="primary" variant="contained" size="large" fullWidth component={Link}
                            to="/cart" endIcon={<IconArrowRight />}>
                            Goto Cart
                        </Button>
                    ) : (
                        <LoadingButton
                            disabled={isOrgUser()}
                            startIcon={<IconShoppingCartPlus />}
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            loading={submitting}
                            onClick={() => add()}>
                            Add to Cart
                        </LoadingButton>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
export default MobileShopDetails;