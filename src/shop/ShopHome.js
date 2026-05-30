import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, isOrgUser } from "../auth/AuthProvider";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, href } from "../utils/util";

// Golden Wave Animation Component
const GoldenWave = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 1,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(ellipse at center, rgba(239, 203, 119, 0.15) 0%, rgba(245, 220, 151, 0.1) 25%, transparent 50%)',
                    animation: 'goldenWave 10s ease-in-out infinite',
                    '@keyframes goldenWave': {
                        '0%, 100%': {
                            transform: 'translate(-50%, -50%) translateY(0)',
                        },
                        '50%': {
                            transform: 'translate(-50%, -50%) translateY(-20px)',
                        },
                    },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    width: '180%',
                    height: '180%',
                    background: 'radial-gradient(ellipse at center, rgba(214, 157, 69, 0.12) 0%, rgba(239, 203, 119, 0.08) 30%, transparent 50%)',
                    animation: 'goldenWave 8s ease-in-out infinite 1s',
                }}
            />
        </Box>
    );
};

// Sparkle Stars Animation Component
const SparkleStars = () => {
    const sparkles = [
        { size: 8, top: '15%', left: '10%', delay: 0, duration: 3 },
        { size: 6, top: '25%', left: '85%', delay: 0.5, duration: 2.5 },
        { size: 10, top: '40%', left: '20%', delay: 1, duration: 3.5 },
        { size: 4, top: '55%', left: '75%', delay: 1.5, duration: 2 },
        { size: 12, top: '70%', left: '15%', delay: 2, duration: 4 },
        { size: 6, top: '80%', left: '90%', delay: 2.5, duration: 2.5 },
        { size: 8, top: '20%', left: '50%', delay: 3, duration: 3 },
        { size: 5, top: '45%', left: '60%', delay: 3.5, duration: 2.8 },
        { size: 9, top: '65%', left: '40%', delay: 4, duration: 3.2 },
        { size: 7, top: '85%', left: '65%', delay: 4.5, duration: 2.6 },
        { size: 11, top: '10%', left: '70%', delay: 0.8, duration: 3.8 },
        { size: 6, top: '90%', left: '25%', delay: 1.2, duration: 2.4 },
    ];

    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 3,
            }}
        >
            {sparkles.map((sparkle, index) => (
                <Box
                    key={index}
                    sx={{
                        position: 'absolute',
                        top: sparkle.top,
                        left: sparkle.left,
                        width: `${sparkle.size}px`,
                        height: `${sparkle.size}px`,
                        animation: `sparkle ${sparkle.duration}s ease-in-out infinite ${sparkle.delay}s, float ${sparkle.duration + 2}s ease-in-out infinite ${sparkle.delay}s`,
                        '@keyframes sparkle': {
                            '0%, 100%': {
                                opacity: 0,
                                transform: 'scale(0) rotate(0deg)',
                            },
                            '50%': {
                                opacity: 1,
                                transform: 'scale(1) rotate(180deg)',
                            },
                        },
                        '@keyframes float': {
                            '0%, 100%': {
                                transform: 'translateY(0px)',
                            },
                            '50%': {
                                transform: 'translateY(-15px)',
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: index % 3 === 0 ? '#efcb77' : index % 3 === 1 ? '#f5dc97' : '#ddb45d',
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                            filter: 'drop-shadow(0 0 4px rgba(239, 203, 119, 0.8))',
                        }}
                    />
                </Box>
            ))}
        </Box>
    );
};

