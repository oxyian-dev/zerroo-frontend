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

const categoryPanels = [
    {
        title: 'Women Hygiene',
        description: 'Premium hygiene essentials created for comfort, freshness, and daily confidence.',
        accent: 'rgba(246, 210, 123, .22)',
        image: '/shaara.png',
        link: '/brand/shaara',
        align: 'flex-end',
        tall: true
    },
    {
        title: 'Fashion & Lifestyle',
        description: 'Curated style and everyday living essentials that blend modern aesthetics with practical comfort.',
        accent: 'rgba(209, 170, 255, .20)',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
        link: '/coming-soon',
        align: 'flex-start'
    }
];

const supportCategories = [
    {
        title: 'Personal Care',
        description: 'Daily essentials for freshness, hygiene, and everyday confidence.',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop',
        accent: 'rgba(246, 210, 123, .18)'
    },
    {
        title: 'Body Care',
        description: 'Body care selections that feel gentle, polished, and restorative.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=900&auto=format&fit=crop',
        accent: 'rgba(209, 170, 255, .18)'
    },
    {
        title: 'Home Care',
        description: 'Home care products that keep spaces fresh, clean, and organised.',
        image: 'https://images.unsplash.com/photo-1581579185169-80e5f0c1f8c9?q=80&w=900&auto=format&fit=crop',
        accent: 'rgba(103, 197, 255, .18)'
    },
    {
        title: 'Nutrition',
        description: 'Wellness-supporting choices that encourage balance, energy, and better living.',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=900&auto=format&fit=crop',
        accent: 'rgba(138, 220, 155, .18)'
    }
];

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
            label: "SHAARA",
            title: "An International Quality Napkin for Indian Women",
            description: "Experience next-generation feminine hygiene with advanced comfort, protection, and wellness care designed for modern women.",
            showLogo: false,
            rightImage: "/shaara.png"
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
                    pt: { xs: 0, md: '80px' },
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
                        
                        <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 6, xs: 2.5 }, position: 'relative', zIndex: 4, py: { md: 4, xs: 3 }, width: '100%' }}>
                            <Grid container spacing={{ md: 8, xs: 4 }} alignItems="center">
                                <Grid item xs={12} md={slide.showLogo || slide.rightImage ? 6 : 12} sx={{ order: { xs: 1, md: 1 } }}>
                                    <Typography sx={{ textTransform: 'uppercase', letterSpacing: '0.45em', fontSize: { md: '0.78rem', xs: '0.7rem' }, fontWeight: 700, color: '#efcb77', mb: { md: 4, xs: 2 } }}>{slide.label}</Typography>
                                    <Typography sx={{ fontSize: { xs: 'clamp(2rem, 7vw, 3rem)', md: 'clamp(3rem, 7vw, 5rem)' }, lineHeight: 0.95, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', mb: { md: 5, xs: 2 }, maxWidth: slide.showLogo ? '100%' : '800px' }}>{slide.title}</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' }, mb: { md: 6, xs: 1 }, maxWidth: slide.showLogo ? '100%' : '720px' }}>{slide.description}</Typography>
                                    {index === 0 && (
                                        <Stack direction={{ md: 'row', xs: 'column' }} spacing={{ md: 3, xs: 2 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                            <Button component={Link} to={isLoggedIn() ? (isOrgUser() ? "/admin" : "/dashboard") : "/login"} size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 800, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.35s ease', borderRadius: 0, border: '1px solid rgba(255,255,255,.06)', textShadow: '0 1px 0 rgba(255,255,255,.25)', '&:hover': { transform: 'translateY(-5px)', color: '#120f05', background: 'linear-gradient(135deg, #fffdf5 0%, #fbeec2 12%, #f5d778 30%, #d6a83f 55%, #a76f20 78%, #fff6d8 100%)', boxShadow: '0 22px 52px rgba(221,180,93,.28)', borderColor: 'rgba(255,255,255,.16)' } }}>Login</Button>
                                            <Button component={Link} to="/p/1/Sanitary-Napkin/Shaara-Sanitary-Pads" size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 800, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.35s ease', borderRadius: 0, border: '1px solid rgba(255,255,255,.06)', textShadow: '0 1px 0 rgba(255,255,255,.25)', '&:hover': { transform: 'translateY(-5px)', color: '#120f05', background: 'linear-gradient(135deg, #fffdf5 0%, #fbeec2 12%, #f5d778 30%, #d6a83f 55%, #a76f20 78%, #fff6d8 100%)', boxShadow: '0 22px 52px rgba(221,180,93,.28)', borderColor: 'rgba(255,255,255,.16)' } }}>Buy Now</Button>
                                        </Stack>
                                    )}
                                    {index === 1 && (
                                        <Stack direction={{ md: 'row', xs: 'column' }} spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                            <Button component={Link} to="/p/1/Sanitary-Napkin/Shaara-Sanitary-Pads" size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 800, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.35s ease', borderRadius: 0, border: '1px solid rgba(255,255,255,.06)', textShadow: '0 1px 0 rgba(255,255,255,.25)', '&:hover': { transform: 'translateY(-5px)', color: '#120f05', background: 'linear-gradient(135deg, #fffdf5 0%, #fbeec2 12%, #f5d778 30%, #d6a83f 55%, #a76f20 78%, #fff6d8 100%)', boxShadow: '0 22px 52px rgba(221,180,93,.28)', borderColor: 'rgba(255,255,255,.16)' } }}>Buy Now</Button>
                                            <Button component={Link} to="/login" size="large" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: { md: '18px 42px', xs: '16px 36px' }, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: { md: '0.78rem', xs: '0.72rem' }, fontWeight: 700, transition: 'all 0.35s ease', borderRadius: 0, background: 'rgba(255,255,255,.02)', '&:hover': { borderColor: '#f5dc97', color: '#fff7dc', background: 'rgba(255,255,255,.08)', boxShadow: '0 14px 35px rgba(0,0,0,.24)', transform: 'translateY(-3px)' } }}>Login</Button>
                                        </Stack>
                                    )}
                                </Grid>
                                {slide.showLogo && (
                                    <Grid item xs={12} md={6} sx={{ order: { xs: 3, md: 2 } }}>
                                        <Box sx={{ width: { md: '500px', xs: '300px' }, height: { md: '500px', xs: '300px' }, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', inset: '30px', borderRadius: '50%', border: '1px solid rgba(221,180,93,.2)' }, '&::after': { content: '""', position: 'absolute', width: { md: '640px', xs: '400px' }, height: { md: '640px', xs: '400px' }, borderRadius: '50%', border: '1px solid rgba(255,255,255,.04)' } }}>
                                            <Box component="img" src="brand_logo/web-app-manifest-512x512.png" alt="Victory World" sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'drop-shadow(0 0 40px rgba(221,180,93,.22))' }} />
                                        </Box>
                                    </Grid>
                                )}
                                {slide.rightImage && !slide.showLogo && (
                                    <Grid item xs={12} md={6} sx={{ order: { xs: 3, md: 2 } }}>
                                        <Box sx={{ width: { md: '500px', xs: '300px' }, height: { md: '500px', xs: '300px' }, borderRadius: { md: '32px', xs: '24px' }, border: '1px solid rgba(255,255,255,.12)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', inset: '22px', borderRadius: { md: '24px', xs: '18px' }, border: '1px solid rgba(221,180,93,.2)' }, '&::after': { content: '""', position: 'absolute', inset: 0, borderRadius: { md: '32px', xs: '24px' }, border: '1px solid rgba(255,255,255,.04)' } }}>
                                            <Box component="img" src={slide.rightImage} alt="Transform Lives" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', position: 'relative', zIndex: 2, borderRadius: { md: '32px', xs: '24px' }, filter: 'drop-shadow(0 0 40px rgba(221,180,93,.22))' }} />
                                        </Box>
                                    </Grid>
                                )}
                                {index === 0 && (
                                    <Grid item xs={12} sx={{ order: { xs: 2, md: 0 }, display: { xs: 'block', md: 'none' } }}>
                                        <Stack direction="column" spacing={1}>
                                            <Button component={Link} to={isLoggedIn() ? (isOrgUser() ? "/admin" : "/dashboard") : "/login"} size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 800, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.35s ease', borderRadius: 0, border: '1px solid rgba(255,255,255,.06)', textShadow: '0 1px 0 rgba(255,255,255,.25)', '&:hover': { transform: 'translateY(-5px)', color: '#120f05', background: 'linear-gradient(135deg, #fffdf5 0%, #fbeec2 12%, #f5d778 30%, #d6a83f 55%, #a76f20 78%, #fff6d8 100%)', boxShadow: '0 22px 52px rgba(221,180,93,.28)', borderColor: 'rgba(255,255,255,.16)' } }}>Login</Button>
                                            <Button component={Link} to="/p/1/Sanitary-Napkin/Shaara-Sanitary-Pads" size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 800, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.35s ease', borderRadius: 0, border: '1px solid rgba(255,255,255,.06)', textShadow: '0 1px 0 rgba(255,255,255,.25)', '&:hover': { transform: 'translateY(-5px)', color: '#120f05', background: 'linear-gradient(135deg, #fffdf5 0%, #fbeec2 12%, #f5d778 30%, #d6a83f 55%, #a76f20 78%, #fff6d8 100%)', boxShadow: '0 22px 52px rgba(221,180,93,.28)', borderColor: 'rgba(255,255,255,.16)' } }}>Buy Now</Button>
                                        </Stack>
                                    </Grid>
                                )}
                                {index === 1 && (
                                    <Grid item xs={12} sx={{ order: { xs: 2, md: 0 }, display: { xs: 'block', md: 'none' } }}>
                                        <Stack direction="column" spacing={1.5}>
                                            <Button component={Link} to="/p/1/Sanitary-Napkin/Shaara-Sanitary-Pads" size="large" sx={{ background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)', color: '#000', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.22em', fontSize: '0.72rem', fontWeight: 800, boxShadow: '0 15px 35px rgba(221,180,93,.15)', transition: 'all 0.35s ease', borderRadius: 0, border: '1px solid rgba(255,255,255,.06)', textShadow: '0 1px 0 rgba(255,255,255,.25)', '&:hover': { transform: 'translateY(-5px)', color: '#120f05', background: 'linear-gradient(135deg, #fffdf5 0%, #fbeec2 12%, #f5d778 30%, #d6a83f 55%, #a76f20 78%, #fff6d8 100%)', boxShadow: '0 22px 52px rgba(221,180,93,.28)', borderColor: 'rgba(255,255,255,.16)' } }}>Buy Now</Button>
                                            <Button component={Link} to="/login" size="large" sx={{ border: '1px solid rgba(255,255,255,.15)', color: 'white', padding: '16px 36px', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, transition: 'all 0.35s ease', borderRadius: 0, background: 'rgba(255,255,255,.02)', '&:hover': { borderColor: '#f5dc97', color: '#fff7dc', background: 'rgba(255,255,255,.08)', boxShadow: '0 14px 35px rgba(0,0,0,.24)', transform: 'translateY(-3px)' } }}>Login</Button>
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
            <Box
                component="section"
                sx={{
                    background: 'linear-gradient(180deg, #020202 0%, #05070a 100%)',
                    py: { md: '80px', xs: '56px' },
                    borderTop: '1px solid rgba(255,255,255,.08)',
                    borderBottom: '1px solid rgba(255,255,255,.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 20% 10%, rgba(246,210,123,.08), transparent 30%), radial-gradient(circle at 80% 20%, rgba(103,197,255,.06), transparent 28%)',
                        pointerEvents: 'none'
                    }
                }}
            >
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 6, xs: 2.5 }, position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={{ md: 6, xs: 3 }} alignItems="end" sx={{ mb: { md: 6, xs: 4 } }}>
                        <Grid item xs={12} lg={7}>
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.45em',
                                    fontSize: { md: '0.78rem', xs: '0.7rem' },
                                    fontWeight: 700,
                                    color: '#f6d27b',
                                    mb: { md: 3, xs: 2.5 }
                                }}
                            >
                                Product Categories
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: 860,
                                    fontSize: { xs: 'clamp(2rem, 8vw, 3rem)', md: 'clamp(3rem, 5vw, 5rem)' },
                                    lineHeight: 0.95,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.045em',
                                    color: 'white',
                                    mb: 3
                                }}
                            >
                                Curated categories for every lifestyle
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: 760,
                                    color: 'rgba(255,255,255,.72)',
                                    lineHeight: 2.05,
                                    fontSize: { md: '1.05rem', xs: '1rem' }
                                }}
                            >
                                Explore the most relevant product families with a clear focus on Women Hygiene, Fashion & Lifestyle, alongside supporting everyday essentials.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box
                                sx={{
                                    p: { xs: 2.5, md: 3.5 },
                                    borderRadius: 3,
                                    border: '1px solid rgba(255,255,255,.08)',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))',
                                    backdropFilter: 'blur(12px)'
                                }}
                            >
                                <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                                    {['Women Hygiene', 'Fashion & Lifestyle', 'Personal Care'].map((tag) => (
                                        <Box
                                            key={tag}
                                            sx={{
                                                px: 2,
                                                py: 1,
                                                borderRadius: 999,
                                                border: '1px solid rgba(246,210,123,.18)',
                                                bgcolor: 'rgba(246,210,123,.08)',
                                                color: '#f6d27b',
                                                textTransform: 'uppercase',
                                                letterSpacing: '.08em',
                                                fontSize: '0.72rem',
                                                fontWeight: 700
                                            }}
                                        >
                                            {tag}
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={{ md: 4, xs: 3 }}>
                        {categoryPanels.map((panel, index) => (
                            <Grid
                                item
                                xs={12}
                                md={categoryPanels.length === 2 ? 12 : (index === 0 ? 12 : 6)}
                                lg={categoryPanels.length === 2 ? (index === 0 ? 7 : 5) : (index === 0 ? 6 : 3)}
                                key={panel.title}
                            >
                                <Box
                                    component={Link}
                                    to={panel.link}
                                        sx={{
                                            display: 'block',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: 4,
                                        minHeight: panel.tall ? { xs: 340, md: 500 } : { xs: 280, md: 260 },
                                        border: '1px solid rgba(255,255,255,.08)',
                                        textDecoration: 'none',
                                        background: `
                                            linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.72)),
                                            radial-gradient(circle at top right, ${panel.accent}, transparent 55%)
                                        `,
                                        transition: 'transform .35s ease, border-color .35s ease, box-shadow .35s ease',
                                        '&:hover': {
                                            transform: 'translateY(-6px)',
                                            borderColor: 'rgba(246,210,123,.26)',
                                            boxShadow: '0 24px 60px rgba(0,0,0,.38)'
                                        },
                                        '&:hover .category-media': {
                                            transform: 'scale(1.06)'
                                        }
                                    }}
                                >
                                    <Box
                                        className="category-media"
                                        component="img"
                                        src={panel.image}
                                        alt={panel.title}
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform .8s ease',
                                            filter: panel.title === 'Women Hygiene' ? 'saturate(1.05) contrast(1.02)' : 'saturate(.88) contrast(1.05)'
                                        }}
                                    />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(180deg, rgba(2,4,7,.12) 0%, rgba(2,4,7,.58) 36%, rgba(2,4,7,.9) 100%)'
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'relative',
                                            zIndex: 1,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            p: { xs: 3, md: 4.5 },
                                            minHeight: 'inherit'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: panel.align }}>
                                            <Box
                                                sx={{
                                            maxWidth: panel.tall ? 460 : 340,
                                            width: '100%',
                                            p: { xs: 2.25, md: 2.75 },
                                                    borderRadius: 3,
                                                    border: '1px solid rgba(255,255,255,.12)',
                                                    background: 'linear-gradient(180deg, rgba(5,7,10,.66), rgba(5,7,10,.88))',
                                                    backdropFilter: 'blur(10px)',
                                                    boxShadow: '0 16px 34px rgba(0,0,0,.25)'
                                                }}
                                            >
                                                <Stack spacing={1.2} alignItems={panel.align} sx={{ textAlign: panel.align === 'flex-end' ? 'right' : 'left' }}>
                                                    <Typography
                                                        sx={{
                                                            color: '#fff',
                                                            fontSize: { xs: '1.7rem', md: panel.tall ? '2.8rem' : '1.95rem' },
                                                            lineHeight: 1.02,
                                                            fontWeight: 900,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '-0.04em',
                                                            maxWidth: panel.tall ? 420 : 260,
                                                            textShadow: '0 2px 12px rgba(0,0,0,.55)'
                                                        }}
                                                    >
                                                        {panel.title}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: 'rgba(255,255,255,.86)',
                                                            lineHeight: 1.75,
                                                            fontSize: { xs: '0.93rem', md: '0.98rem' },
                                                            maxWidth: panel.tall ? 420 : 280,
                                                            textShadow: '0 1px 8px rgba(0,0,0,.4)'
                                                        }}
                                                    >
                                                        {panel.description}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Box>

                                        <Stack direction="row" spacing={1.2} alignItems="center" justifyContent={panel.align === 'flex-end' ? 'flex-end' : 'flex-start'}>
                                            <Typography
                                                sx={{
                                                    color: '#f6d27b',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '.18em',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 800
                                                }}
                                            >
                                                Explore
                                            </Typography>
                                            <Box
                                                sx={{
                                                    width: 42,
                                                    height: 42,
                                                    borderRadius: '50%',
                                                    border: '1px solid rgba(246,210,123,.24)',
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                    color: '#f6d27b',
                                                    bgcolor: 'rgba(246,210,123,.06)'
                                                }}
                                            >
                                                →
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Box
                        sx={{
                            mt: { md: 5, xs: 4 },
                            p: { xs: 0, md: 0 },
                        }}
                    >
                        <Grid container spacing={{ md: 3, xs: 2.5 }} sx={{ mt: 0 }}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        color: '#f6d27b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '.18em',
                                        fontSize: '0.72rem',
                                        fontWeight: 800,
                                        mb: 1.5
                                    }}
                                >
                                    Supporting Categories
                                </Typography>
                            </Grid>
                            {supportCategories.map((category) => (
                                <Grid item xs={12} sm={6} lg={3} key={category.title}>
                                    <Box
                                        component={Link}
                                        to="/coming-soon"
                                        sx={{
                                            display: 'block',
                                            textDecoration: 'none',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: 3,
                                            minHeight: 260,
                                            border: '1px solid rgba(255,255,255,.08)',
                                            background: 'rgba(255,255,255,.02)',
                                            transition: 'transform .3s ease, border-color .3s ease, box-shadow .3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                borderColor: 'rgba(246,210,123,.24)',
                                                boxShadow: '0 18px 42px rgba(0,0,0,.35)'
                                            },
                                            '&:hover .support-image': {
                                                transform: 'scale(1.06)'
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: 110,
                                                background: 'linear-gradient(180deg, rgba(5,7,10,.2), transparent)',
                                                zIndex: 1
                                            }}
                                        />
                                        <Box
                                            className="support-image"
                                            component="img"
                                            src={category.image}
                                            alt={category.title}
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform .7s ease',
                                                filter: 'saturate(1.02) contrast(1.02)'
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: `linear-gradient(180deg, rgba(5,7,10,.06) 0%, ${category.accent} 24%, rgba(5,7,10,.58) 58%, rgba(5,7,10,.94) 100%)`
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                zIndex: 1,
                                                minHeight: 'inherit',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                p: 3
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    mt: 'auto',
                                                    p: 2.25,
                                                    borderRadius: 3,
                                                    border: '1px solid rgba(255,255,255,.12)',
                                                    background: 'linear-gradient(180deg, rgba(5,7,10,.66), rgba(5,7,10,.88))',
                                                    backdropFilter: 'blur(10px)',
                                                    boxShadow: '0 14px 32px rgba(0,0,0,.2)'
                                                }}
                                            >
                                                <Stack spacing={1} alignItems="flex-start">
                                                    <Typography
                                                        sx={{
                                                            color: '#fff',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '-0.03em',
                                                            fontWeight: 900,
                                                            fontSize: '1.2rem',
                                                            lineHeight: 1.08,
                                                            textShadow: '0 2px 10px rgba(0,0,0,.55)'
                                                        }}
                                                    >
                                                        {category.title}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: 'rgba(255,255,255,.88)',
                                                            lineHeight: 1.7,
                                                            fontSize: '0.92rem',
                                                            textShadow: '0 1px 8px rgba(0,0,0,.35)'
                                                        }}
                                                    >
                                                        {category.description}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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
            <Box component="section" sx={{ background: '#020202', py: { md: '80px', xs: '56px' }, borderTop: '1px solid rgba(255,255,255,.08)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 6, xs: 2.5 } }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: { lg: 'flex-end' }, justifyContent: 'space-between', gap: { md: 4, xs: 3 }, mb: { md: 6, xs: 4 } }}>
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
                                            <CardContent sx={{ p: { md: 3, xs: 2 } }}>
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
            <Box component="section" sx={{ background: 'linear-gradient(135deg, #d69d45 0%, #9f6720 50%, #d69d45 100%)', py: { md: '80px', xs: '56px' }, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,247,220,.1), transparent 50%)' }, '&::after': { content: '""', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'radial-gradient(circle at 70% 50%, rgba(255,247,220,.08), transparent 50%)' } }}>
                <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 6, xs: 2.5 }, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto', mb: { md: 6, xs: 4 } }}>
                        <Typography sx={{ fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' }, lineHeight: 1.05, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: 'white', mb: { md: 5, xs: 4 }, textShadow: '0 2px 20px rgba(0,0,0,.2)' }}>Start Your Journey with Victory</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,.95)', lineHeight: 2.1, fontSize: { md: '1.15rem', xs: '1.05rem' }, maxWidth: '720px', margin: '0 auto' }}>Transform your life in three simple steps. Join thousands of successful distributors building their dreams.</Typography>
                    </Box>
                    
                    <Grid container spacing={{ md: 4, xs: 3 }} sx={{ mb: { md: 5, xs: 4 } }}>
                        {[
                            { step: '01', title: 'Register Yourself as a Distributor', description: 'Sign up and become part of the Victory World family. Get instant access to our complete product catalog and business tools.' },
                            { step: '02', title: 'Buy Combo kit Product', description: 'Enjoy exclusive distributor pricing on all premium products. Stock up and save while building your inventory.' },
                            { step: '03', title: 'Follow our victory Business system & start building money', description: 'Share quality products with others and earn attractive commissions. Build your network and grow your income unlimited.' }
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Box sx={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.2)', p: { md: 4, xs: 3 }, minHeight: { md: '240px', xs: '220px' }, display: 'flex', flexDirection: 'column', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-8px)', background: 'rgba(255,255,255,.15)', boxShadow: '0 20px 50px rgba(0,0,0,.3)' } }}>
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
