import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material'
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconDialpad, IconMail, IconPhoneCall, IconUserCheck } from '@tabler/icons'
import { Link as Route } from 'react-router-dom'
import LogoSection from '../layout/MainLayout/LogoSection'
import { footerNavigationSections } from '../shop/navigation'

export default function Footer() {
    return (
        <Box
            sx={{
                bgcolor: '#020202',
                borderTop: '1px solid rgba(255,255,255,.08)',
                pt: { md: 8, xs: 4 },
                pb: 3
            }}
        >
            <Container>
                <Box textAlign="center" mb={{ md: 6, xs: 4 }}>
                    <LogoSection />
                </Box>
                <Typography
                    variant="h4"
                    textAlign="center"
                    mb={{ md: 6, xs: 4 }}
                    sx={{
                        color: 'rgba(255,255,255,.82)',
                        lineHeight: 1.6,
                        fontSize: { md: '1.5rem', xs: '1.2rem' },
                        fontWeight: 400,
                        px: { md: 4, xs: 2 }
                    }}
                >
                    Join us for your second income by selling premium products. Victory World provides the chance to open the franchise and promote the quality of its goods through minimal investments.
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))', lg: 'repeat(5, minmax(0, 1fr))' },
                        gap: { md: 5, xs: 4 },
                        mb: { md: 6, xs: 4 }
                    }}
                >
                    {footerNavigationSections.map((section) => (
                        <Box key={section.title}>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: 'white',
                                    fontSize: { md: '1.5rem', xs: '1.2rem' },
                                    fontWeight: 700,
                                    mb: 2,
                                    letterSpacing: '0.02em',
                                    textAlign: { xs: 'center', md: 'left' }
                                }}
                            >
                                {section.title}
                            </Typography>
                            <Stack spacing={1.25} alignItems={{ xs: 'center', md: 'flex-start' }}>
                                {section.links.map(({ text, link, external }) => (
                                    external ? (
                                        <Typography
                                            key={text}
                                            component="a"
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: 'rgba(255,255,255,.68)',
                                                textDecoration: 'none',
                                                fontSize: { md: '1rem', xs: '0.95rem' },
                                                transition: 'all 0.3s ease',
                                                display: 'inline-flex',
                                                width: 'fit-content',
                                                justifyContent: { xs: 'center', md: 'flex-start' },
                                                '&:hover': {
                                                    color: '#efcb77',
                                                    transform: 'translateX(4px)'
                                                },
                                                '&:focus-visible': {
                                                    outline: '2px solid #efcb77',
                                                    outlineOffset: '2px'
                                                }
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            key={text}
                                            component={Route}
                                            to={link}
                                            sx={{
                                                color: 'rgba(255,255,255,.68)',
                                                textDecoration: 'none',
                                                fontSize: { md: '1rem', xs: '0.95rem' },
                                                transition: 'all 0.3s ease',
                                                display: 'inline-flex',
                                                width: 'fit-content',
                                                justifyContent: { xs: 'center', md: 'flex-start' },
                                                '&:hover': {
                                                    color: '#efcb77',
                                                    transform: 'translateX(4px)'
                                                },
                                                '&:focus-visible': {
                                                    outline: '2px solid #efcb77',
                                                    outlineOffset: '2px'
                                                }
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    )
                                ))}
                            </Stack>
                        </Box>
                    ))}

                    {/* Reach Us — 5th column at lg, full-width below */}
                    <Box>
                        <Typography
                            variant="h2"
                            mb={2}
                            sx={{
                                color: 'white',
                                fontSize: { md: '1.5rem', xs: '1.2rem' },
                                fontWeight: 700,
                                letterSpacing: '0.02em',
                                textAlign: { xs: 'center', md: 'left' }
                            }}
                        >
                            Reach Us
                        </Typography>
                        <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    fontSize: { md: '1rem', xs: '0.95rem' },
                                    lineHeight: 1.8,
                                    textAlign: { xs: 'center', md: 'left' }
                                }}
                            >
                                5/837, Naal road,<br />
                                Thennampatti, Vedasandur (TK),<br />
                                Dindigul - 624802<br />
                            </Typography>
                            <Stack spacing={1} sx={{ width: '100%' }}>
                                <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                    <IconButton
                                        component={Link}
                                        href="mailto:info@victoryworld.in"
                                        target="_blank"
                                        aria-label="Email us"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        <IconMail size={20} />
                                    </IconButton>
                                    <Typography
                                        component={Link}
                                        href="mailto:info@victoryworld.in"
                                        ml={1}
                                        sx={{
                                            color: 'rgba(255,255,255,.68)',
                                            textDecoration: 'none',
                                            fontSize: { md: '1rem', xs: '0.95rem' },
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        info@victoryworld.in
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                    <IconButton
                                        component={Link}
                                        href="mailto:info@victoryworld.in"
                                        target="_blank"
                                        aria-label="Support email"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        <IconUserCheck size={20} />
                                    </IconButton>
                                    <Typography
                                        component={Link}
                                        href="mailto:info@victoryworld.in"
                                        ml={1}
                                        sx={{
                                            color: 'rgba(255,255,255,.68)',
                                            textDecoration: 'none',
                                            fontSize: { md: '1rem', xs: '0.95rem' },
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        info@victoryworld.in
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                    <IconButton
                                        component={Link}
                                        href="tel:+919384529159"
                                        target="_blank"
                                        aria-label="Call us at +91 9384529159"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        <IconPhoneCall size={20} />
                                    </IconButton>
                                    <Typography
                                        component={Link}
                                        href="tel:+919384529159"
                                        ml={1}
                                        sx={{
                                            color: 'rgba(255,255,255,.68)',
                                            textDecoration: 'none',
                                            fontSize: { md: '1rem', xs: '0.95rem' },
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        +91 9384529159
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                    <IconButton
                                        component={Link}
                                        href="tel:+919176112453"
                                        target="_blank"
                                        aria-label="Call us at +91 9176112453"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        <IconDialpad size={20} />
                                    </IconButton>
                                    <Typography
                                        component={Link}
                                        href="tel:+919176112453"
                                        ml={1}
                                        sx={{
                                            color: 'rgba(255,255,255,.68)',
                                            textDecoration: 'none',
                                            fontSize: { md: '1rem', xs: '0.95rem' },
                                            transition: 'color 0.3s ease',
                                            '&:hover': { color: '#efcb77' },
                                            '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                        }}
                                    >
                                        +91 9176112453
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} pt={1}>
                                <IconButton
                                    component={Link}
                                    href="https://www.instagram.com/victoryworld_official"
                                    target="_blank"
                                    aria-label="Visit our Instagram"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { color: '#efcb77', transform: 'translateY(-4px)' },
                                        '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                    }}
                                >
                                    <IconBrandInstagram size={24} />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    href="https://www.facebook.com/profile.php?id=61572047320496&mibextid=rS40aB7S9Ucbxw6v"
                                    target="_blank"
                                    aria-label="Visit our Facebook"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { color: '#efcb77', transform: 'translateY(-4px)' },
                                        '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                    }}
                                >
                                    <IconBrandFacebook size={24} />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    href="https://chat.whatsapp.com/GjzJy6U8qkh1njxgywvTg8"
                                    target="_blank"
                                    aria-label="Join our WhatsApp"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { color: '#efcb77', transform: 'translateY(-4px)' },
                                        '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                    }}
                                >
                                    <IconBrandWhatsapp size={24} />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    href="https://www.linkedin.com/company/victoryworld"
                                    target="_blank"
                                    aria-label="Visit our LinkedIn"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { color: '#efcb77', transform: 'translateY(-4px)' },
                                        '&:focus-visible': { outline: '2px solid #efcb77', outlineOffset: '2px' }
                                    }}
                                >
                                    <IconBrandLinkedin size={24} />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
