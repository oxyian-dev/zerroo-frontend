import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container, Grid, Paper,
    Stack,
    Step, StepLabel,
    Stepper,
    styled,
    SwipeableDrawer,
    Tooltip,
    Typography,
    Zoom
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { IconArrowLeft, IconArrowRight, IconShoppingCart, IconShoppingCartPlus } from '@tabler/icons';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isLoggedIn } from '../auth/AuthProvider';
import Loader from '../components/Loader';
import fetcher from '../utils/fetcher';
import { constructFormData, toImage, WorkDriveImage } from '../utils/util';
import SizeButton from './SizeButton';

export default function ComboDetails() {
    const { id } = useParams()
    const [steps, setSteps] = useState([])
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeStep, setActiveStep] = useState(0)
    const [selected, setSelected] = useState([])
    const [addingToCart, setAddingToCart] = useState(false)

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const [item, setItem] = useState({})
    const [sizes, setSizes] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [open, setOpen] = useState(false)

    const loadItem = async id => {
        const r = await fetcher(`/api/listing/items/${id}`);
        const { item, sizes, specifications } = await r.json();
        setItem(item);
        setSizes(sizes);
        setSpecifications(specifications);
        setOpen(true);
    }

    useEffect(() => {
        fetcher(`/api/listing/combos/${id}`)
            .then(r => r.json())
            .then(combos => {
                const groups = []
                for (let i = 0; i < combos.groups.length; i++) {
                    const unique = [], items = [];
                    for (let j = 0; j < combos.groups[i].items.length; j++) {
                        const u = combos.groups[i].items[j].group_id + '-' + combos.groups[i].items[j].color;
                        if (unique.indexOf(u) === -1) {
                            unique.push(u);
                            items.push(combos.groups[i].items[j])
                        }
                    }
                    combos.groups[i].items = items
                    for (let j = 0; j < combos.groups[i].quantity; j++) {
                        groups.push(combos.groups[i])
                    }
                }
                combos.groups = groups
                setData(combos)
                setSteps(combos.groups.map(({ name }) => name));
                setLoading(false)
            })
    }, [id])

    const Puller = styled(Box)(() => ({
        width: 40,
        height: 6,
        backgroundColor: grey[300],
        borderRadius: 3,
        marginBottom: 16,
        marginLeft: 'auto',
        marginRight: 'auto'
    }));

    return (
        loading ? (
            <Loader />
        ) : (
            <Container
                sx={{
                    mt: 4,
                    mb: {
                        md: selected.filter(Boolean).length ? 28 : 16,
                        xs: selected.filter(Boolean).length ? 22 : 14
                    }
                }}>
                <Grid container spacing={{ md: 4, xs: 1 }}>
                    {data.groups.map(({ items }, index) => (
                        items.map(({ image, title, item_id }, key) => (
                            <Grid
                                item
                                key={key}
                                md={3}
                                xs={6}
                                display={index === activeStep ? "flex" : "none"}>
                                <Card sx={{
                                    "img": {
                                        transition: 'all 0.3s ease-in-out 0s',
                                    },
                                    ":hover img": {
                                        transform: 'scale3d(1.04, 1.04, 1)',
                                        transition: 'all 0.3s ease-in-out 0s',
                                        overflow: 'hidden'
                                    }
                                }}>
                                    <CardActionArea onClick={() => {
                                        return loadItem(item_id)
                                    }}>
                                        <Box height="100%" overflow="hidden">
                                            <CardMedia component="img" image={toImage(image)} alt={title} />
                                        </Box>
                                        <CardContent sx={{ p: 2 }}>
                                            <Typography fontWeight="normal" variant="h4">{title}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ))}
                </Grid>
                <Box position="fixed" left={0} bottom={0} width="100%" bgcolor="white">
                    <Paper elevation={2} sx={{ pt: { md: 2, xs: 1 } }}>
                        <PerfectScrollbar>
                            <Container sx={{ mb: 2 }}>
                                <Box width="100%" my="auto" minWidth={steps.length * 175}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label, key) => {
                                            const props = {}
                                            if (activeStep > key && !Boolean(selected[key])) {
                                                props.optional = (
                                                    <Typography variant="caption" color="error">
                                                        Select an Item
                                                    </Typography>
                                                )
                                                props.error = true
                                            }
                                            return (
                                                <Step key={key}>
                                                    <StepLabel {...props}>
                                                        {selected[key] && (
                                                            <Box
                                                                textAlign="center"
                                                                sx={{
                                                                    "img": {
                                                                        width: {
                                                                            md: 75,
                                                                            xs: 50
                                                                        },
                                                                        height: "auto"
                                                                    }
                                                                }}>
                                                                <img
                                                                    alt=""
                                                                    src={toImage(selected[key].images[0])} />
                                                            </Box>
                                                        )}
                                                        {label}
                                                    </StepLabel>
                                                </Step>
                                            )
                                        })}
                                    </Stepper>
                                </Box>
                            </Container>
                        </PerfectScrollbar>
                        <Stack direction="row" p={{ md: 1, xs: 0.5 }} spacing={{ md: 1, xs: 0.5 }}>
                            <Button
                                color="inherit"
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ minWidth: 100 }}
                                startIcon={<IconArrowLeft />}
                            >
                                Back
                            </Button>
                            {isLoggedIn() ? (
                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={selected.filter(Boolean).length !== steps.length}
                                    endIcon={<IconShoppingCart />}
                                    onClick={() => {
                                        const combos = []
                                        const groups = []
                                        const items = []

                                        selected.forEach(item => {
                                            combos.push(id)
                                            groups.push(item.combo_group_id)
                                            items.push(item.id)
                                        });
                                        if (isLoggedIn()) {
                                            fetcher('/api/carts/combo', {
                                                method: 'post',
                                                body: constructFormData({ combos, groups, items })
                                            })
                                                .then(r => r.json())
                                                .then(({ status, message = "Try again" }) => {
                                                    if (status === 'success') {
                                                        enqueueSnackbar('Added to Cart', { variant: 'success' })
                                                        navigate('/cart')
                                                    } else {
                                                        enqueueSnackbar(message, { variant: 'error' })
                                                        setAddingToCart(false)
                                                    }
                                                })
                                        } else {

                                        }
                                    }}
                                    loading={addingToCart}
                                >
                                    Add to Cart
                                </LoadingButton>
                            ) : (
                                <Alert
                                    variant="outlined"
                                    sx={{ width: '100%' }}
                                    severity="warning"
                                    action={
                                        <Button color="inherit" component={Link} to='/login'>
                                            Login
                                        </Button>
                                    }>
                                    Login to Place Order
                                </Alert>
                            )}
                            <Button
                                disabled={activeStep === steps.length - 1}
                                variant="outlined"
                                color="inherit"
                                onClick={handleNext}
                                sx={{ minWidth: 100 }}
                                endIcon={<IconArrowRight />}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
                <SwipeableDrawer
                    anchor={isMobile ? "bottom" : "right"}
                    variant="temporary"
                    open={open}
                    onClose={() => {
                        setOpen(false)
                    }}
                    onOpen={() => {
                        setOpen(true)
                    }}
                    ModalProps={{
                        keepMounted: false,
                    }}
                    PaperProps={{
                        sx: {
                            width: {
                                md: "75%"
                            },
                            height: {
                                xs: "85%",
                                md: "100%"
                            },
                            p: {
                                md: 4,
                                xs: 2
                            }
                        }
                    }}
                >
                    <Grid container spacing={{ md: 4 }}>
                        <Grid item xs={12} textAlign="center" display={{ md: 'none' }}>
                            <Puller />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Carousel
                                infiniteLoop={true}
                                autoPlay={true}
                                showArrows={true}
                                swipeable={true}
                                showStatus={false}
                                showThumbs={!isMobile}
                                renderThumbs={() => (
                                    item?.images.map((image, id) => (
                                        <WorkDriveImage key={id} image={image} alt={`${item.title} ${item.description}`} />
                                    )))}
                            >
                                {item?.images?.map((image) =>
                                    <WorkDriveImage image={image} alt={`${item.title} ${item.description}`} key={image} />
                                )}
                            </Carousel>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box pl={{ md: 5 }} pt={3} justifyContent="center">
                                <Typography color="primary.main" mb={1} variant='h4'>{item?.brand}</Typography>
                                <Tooltip
                                    title={item?.title}
                                    TransitionComponent={Zoom}>
                                    <Typography
                                        mb={2}
                                        fontSize={24}
                                        variant='h1'>
                                        {item?.title}
                                    </Typography>
                                </Tooltip>
                                <Tooltip
                                    title={item?.description}
                                    TransitionComponent={Zoom}>
                                    <Typography
                                        mb={2}
                                        fontSize={20}
                                        variant='subtitle1'
                                        lineHeight={1.2}
                                    >
                                        {item?.description}
                                    </Typography>
                                </Tooltip>
                                {sizes.length > 0 && <Box mb={2}>
                                    <Typography variant="subtitle1" mb={1}>Select Size</Typography>
                                    <Stack direction="row" spacing={1}>
                                        {sizes.map(({ id, size_id, size }) =>
                                            size_id === item?.['size_id'] ? (
                                                <SizeButton
                                                    disableElevation
                                                    disableRipple
                                                    key={id}
                                                    selected={true}
                                                    variant="contained">{size}</SizeButton>
                                            ) : (
                                                <SizeButton
                                                    key={id}
                                                    variant="outlined"
                                                    onClick={() => {
                                                        return loadItem(id)
                                                    }}
                                                >
                                                    {size}
                                                </SizeButton>
                                            ))}
                                    </Stack>
                                </Box>}
                                {item?.quantity <= 5 && item?.quantity !== 0 && (
                                    <Typography
                                        variant="subtitle1"
                                        color="error.dark">
                                        Only {item?.quantity} available
                                    </Typography>)}
                                {specifications.length > 0 &&
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
                                    </Box>}
                                <Box mt={2}>
                                    {item?.quantity === 0 ? (
                                        <Typography color="error.main" variant="h3">
                                            Out of Stock
                                        </Typography>
                                    ) : (
                                        <LoadingButton
                                            startIcon={<IconShoppingCartPlus />}
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={() => {
                                                setSelected(preSelected => {
                                                    preSelected[activeStep] = { ...item, combo_group_id: data.groups[activeStep].combo_group_id }
                                                    return preSelected
                                                })
                                                setOpen(false)
                                                if (selected.filter(Boolean).length !== steps.length) {
                                                    const start = activeStep
                                                    for (let i = 0; i < steps.length; i++) {
                                                        const index = (start + i) % steps.length;
                                                        if (!Boolean(selected[index])) {
                                                            setActiveStep(index)
                                                            break
                                                        }
                                                    }
                                                }
                                            }}>
                                            Add to Combo Bag
                                        </LoadingButton>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </SwipeableDrawer>
            </Container>
        )
    )
}
