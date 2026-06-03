import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ComingSoon = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `
                    radial-gradient(circle at top left, rgba(246,210,123,.18), transparent 28%),
                    radial-gradient(circle at bottom right, rgba(103,197,255,.14), transparent 24%),
                    linear-gradient(180deg, #050505 0%, #090909 45%, #020202 100%)
                `,
                display: 'flex',
                alignItems: 'center',
                py: { xs: 8, md: 12 }
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={3.5} alignItems="center" textAlign="center">
                    <Box
                        sx={{
                            px: 2.5,
                            py: 1,
                            borderRadius: 999,
                            border: '1px solid rgba(246,210,123,.22)',
                            bgcolor: 'rgba(246,210,123,.08)',
                            color: '#f6d27b',
                            textTransform: 'uppercase',
                            letterSpacing: '.2em',
                            fontSize: '0.72rem',
                            fontWeight: 800
                        }}
                    >
                        Coming Soon
                    </Box>
                    <Typography
                        sx={{
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            fontWeight: 900,
                            lineHeight: 0.95,
                            fontSize: { xs: 'clamp(2.4rem, 10vw, 4.8rem)', md: 'clamp(3.6rem, 6vw, 6rem)' }
                        }}
                    >
                        This category is under
                        <Box component="span" sx={{ display: 'block', color: '#f6d27b' }}>
                            development
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            maxWidth: 760,
                            color: 'rgba(255,255,255,.74)',
                            fontSize: { xs: '1rem', md: '1.06rem' },
                            lineHeight: 1.9
                        }}
                    >
                        Women Hygiene is available now. All other categories will be launched soon with a more refined shopping experience.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            component={Link}
                            to="/brand/shaara"
                            size="large"
                            sx={{
                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                color: '#000',
                                px: 4,
                                py: 1.8,
                                borderRadius: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                fontWeight: 700
                            }}
                        >
                            Shop Women Hygiene
                        </Button>
                        <Button
                            component={Link}
                            to="/"
                            size="large"
                            sx={{
                                border: '1px solid rgba(255,255,255,.18)',
                                color: '#fff',
                                px: 4,
                                py: 1.8,
                                borderRadius: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                fontWeight: 700
                            }}
                        >
                            Back Home
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default ComingSoon;
