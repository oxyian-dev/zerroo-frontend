import { Box, Container, IconButton, Link, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconDialpad, IconMail, IconPhoneCall, IconUserCheck } from '@tabler/icons';
import { Link as Route } from "react-router-dom";
import LogoSection from '../layout/MainLayout/LogoSection';

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
                    display="flex"
                    justifyContent="space-evenly"
                    flexDirection={{
                        md: "row",
                        xs: "column"
                    }}
                    textAlign={{
                        xs: "center",
                        md: "left"
                    }}
                    mb={{ md: 6, xs: 4 }}
                    gap={{ md: 6, xs: 4 }}
                >
                    <Box
                        sx={{
                            "& ol": {
                                listStylePosition: "inside"
                            }
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                color: 'white',
                                fontSize: { md: '1.5rem', xs: '1.2rem' },
                                fontWeight: 700,
                                mb: 2,
                                letterSpacing: '0.02em'
                            }}
                        >
                            Quick Links
                        </Typography>
                        <List sx={{ p: 0 }}>
                            {[
                                {
                                    text: "Login",
                                    link: "/login"
                                },
                                {
                                    text: "Shipping",
                                    link: "/shipping"
                                },
                                {
                                    text: "Products",
                                    link: "/products"
                                },
                                {
                                    text: "Commonly used terms in Direct selling",
                                    link: "/commonly-terms-directselling"
                                },
                                {
                                    text: "Comphensation plan",
                                    link: "/comphensation-plan"
                                },
                                {
                                    text: "Transactions",
                                    link: "/transactions"
                                },
                                {
                                    text: "Rights and Duties",
                                    link: "/rights-and-duties"
                                },
                                {
                                    text: "Business Informtion Kit",
                                    link: "/business-informtion-kit"
                                },
                                {
                                    text: "Termination in Direct Selling Industry",
                                    link: "/termination-directselling"
                                },
                                {
                                    text: "Privacy Policy",
                                    link: "/privacy-policy"
                                },
                                {
                                    text: "Terms Of Service",
                                    link: "/terms-of-service"
                                },
                                {
                                    text: "Legal Documents",
                                    link: "/legal-documents"
                                },
                            ].map(({ text, link }, key) => (
                                <ListItem
                                    component={Route}
                                    to={link}
                                    key={key}
                                    sx={{
                                        py: 0.5,
                                        px: 0,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(4px)'
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{
                                            sx: {
                                                textAlign: {
                                                    xs: "center",
                                                    md: "left"
                                                },
                                                color: 'rgba(255,255,255,.68)',
                                                fontSize: { md: '1rem', xs: '0.95rem' },
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: '#efcb77'
                                                }
                                            }
                                        }}
                                        primary={text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <Typography
                            variant="h2"
                            mb={2}
                            sx={{
                                color: 'white',
                                fontSize: { md: '1.5rem', xs: '1.2rem' },
                                fontWeight: 700,
                                letterSpacing: '0.02em'
                            }}
                        >
                            Reach Us
                        </Typography>
                        <Stack spacing={2}>
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    pl: { md: 1, xs: 0 },
                                    fontSize: { md: '1rem', xs: '0.95rem' },
                                    lineHeight: 1.8
                                }}
                            >
                                5/837, Naal road,<br />
                                Thennampatti, Vedasandur (TK),<br />
                                Dindigul - 624802<br />
                            </Typography>
                            <Stack spacing={1} pl={{ md: 0, xs: 8 }}>
                                <Box display="flex" alignItems="center">
                                    <IconButton
                                        component={Link}
                                        href="mailto:info@victoryworld.in"
                                        target='_blank'
                                        aria-label="Email us"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
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
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
                                        }}
                                    >
                                        info@victoryworld.in
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton
                                        component={Link}
                                        href="mailto:info@victoryworld.in"
                                        target='_blank'
                                        aria-label="Support email"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
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
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
                                        }}
                                    >
                                        info@victoryworld.in
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton
                                        component={Link}
                                        href="tel:+919384529159"
                                        target='_blank'
                                        aria-label="Call us at +91 9384529159"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
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
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
                                        }}
                                    >
                                        +91 9384529159
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton
                                        component={Link}
                                        href="tel:+919176112453"
                                        target='_blank'
                                        aria-label="Call us at +91 9176112453"
                                        sx={{
                                            color: 'white',
                                            transition: 'color 0.3s ease',
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
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
                                            '&:hover': {
                                                color: '#efcb77'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
                                        }}
                                    >
                                        +91 9176112453
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2} px={{ md: 0, xs: 8 }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <IconButton
                                    component={Link}
                                    href="https://www.instagram.com/victoryworld_official"
                                    target='_blank'
                                    aria-label="Visit our Instagram"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: '#efcb77',
                                            transform: 'translateY(-4px)'
                                        },
                                        '&:focus-visible': {
                                            outline: '2px solid #efcb77',
                                            outlineOffset: '2px'
                                        }
                                    }}
                                >
                                    <IconBrandInstagram size={24} />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    href="https://www.facebook.com/profile.php?id=61572047320496&mibextid=rS40aB7S9Ucbxw6v"
                                    target='_blank'
                                    aria-label="Visit our Facebook"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: '#efcb77',
                                            transform: 'translateY(-4px)'
                                        },
                                        '&:focus-visible': {
                                            outline: '2px solid #efcb77',
                                            outlineOffset: '2px'
                                        }
                                    }}
                                >
                                    <IconBrandFacebook size={24} />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    href="https://chat.whatsapp.com/GjzJy6U8qkh1njxgywvTg8"
                                    target='_blank'
                                    aria-label="Join our WhatsApp"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: '#efcb77',
                                            transform: 'translateY(-4px)'
                                        },
                                        '&:focus-visible': {
                                            outline: '2px solid #efcb77',
                                            outlineOffset: '2px'
                                        }
                                    }}
                                >
                                    <IconBrandWhatsapp size={24} />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    href="https://www.linkedin.com/company/victoryworld"
                                    target='_blank'
                                    aria-label="Visit our LinkedIn"
                                    sx={{
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: '#efcb77',
                                            transform: 'translateY(-4px)'
                                        },
                                        '&:focus-visible': {
                                            outline: '2px solid #efcb77',
                                            outlineOffset: '2px'
                                        }
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
