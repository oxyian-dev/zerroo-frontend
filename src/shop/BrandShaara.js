import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const features = [
    {
        title: 'Ultra Soft',
        text: 'Rash free comfort that feels gentle through the day.'
    },
    {
        title: 'High Absorbency',
        text: 'Built to hold more while staying light and secure.'
    },
    {
        title: 'Anti-Bacterial Layer',
        text: 'Protection focused top layer for hygienic confidence.'
    },
    {
        title: 'Breathable Bottom',
        text: 'Helps maintain a fresher and more comfortable feel.'
    },
    {
        title: 'Leak Lock Fit',
        text: 'Engineered to support secure protection and stability.'
    },
    {
        title: 'Individually Packed',
        text: 'Convenient and hygienic, ready whenever you need it.'
    }
]

const technologies = [
    'Anion Technology',
    'Graphene Technology',
    'Far Infrared (FIR) Technology',
    'Magnetic Layer Technology',
    'Nano Silver Protection',
    'Chitin Technology',
    'Japanese Manufactured Super Absorbent Core',
    'Protective Wings Prevent Side Leakage',
    'Cottony Soft Top Layer',
    'All-Around Airlaid Wrapping for Zero Leaks',
    'Skin Safe Glue',
    'Bio degradable'
]

const standards = ['ISO', 'CE', 'FDA', 'BIS Certified']

const ctaPills = ['Safe', 'Comfortable', 'Hygienic', 'Premium Quality']
const productStats = [
    { label: 'Pack Type', value: 'Premium Sanitary Pads' },
    { label: 'Comfort', value: 'Ultra Soft' },
    { label: 'Protection', value: 'Leak Lock' },
    { label: 'Certifications', value: 'ISO | CE | FDA | BIS' }
]
const tickerItems = [
    'SHAARA',
    'Advanced Protection',
    'Comfort & Confidence',
    'Modern Feminine Hygiene'
]
const marqueeItems = [...tickerItems, ...tickerItems, ...tickerItems]

