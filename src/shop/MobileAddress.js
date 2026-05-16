import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../utils/fetcher";

const MobileAddress = () => {
    const [addresses, setAddresses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetcher(`/api/addresses`)
            .then(r => r.json())
            .then(({ addresses }) => setAddresses(addresses))
    }, [])

    return (
        <Box p={3}>
            <Typography
                my={2}
                variant="h3"
                sx={{
                    color: 'white',
                    fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                }}
            >
                Deliver To
            </Typography>
            <Typography
                mb={3}
                sx={{
                    color: '#ffa94d',
                    fontSize: '0.9rem'
                }}
            >
                Select or add a Address to Checkout
            </Typography>
            {addresses.map(({
                id,
                saved_name,
                firstname,
                lastname,
                address_1,
                address_2,
                landmark,
                city,
                state,
                postcode,
                phone,
                alt_phone
            }) => (
                <Box key={id} mb={3}>
                    <Card
                        variant="outlined"
                        onClick={() => {
                            sessionStorage.setItem('address', id)
                            navigate('/checkout')
                        }}
                        sx={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                borderColor: 'rgba(221,180,93,.2)',
                                boxShadow: '0 25px 60px rgba(0,0,0,.45)'
                            },
                            '&:active': {
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Chip
                                label={saved_name}
                                sx={{
                                    mb: 2,
                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    color: '#000',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em'
                                }}
                            />
                            <Typography sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                                {firstname} {lastname}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                {address_1}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                {address_2}
                            </Typography>
                            {landmark && (
                                <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                    {landmark}
                                </Typography>
                            )}
                            <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                {city}, {state} - {postcode}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem', mt: 1 }}>
                                Phone: {phone}
                            </Typography>
                            {alt_phone && (
                                <Typography sx={{ color: 'rgba(255,255,255,.68)', fontSize: '0.9rem' }}>
                                    Alt: {alt_phone}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            ))}
            <Box
                textAlign="center"
                mb={2}
            >
                <Button
                    component={Link}
                    to="/add-address"
                    size="large"
                    variant="outlined"
                    sx={{
                        border: '1px solid rgba(255,255,255,.15)',
                        color: 'white',
                        padding: '16px 36px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        transition: 'all 0.35s ease',
                        borderRadius: 0,
                        minHeight: '44px',
                        '&:hover': {
                            borderColor: '#ddb45d',
                            color: '#ddb45d',
                            background: 'transparent'
                        }
                    }}
                >
                    + Add New Address
                </Button>
            </Box>
        </Box>
    )
}
export default MobileAddress;