const ShopHome = () => {
    const [featured, setFeatured] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [brandsLoading, setBrandsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Hero slides data
    const heroSlides = [
        {
            image: "/main_bg.jpg",
            label: "VICTORY WORLD",
            title: "Your Gateway to Health & Prosperity",
            description: "Join India's fastest-growing direct selling company. Build your business with premium health and wellness products while creating unlimited income opportunities.",
            showLogo: true,
            rightImage: null  // Logo circle for first slide
        },
        // {
        //     image: "/main_bg.jpg",
        //     label: "Business Opportunity",
        //     title: "Transform Lives Through Wellness",
        //     description: "Empower yourself and others with quality products across personal care, health care, body care, home care, and nutrition.",
        //     showLogo: false,
        //     rightImage: "/product.png"  // Use product image for second slide
        // }
    ];

    // Auto-advance hero slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    // Fetch brands
    useEffect(() => {
        setBrandsLoading(true);
        
        fetcher('/api/brands')
            .then(r => r.json())
            .then((data) => {
                const brandRows = Array.isArray(data) ? data : (Array.isArray(data?.rows) ? data.rows : []);
                if (brandRows.length > 0) {
                    // Take first 5 brands for the services bar
                    setBrands(brandRows.slice(0, 5));
                } else {
                    setBrands([]);
                }
                setBrandsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching brands:', err);
                setBrands([]);
                setBrandsLoading(false);
            });
    }, []);

    // Fetch featured products
    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetcher('/api/ui/featured')
            .then(r => r.json())
            .then((data) => {
                const featuredProducts = data?.featured || [];
                
                if (Array.isArray(featuredProducts) && featuredProducts.length > 0) {
                    const finalListing = [];
                    const unique = [];
                    
                    for (let i = 0; i < featuredProducts.length; i++) {
                        const product = featuredProducts[i];
                        if (!product) {
                            continue;
                        }
                        const groupKey = product.group_id ?? product.groupId ?? product.id;
                        const colorKey = product.color_id ?? product.colorId ?? product.color ?? 'na';
                        const uniqueKey = `${groupKey}-${colorKey}`;
                        if (unique.indexOf(uniqueKey) <= -1) {
                            unique.push(uniqueKey);
                            finalListing.push(product);
                        }
                    }
                    setFeatured(finalListing);
                } else {
                    setFeatured([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching featured products:', err);
                setError(err.message || 'Failed to load featured products');
                setFeatured([]);
                setLoading(false);
            });
    }, []);

    return (
        <React.Fragment>
            {/* ================================================= */}
            {/* HERO SLIDER SECTION */}
            {/* ================================================= */}
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    overflow: 'hidden',
                    marginTop: 0,
                    pt: { xs: 0, md: '170px' },
                }}
            >
                {heroSlides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: currentSlide === index ? 1 : 0,
                            transition: 'opacity 1.4s ease-in-out',
                            pointerEvents: currentSlide === index ? 'auto' : 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src={slide.image}
                            alt="Hero"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.65) 30%, rgba(0,0,0,.85) 70%, rgba(0,0,0,.92) 100%)' }} />
                        
                        {/* Golden Wave Animation */}
                        {/* <GoldenWave /> */}
                        
                        {/* Sparkle Stars Animation */}
                        <SparkleStars />
                        
                        <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 }, position: 'relative', zIndex: 4, py: { md: 6, xs: 4 }, width: '100%' }}>
                            <Grid container spacing={{ md: 15, xs: 8 }} alignItems="center">
                                <Grid item xs={12} md={slide.showLogo || slide.rightImage ? 6 : 12} sx={{ order: { xs: 1, md: 1 } }}>
                                    <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: { md: '0.78rem', xs: '0.7rem' }, fontWeight: 700, color: '#efcb77', mb: { md: 4, xs: 2 } }}>{slide.label}</Typography>
                                    <Typography sx={{ fontSize: { xs: 'clamp(2rem, 7vw, 3rem)', md: 'clamp(3rem, 7vw, 5rem)' }, lineHeight: 0.95, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', mb: { md: 5, xs: 2 }, maxWidth: slide.showLogo ? '100%' : '800px' }}>{slide.title}</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' }, mb: { md: 6, xs: 1 }, maxWidth: slide.showLogo ? '100%' : '720px' }}>{slide.description}</Typography>
                                    {index === 0 && (
                                        <Stack direction={{ md: 'row', xs: 'column' }} spacing={{ md: 3, xs: 2 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                            <Button component={Link} to={isLoggedIn() ? (isOrgUser() ? "/admin" : "/dashboard") : "/login"} size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 700, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.4s ease', borderRadius: 0, '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(221,180,93,.22)' } }}>Login</Button>
                                            <Button size="large" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 600, transition: 'all 0.35s ease', borderRadius: 0, '&:hover': { borderColor: '#ddb45d', color: '#ddb45d', background: 'transparent' } }} component="a" href="#" target="_blank" rel="noopener noreferrer">Contact Us</Button>
                                        </Stack>
                                    )}
                                    {index === 1 && (
                                        <Stack direction={{ md: 'row', xs: 'column' }} spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                            <Button component={Link} to="/products" size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 700, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.4s ease', borderRadius: 0, '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(221,180,93,.22)' } }}>Buy Now</Button>
                                            <Button component={Link} to="/login" size="large" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 600, transition: 'all 0.35s ease', borderRadius: 0, '&:hover': { borderColor: '#ddb45d', color: '#ddb45d', background: 'transparent' } }}>Login</Button>
                                        </Stack>
                                    )}
                                </Grid>
                                {slide.showLogo && (
                                    <Grid item xs={12} md={6} sx={{ order: { xs: 3, md: 2 } }}>
                                        <Box sx={{ width: { md: '500px', xs: '300px' }, height: { md: '500px', xs: '300px' }, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', '&::before': { content: '""', position: 'absolute', inset: '30px', borderRadius: '50%', border: '1px solid rgba(221,180,93,.2)' }, '&::after': { content: '""', position: 'absolute', width: { md: '640px', xs: '400px' }, height: { md: '640px', xs: '400px' }, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)' } }}>
                                            <Box component="img" src="brand_logo/web-app-manifest-512x512.png" alt="Victory World" sx={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 40px rgba(221,180,93,.22))' }} />
                                        </Box>
                                    </Grid>
                                )}
                                {slide.rightImage && !slide.showLogo && (
                                    <Grid item xs={12} md={6} sx={{ order: { xs: 3, md: 2 } }}>
                                        <Box sx={{ width: { md: '500px', xs: '300px' }, height: { md: '500px', xs: '300px' }, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', '&::before': { content: '""', position: 'absolute', inset: '30px', borderRadius: '50%', border: '1px solid rgba(221,180,93,.2)' }, '&::after': { content: '""', position: 'absolute', width: { md: '640px', xs: '400px' }, height: { md: '640px', xs: '400px' }, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)' } }}>
                                            <Box component="img" src={slide.rightImage} alt="Transform Lives" sx={{ width: '120%', height: 'auto', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 40px rgba(221,180,93,.22))' }} />
                                        </Box>
                                    </Grid>
                                )}
                                {index === 0 && (
                                    <Grid item xs={12} sx={{ order: { xs: 2, md: 0 }, display: { xs: 'block', md: 'none' } }}>
                                        <Stack direction="column" spacing={1}>
                                            <Button component={Link} to={isLoggedIn() ? (isOrgUser() ? "/admin" : "/dashboard") : "/login"} size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 700, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.4s ease', borderRadius: 0, '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(221,180,93,.22)' } }}>Login</Button>
                                            <Button size="large" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 600, transition: 'all 0.35s ease', borderRadius: 0, '&:hover': { borderColor: '#ddb45d', color: '#ddb45d', background: 'transparent' } }} component="a" href="#" target="_blank" rel="noopener noreferrer">Contact Us</Button>
                                        </Stack>
                                    </Grid>
                                )}
                                {index === 1 && (
                                    <Grid item xs={12} sx={{ order: { xs: 2, md: 0 }, display: { xs: 'block', md: 'none' } }}>
                                        <Stack direction="column" spacing={1.5}>
                                            <Button component={Link} to="/products" size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 700, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.4s ease', borderRadius: 0, '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(221,180,93,.22)' } }}>Buy Now</Button>
                                            <Button component={Link} to="/login" size="large" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 600, transition: 'all 0.35s ease', borderRadius: 0, '&:hover': { borderColor: '#ddb45d', color: '#ddb45d', background: 'transparent' } }}>Login</Button>
                                        </Stack>
                                    </Grid>
                                )}
                            </Grid>
                        </Container>
                    </Box>
                ))}
                <Box sx={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 1.5 }}>
                    {heroSlides.map((_, index) => (
                        <Box key={index} onClick={() => setCurrentSlide(index)} sx={{ width: '12px', height: '12px', borderRadius: '50%', background: currentSlide === index ? '#ddb45d' : '#fff', opacity: currentSlide === index ? 1 : 0.18, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: currentSlide === index ? '0 0 20px rgba(221,180,93,.5)' : 'none', '&:hover': { opacity: currentSlide === index ? 1 : 0.4 } }} />
                    ))}
                </Box>
            </Box>

            {/* SERVICES BAR - BRANDS */}
            <Box component="section" sx={{ borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)', background: '#050505', overflow: 'hidden' }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 220px))',
                        justifyContent: 'center',
                        gap: 0,
                    }}
                >
                    {brandsLoading ? (
                        // Loading state - show placeholder boxes
                        Array.from({ length: 5 }).map((_, index) => (
                            <Box key={index} sx={{ padding: { md: 4.5, xs: 3 }, borderRight: '1px solid rgba(255,255,255,.08)', textAlign: 'center', minWidth: 180, '&:last-child': { borderRight: 'none' } }}>
                                <Box sx={{ width: '60%', height: '20px', background: 'rgba(255,255,255,.1)', margin: '0 auto', borderRadius: '4px' }} />
                            </Box>
                        ))
                    ) : brands.length > 0 ? (
                        // Display brands from API
                        brands.map((brand, index) => {
                            const brandName = String(brand?.Brand || '').trim().toLowerCase();
                            const brandHref = brandName === 'shaara' ? '/brand/shaara' : '/products';
                            return (
                            <Box
                                key={index}
                                component={Link}
                                to={brandHref}
                                sx={{
                                    padding: { md: 4.5, xs: 3 },
                                    borderLeft: '1px solid rgba(255,255,255,.08)',
                                    borderRight: '1px solid rgba(255,255,255,.08)',
                                    textTransform: 'uppercase',
                                    fontSize: { md: '0.78rem', xs: '0.7rem' },
                                    letterSpacing: '0.16em',
                                    color: 'rgba(255,255,255,.7)',
                                    transition: 'all 0.35s ease',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: 180,
                                    '&:hover': {
                                        background: 'rgba(221,180,93,.06)',
                                        color: '#f5dc97'
                                    },
                                    '&:first-of-type': { borderLeft: '1px solid rgba(255,255,255,.08)' },
                                    '&:last-of-type': { borderRight: '1px solid rgba(255,255,255,.08)' }
                                }}
                            >
                                {brand.Brand}
                            </Box>
                            )
                        })
                    ) : (
                        // Fallback to default categories if no brands
                        ['Personal Care', 'Health Care', 'Body Care', 'Home Care', 'Nutrition'].map((service, index) => (
                            <Box key={index} sx={{ padding: { md: 4.5, xs: 3 }, borderLeft: '1px solid rgba(255,255,255,.08)', borderRight: '1px solid rgba(255,255,255,.08)', textTransform: 'uppercase', fontSize: { md: '0.78rem', xs: '0.7rem' }, letterSpacing: '0.16em', color: 'rgba(255,255,255,.7)', transition: 'all 0.35s ease', textAlign: 'center', cursor: 'pointer', minWidth: 180, '&:hover': { background: 'rgba(221,180,93,.06)', color: '#f5dc97' }, '&:first-of-type': { borderLeft: '1px solid rgba(255,255,255,.08)' }, '&:last-of-type': { borderRight: '1px solid rgba(255,255,255,.08)' } }}>{service}</Box>
                        ))
                    )}
                </Box>
            </Box>

            {/* ABOUT SECTION */}
            {/* <Box component="section" sx={{ background: '#020202', py: { md: '190px', xs: '100px' }, overflow: 'hidden' }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                    <Grid container spacing={{ md: 12, xs: 8 }} alignItems="center">
                        <Grid item xs={12} lg={6}>
                            <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: { md: '0.78rem', xs: '0.7rem' }, fontWeight: 700, color: '#efcb77', mb: { md: 4, xs: 3 } }}>About Victory World</Typography>
                            <Typography sx={{ fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' }, lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.04em', color: 'white', mb: { md: 6, xs: 4 } }}>Empowering Lives <br/> Quality & Opportunity</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' }, mb: { md: 6, xs: 4 } }}>Victory World is a leading direct selling company offering premium health and wellness products. We provide a unique business opportunity for individuals to become distributors, purchase products at special prices, and build their own income by selling to others.</Typography>
                            <Stack spacing={4}>
                                <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' } }}>Our comprehensive product range spans personal care, health care, body care, home care, and nutrition - everything you need for a healthier lifestyle.</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' } }}>Join thousands of successful distributors who have transformed their lives through Victory World's proven business model and premium product portfolio.</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box sx={{ position: 'relative', overflow: 'visible' }}>
                                <Box component="img" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" alt="About" sx={{ width: '100%', height: { md: '850px', xs: '500px' }, objectFit: 'cover' }} />
                                <Box sx={{ position: 'absolute', top: { md: '70px', xs: '30px' }, right: { md: '-50px', xs: '-20px' }, width: { md: '290px', xs: '200px' }, padding: { md: 5.25, xs: 3.5 }, background: 'linear-gradient(135deg, rgba(255,248,220,.95), rgba(221,180,93,.96))', color: '#000', textTransform: 'uppercase', fontWeight: 800, lineHeight: 1.7, fontSize: { md: '1.15rem', xs: '0.9rem' }, boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}>Premium Quality Products For Better Living</Box>
                                <Box sx={{ position: 'absolute', left: { md: '-50px', xs: '-20px' }, bottom: { md: '70px', xs: '30px' }, width: { md: '290px', xs: '200px' }, padding: { md: 5.25, xs: 3.5 }, background: 'linear-gradient(135deg, rgba(255,248,220,.95), rgba(221,180,93,.96))', color: '#000', textTransform: 'uppercase', fontWeight: 800, lineHeight: 1.7, fontSize: { md: '1.15rem', xs: '0.9rem' }, boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}>Your Success. Our Mission</Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box> */}

            {/* PRODUCT CATEGORIES SECTION */}
            <Box component="section" sx={{ background: '#020202', py: { md: '190px', xs: '100px' }, borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                    <Grid container spacing={{ md: 8, xs: 4 }} alignItems="end" sx={{ mb: { md: 14, xs: 8 } }}>
                        <Grid item xs={12} lg={6}>
                            <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: { md: '0.78rem', xs: '0.7rem' }, fontWeight: 700, color: '#efcb77', mb: { md: 4, xs: 3 } }}>Product Categories</Typography>
                            <Typography sx={{ fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' }, lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.04em', color: 'white' }}>Premium Products For Every Need</Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' } }}>Discover our comprehensive range of health and wellness products designed to enhance your lifestyle and well-being.</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={{ md: 4, xs: 3 }}>
                        <Grid item xs={12} lg={5}>
                            <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: { md: '820px', xs: '500px' }, cursor: 'pointer', transition: 'transform 0.45s ease', '&:hover': { transform: 'scale(1.02)' } }}>
                                <Box component="img" src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop" alt="Featured" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,.2) 20%, rgba(0,0,0,1) 100%)' }} />
                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, p: { md: 7, xs: 4 } }}>
                                    <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: '0.78rem', fontWeight: 700, color: '#efcb77', mb: 3 }}>Featured Category</Typography>
                                    <Typography sx={{ fontSize: { md: '3rem', xs: '2rem' }, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, color: 'white', mb: 4 }}>Health Care Products</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: '1.05rem', maxWidth: '400px', mb: 6 }}>Premium health supplements and wellness products for optimal living.</Typography>
                                    <Button component={Link} to="/shop" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: '18px 42px', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.78rem', fontWeight: 700, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.4s ease', borderRadius: 0, '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(221,180,93,.22)' } }}>Explore Products</Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <Grid container spacing={{ md: 4, xs: 3 }}>
                                {[
                                    { number: '01', title: 'Personal Care', description: 'Premium skincare, haircare, and grooming essentials for daily wellness.' },
                                    { number: '02', title: 'Body Care', description: 'Luxurious body lotions, oils, and treatments for complete care.' },
                                    { number: '03', title: 'Home Care', description: 'Eco-friendly cleaning and household essentials for a healthy home.' },
                                    { number: '04', title: 'Nutritions', description: 'High-quality supplements and nutritional products for optimal health.' }
                                ].map((service, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Box sx={{ background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))', border: '1px solid rgba(255,255,255,.08)', minHeight: { md: '370px', xs: '320px' }, p: { md: 7.5, xs: 5 }, transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(10px)', '&::before': { content: '""', position: 'absolute', top: '-120px', right: '-120px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(221,180,93,.16), transparent 70%)' }, '&:hover': { transform: 'translateY(-8px)', borderColor: 'rgba(221,180,93,.2)', boxShadow: '0 25px 60px rgba(0,0,0,.45)' } }}>
                                            <Box sx={{ width: '74px', height: '74px', border: '1px solid rgba(221,180,93,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 5.5, fontSize: '1.6rem', fontWeight: 700, color: '#f5dc97', position: 'relative', zIndex: 1 }}>{service.number}</Box>
                                            <Typography sx={{ fontSize: { md: '1.5rem', xs: '1rem' }, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, color: 'white', mb: 3.5, position: 'relative', zIndex: 1 }}>{service.title}</Typography>
                                            <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>{service.description}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* TESTIMONIALS */}
            {/* <Box component="section" sx={{ background: '#020202', py: { md: '190px', xs: '100px' }, overflow: 'hidden' }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: { lg: 'flex-end' }, justifyContent: 'space-between', gap: { md: 7, xs: 4 }, mb: { md: 12, xs: 7 } }}>
                        <Box>
                            <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: { md: '0.78rem', xs: '0.7rem' }, fontWeight: 700, color: '#efcb77', mb: { md: 4, xs: 3 } }}>Success Stories</Typography>
                            <Typography sx={{ fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' }, lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.04em', color: 'white' }}>Trusted By Thousands</Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' }, maxWidth: '560px' }}>Join our growing community of successful distributors building their dreams with Victory World.</Typography>
                    </Box>
                    <Grid container spacing={{ md: 4, xs: 3 }}>
                        {[{ text: "Victory World changed my life! The products are excellent and the business opportunity is genuine. I'm earning more than I ever imagined.", name: "Rajesh Kumar", title: "Top Distributor" }, { text: "The support and training from Victory World is outstanding. Quality products and a proven system make success achievable for everyone.", name: "Priya Sharma", title: "Regional Leader" }].map((testimonial, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Box sx={{ border: '1px solid rgba(255,255,255,.08)', background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))', minHeight: { md: '480px', xs: '380px' }, p: { md: 9, xs: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.45s ease', '&:hover': { borderColor: 'rgba(221,180,93,.2)', transform: 'translateY(-8px)', boxShadow: '0 25px 60px rgba(0,0,0,.45)' } }}>
                                    <Box>
                                        <Typography sx={{ color: '#efcb77', fontSize: { md: '1.5rem', xs: '1.2rem' }, mb: { md: 6, xs: 4 } }}>★ ★ ★ ★ ★</Typography>
                                        <Typography sx={{ fontSize: { md: '1.55rem', xs: '1.2rem' }, lineHeight: 1.9, color: 'rgba(255,255,255,.86)', fontWeight: 300 }}>"{testimonial.text}"</Typography>
                                    </Box>
                                    <Box sx={{ mt: 4 }}>
                                        <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{testimonial.name}</Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,.45)', mt: 1.5, fontSize: '0.95rem' }}>{testimonial.title}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box> */}

            {/* FEATURED PRODUCTS */}
            <Box component="section" sx={{ background: '#020202', py: { md: '190px', xs: '100px' }, borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: { lg: 'flex-end' }, justifyContent: 'space-between', gap: { md: 8, xs: 4 }, mb: { md: 14, xs: 8 } }}>
                        <Box>
                            <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: { md: '0.78rem', xs: '0.7rem' }, fontWeight: 700, color: '#efcb77', mb: { md: 4, xs: 3 } }}>Latest Collection</Typography>
                            <Typography sx={{ fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' }, lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.04em', color: 'white' }}>Featured Products</Typography>
                        </Box>
                        <Button component={Link} to="/products" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: '18px 42px', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.35s ease', borderRadius: 0, '&:hover': { borderColor: '#ddb45d', color: '#ddb45d', background: 'transparent' } }}>View All Products</Button>
                    </Box>
                    {loading ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}><Typography sx={{ color: 'rgba(255,255,255,.68)', fontSize: '1.1rem' }}>Loading featured products...</Typography></Box>
                    ) : error ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}><Typography sx={{ color: 'rgba(255,100,100,.8)', fontSize: '1.1rem', mb: 2 }}>{error}</Typography></Box>
                    ) : featured.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}><Typography sx={{ color: 'rgba(255,255,255,.68)', fontSize: '1.1rem' }}>No featured products available.</Typography></Box>
                    ) : (
                        <Grid container spacing={{ md: 4, xs: 3 }}>
                            {featured.slice(0, 4).map(({ image, title, id, category }, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <Card sx={{ background: 'transparent', overflow: 'hidden', transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { transform: 'translateY(-12px)' } }}>
                                        <CardActionArea component={Link} to={`/p/${id}/${href(category)}/${href(title)}`}>
                                            <Box sx={{ overflow: 'hidden', '&:hover img': { transform: 'scale(1.08)' } }}>
                                                <CardMedia sx={{ transition: 'transform 1s ease' }}><WorkDriveImage image={image} alt={title} /></CardMedia>
                                            </Box>
                                            <CardContent sx={{ p: { md: 5, xs: 3 } }}>
                                                <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.78rem', fontWeight: 700, color: '#efcb77', mb: 2 }}>{category}</Typography>
                                                <Typography sx={{ fontSize: { md: '1.25rem', xs: '1rem' }, lineHeight: 1.3, fontWeight: 800, textTransform: 'uppercase', color: 'white' }}>{title}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>

            {/* CTA SECTION - 3 STEPS */}
            <Box component="section" sx={{ background: 'linear-gradient(135deg, #d69d45 0%, #9f6720 50%, #d69d45 100%)', py: { md: '140px', xs: '100px' }, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,247,220,.1), transparent 50%)' }, '&::after': { content: '""', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'radial-gradient(circle at 70% 50%, rgba(255,247,220,.08), transparent 50%)' } }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 }, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto', mb: { md: 10, xs: 8 } }}>
                        <Typography sx={{ fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' }, lineHeight: 1.05, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: 'white', mb: { md: 5, xs: 4 }, textShadow: '0 2px 20px rgba(0,0,0,.2)' }}>Start Your Journey with Victory</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,.95)', lineHeight: 2.1, fontSize: { md: '1.15rem', xs: '1.05rem' }, maxWidth: '720px', margin: '0 auto' }}>Transform your life in three simple steps. Join thousands of successful distributors building their dreams.</Typography>
                    </Box>
                    
                    <Grid container spacing={{ md: 5, xs: 4 }} sx={{ mb: { md: 8, xs: 6 } }}>
                        {[
                            { step: '01', title: 'Register Yourself as a Distributor', description: 'Sign up and become part of the Victory World family. Get instant access to our complete product catalog and business tools.' },
                            { step: '02', title: 'Buy Combo kit Product', description: 'Enjoy exclusive distributor pricing on all premium products. Stock up and save while building your inventory.' },
                            { step: '03', title: 'Follow our victory Business system & start building money', description: 'Share quality products with others and earn attractive commissions. Build your network and grow your income unlimited.' }
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Box sx={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.2)', p: { md: 6, xs: 4 }, minHeight: { md: '320px', xs: '280px' }, display: 'flex', flexDirection: 'column', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-8px)', background: 'rgba(255,255,255,.15)', boxShadow: '0 20px 50px rgba(0,0,0,.3)' } }}>
                                    <Typography sx={{ fontSize: { md: '4rem', xs: '3rem' }, fontWeight: 900, color: 'rgba(255,255,255,.3)', lineHeight: 1, mb: 3 }}>{item.step}</Typography>
                                    <Typography sx={{ fontSize: { md: '1.5rem', xs: '1.2rem' }, fontWeight: 800, textTransform: 'uppercase', color: 'white', mb: 3, lineHeight: 1.2 }}>{item.title}</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.9)', lineHeight: 1.8, fontSize: { md: '1.05rem', xs: '1rem' } }}>{item.description}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Stack direction={{ md: 'row', xs: 'column' }} spacing={3} justifyContent="center" sx={{ '& .MuiButton-root': { borderRadius: 0 } }}>
                        <Button component="a" href="#" target="_blank" rel="noopener noreferrer" size="large" sx={{ background: 'white', color: '#000', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 700, boxShadow: '0 15px 35px rgba(0,0,0,.25)', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 50px rgba(0,0,0,.35)', background: 'white' } }}>Become a Distributor</Button>
                        <Button component={Link} to="/products" size="large" sx={{ border: '2px solid white', color: 'white', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 700, transition: 'all 0.35s ease', '&:hover': { background: 'white', color: '#000', transform: 'translateY(-3px)' } }}>Browse Products</Button>
                    </Stack>
                </Container>
            </Box>

        </React.Fragment>
    );
}

export default ShopHome;
