import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    AppBar,
    Badge,
    Box,
    Collapse,
    Container,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import { IconDashboard, IconLogin, IconLogout, IconMenu2, IconNotebook, IconShoppingCart, IconUser, IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import { Link, Outlet, useLocation } from "react-router-dom";
import { getName, getUsername, isDistributor, isLoggedIn, isOrgUser } from "../auth/AuthProvider";
import LogoSection from '../layout/MainLayout/LogoSection';
import { getCartCount } from "../utils/CartUtil";
import fetcher from "../utils/fetcher";
import { href } from "../utils/util";

const ShopLayout = () => {

    const [layout, setLayout] = useState({ title: '', back: '' })
    const [categories, setCategories] = useState([])
    const [dropdown, setDropdown] = useState({})
    const [userMenuEl, setUserMenuEl] = useState(null);
    const userMenuOpen = Boolean(userMenuEl);
    const handleUserMenuClick = (event) => {
        setUserMenuEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setUserMenuEl(null)
    }

    const { pathname } = useLocation()


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

    const [viewCart, setViewCart] = useState(true)
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        setViewCart(pathname !== '/cart')
    }, [pathname])

    const login = isLoggedIn();
    const [mobileExpanded, setMobileExpanded] = useState({})

    const findXs = count => {
        if (count > 3) return 3;
        return 12 / count
    }

    return (
        <Box>
            <MobileView>
                {/* Modern Mobile Header */}
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        borderBottom: '1px solid rgba(255,255,255,.08)',
                        background: 'rgba(0,0,0,.7)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{
                                mr: 2,
                                color: 'rgba(255,255,255,.82)',
                                '&:hover': {
                                    color: '#f5dc97',
                                }
                            }}
                            onClick={() => setOpenDrawer(!openDrawer)}
                        >
                            {openDrawer ? <IconX /> : <IconMenu2 />}
                        </IconButton>

                        {layout.title !== '' && (
                            <Typography
                                variant="h3"
                                color="inherit"
                                component="div"
                                flexGrow={1}
                                noWrap
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                }}
                            >
                                {layout.title}
                            </Typography>
                        )}

                        {(pathname === '/' || layout.title === '') && (
                            <Box flexGrow={1} textAlign="center">
                                <LogoSection />
                            </Box>
                        )}

                        {viewCart && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                component={Link}
                                to="/cart"
                                sx={{
                                    ml: 2,
                                    color: 'rgba(255,255,255,.82)',
                                    '&:hover': {
                                        color: '#f5dc97',
                                    }
                                }}
                            >
                                <Badge
                                    badgeContent={layout.cart_count}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                            color: '#000',
                                            fontWeight: 700,
                                        }
                                    }}
                                >
                                    <IconShoppingCart />
                                </Badge>
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    PaperProps={{
                        sx: {
                            background: '#0a0a0a',
                            borderRight: '1px solid rgba(255,255,255,.08)',
                            width: '280px',
                        }
                    }}
                >
                    <Box
                        sx={{
                            background: 'rgba(0,0,0,.7)',
                            borderBottom: '1px solid rgba(255,255,255,.08)',
                        }}
                    >
                        <Box my={2} mx={4}>
                            <LogoSection />
                        </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    <List
                        sx={{
                            '& .MuiListItemButton-root': {
                                color: 'rgba(255,255,255,.82)',
                                '&:hover': {
                                    bgcolor: 'rgba(221,180,93,.06)',
                                    color: '#f5dc97',
                                }
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'inherit',
                                minWidth: '40px',
                            }
                        }}
                    >
                        {isOrgUser() && (
                            <ListItemButton
                                component={Link}
                                to="/admin"
                                onClick={() => {
                                    setMobileExpanded({});
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <IconDashboard size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        )}

                        {isDistributor() && (
                            <ListItemButton
                                component={Link}
                                to="/dashboard"
                                onClick={() => {
                                    setMobileExpanded({});
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <IconDashboard size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        )}

                        {login && (
                            <ListItemButton
                                component={Link}
                                to="/dashboard/account"
                                onClick={() => {
                                    setMobileExpanded({});
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <IconUser size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItemButton>
                        )}

                        {isDistributor() && (
                            <ListItemButton
                                component={Link}
                                to="/dashboard/your-orders"
                                onClick={() => {
                                    setMobileExpanded({});
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <IconShoppingCart size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Your Orders" />
                            </ListItemButton>
                        )}

                        {login ? (
                            <ListItemButton
                                component={Link}
                                to="/logout"
                                onClick={() => {
                                    setMobileExpanded({});
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemIcon>
                                    <IconLogout size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        ) : (
                            <ListItemButton
                                component={Link}
                                to="/login"
                                onClick={() => {
                                    setMobileExpanded({});
                                }}
                            >
                                <ListItemIcon>
                                    <IconLogin size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        )}
                    </List>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    <Typography
                        textAlign="center"
                        mt={4}
                        fontWeight="bold"
                        variant="h4"
                        sx={{
                            color: '#efcb77',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontSize: '0.9rem',
                        }}
                    >
                        Categories
                    </Typography>

                    <List
                        sx={{
                            '& .MuiListItemButton-root': {
                                color: 'rgba(255,255,255,.82)',
                                '&:hover': {
                                    bgcolor: 'rgba(221,180,93,.06)',
                                    color: '#f5dc97',
                                }
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'inherit',
                            }
                        }}
                    >
                        {categories.map(({ parent, children }, key) => (
                            children.length > 0 ? (
                                <div key={key}>
                                    <ListItemButton
                                        key={`parent-${key}`}
                                        onClick={() => {
                                            setMobileExpanded({ ...mobileExpanded, [parent.id]: !mobileExpanded[parent.id] });
                                        }}
                                    >
                                        <ListItemText primary={parent.category} />
                                        {mobileExpanded[parent.id] ? <ExpandLess sx={{ color: '#f5dc97' }} /> : <ExpandMore sx={{ color: '#f5dc97' }} />}
                                    </ListItemButton>
                                    <Collapse in={mobileExpanded[parent.id]} timeout="auto" unmountOnExit>
                                        <List>
                                            {children.map(({ category, id }, childKey) => (
                                                <ListItemButton
                                                    key={childKey}
                                                    onClick={() => {
                                                        setMobileExpanded({});
                                                        setOpenDrawer(false);
                                                    }}
                                                    sx={{ pl: 4 }}
                                                    component={Link}
                                                    to={`/c/${id}/${href(parent.category)}/${href(category)}`}
                                                >
                                                    <ListItemText primary={category} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </div>
                            ) : (
                                <ListItemButton
                                    key={`parent-${key}`}
                                    onClick={() => {
                                        setMobileExpanded({});
                                        setOpenDrawer(false);
                                    }}
                                    component={Link}
                                    to={`/c/${parent.id}/${href(parent.category)}`}
                                >
                                    <ListItemText primary={parent.category} />
                                </ListItemButton>
                            )
                        ))}
                    </List>
                </Drawer>

                <Box
                    sx={{
                        pb: 4,
                        minHeight: 'calc(100vh - 144px)',
                        background: '#020202',
                    }}
                >
                    <Outlet context={[setLayout, layout]} />
                </Box>

                {/* Elite Mobile Footer - Matching sample_code.html exactly */}
                <Box
                    component="footer"
                    sx={{
                        borderTop: '1px solid rgba(255,255,255,.08)',
                        background: '#050505',
                    }}
                >
                    <Container
                        maxWidth={false}
                        sx={{
                            px: '24px',
                            py: '112px',
                        }}
                    >
                        <Grid container spacing={24}>
                            {/* LEFT - Brand/Logo Section */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2.5 }}>
                                    <Box
                                        component="img"
                                        src="/brand_logo/web-app-manifest-192x192.png"
                                        sx={{ width: '64px' }}
                                        alt="Victory World"
                                    />
                                    <Typography
                                        component="h3"
                                        sx={{
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.35em',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: 'white',
                                        }}
                                    >
                                        Victory World
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: 'rgba(255,255,255,.68)',
                                        lineHeight: 2.1,
                                        fontSize: '1.05rem',
                                    }}
                                >
                                    We provide a unique business opportunity for individuals to become distributors, purchase products at special prices, and build their own income by selling to others.
                                </Typography>
                            </Grid>

                            {/* CENTER - Services */}
                            <Grid item xs={12}>
                                <Typography
                                    component="h4"
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        fontSize: '0.8rem',
                                        color: '#efcb77',
                                        mb: '34px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Services
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Typography
                                        component={Link}
                                        to="/"
                                        sx={{
                                            color: 'rgba(255,255,255,.62)',
                                            textDecoration: 'none',
                                            transition: '0.3s ease',
                                            display: 'block',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        Home
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to="/shop"
                                        sx={{
                                            color: 'rgba(255,255,255,.62)',
                                            textDecoration: 'none',
                                            transition: '0.3s ease',
                                            display: 'block',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        Shop
                                    </Typography>
                                    
                                    <Typography
                                        component={Link}
                                        to="/privacy-policy"
                                        sx={{
                                            color: 'rgba(255,255,255,.62)',
                                            textDecoration: 'none',
                                            transition: '0.3s ease',
                                            display: 'block',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        Privacy Policy
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* RIGHT - Contact */}
                            <Grid item xs={12}>
                                <Typography
                                    component="h4"
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        fontSize: '0.8rem',
                                        color: '#efcb77',
                                        mb: '34px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Contact
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, color: 'rgba(255,255,255,.62)', lineHeight: 2 }}>
                                    <Typography>
                                        Office Suite B, Second Floor,<br />
                                        21A Brook Street, India
                                    </Typography>
                                    <Typography>
                                        enquiries@victoryworld.in
                                    </Typography>
                                    <Typography>
                                        +44 01943 816670
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* BOTTOM */}
                        <Box
                            sx={{
                                mt: '96px',
                                pt: '40px',
                                borderTop: '1px solid rgba(255,255,255,.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 3,
                                color: 'rgba(255,255,255,.4)',
                                fontSize: '0.875rem',
                            }}
                        >
                            <Typography sx={{ color: 'inherit', fontSize: 'inherit' }}>
                                © 2026 Victory World. All Rights Reserved.
                            </Typography>
                            <Typography sx={{ color: 'inherit', fontSize: 'inherit' }}>
                                Crafted With Luxury Precision
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </MobileView>

            <BrowserView>
                {/* Modern Fixed Header with Backdrop Blur */}
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        height: '110px',
                        borderBottom: '1px solid rgba(255,255,255,.08)',
                        background: 'rgba(0,0,0,.7)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                    }}
                >
                    <Container
                        maxWidth={false}
                        sx={{
                            maxWidth: '1440px',
                            height: '100%',
                            px: { md: '80px', xs: '24px' },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            {/* Logo */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, maxHeight: '50px' }}>
                                <LogoSection />
                            </Box>

                            {/* Navigation Links */}
                            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 7 }}>
                                <Typography
                                    component={Link}
                                    to="/"
                                    sx={{
                                        position: 'relative',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        color: 'rgba(255,255,255,.82)',
                                        textDecoration: 'none',
                                        transition: '0.3s ease',
                                        '&:hover': {
                                            color: '#f5dc97',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            bottom: '-10px',
                                            width: 0,
                                            height: '1px',
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                            transition: '0.35s ease',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        }
                                    }}
                                >
                                    Home
                                </Typography>
                                <Typography
                                    component={Link}
                                    to="/shop"
                                    sx={{
                                        position: 'relative',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        color: 'rgba(255,255,255,.82)',
                                        textDecoration: 'none',
                                        transition: '0.3s ease',
                                        '&:hover': {
                                            color: '#f5dc97',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            bottom: '-10px',
                                            width: 0,
                                            height: '1px',
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                            transition: '0.35s ease',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        }
                                    }}
                                >
                                    Shop
                                </Typography>                                
                            </Box>

                            {/* Right Side Actions */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                {login ? (
                                    <Box>
                                        <IconButton
                                            color="inherit"
                                            onClick={handleUserMenuClick}
                                            sx={{
                                                color: 'rgba(255,255,255,.82)',
                                                '&:hover': {
                                                    color: '#f5dc97',
                                                }
                                            }}
                                        >
                                            <IconUser size={24} />
                                        </IconButton>

                                        <Menu
                                            anchorEl={userMenuEl}
                                            id="account-menu"
                                            open={userMenuOpen}
                                            onClose={handleUserMenuClose}
                                            onClick={handleUserMenuClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    minWidth: 200,
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    bgcolor: '#0a0a0a',
                                                    border: '1px solid rgba(255,255,255,.08)',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'rgba(255,255,255,.82)',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(221,180,93,.06)',
                                                            color: '#f5dc97',
                                                        }
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: '#0a0a0a',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                        border: '1px solid rgba(255,255,255,.08)',
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <Typography px={2} py={1} sx={{ color: 'white', fontWeight: 600 }}>{getName()}</Typography>
                                            {isDistributor() && (
                                                <Typography px={2} py={1} sx={{ color: 'rgba(255,255,255,.6)', fontSize: '0.9rem' }}>{getUsername()}</Typography>
                                            )}
                                            <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />
                                            {isOrgUser() && (
                                                <MenuItem component={Link} to="/admin">
                                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                                        <IconDashboard size={20} />
                                                    </ListItemIcon>
                                                    Dashboard
                                                </MenuItem>
                                            )}
                                            {isDistributor() && (
                                                <MenuItem component={Link} to="/dashboard">
                                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                                        <IconDashboard size={20} />
                                                    </ListItemIcon>
                                                    Dashboard
                                                </MenuItem>
                                            )}
                                            {isDistributor() && (
                                                <MenuItem component={Link} to="/dashboard/account">
                                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                                        <IconUser size={20} />
                                                    </ListItemIcon>
                                                    Account
                                                </MenuItem>
                                            )}
                                            {isDistributor() && (
                                                <MenuItem component={Link} to="/dashboard/your-orders">
                                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                                        <IconShoppingCart size={20} />
                                                    </ListItemIcon>
                                                    Your Orders
                                                </MenuItem>
                                            )}
                                            <MenuItem component={Link} to='/logout'>
                                                <ListItemIcon sx={{ color: 'inherit' }}>
                                                    <IconLogout size={20} />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ) : (
                                    <IconButton
                                        color="inherit"
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            color: 'rgba(255,255,255,.82)',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        <IconUser size={24} />
                                    </IconButton>
                                )}
                                {viewCart && (
                                    <IconButton
                                        component={Link}
                                        to="/cart"
                                        color="inherit"
                                        sx={{
                                            color: 'rgba(255,255,255,.82)',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        <Badge
                                            badgeContent={layout.cart_count}
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                                    color: '#000',
                                                    fontWeight: 700,
                                                }
                                            }}
                                        >
                                            <IconShoppingCart size={24} />
                                        </Badge>
                                    </IconButton>
                                )}
                            </Stack>
                        </Box>
                    </Container>
                </AppBar>

                {/* Main Content with proper spacing for fixed header */}
                <Box sx={{ pt: '110px', minHeight: 'calc(100vh - 110px)', background: '#020202' }}>
                    <Outlet context={[setLayout, layout]} />
                </Box>

                {/* Elite Desktop Footer - Matching sample_code.html exactly */}
                <Box
                    component="footer"
                    sx={{
                        borderTop: '1px solid rgba(255,255,255,.08)',
                        background: '#050505',
                    }}
                >
                    <Container
                        maxWidth={false}
                        sx={{
                            maxWidth: '1440px',
                            px: '80px',
                            py: '112px',
                        }}
                    >
                        <Grid container spacing={24}>
                            {/* LEFT - Brand/Logo Section */}
                            <Grid item xs={12} lg={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2.5 }}>
                                    <Box
                                        component="img"
                                        src="/brand_logo/web-app-manifest-192x192.png"
                                        sx={{ width: '64px' }}
                                        alt="Victory world"
                                    />
                                    <Typography
                                        component="h3"
                                        sx={{
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.35em',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: 'white',
                                        }}
                                    >
                                        Victory world
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: 'rgba(255,255,255,.68)',
                                        lineHeight: 2.1,
                                        fontSize: '1.05rem',
                                    }}
                                >
                                    We provide a unique business opportunity for individuals to become distributors, purchase products at special prices, and build their own income by selling to others.
                                </Typography>
                            </Grid>

                            {/* CENTER - Services */}
                            <Grid item xs={12} lg={4}>
                                <Typography
                                    component="h4"
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        fontSize: '0.8rem',
                                        color: '#efcb77',
                                        mb: '34px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Services
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Typography
                                        component={Link}
                                        to="/"
                                        sx={{
                                            color: 'rgba(255,255,255,.62)',
                                            textDecoration: 'none',
                                            transition: '0.3s ease',
                                            display: 'block',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        Home
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to="/shop"
                                        sx={{
                                            color: 'rgba(255,255,255,.62)',
                                            textDecoration: 'none',
                                            transition: '0.3s ease',
                                            display: 'block',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        Shop
                                    </Typography>                                   
                                    <Typography
                                        component={Link}
                                        to="/privacy-policy"
                                        sx={{
                                            color: 'rgba(255,255,255,.62)',
                                            textDecoration: 'none',
                                            transition: '0.3s ease',
                                            display: 'block',
                                            '&:hover': {
                                                color: '#f5dc97',
                                            }
                                        }}
                                    >
                                        Privacy Policy
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* RIGHT - Contact */}
                            <Grid item xs={12} lg={4}>
                                <Typography
                                    component="h4"
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        fontSize: '0.8rem',
                                        color: '#efcb77',
                                        mb: '34px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Contact
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, color: 'rgba(255,255,255,.62)', lineHeight: 2 }}>
                                    <Typography>
                                        Office Suite B, Second Floor,<br />
                                        21A Brook Street, India
                                    </Typography>
                                    <Typography>
                                        enquiries@victoryworld.in
                                    </Typography>
                                    <Typography>
                                        +44 01943 816670
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* BOTTOM */}
                        <Box
                            sx={{
                                mt: '96px',
                                pt: '40px',
                                borderTop: '1px solid rgba(255,255,255,.1)',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 3,
                                color: 'rgba(255,255,255,.4)',
                                fontSize: '0.875rem',
                            }}
                        >
                            <Typography sx={{ color: 'inherit', fontSize: 'inherit' }}>
                                © 2026 Victory World.
                            </Typography>
                            <Typography sx={{ color: 'inherit', fontSize: 'inherit' }}>
                                 All Rights Reserved.
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </BrowserView>
        </Box >
    )
}
export default ShopLayout;