import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { IconBrandLinkedin } from "@tabler/icons";
import Image from "mui-image";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Link } from "react-router-dom";
import { clearAuthLocalStorage, isLoggedIn, isOrgUser } from "../auth/AuthProvider";
import { getCartCount } from "../utils/CartUtil";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, href } from "../utils/util";

const ShopHome = () => {


    const [layout, setLayout] = useState({ title: '', back: '' })
    const [categories, setCategories] = useState([])
    const [dropdown, setDropdown] = useState({})


    useEffect(() => {
        fetcher('/api/ui/nav/categories')
            .then(r => r.json())
            .then(({ categories }) => {
                setCategories(categories)
                let dropdown = {}
                categories.forEach(category => {
                    dropdown[category.parent.id] = { open: false, anchorEl: null }
                })
                setDropdown(dropdown)
            })
    }, [])

    useEffect(() => {
        if (isLoggedIn()) {
            fetcher('/api/carts/count')
                .then(r => r.json())
                .then(({ count }) => {
                    setLayout({ ...layout, cart_count: count })
                })
        } else {
            setLayout({ ...layout, cart_count: getCartCount() })
        }
    }, [])


    const [activeCategoryId, setActiveCategoryId] = useState(null);

    const handleParentClick = (id) => {
        setActiveCategoryId((prevId) => (prevId === id ? null : id));
    };

    const [featured, setFeatured] = useState([])

    useEffect(() => {
        fetcher('/api/ui/featured')
            .then(r => r.json())
            .then(({ featured }) => {
                const finalListing = []
                const unique = [];
                for (let i = 0; i < featured.length; i++) {
                    const u = featured[i].group_id + '-' + featured[i].color;
                    if (unique.indexOf(u) <= -1) {
                        unique.push(u);
                        finalListing.push(featured[i])
                    }
                }
                setFeatured(finalListing)
            })
        if (!isLoggedIn()) {
            clearAuthLocalStorage()
        }
    }, [])

    return (
        <React.Fragment>
            <Box px={2} py={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <Image
                            src="/img/FamilyShopping.jpg"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2} mb={4} justifyContent="center">
                    {categories
                        .filter(({ parent }) => Boolean(parent?.image))
                        .map(({ parent }) => (
                            <Grid
                                item
                                xs={6}
                                md={4}
                                key={`parent-${parent.id}`}
                                display="flex"
                                justifyContent="center"
                            >
                                <Card>
                                    <CardActionArea onClick={() => handleParentClick(parent.id)}>
                                        <WorkDriveImage
                                            image={parent.image}
                                            alt={parent.category}
                                            sx={{
                                                mx: "auto",
                                            }}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

                <Container>
                    {activeCategoryId && (
                        <Box mt={5}>
                            {categories
                                .filter(({ parent }) => parent.id === activeCategoryId)
                                .map(({ parent, children }) => (
                                    <Box key={`children-${parent.id}`}>
                                        <Typography variant="h2" mb={{ md: 4, xs: 2 }} textAlign="center">
                                            {parent.category} Categories
                                        </Typography>

                                        <Grid container spacing={{ md: 4, xs: 2 }} justifyContent="center">
                                            {children.length > 0 ? (
                                                children
                                                    .filter(({ image }) => Boolean(image))
                                                    .map(({ id, category, image }) => (
                                                        <Grid
                                                            item
                                                            xs={6}
                                                            md={3}
                                                            key={id}
                                                            display="flex"
                                                            justifyContent="center"
                                                        >
                                                            <Card>
                                                                <CardActionArea component={Link}
                                                                    to={`/c/${id}/${href(category)}`}>
                                                                    <CardMedia>
                                                                        <WorkDriveImage
                                                                            image={image}
                                                                            alt={category}
                                                                        />
                                                                    </CardMedia>
                                                                    <CardContent>
                                                                        <Typography variant="h4">
                                                                            {category}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </CardActionArea>
                                                            </Card>
                                                        </Grid>
                                                    ))
                                            ) : (
                                                <Typography variant="h3" color="text.secondary">
                                                    No Subcategories
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Box>
                                ))}
                        </Box>
                    )}
                </Container>
            </Box>


            <Box
                sx={{
                    background: "linear-gradient(180deg, #A4574F 0%, #C37256 100%)"
                }}>
                <Box position="relative" height={{ md: "calc(100vh - 101px)", xs: "70vh" }} maxHeight={{ md: "calc(100vh - 50px)", xs: "50vh" }} pb={{ md: 50, xs: 50 }} pt={{ md: 5, xs: 10 }}>
                    <Container>
                        <Typography textAlign="center" color="white" mb={3} variant="h1" fontSize={{ md: 48, xs: 32 }} lineHeight={1}>
                            Zerroo - Where Fashion Meets Opportunity
                        </Typography>
                        <Typography textAlign="center" color="white" mb={3} variant="h2" fontSize={{ md: 24, xs: 18 }} lineHeight={1}>
                            Join the Next Generation of Direct Selling
                        </Typography>

                        <Box display="flex" flexDirection="column" alignItems="center" gap={2} position="relative" zIndex={2}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    component="a"
                                    href="https://surveyheart.com/form/65b39e08cdb9323f78e24041"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Register Now
                                </Button>
                                <Button
                                    href="https://top-earners.zerroo.in/"
                                    size="large"
                                    variant="contained"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Top earners
                                </Button>
                            </Stack>

                            <Button
                                component={Link}
                                to={isLoggedIn() ? (isOrgUser() ? "/admin" : "/dashboard") : "/login"}
                                size="large"
                                variant="contained"
                            >
                                {isLoggedIn() ? "Goto Dashboard" : "Login"}
                            </Button>
                        </Box>

                    </Container>

                    <Box position="absolute" width="100%" bottom={0} zIndex={1}>
                        <img src="/img/home.png" style={{ width: "100%", height: "auto", display: "block" }} />
                    </Box>
                </Box>
            </Box>

            <Box py={{ md: 4, xs: 4 }}>
                <Container>
                    <Grid container spacing={12}>
                        <Grid item md={4} xs={12} pb={2}>
                            <Image src="/img/karthick.jpg" style={{ width: "100%", height: "auto", display: "block" }} />
                            <Typography variant="h2">Karthick Haridoss</Typography>
                            <Typography variant="h4">Founder</Typography>
                            <IconButton component="a" href="https://www.linkedin.com/in/karthick-haridoss-7690781a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
                                <IconBrandLinkedin size={30} />
                            </IconButton>
                        </Grid>
                        <Grid item md={4} xs={12} pb={2}>
                            <Image src="/img/mohan.jpg" style={{ width: "100%", height: "auto", display: "block" }} />
                            <Typography variant="h2">Mohan</Typography>
                            <Typography variant="h4">Chief executive officer </Typography>
                            <IconButton component="a" href="https://www.linkedin.com/in/mohan-haridoss-h-800799190?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target='_blank' rel="noopener noreferrer" sx={{ color: 'primary.main' }} >
                                <IconBrandLinkedin size={30} />
                            </IconButton>
                        </Grid>
                        <Grid item md={4} xs={12} pb={2}>
                            <Image src="/img/santhosh.jpg" style={{ width: "100%", height: "auto", display: "block" }} />
                            <Typography variant="h2">Santhosh Kumar </Typography>
                            <Typography variant="h4">Co-founder</Typography>
                            <IconButton component="a" href="https://www.linkedin.com/in/santhosh-kumar-tj-9b55221ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
                                <IconBrandLinkedin size={30} />
                            </IconButton>
                        </Grid>
                        <Grid item md={12} xs={12} alignSelf="center">
                            <Typography color="primary.main" variant="h2" mb={{ md: 2, xs: 1 }} textAlign={{ md: "center", xs: "center" }}>
                                Our Story
                            </Typography>
                            <Typography alignSelf="center">
                                Our journey started with a clear goal to help people gain financial freedom and make the world a better place. We're on a mission to support deserving people through fashion by providing top-notch products and chances to learn new skills. We're committed to doing things the right way and speaking up for what's right worldwide. Our aim is to be the go-to option for anyone looking to grow, find new opportunities, and be part of a supportive community.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box py={{ md: 8, xs: 4 }}>
                <Container>
                    <Grid container spacing={{ md: 4, xs: 2 }}>
                        <Grid item md={6} xs={12}>
                            <Box height="100%" p={{ md: 8, xs: 4 }} sx={{
                                background: "linear-gradient(180deg, #EC2A7A 0%, #861854 100%)"

                            }}>
                                <Typography textAlign="center" variant="h2" color="white" mb={3}>
                                    Vision
                                </Typography>
                                <Typography variant="body2" color="white">
                                    To become the best company in the world by reaching millions of people globally with quality products and services at very reasonable and affordable prices, helping them achieve financial growth. To reduce unemployment. To contribute to India's economic rise and its journey towards becoming a developed country through Zerroo.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Box p={{ md: 8, xs: 4 }} sx={{
                                background: "linear-gradient(180deg, #EC2A7A 0%, #861854 100%)"
                            }}>
                                <Typography textAlign="center" variant="h2" color="white" mb={3}>
                                    Mission
                                </Typography>
                                <Typography variant="body2" color="white">
                                    The company's mandate is to uplift deserving and underprivileged individuals worldwide through fashion, providing a pathway to a better quality of life. This includes supporting thousands of willing Zerroo Retailers/Representatives in enhancing their appearance, youthfulness, and skills through our training and development programs, enabling them to learn and sell our high-quality products and services effectively.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{
                background: "linear-gradient(180deg, #EC2A7A 0%, #861854 100%)"
            }}>
                <Container sx={{ py: { md: 8, xs: 4 } }}>
                    <Typography textAlign="center" color="white" variant="h2" fontSize={{ xs: 28, md: 40 }} mb={{ md: 4, xs: 3 }}>
                        New Arrivals
                    </Typography>
                    <PerfectScrollbar>
                        <Stack
                            display="flex"
                            direction="row"
                            spacing={{ md: 2, xs: 1 }}
                            pb={2}
                        >
                            {featured.map(({ image, title, id, category }, key) => (
                                <Box key={key} minWidth={300}>
                                    <Card>
                                        <CardActionArea component={Link} to={`/p/${id}/${href(category)}/${href(title)}`}>
                                            <CardMedia>
                                                <WorkDriveImage image={image} alt={title} />
                                            </CardMedia>
                                            <CardContent>
                                                <Typography textAlign="center">{title}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            ))}
                        </Stack>
                    </PerfectScrollbar>
                </Container>
            </Box>

            <Box py={{ md: 8, xs: 4 }}>
                <Container>
                    <Grid container spacing={{ md: 8, xs: 4 }}>
                        <Grid item md={6} xs={12} alignSelf="center">
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography textAlign="center" color="primary.main" variant="h1">
                                        Our Opportunity
                                    </Typography>
                                </Grid>
                                {[
                                    {
                                        title: "No investment needed to start."
                                    },
                                    {
                                        title: "No prior business experience required"
                                    },
                                    {
                                        title: "To become a Financial Independence"
                                    },
                                    {
                                        title: "Personal Growth and Development"
                                    },
                                ].map(({ icon, title, subtitle }, key) => (
                                    <Grid textAlign="center" item xs={6} md={6} key={key}>
                                        <Stack spacing={1}>
                                            <Box>
                                                <img src={`/icons/opp-${key + 1}.svg`} />
                                            </Box>
                                            <Typography variant="body2">{title}</Typography>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Image src="/img/opportunity.webp" style={{ width: "100%", height: "auto", display: "block" }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box py={{ md: 8, xs: 4 }} sx={{
                background: "linear-gradient(90deg, #E62977 0%, #53112B 100%)"
            }}>
                <Container>
                    <Typography textAlign="center" color="white" variant="h1">
                        Taking one step forward can empower you.
                        With Zerroo's direct selling, every sale helps you earn money
                    </Typography>
                </Container>
            </Box>

            <Box py={{ md: 8, xs: 4 }}>
                <Container>
                    <Typography textAlign="center" variant="h1" color="primary.main" mb={{ md: 8, xs: 4 }}>
                        Why Choose Zerroo
                    </Typography>
                    <Grid container spacing={{ md: 8, xs: 4 }}>
                        {[
                            {
                                title: "Empowerment",
                                subtitle: "We empower you to control your financial future by offering the chance to build your own business through our direct selling model and fulfill your dreams."
                            },
                            {
                                title: "Flexibility",
                                subtitle: "Your experience can be customized to match your goals and lifestyle. Our flexible platform empowers you to create the life you've always dreamed of."
                            },
                            {
                                title: "Quality Products",
                                subtitle: "We pride ourselves on offering only the finest quality fashion products that are crafted to last."
                            },
                            {
                                title: "Mentorship",
                                subtitle: "We provide comprehensive training and support to help you succeed in your business."
                            },
                        ].map(({ title, subtitle }, key) => (
                            <Grid item md={6} xs={12} key={key}>
                                <Grid container spacing={{ md: 4 }}>
                                    <Grid item xs={4} order={{ md: key % 2 == 0 ? 1 : 2, xs: 1 }}>
                                        <Image src={`/icons/why-${key + 1}.svg`} />
                                    </Grid>
                                    <Grid item xs={8} order={{ md: key % 2 == 0 ? 2 : 1, xs: 2 }}>
                                        <Box p={2}>
                                            <Typography variant="h1" mb={2}>{title}</Typography>
                                            <Typography variant="body2">{subtitle}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default ShopHome