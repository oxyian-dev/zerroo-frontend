import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    AppBar,
    Badge,
    Box,
    Collapse,
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
    Popover,
    Stack, Toolbar,
    Typography
} from "@mui/material";
import { IconDashboard, IconLogin, IconLogout, IconMenu2, IconNotebook, IconShoppingCart, IconUser, IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import { Link, Outlet, useLocation } from "react-router-dom";
import { getName, getUsername, isDistributor, isLoggedIn, isOrgUser } from "../auth/AuthProvider";
import Footer from '../components/Footer';
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
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setOpenDrawer(!openDrawer)}
                        >
                            {openDrawer ? <IconX /> : <IconMenu2 />}
                        </IconButton>

                        {layout.title !== '' && (
                            <Typography variant="h3" color="inherit" component="div" flexGrow={1} noWrap>
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
                                sx={{ ml: 2 }}
                            >
                                <Badge badgeContent={layout.cart_count} color="primary">
                                    <IconShoppingCart />
                                </Badge>
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>

                {!openDrawer && (
                    <Box textAlign="center" mt={2} >
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                            "We don't design clothes,
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                            We design dreams"
                        </Typography>
                    </Box>
                )}

                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <Box bgcolor="primary.main">
                        <Box my={2} mx={8}>
                            <LogoSection />
                        </Box>
                    </Box>

                    <Divider />

                    <List>
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
                                    <IconDashboard />
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
                                    <IconDashboard />
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
                                    <IconUser />
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
                                    <IconShoppingCart />
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
                                    <IconLogout />
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
                                    <IconLogin />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        )}
                    </List>

                    <Divider />

                    <Typography textAlign="center" mt={4} fontWeight="bold" variant="h4">
                        Categories
                    </Typography>

                    <List>
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
                                        {mobileExpanded[parent.id] ? <ExpandLess /> : <ExpandMore />}
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
                        <ListItemButton
                            component="a"
                            href="/pdf/ZERROO PRESENTATION PLAN.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                setMobileExpanded({});
                                setOpenDrawer(false);
                            }}
                        >
                            <ListItemText primary="Plan Book" />
                        </ListItemButton>
                    </List>
                </Drawer>

                <Box pb={4} minHeight="calc(100vh - 144px)">
                    <Outlet context={[setLayout, layout]} />
                </Box>

                <Footer />
            </MobileView>

            <BrowserView>
                <AppBar position="sticky">
                    <Toolbar>
                        <Box>
                            <LogoSection />
                        </Box>
                        <Box
                            position="absolute"
                            left="50%"
                            sx={{ transform: 'translateX(-50%)', textAlign: 'center' }}
                        >
                            <Typography color="white" variant="h3" fontWeight="bold">
                                "We don't design clothes,
                            </Typography>
                            <Typography color="white" variant="h3" fontWeight="bold">
                                We design dreams"
                            </Typography>
                        </Box>
                        <Box position='absolute' right={20}>
                            <Stack direction='row' spacing={2}>
                                <IconButton
                                    size='large'
                                    variant='text'
                                    color='light'
                                    component="a"
                                    href="/pdf/ZERROO PRESENTATION PLAN.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"

                                >
                                    <IconNotebook size='30' />
                                </IconButton>
                                {login ? (
                                    <Box>
                                        <IconButton color="inherit" onClick={handleUserMenuClick}>
                                            <IconUser size='30' />
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
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <Typography px={2} py={1}>{getName()}</Typography>
                                            {isDistributor() && (
                                                <Typography px={2} py={1}>{getUsername()}</Typography>
                                            )}
                                            <Divider />
                                            {isOrgUser() && (
                                                <MenuItem component={Link} to="/admin">
                                                    <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon>
                                                    Dashboard
                                                </MenuItem>
                                            )}
                                            {isDistributor() && (
                                                <MenuItem component={Link} to="/dashboard">
                                                    <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon>
                                                    Dashboard
                                                </MenuItem>
                                            )}

                                            {isDistributor() && (
                                                <MenuItem component={Link} to="/dashboard/account">
                                                    <ListItemIcon>
                                                        <IconUser />
                                                    </ListItemIcon>
                                                    Account
                                                </MenuItem>
                                            )}

                                            {isDistributor() && (
                                                <MenuItem component={Link} to="/dashboard/your-orders">
                                                    <ListItemIcon>
                                                        <IconShoppingCart />
                                                    </ListItemIcon>
                                                    Your Orders
                                                </MenuItem>
                                            )}

                                            <MenuItem component={Link} to='/logout'>
                                                <ListItemIcon>
                                                    <IconLogout />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ) : (
                                    <IconButton color="inherit" component={Link} to="/login">
                                        <IconUser size='30' />
                                    </IconButton>
                                )}
                                {viewCart && (
                                    <Box>
                                        <IconButton component={Link} to="/cart" color="inherit">
                                            <Badge badgeContent={layout.cart_count} color="primary">
                                                <IconShoppingCart size='30' />
                                            </Badge>
                                        </IconButton>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box minHeight="calc(100vh - 148.5px)">
                    <Outlet context={[setLayout, layout]} />
                </Box>
                <Footer />
            </BrowserView>
        </Box >
    )
}
export default ShopLayout;