import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Step,
    StepLabel,
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

    // Product Card Skeleton
    const ProductCardSkeleton = () => (
        <Card
            sx={{
                background: 'transparent',
                overflow: 'hidden',
            }}
        >
            <Skeleton
                variant="rectangular"
                width="100%"
                height={280}
                sx={{
                    bgcolor: 'rgba(255,255,255,.1)',
                    borderRadius: 0
                }}
            />
            <CardContent
                sx={{
                    p: { md: 5, xs: 3 },
                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderTop: 'none'
                }}
            >
                <Skeleton
                    variant="text"
                    width="80%"
                    height={28}
                    sx={{ bgcolor: 'rgba(255,255,255,.1)' }}
                />
            </CardContent>
        </Card>
    )

    return (
        loading ? (
            <Loader />
        ) : (
            <Box
                sx={{
                    background: '#020202',
                    minHeight: 'calc(100vh - 110px)',
                    py: { md: '100px', xs: '60px' }
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        maxWidth: '1440px',
                        px: { md: 10, xs: 3 },
                        mb: {
                            md: selected.filter(Boolean).length ? 28 : 16,
                            xs: selected.filter(Boolean).length ? 22 : 14
                        }
                    }}
                >
                    {/* Product Selection Grid */}
                    <Grid container spacing={{ md: 4, xs: 3 }}>
                        {data.groups.map(({ items }, index) => (
                            items.map(({ image, title, item_id }, key) => (
                                <Grid
                                    item
                                    key={key}
                                    md={3}
                                    xs={6}
                                    display={index === activeStep ? "flex" : "none"}
                                >
                                    <Card
                                        sx={{
                                            background: 'transparent',
                                            overflow: 'hidden',
                                            transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                            width: '100%',
                                            '&:hover': {
                                                transform: 'translateY(-12px)',
                                            }
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => loadItem(item_id)}
                                            aria-label={`View ${title} details`}
                                            sx={{
                                                '&:focus-visible': {
                                                    outline: '2px solid #efcb77',
                                                    outlineOffset: '2px'
                                                }
                                            }}
                                        >
                                            {/* Image Container */}
                                            <Box
                                                sx={{
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    aspectRatio: '1/1',
                                                    background: '#0a0a0a',
                                                    '&:hover img': {
                                                        transform: 'scale(1.08)',
                                                    }
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={toImage(image)}
                                                    alt={title}
                                                    loading="lazy"
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 1s ease',
                                                    }}
                                                />
                                            </Box>

                                            {/* Card Content */}
                                            <CardContent
                                                sx={{
                                                    p: { md: 5, xs: 3 },
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                                    border: '1px solid rgba(255,255,255,.08)',
                                                    borderTop: 'none'
                                                }}
                                            >
                                                <Typography
                                                    component="h3"
                                                    sx={{
                                                        fontSize: { md: '1.25rem', xs: '1rem' },
                                                        lineHeight: 1.3,
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        color: 'white',
                                                        minHeight: { md: '52px', xs: '42px' },
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        ))}
                    </Grid>
                </Container>

                {/* Fixed Bottom Bar with Stepper and Actions */}
                <Box
                    position="fixed"
                    left={0}
                    bottom={0}
                    width="100%"
                    sx={{
                        background: 'rgba(10,10,10,.95)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderTop: '1px solid rgba(255,255,255,.08)',
                        zIndex: 1200
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            pt: { md: 2, xs: 1 },
                            background: 'transparent'
                        }}
                    >
                        {/* Stepper Section */}
                        <PerfectScrollbar>
                            <Container
                                maxWidth={false}
                                sx={{
                                    maxWidth: '1440px',
                                    px: { md: 10, xs: 3 },
                                    mb: 2
                                }}
                            >
                                <Box
                                    width="100%"
                                    my="auto"
                                    minWidth={steps.length * 175}
                                >
                                    <Stepper
                                        activeStep={activeStep}
                                        sx={{
                                            '& .MuiStepLabel-root .Mui-completed': {
                                                color: '#efcb77',
                                            },
                                            '& .MuiStepLabel-root .Mui-active': {
                                                color: '#efcb77',
                                            },
                                            '& .MuiStepLabel-label': {
                                                color: 'rgba(255,255,255,.68)',
                                                fontSize: { md: '0.95rem', xs: '0.85rem' },
                                                fontWeight: 500
                                            },
                                            '& .MuiStepLabel-label.Mui-active': {
                                                color: '#efcb77',
                                                fontWeight: 600
                                            },
                                            '& .MuiStepLabel-label.Mui-completed': {
                                                color: 'rgba(255,255,255,.82)',
                                            },
                                            '& .MuiStepConnector-line': {
                                                borderColor: 'rgba(255,255,255,.15)',
                                                borderTopWidth: 2
                                            },
                                            '& .MuiStepIcon-root': {
                                                color: 'rgba(255,255,255,.15)',
                                                fontSize: { md: '2rem', xs: '1.5rem' }
                                            },
                                            '& .MuiStepIcon-root.Mui-active': {
                                                color: '#efcb77',
                                            },
                                            '& .MuiStepIcon-root.Mui-completed': {
                                                color: '#efcb77',
                                            },
                                        }}
                                    >
                                        {steps.map((label, key) => {
                                            const props = {}
                                            if (activeStep > key && !Boolean(selected[key])) {
                                                props.optional = (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: '#ff6b6b',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
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
                                                                    mb: 1,
                                                                    "img": {
                                                                        width: {
                                                                            md: 75,
                                                                            xs: 50
                                                                        },
                                                                        height: "auto",
                                                                        borderRadius: '4px',
                                                                        border: '2px solid #efcb77',
                                                                        boxShadow: '0 4px 12px rgba(239,203,119,.2)'
                                                                    }
                                                                }}
                                                            >
                                                                <img
                                                                    alt={selected[key].title}
                                                                    src={toImage(selected[key].images[0])}
                                                                />
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

                        {/* Action Buttons */}
                        <Stack
                            direction="row"
                            p={{ md: 1, xs: 0.5 }}
                            spacing={{ md: 1, xs: 0.5 }}
                        >
                            {/* Back Button */}
                            <Button
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                aria-label="Go to previous step"
                                sx={{
                                    minWidth: { md: 120, xs: 100 },
                                    border: '1px solid rgba(255,255,255,.15)',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontSize: { md: '0.85rem', xs: '0.75rem' },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#ddb45d',
                                        color: '#ddb45d',
                                        background: 'transparent',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&.Mui-disabled': {
                                        borderColor: 'rgba(255,255,255,.08)',
                                        color: 'rgba(255,255,255,.3)'
                                    },
                                    '&:focus-visible': {
                                        outline: '2px solid #efcb77',
                                        outlineOffset: '2px'
                                    }
                                }}
                                startIcon={<IconArrowLeft size={18} />}
                            >
                                Back
                            </Button>

                            {/* Add to Cart / Login Alert */}
                            {isLoggedIn() ? (
                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    disabled={selected.filter(Boolean).length !== steps.length}
                                    endIcon={<IconShoppingCart size={20} />}
                                    aria-label="Add combo to cart"
                                    sx={{
                                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                        color: '#000',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontSize: { md: '0.85rem', xs: '0.75rem' },
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 20px rgba(221,180,93,.3)'
                                        },
                                        '&.Mui-disabled': {
                                            background: 'rgba(255,255,255,.1)',
                                            color: 'rgba(255,255,255,.3)'
                                        },
                                        '&:focus-visible': {
                                            outline: '2px solid #000',
                                            outlineOffset: '2px'
                                        }
                                    }}
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
                                    sx={{
                                        width: '100%',
                                        background: 'rgba(255,193,7,.1)',
                                        borderColor: 'rgba(255,193,7,.3)',
                                        color: '#efcb77',
                                        fontSize: { md: '0.95rem', xs: '0.85rem' },
                                        '& .MuiAlert-icon': {
                                            color: '#efcb77'
                                        },
                                        '& .MuiAlert-message': {
                                            display: 'flex',
                                            alignItems: 'center'
                                        }
                                    }}
                                    severity="warning"
                                    action={
                                        <Button
                                            component={Link}
                                            to='/login'
                                            sx={{
                                                color: '#efcb77',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                fontSize: { md: '0.85rem', xs: '0.75rem' },
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: 'rgba(255,193,7,.1)',
                                                    transform: 'translateY(-2px)'
                                                },
                                                '&:focus-visible': {
                                                    outline: '2px solid #efcb77',
                                                    outlineOffset: '2px'
                                                }
                                            }}
                                        >
                                            Login
                                        </Button>
                                    }
                                >
                                    Login to Place Order
                                </Alert>
                            )}

                            {/* Next Button */}
                            <Button
                                disabled={activeStep === steps.length - 1}
                                variant="outlined"
                                onClick={handleNext}
                                aria-label="Go to next step"
                                sx={{
                                    minWidth: { md: 120, xs: 100 },
                                    border: '1px solid rgba(255,255,255,.15)',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontSize: { md: '0.85rem', xs: '0.75rem' },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#ddb45d',
                                        color: '#ddb45d',
                                        background: 'transparent',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&.Mui-disabled': {
                                        borderColor: 'rgba(255,255,255,.08)',
                                        color: 'rgba(255,255,255,.3)'
                                    },
                                    '&:focus-visible': {
                                        outline: '2px solid #efcb77',
                                        outlineOffset: '2px'
                                    }
                                }}
                                endIcon={<IconArrowRight size={18} />}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Paper>
                </Box>

                {/* Product Details Drawer */}
                <SwipeableDrawer
                    anchor={isMobile ? "bottom" : "right"}
                    variant="temporary"
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
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
                            },
                            background: '#0a0a0a',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            borderLeft: { md: '1px solid rgba(255,255,255,.08)', xs: 'none' },
                            borderTop: { xs: '1px solid rgba(255,255,255,.08)', md: 'none' },
                        }
                    }}
                >
                    <Grid container spacing={{ md: 4, xs: 3 }}>
                        {/* Mobile Puller */}
                        <Grid item xs={12} textAlign="center" display={{ md: 'none' }}>
                            <Puller />
                        </Grid>

                        {/* Product Images */}
                        <Grid item xs={12} md={5}>
                            <Box
                                sx={{
                                    '& .carousel .slide': {
                                        background: '#050505'
                                    },
                                    '& .carousel .thumbs-wrapper': {
                                        marginTop: 2
                                    },
                                    '& .carousel .thumb': {
                                        border: '2px solid rgba(255,255,255,.08)',
                                        transition: 'all 0.3s ease'
                                    },
                                    '& .carousel .thumb.selected, & .carousel .thumb:hover': {
                                        borderColor: '#efcb77'
                                    }
                                }}
                            >
                                <Carousel
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    showArrows={true}
                                    swipeable={true}
                                    showStatus={false}
                                    showThumbs={!isMobile}
                                    renderThumbs={() => (
                                        item?.images.map((image, id) => (
                                            <WorkDriveImage
                                                key={id}
                                                image={image}
                                                alt={`${item.title} ${item.description}`}
                                            />
                                        ))
                                    )}
                                >
                                    {item?.images?.map((image) =>
                                        <WorkDriveImage
                                            image={image}
                                            alt={`${item.title} ${item.description}`}
                                            key={image}
                                        />
                                    )}
                                </Carousel>
                            </Box>
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} md={7}>
                            <Box pl={{ md: 5 }} pt={{ md: 3, xs: 0 }}>
                                {/* Brand */}
                                <Typography
                                    sx={{
                                        color: '#efcb77',
                                        fontSize: { md: '1.2rem', xs: '1rem' },
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        mb: 1
                                    }}
                                >
                                    {item?.brand}
                                </Typography>

                                {/* Title */}
                                <Tooltip
                                    title={item?.title}
                                    TransitionComponent={Zoom}
                                >
                                    <Typography
                                        component="h2"
                                        sx={{
                                            fontSize: { md: '1.8rem', xs: '1.4rem' },
                                            fontWeight: 800,
                                            color: 'white',
                                            lineHeight: 1.2,
                                            mb: 2
                                        }}
                                    >
                                        {item?.title}
                                    </Typography>
                                </Tooltip>

                                {/* Description */}
                                <Tooltip
                                    title={item?.description}
                                    TransitionComponent={Zoom}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: { md: '1.05rem', xs: '1rem' },
                                            color: 'rgba(255,255,255,.68)',
                                            lineHeight: 1.6,
                                            mb: 3
                                        }}
                                    >
                                        {item?.description}
                                    </Typography>
                                </Tooltip>
                                {/* Size Selection */}
                                {sizes.length > 0 && (
                                    <Box mb={3}>
                                        <Typography
                                            sx={{
                                                fontSize: { md: '1rem', xs: '0.95rem' },
                                                fontWeight: 600,
                                                color: 'white',
                                                mb: 1.5
                                            }}
                                        >
                                            Select Size
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                            {sizes.map(({ id, size_id, size }) =>
                                                size_id === item?.['size_id'] ? (
                                                    <SizeButton
                                                        disableElevation
                                                        disableRipple
                                                        key={id}
                                                        selected={true}
                                                        variant="contained"
                                                        sx={{
                                                            '&:focus-visible': {
                                                                outline: '2px solid #efcb77',
                                                                outlineOffset: '2px'
                                                            }
                                                        }}
                                                    >
                                                        {size}
                                                    </SizeButton>
                                                ) : (
                                                    <SizeButton
                                                        key={id}
                                                        variant="outlined"
                                                        onClick={() => loadItem(id)}
                                                        sx={{
                                                            '&:focus-visible': {
                                                                outline: '2px solid #efcb77',
                                                                outlineOffset: '2px'
                                                            }
                                                        }}
                                                    >
                                                        {size}
                                                    </SizeButton>
                                                )
                                            )}
                                        </Stack>
                                    </Box>
                                )}

                                {/* Low Stock Warning */}
                                {item?.quantity <= 5 && item?.quantity !== 0 && (
                                    <Typography
                                        sx={{
                                            fontSize: { md: '0.95rem', xs: '0.9rem' },
                                            color: '#ff6b6b',
                                            fontWeight: 600,
                                            mb: 2
                                        }}
                                    >
                                        Only {item?.quantity} available
                                    </Typography>
                                )}

                                {/* Specifications */}
                                {specifications.length > 0 && (
                                    <Box mb={3}>
                                        <Typography
                                            sx={{
                                                fontSize: { md: '1.1rem', xs: '1rem' },
                                                fontWeight: 700,
                                                color: 'white',
                                                mb: 2
                                            }}
                                        >
                                            Specifications
                                        </Typography>
                                        {specifications.map(({ id, specification, value }) => (
                                            <Box
                                                key={id}
                                                sx={{
                                                    display: 'flex',
                                                    py: 1,
                                                    borderBottom: '1px solid rgba(255,255,255,.08)'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: { md: '0.95rem', xs: '0.9rem' },
                                                        color: 'rgba(255,255,255,.68)',
                                                        minWidth: '140px'
                                                    }}
                                                >
                                                    {specification}:
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: { md: '0.95rem', xs: '0.9rem' },
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {value}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                                {/* Add to Combo Button */}
                                <Box mt={3}>
                                    {item?.quantity === 0 ? (
                                        <Typography
                                            sx={{
                                                fontSize: { md: '1.5rem', xs: '1.2rem' },
                                                fontWeight: 700,
                                                color: '#ff6b6b',
                                                textAlign: 'center',
                                                py: 3
                                            }}
                                        >
                                            Out of Stock
                                        </Typography>
                                    ) : (
                                        <LoadingButton
                                            startIcon={<IconShoppingCartPlus size={20} />}
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            aria-label="Add item to combo bag"
                                            sx={{
                                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                color: '#000',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                fontSize: { md: '0.95rem', xs: '0.85rem' },
                                                py: { md: 2, xs: 1.5 },
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 20px rgba(221,180,93,.3)'
                                                },
                                                '&:focus-visible': {
                                                    outline: '2px solid #000',
                                                    outlineOffset: '2px'
                                                }
                                            }}
                                            onClick={() => {
                                                setSelected(preSelected => {
                                                    preSelected[activeStep] = {
                                                        ...item,
                                                        combo_group_id: data.groups[activeStep].combo_group_id
                                                    }
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
                                            }}
                                        >
                                            Add to Combo Bag
                                        </LoadingButton>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </SwipeableDrawer>
            </Box>
        )
    )
}