export default function BrandShaara() {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: '#020202',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 20% 20%, rgba(239,203,119,0.11), transparent 30%), radial-gradient(circle at 80% 10%, rgba(214,157,69,0.08), transparent 22%), radial-gradient(circle at 50% 90%, rgba(245,220,151,0.06), transparent 28%)',
                    pointerEvents: 'none'
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    opacity: 0.12,
                    pointerEvents: 'none'
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(255,255,255,.08)',
                    background: 'linear-gradient(90deg, rgba(239,203,119,.1), rgba(255,255,255,.02), rgba(239,203,119,.1))'
                }}
            >
                <Box
                    sx={{
                        py: 1.25,
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            width: 'max-content',
                            alignItems: 'center',
                            animation: 'shaaraMarquee 28s linear infinite',
                            willChange: 'transform',
                            '@keyframes shaaraMarquee': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' }
                            }
                        }}
                    >
                        {[0, 1].map((repeatIndex) => (
                            <Box
                                key={repeatIndex}
                                component="span"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    px: 4,
                                    color: '#f5dc97',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.3em',
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}
                            >
                                {marqueeItems.map((item, index) => (
                                    <React.Fragment key={`${repeatIndex}-${index}-${item}`}>
                                        <span>{item}</span>
                                        {index < marqueeItems.length - 1 && (
                                            <span style={{ color: 'rgba(255,255,255,.45)' }}>•</span>
                                        )}
                                    </React.Fragment>
                                ))}
                                <span style={{ color: 'rgba(255,255,255,.45)', marginLeft: '8px' }}>•</span>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Container
                maxWidth="xl"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    py: { md: 7, xs: 5 },
                    px: { md: 6, xs: 2.5 }
                }}
            >
                <Stack spacing={{ md: 6, xs: 4 }}>
                    <Grid container spacing={{ md: 5, xs: 3 }} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Stack spacing={3}>
                                <Typography
                                    sx={{
                                        color: '#efcb77',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.48em',
                                        fontSize: { xs: '0.72rem', md: '0.8rem' },
                                        fontWeight: 700
                                    }}
                                >
                                    Welcome to SHAARA
                                </Typography>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        color: '#fff',
                                        fontSize: { xs: '2.5rem', md: '4.6rem' },
                                        lineHeight: 0.95,
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '-0.05em',
                                        maxWidth: 680
                                    }}
                                >
                                    An International Quality Napkin for Indian Women
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'rgba(255,255,255,.72)',
                                        lineHeight: 2.05,
                                        fontSize: { xs: '1rem', md: '1.08rem' },
                                        maxWidth: 620
                                    }}
                                >
                                    Experience next-generation feminine hygiene with advanced comfort, protection, and wellness care designed for modern women.
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1.25,
                                        pt: 1
                                    }}
                                >
                                    {ctaPills.map((item) => (
                                        <Box
                                            key={item}
                                            sx={{
                                                px: 2.1,
                                                py: 1.05,
                                                borderRadius: '999px',
                                                border: '1px solid rgba(239,203,119,.28)',
                                                background: 'rgba(239,203,119,.08)',
                                                color: '#f5dc97',
                                                fontSize: '0.82rem',
                                                fontWeight: 700,
                                                letterSpacing: '0.14em',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {item}
                                        </Box>
                                    ))}
                                </Box>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={1}>
                                    <Button
                                        component={Link}
                                        to="/p/1/Sanitary-Napkin/Shaara-Sanitary-Pads"
                                        sx={{
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                            color: '#000',
                                            px: 4,
                                            py: 1.8,
                                            borderRadius: 0,
                                            fontWeight: 800,
                                            letterSpacing: '0.18em',
                                            textTransform: 'uppercase',
                                            boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 20px 50px rgba(221,180,93,.22)' }
                                        }}
                                    >
                                        Buy Now
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/shop"
                                        sx={{
                                            border: '1px solid rgba(255,255,255,.14)',
                                            color: '#fff',
                                            px: 4,
                                            py: 1.8,
                                            borderRadius: 0,
                                            fontWeight: 700,
                                            letterSpacing: '0.18em',
                                            textTransform: 'uppercase',
                                            backdropFilter: 'blur(8px)',
                                            '&:hover': {
                                                borderColor: '#efcb77',
                                                color: '#efcb77',
                                                background: 'rgba(255,255,255,.02)'
                                            }
                                        }}
                                    >
                                        Shop Range
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ position: 'relative', maxWidth: 680, mx: 'auto' }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: { xs: '10% 6%', md: '8% 10%' },
                                        background: 'radial-gradient(circle, rgba(239,203,119,.16) 0%, rgba(239,203,119,.08) 32%, transparent 70%)',
                                        filter: 'blur(24px)',
                                        transform: 'scale(1.2)'
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 18,
                                        left: 18,
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        border: '1px solid rgba(239,203,119,.16)',
                                        background: 'radial-gradient(circle, rgba(239,203,119,.12), transparent 70%)'
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: 180,
                                        height: 180,
                                        borderRadius: '50%',
                                        border: '1px solid rgba(255,255,255,.06)',
                                        background: 'radial-gradient(circle, rgba(255,255,255,.05), transparent 72%)'
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: 'relative',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        border: '1px solid rgba(239, 203, 119, 0.18)',
                                        boxShadow: '0 30px 80px rgba(0,0,0,.42)',
                                        background: 'linear-gradient(180deg, rgba(239,203,119,.08), rgba(255,255,255,.02))'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/shaara.png"
                                        alt="SHAARA Sanitary Pads"
                                        sx={{
                                            width: '100%',
                                            height: { xs: 340, md: 520 },
                                            objectFit: 'cover',
                                            display: 'block',
                                            transform: 'scale(1.02)'
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(180deg, rgba(0,0,0,.02) 0%, rgba(0,0,0,.35) 50%, rgba(0,0,0,.86) 100%)'
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: { xs: 18, md: 28 },
                                            right: { xs: 18, md: 28 },
                                            bottom: { xs: 18, md: 28 }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#efcb77',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.36em',
                                                fontSize: '0.72rem',
                                                fontWeight: 700,
                                                mb: 1.2
                                            }}
                                        >
                                            SHAARA
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                fontSize: { xs: '1.8rem', md: '2.8rem' },
                                                fontWeight: 900,
                                                lineHeight: 0.98,
                                                textTransform: 'uppercase',
                                                maxWidth: 420
                                            }}
                                        >
                                            {/* Modern confidence */}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: { xs: 18, md: 30 },
                                        right: { xs: 18, md: 30 },
                                        px: 2.25,
                                        py: 1.4,
                                        border: '1px solid rgba(255,255,255,.12)',
                                        background: 'rgba(0,0,0,.58)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 18px 40px rgba(0,0,0,.2)'
                                    }}
                                >
                                    <Typography sx={{ color: '#efcb77', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, mb: 0.4 }}>
                                        Quality
                                    </Typography>
                                    <Typography sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.4 }}>
                                        ISO | CE | FDA | BIS
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                            gap: 1.5
                        }}
                    >
                        {standards.map((item) => (
                            <Box
                                key={item}
                                sx={{
                                    p: 2.2,
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,.08)',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))',
                                    color: '#fff',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    fontSize: '0.8rem'
                                }}
                            >
                                {item}
                            </Box>
                        ))}
                    </Box>
                </Stack>
            </Container>

            <Box
                component="section"
                sx={{
                    position: 'relative',
                    borderTop: '1px solid rgba(255,255,255,.08)',
                    borderBottom: '1px solid rgba(255,255,255,.08)',
                    background: '#050505'
                }}
            >
                <Container maxWidth="xl" sx={{ py: { md: 6, xs: 4 }, px: { md: 6, xs: 2.5 } }}>
                    <Grid container spacing={{ md: 4, xs: 3 }} alignItems="start">
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    position: { md: 'sticky', xs: 'relative' },
                                    top: { md: 110, xs: 'auto' },
                                    p: { xs: 3, md: 4 },
                                    border: '1px solid rgba(255,255,255,.08)',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))',
                                    boxShadow: '0 20px 50px rgba(0,0,0,.18)'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#efcb77',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.45em',
                                        fontSize: '0.76rem',
                                        fontWeight: 700,
                                        mb: 2
                                    }}
                                >
                                    Featured Product
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: { xs: '1.8rem', md: '2.6rem' },
                                        lineHeight: 1,
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '-0.04em',
                                        mb: 2.5
                                    }}
                                >
                                    SHAARA
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,.72)', lineHeight: 2.05, fontSize: '1rem', mb: 3 }}>
                                    International quality feminine hygiene with advanced comfort and dependable daily protection.
                                </Typography>

                                <Stack spacing={1.25} sx={{ mb: 3 }}>
                                    {productStats.map((stat) => (
                                        <Box
                                            key={stat.label}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                gap: 2,
                                                px: 2,
                                                py: 1.4,
                                                border: '1px solid rgba(255,255,255,.08)',
                                                background: 'rgba(0,0,0,.22)'
                                            }}
                                        >
                                            <Typography sx={{ color: 'rgba(255,255,255,.6)', fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>
                                                {stat.label}
                                            </Typography>
                                            <Typography sx={{ color: '#fff', fontSize: '0.92rem', fontWeight: 700, textAlign: 'right' }}>
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>

                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 2,
                                        border: '1px solid rgba(239,203,119,.18)',
                                        background: 'linear-gradient(180deg, rgba(239,203,119,.08), rgba(255,255,255,.02))'
                                    }}
                                >
                                    <Typography sx={{ color: '#efcb77', textTransform: 'uppercase', letterSpacing: '0.28em', fontSize: '0.72rem', fontWeight: 800, mb: 1 }}>
                                        Shop With Confidence
                                    </Typography>
                                    <Typography sx={{ color: '#fff', lineHeight: 1.8, fontWeight: 600 }}>
                                        Safe • Comfortable • Hygienic • Premium Quality
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Stack spacing={3} sx={{ mb: 4 }}>
                                <Typography
                                    sx={{
                                        color: '#efcb77',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.45em',
                                        fontSize: '0.78rem',
                                        fontWeight: 700
                                    }}
                                >
                                    Why Choose SHAARA?
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: { xs: '2rem', md: '3.6rem' },
                                        lineHeight: 1,
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '-0.04em',
                                        maxWidth: 900
                                    }}
                                >
                                    Designed for comfort, protection, and everyday confidence
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.1, fontSize: { md: '1.05rem', xs: '1rem' }, maxWidth: 780 }}>
                                    SHAARA brings together comfort-focused materials and protective design details so modern women can feel fresh, secure, and confident throughout the day.
                                </Typography>
                            </Stack>

                            <Grid container spacing={3}>
                                {features.map((feature, index) => (
                                    <Grid item xs={12} sm={6} key={feature.title}>
                                        <Box
                                            sx={{
                                                height: '100%',
                                                p: 3.25,
                                                border: '1px solid rgba(255,255,255,.08)',
                                                background: index % 2 === 0 ? 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))' : 'linear-gradient(180deg, rgba(239,203,119,.08), rgba(255,255,255,.01))',
                                                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-6px)',
                                                    borderColor: 'rgba(239,203,119,.22)',
                                                    boxShadow: '0 20px 45px rgba(0,0,0,.28)'
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#efcb77',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.22em',
                                                    textTransform: 'uppercase',
                                                    mb: 1.8
                                                }}
                                            >
                                                0{index + 1}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: '#fff',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.04em',
                                                    mb: 1.5
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 1.95, fontSize: '0.98rem' }}>
                                                {feature.text}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box component="section" sx={{ background: '#020202' }}>
                <Container maxWidth="xl" sx={{ py: { md: 6, xs: 4 }, px: { md: 6, xs: 2.5 } }}>
                    <Grid container spacing={{ md: 5, xs: 3 }} alignItems="start">
                        <Grid item xs={12} md={4}>
                            <Typography
                                sx={{
                                    color: '#efcb77',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.45em',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    mb: 3
                                }}
                            >
                                Advanced Technology Protection
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#fff',
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    lineHeight: 1,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.04em',
                                    mb: 3
                                }}
                            >
                                Engineered with layered protection
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,.68)', lineHeight: 2.05, fontSize: '1rem' }}>
                                The SHAARA structure is designed with advanced layered technology to support softness, dryness, and a secure fit.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {technologies.map((item, index) => (
                                    <Grid item xs={12} sm={6} key={item}>
                                        <Box
                                            sx={{
                                                p: 2.5,
                                                minHeight: 92,
                                                border: '1px solid rgba(255,255,255,.08)',
                                                background: index % 3 === 0 ? 'rgba(239,203,119,.06)' : 'rgba(255,255,255,.02)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                transition: 'transform 0.3s ease, border-color 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    borderColor: 'rgba(239,203,119,.22)'
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: '50%',
                                                    border: '1px solid rgba(239,203,119,.28)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#efcb77',
                                                    fontWeight: 800,
                                                    flexShrink: 0
                                                }}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </Box>
                                            <Typography sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.6 }}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box
                component="section"
                sx={{
                    borderTop: '1px solid rgba(255,255,255,.08)',
                    background: 'linear-gradient(180deg, rgba(239,203,119,.06), rgba(0,0,0,0))'
                }}
            >
                <Container maxWidth="xl" sx={{ py: { md: 6, xs: 4 }, px: { md: 6, xs: 2.5 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    border: '1px solid rgba(255,255,255,.08)',
                                    background: 'rgba(255,255,255,.02)'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#efcb77',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.35em',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        mb: 2
                                    }}
                                >
                                    Designed For Modern Women
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: { xs: '1.7rem', md: '2.2rem' },
                                        lineHeight: 1.1,
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        mb: 2.5
                                    }}
                                >
                                    Comfort, confidence, hygiene, and freshness
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,.72)', lineHeight: 2.05, fontSize: '1rem' }}>
                                    SHAARA is designed to provide a premium experience for everyday active lifestyles, giving women a dependable product that supports ease and peace of mind.
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                    border: '1px solid rgba(255,255,255,.08)',
                                    background: 'rgba(255,255,255,.02)'
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#efcb77',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.35em',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        mb: 2
                                    }}
                                >
                                    Quality Standards
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#fff',
                                        fontSize: { xs: '1.6rem', md: '2rem' },
                                        lineHeight: 1.15,
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        mb: 2.5
                                    }}
                                >
                                    ISO | CE | FDA | BIS Certified
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,.72)', lineHeight: 2.05, fontSize: '1rem' }}>
                                    Certified quality helps reinforce trust, consistency, and premium product positioning for the SHAARA brand.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
