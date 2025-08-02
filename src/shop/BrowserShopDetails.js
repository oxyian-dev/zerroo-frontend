import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
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
    const { enqueueSnackbar } = useSnackbar();
    const [specifications, setSpecifications] = useState([])
    const [setLayout, layout] = useOutletContext()

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
                            setAddedToCart(carts.map(({ item }) => item).indexOf(parseInt(id)) > -1)
                        })
                } else {
                    setAddedToCart(getCart().map(({ item }) => item).indexOf(parseInt(id)) > -1)
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
                        enqueueSnackbar('Item added to Cart', { variant: 'success' })
                    }
                })
                .finally(() => {
                    setSubmitting(true)
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
        <Container sx={{ my: '3rem' }}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <Stack spacing={2}>
                                <Skeleton variant="rectangular" width="100%" height="25vh" />
                                <Skeleton variant="rectangular" width="100%" height="25vh" />
                                <Skeleton variant="rectangular" width="100%" height="25vh" />
                            </Stack>
                        </Grid>
                        <Grid item xs={9}>
                            <Skeleton variant="rectangular" width="100%" height="75vh" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <Skeleton variant="text" width="25%" />
                        <Skeleton />
                        <Skeleton sx={{ mb: 1 }} variant="text" width="25%" />
                        <Skeleton />
                        <Skeleton sx={{ mb: 1 }} variant="text" width="25%" />
                        <Skeleton sx={{ mb: 2 }} variant="text" width="25%" />
                        <Skeleton variant="text" width="25%" />
                        <Skeleton sx={{ mb: 2 }} variant="text" width="25%" />
                        <Skeleton variant="rectangular" width="50%" height={75} />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    ) : (
        <Container sx={{ my: '3rem' }}>
            <Grid container spacing={4}>
                <Grid item xs={5}>
                    {item.images?.length > 1 ? (
                        <Carousel
                            infiniteLoop={true}
                            autoPlay={true}
                            showArrows={true}
                            swipeable={true}
                            showStatus={false}
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
                </Grid>
                <Grid item xs={7}>
                    <Box pl={5} pt={3} justifyContent="center">
                        <Typography color="primary.main" mb={1} variant='h4'>{item.brand}</Typography>
                        <Typography
                            mb={2}
                            fontSize={24}
                            variant='h1'>
                            {item.title}
                        </Typography>
                        <Typography
                            mb={2}
                            fontSize={20}
                            variant='subtitle1'
                            lineHeight={1.2}
                        >
                            {item.description}
                        </Typography>
                        <Typography
                            noWrap
                            fontSize={24}
                            overflow='hidden'
                            display='inline'
                            variant="subtitle1">
                            ₹{item.price}
                        </Typography>
                        {item.discount > 0 && (
                            <Typography
                                noWrap
                                fontSize={24}
                                overflow='hidden'
                                ml={0.5}
                                display='inline'
                                variant='subtitle1'
                                sx={{ textDecoration: 'line-through' }}>
                                ₹{item.mrp}
                            </Typography>
                        )}
                        {item.discount > 0 && (
                            <Typography noWrap fontSize={24} display='inline' ml={0.5} variant="subtitle1"
                                color={orange[700]}>
                                ({item.discount}% OFF)
                            </Typography>
                        )}
                        <Typography mb={2} fontSize={14} variant="subtitle1" color="success.dark">
                            Inclusive of all taxes
                        </Typography>
                        {isLoggedIn() && (
                            <Typography mb={2} variant="subtitle1">{config.pvName}: {item.pv}</Typography>
                        )}
                        {colors.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="subtitle1" mb={1}>Colour:</Typography>
                                <Stack direction="row" spacing={1}>
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
                                            key={id}
                                        />
                                    ) : (
                                            <ColorButton
                                                component={Link}
                                                hex={hex}
                                                key={id}
                                                color={color}
                                                to={`/p/${id}/${href(item.category)}/${href(title)}`}
                                                replace={true}
                                            />
                                        ))}
                                </Stack>
                            </Box>
                        )}
                        {sizes.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="subtitle1" mb={1}>Select Size:</Typography>
                                <Stack direction="row" spacing={1}>
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
                        {item.quantity <= 5 && item.quantity !== 0 && (
                            <Typography variant="subtitle1" color="error.dark">
                                Only {item.quantity} available
                            </Typography>
                        )}
                        {specifications.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="h4">Specifications:</Typography>
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
                        <Box mt={2}>
                            {item.quantity === 0 ? (
                                <Typography
                                    color="error.main"
                                    variant="h3"
                                >
                                    Out of Stock
                                </Typography>
                            ) : addedToCart ? (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    component={Link}
                                    to="/cart"
                                    endIcon={<IconArrowRight />}>
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
                </Grid>
            </Grid>
        </Container>
    )
}
export default BrowserShopDetails;