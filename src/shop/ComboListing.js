import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
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
    }, [id])

    return (
        loading ? (
            <Loader />
        ) : (
            <Container>
                <Grid container spacing={{ md: 2, xs: 0 }}>
                    <Grid item xs={12}>
                        <Typography my={2} variant="h1" textAlign="center">{data?.[0].category}</Typography>
                    </Grid>
                    {data.map(({ id, category, image, name, price }, key) => (
                        <Grid key={key} item md={4} xs={6}>
                            <Card variant="elevation" sx={{
                                "img": {
                                    transition: 'all 0.3s ease-in-out 0s',
                                },
                                ":hover img": {
                                    transform: 'scale3d(1.04, 1.04, 1)',
                                    transition: 'all 0.3s ease-in-out 0s',
                                    overflow: 'hidden'
                                }
                            }}>
                                <CardActionArea
                                    component={Link}
                                    to={`/cd/${id}/${href(category)}/${href(name)}`}>
                                    <Box height="100%" overflow="hidden">
                                        <CardMedia
                                            component="img"
                                            image={toImage(image)}
                                            alt={name} />
                                    </Box>
                                    <CardContent sx={{ p: 1 }}>
                                        <Box>
                                            <Typography
                                                fontWeight="normal"
                                                variant="h4">
                                                {name}
                                            </Typography>
                                            <Typography
                                                noWrap={true}
                                                overflow='hidden'
                                                display='inline'
                                                variant="subtitle1">
                                                ₹{price.price}
                                            </Typography>
                                            {price.discount != 0 &&
                                                <Typography
                                                    noWrap={true}
                                                    overflow='hidden'
                                                    ml={0.5}
                                                    display='inline'
                                                    variant='caption'
                                                    sx={{ textDecoration: 'line-through' }}>₹{price.mrp}</Typography>
                                            }
                                            {price.discount != 0 &&
                                                <Typography
                                                    noWrap={true}
                                                    display='inline'
                                                    ml={0.5}
                                                    color={orange[700]}>
                                                    ({price.discount}% OFF)
                                                </Typography>
                                            }
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    )
}
