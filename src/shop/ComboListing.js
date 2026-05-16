import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import fetcher from '../utils/fetcher'
import { href, toImage } from '../utils/util'

export default function ComboListing() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams()
        params.set('category', id)
        fetcher(`/api/listing/combos?${params}`)
            .then(r => r.json())
            .then(({ combos }) => {
                setData(combos)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [id])

    // Skeleton loader component
    const ComboCardSkeleton = () => (
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
                    height={32}
                    sx={{ bgcolor: 'rgba(255,255,255,.1)', mb: 2 }}
                />
                <Skeleton
                    variant="text"
                    width="40%"
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
                        px: { md: 10, xs: 3 }
                    }}
                >
                    {/* Page Header */}
                    <Box
                        sx={{
                            mb: { md: 10, xs: 6 },
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' },
                                lineHeight: 1,
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '-0.04em',
                                color: 'white',
                                mb: 2
                            }}
                        >
                            {data?.[0]?.category || 'Combo Packages'}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgba(255,255,255,.68)',
                                fontSize: { md: '1.05rem', xs: '1rem' },
                                lineHeight: 1.8
                            }}
                        >
                            Explore our curated combo packages
                        </Typography>
                    </Box>

                    {/* Combo Grid */}
                    <Grid container spacing={{ md: 4, xs: 3 }}>
                        {loading ? (
                            // Show skeleton loaders while loading
                            Array.from(new Array(6)).map((_, index) => (
                                <Grid key={index} item md={4} xs={6}>
                                    <ComboCardSkeleton />
                                </Grid>
                            ))
                        ) : data && data.length > 0 ? (
                            // Show actual combo cards
                            data.map(({ id, category, image, name, price }, key) => (
                                <Grid key={key} item md={4} xs={6}>
                                    <Card
                                        sx={{
                                            background: 'transparent',
                                            overflow: 'hidden',
                                            transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                transform: 'translateY(-12px)',
                                            }
                                        }}
                                    >
                                        <CardActionArea
                                            component={Link}
                                            to={`/cd/${id}/${href(category)}/${href(name)}`}
                                            aria-label={`View ${name} combo details`}
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
                                                    alt={name}
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
                                                {/* Product Name */}
                                                <Typography
                                                    component="h3"
                                                    sx={{
                                                        fontSize: { md: '1.25rem', xs: '1rem' },
                                                        lineHeight: 1.3,
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        color: 'white',
                                                        mb: 2,
                                                        minHeight: { md: '52px', xs: '42px' },
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {name}
                                                </Typography>

                                                {/* Price Section */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                        flexWrap: 'wrap'
                                                    }}
                                                >
                                                    {/* Current Price */}
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontSize: { md: '1.5rem', xs: '1.2rem' },
                                                            fontWeight: 700,
                                                            color: '#efcb77',
                                                            lineHeight: 1
                                                        }}
                                                    >
                                                        ₹{price.price}
                                                    </Typography>

                                                    {/* Original Price & Discount */}
                                                    {price.discount !== 0 && (
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    fontSize: { md: '1.1rem', xs: '0.95rem' },
                                                                    color: 'rgba(255,255,255,.45)',
                                                                    textDecoration: 'line-through',
                                                                    lineHeight: 1
                                                                }}
                                                            >
                                                                ₹{price.mrp}
                                                            </Typography>
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    fontSize: { md: '0.9rem', xs: '0.8rem' },
                                                                    color: '#efcb77',
                                                                    fontWeight: 600,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.1em',
                                                                    lineHeight: 1,
                                                                    px: 1,
                                                                    py: 0.5,
                                                                    background: 'rgba(239,203,119,.1)',
                                                                    borderRadius: '2px'
                                                                }}
                                                            >
                                                                {price.discount}% OFF
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            // Empty state
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        py: 10
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: { md: '1.5rem', xs: '1.2rem' },
                                            color: 'rgba(255,255,255,.68)',
                                            mb: 2
                                        }}
                                    >
                                        No combo packages available
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: { md: '1rem', xs: '0.95rem' },
                                            color: 'rgba(255,255,255,.45)'
                                        }}
                                    >
                                        Check back soon for new offerings
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>
        )
    )
}
