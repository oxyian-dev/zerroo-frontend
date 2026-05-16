import {
    Badge,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    SwipeableDrawer,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {
    IconArtboard,
    IconDiscount2,
    IconFilter,
    IconSortAscending,
    IconSortAscendingNumbers,
    IconSortDescendingNumbers
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import config from "../config";
import fetcher from "../utils/fetcher";
import { toQueryString, useQuery } from "../utils/useQuery";
import { href, toImage } from "../utils/util";
import { isLoggedIn } from "../auth/AuthProvider";

const MobileShopList = () => {
    const { id } = useParams();
    const [drawer, setDrawer] = useState({
        filter: false,
        sort: false
    })
    const [setLayout, layout] = useOutletContext()
    const { params } = useQuery()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        brands: [],
        sizes: [],
        discount: [],
        categories: [],
        colors: []
    })
    const [filterTab, setFilterTab] = useState(0)

    const getFilterCount = () => {
        return Boolean(Array.isArray(params?.f_category) ? params.f_category.length : params?.f_category) +
            Boolean(Array.isArray(params?.f_size) ? params.f_size.length : params?.f_size) +
            Boolean(Array.isArray(params?.f_color) ? params.f_color.length : params?.f_color) +
            Boolean(Array.isArray(params?.f_brand) ? params.f_brand.length : params?.f_brand) +
            Boolean(Array.isArray(params?.f_discount) ? params.f_discount.length : params?.f_discount !== undefined)
    }

    const [tempFilter, setTempFilter] = useState({
        f_category: params.f_category ? Array.isArray(params.f_category) ? params.f_category : [params.f_category] : [],
        f_size: params.f_size ? Array.isArray(params.f_size) ? params.f_size : [params.f_size] : [],
        f_color: params.f_color ? Array.isArray(params.f_color) ? params.f_color : [params.f_color] : [],
        f_brand: params.f_brand ? Array.isArray(params.f_brand) ? params.f_brand : [params.f_brand] : [],
        f_discount: params.f_discount ? Array.isArray(params.f_discount) ? params.f_discount : [params.f_discount] : [],
    })

    const toggleFilter = (filter, value) => {
        const temp = { ...tempFilter };
        if (Array.isArray(tempFilter[filter])) {
            const index = tempFilter[filter].indexOf(value);
            if (index > -1) {
                temp[filter].splice(index, 1)
            } else {
                temp[filter].push(value)
            }
        } else {
            temp[filter] = temp[filter] ? null : value;
        }
        setTempFilter(temp)
    }

    const { pathname } = useLocation()
    const setFilter = () => {
        params.f_category = tempFilter.f_category
        params.f_brand = tempFilter.f_brand
        params.f_color = tempFilter.f_color
        params.f_size = tempFilter.f_size
        params.f_discount = tempFilter.f_discount
        navigate(`${pathname}?${toQueryString(params)}`)
    }

    const clearFilter = () => {
        toggleDrawer('filter', false)()
        navigate(`${pathname}`)
    }

    useEffect(() => {
        setLoading(true)
        const apiUrl = id
            ? `/api/listing/items/category/${id}?${toQueryString(params)}`
            : `/api/listing/items?${toQueryString(params)}`;
        
        fetcher(apiUrl)
            .then(r => r.json())
            .then(({ listing, category }) => {
                const finalListing = []
                const unique = [];
                // Add null check for listing array
                const items = listing || [];
                for (let i = 0; i < items.length; i++) {
                    const u = items[i].group_id + '-' + items[i].color;
                    if (unique.indexOf(u) <= -1) {
                        unique.push(u);
                        finalListing.push(items[i])
                    }
                }
                setData(finalListing)
                setLayout({ ...layout, title: category?.category || 'All Products', back: '/' })
            })
            .catch((error) => {
                console.error('Error fetching items:', error)
                setData([])
                setLayout({ ...layout, title: 'All Products', back: '/' })
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id, params])

    useEffect(() => {
        const filterUrl = id
            ? `/api/listing/filter?category=${id}`
            : `/api/listing/filter`;
        
        fetcher(filterUrl)
            .then(r => r.json())
            .then(filters => {
                // Ensure all filter properties are arrays
                setFilters({
                    brands: filters?.brands || [],
                    sizes: filters?.sizes || [],
                    discount: filters?.discount || [],
                    categories: filters?.categories || [],
                    colors: filters?.colors || []
                })
            })
            .catch((error) => {
                console.error('Error fetching filters:', error)
                // Set empty filters on error
                setFilters({
                    brands: [],
                    sizes: [],
                    discount: [],
                    categories: [],
                    colors: []
                })
            })
    }, [id])

    const toggleDrawer = (element, open) => event => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawer({ ...drawer, [element]: open });
    };

    const navigate = useNavigate();

    function handleSort(sort) {
        params.sort = sort
        navigate(`${pathname}?${toQueryString(params)}`)
        toggleDrawer('sort', false)()
    }

    return (
        loading ? (
            <Box sx={{ background: '#020202', p: 2 }}>
                <Grid container spacing={1}>
                    {[1, 2, 3, 4].map((item) => (
                        <Grid item xs={6} key={item}>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width='100%'
                                height={250}
                                sx={{ bgcolor: 'rgba(255,255,255,.1)', borderRadius: '4px', mb: 1 }}
                            />
                            <Skeleton animation="wave" height={15} width="100%" sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                            <Skeleton animation="wave" height={15} width="70%" sx={{ bgcolor: 'rgba(255,255,255,.1)' }} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ) : (
            <Box sx={{ background: '#020202', minHeight: '100vh', pb: 10 }}>
                <Grid container spacing={0.5} p={1}>
                    {data.map(({ id, category, price, mrp, discount, pv, title, brand, image }) => (
                        <Grid item xs={6} key={id}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                    border: '1px solid rgba(255,255,255,.08)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                    }
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={`/p/${id}/${href(category)}/${href(title)}`}
                                >
                                    <Box
                                        sx={{
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={toImage(image)}
                                            alt={title}
                                            sx={{
                                                aspectRatio: '1/1',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        {discount > 0 && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                                    color: '#000',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    fontSize: '0.65rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.1em',
                                                    borderRadius: '2px'
                                                }}
                                            >
                                                {discount}% OFF
                                            </Box>
                                        )}
                                    </Box>
                                    <CardContent sx={{ p: 1.5 }}>
                                        <Typography
                                            sx={{
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.15em',
                                                fontSize: '0.65rem',
                                                fontWeight: 700,
                                                color: '#efcb77',
                                                mb: 0.5,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {brand}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.9rem',
                                                lineHeight: 1.3,
                                                fontWeight: 600,
                                                color: 'white',
                                                mb: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                minHeight: '2.34rem'
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    color: 'white'
                                                }}
                                            >
                                                ₹{price}
                                            </Typography>
                                            {discount > 0 && (
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        color: 'rgba(255,255,255,.5)',
                                                        textDecoration: 'line-through'
                                                    }}
                                                >
                                                    ₹{mrp}
                                                </Typography>
                                            )}
                                        </Box>
                                        {isLoggedIn() && (
                                            <Typography
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: '#efcb77',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {config.pvName}: {pv}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Fixed Bottom Action Bar */}
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0,0,0,.9)',
                        backdropFilter: 'blur(16px)',
                        borderTop: '1px solid rgba(255,255,255,.08)',
                        p: 1.5,
                        zIndex: 1000
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                onClick={toggleDrawer('sort', true)}
                                sx={{
                                    border: '1px solid rgba(255,255,255,.15)',
                                    color: 'rgba(255,255,255,.82)',
                                    py: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    '&:hover': {
                                        borderColor: '#ddb45d',
                                        color: '#ddb45d',
                                        background: 'transparent'
                                    }
                                }}
                            >
                                <IconSortAscending size={18} />
                                Sort
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                onClick={toggleDrawer('filter', true)}
                                sx={{
                                    border: '1px solid rgba(255,255,255,.15)',
                                    color: 'rgba(255,255,255,.82)',
                                    py: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    '&:hover': {
                                        borderColor: '#ddb45d',
                                        color: '#ddb45d',
                                        background: 'transparent'
                                    }
                                }}
                            >
                                <Badge
                                    badgeContent={getFilterCount()}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                            color: '#000',
                                            fontWeight: 700
                                        }
                                    }}
                                >
                                    <IconFilter size={18} />
                                </Badge>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Sort Drawer */}
                <SwipeableDrawer
                    anchor="bottom"
                    open={drawer.sort}
                    onClose={toggleDrawer('sort', false)}
                    onOpen={toggleDrawer('sort', true)}
                    PaperProps={{
                        sx: {
                            background: '#0a0a0a',
                            borderTop: '1px solid rgba(255,255,255,.08)',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                        }
                    }}
                >
                    <Box>
                        <Box sx={{ p: 3, pb: 2 }}>
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.25em',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    color: '#efcb77'
                                }}
                            >
                                Sort By
                            </Typography>
                        </Box>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={params.sort === "latest"}
                                    onClick={() => handleSort('latest')}
                                    sx={{
                                        py: 2,
                                        color: 'rgba(255,255,255,.82)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(221,180,93,.06)',
                                            color: '#f5dc97'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(221,180,93,.1)',
                                            color: '#f5dc97',
                                            '&:hover': {
                                                backgroundColor: 'rgba(221,180,93,.15)'
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                                        <IconArtboard size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary="Latest" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={params.sort === "discount"}
                                    onClick={() => handleSort('discount')}
                                    sx={{
                                        py: 2,
                                        color: 'rgba(255,255,255,.82)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(221,180,93,.06)',
                                            color: '#f5dc97'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(221,180,93,.1)',
                                            color: '#f5dc97',
                                            '&:hover': {
                                                backgroundColor: 'rgba(221,180,93,.15)'
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                                        <IconDiscount2 size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary="Discount" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={params.sort === "price-desc"}
                                    onClick={() => handleSort('price-desc')}
                                    sx={{
                                        py: 2,
                                        color: 'rgba(255,255,255,.82)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(221,180,93,.06)',
                                            color: '#f5dc97'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(221,180,93,.1)',
                                            color: '#f5dc97',
                                            '&:hover': {
                                                backgroundColor: 'rgba(221,180,93,.15)'
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                                        <IconSortDescendingNumbers size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary="Price: High to Low" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={params.sort === "price-asc"}
                                    onClick={() => handleSort('price-asc')}
                                    sx={{
                                        py: 2,
                                        color: 'rgba(255,255,255,.82)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(221,180,93,.06)',
                                            color: '#f5dc97'
                                        },
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(221,180,93,.1)',
                                            color: '#f5dc97',
                                            '&:hover': {
                                                backgroundColor: 'rgba(221,180,93,.15)'
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                                        <IconSortAscendingNumbers size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary="Price: Low to High" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </SwipeableDrawer>

                {/* Filter Drawer */}
                <SwipeableDrawer
                    anchor="bottom"
                    open={drawer.filter}
                    onClose={toggleDrawer('filter', false)}
                    onOpen={toggleDrawer('filter', true)}
                    PaperProps={{
                        sx: {
                            background: '#0a0a0a',
                            borderTop: '1px solid rgba(255,255,255,.08)',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                            maxHeight: '85vh'
                        }
                    }}
                >
                    <Box>
                        <Grid container p={3} alignItems="center">
                            <Grid item xs={6}>
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25em',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        color: '#efcb77'
                                    }}
                                >
                                    Filters
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={clearFilter}
                                    sx={{
                                        border: '1px solid rgba(255,100,100,.3)',
                                        color: '#ff6b6b',
                                        fontSize: '0.75rem',
                                        py: 0.5,
                                        px: 2,
                                        '&:hover': {
                                            borderColor: '#ff6b6b',
                                            background: 'rgba(255,100,100,.1)'
                                        }
                                    }}
                                >
                                    Clear All
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />
                        <Grid container>
                            <Grid item xs={4}>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={filterTab}
                                    onChange={(_, v) => setFilterTab(v)}
                                    sx={{
                                        borderRight: '1px solid rgba(255,255,255,.08)',
                                        '& .MuiTab-root': {
                                            alignItems: 'flex-start',
                                            color: 'rgba(255,255,255,.68)',
                                            fontSize: '0.85rem',
                                            py: 2,
                                            '&.Mui-selected': {
                                                color: '#efcb77',
                                                background: 'rgba(221,180,93,.06)'
                                            }
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#efcb77',
                                            width: '3px'
                                        }
                                    }}
                                >
                                    <Tab
                                        value={0}
                                        label={
                                            <Badge
                                                variant="dot"
                                                color="warning"
                                                invisible={!Boolean(Array.isArray(params?.f_category) ? params.f_category.length : params?.f_category)}
                                            >
                                                Category
                                            </Badge>
                                        }
                                    />
                                    <Tab
                                        value={1}
                                        label={
                                            <Badge
                                                variant="dot"
                                                color="warning"
                                                invisible={!Boolean(Array.isArray(params?.f_brand) ? params?.f_brand?.length : params?.f_brand)}
                                            >
                                                Brands
                                            </Badge>
                                        }
                                    />
                                    {(filters.colors?.length || 0) > 0 && (
                                        <Tab
                                            value={2}
                                            label={
                                                <Badge
                                                    variant="dot"
                                                    color="warning"
                                                    invisible={!Boolean(Array.isArray(params?.f_color) ? params?.f_color?.length : params?.f_color)}
                                                >
                                                    Colors
                                                </Badge>
                                            }
                                        />
                                    )}
                                    {(filters.sizes?.length || 0) > 0 && (
                                        <Tab
                                            value={3}
                                            label={
                                                <Badge
                                                    variant="dot"
                                                    color="warning"
                                                    invisible={!Boolean(Array.isArray(params?.f_size) ? params?.f_size?.length : params?.f_size)}
                                                >
                                                    Size
                                                </Badge>
                                            }
                                        />
                                    )}
                                    <Tab
                                        value={4}
                                        label={
                                            <Badge
                                                variant="dot"
                                                color="warning"
                                                invisible={!Boolean(Array.isArray(params?.f_discount) ? params?.f_discount?.length : params?.f_discount !== undefined)}
                                            >
                                                Discount
                                            </Badge>
                                        }
                                    />
                                </Tabs>
                            </Grid>
                            <Grid item xs={8}>
                                {/* Category Filter */}
                                {filterTab === 0 && (
                                    <Box role="tabpanel">
                                        <List
                                            subheader={
                                                <ListSubheader
                                                    sx={{
                                                        background: 'transparent',
                                                        color: 'rgba(255,255,255,.68)',
                                                        fontSize: '0.75rem',
                                                        py: 1.5
                                                    }}
                                                >
                                                    Select categories
                                                </ListSubheader>
                                            }
                                        >
                                            {filters.categories?.map(({ id, category }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => toggleFilter('f_category', id)}
                                                            sx={{
                                                                py: 1.5,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)'
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    checked={tempFilter.f_category.indexOf(id) !== -1}
                                                                    sx={{
                                                                        color: 'rgba(255,255,255,.3)',
                                                                        '&.Mui-checked': { color: '#efcb77' }
                                                                    }}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={category}
                                                                sx={{
                                                                    '& .MuiTypography-root': {
                                                                        color: 'rgba(255,255,255,.82)',
                                                                        fontSize: '0.9rem'
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider sx={{ borderColor: 'rgba(255,255,255,.05)' }} />
                                                </Box>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                {/* Brand Filter */}
                                {filterTab === 1 && (
                                    <Box role="tabpanel">
                                        <List
                                            subheader={
                                                <ListSubheader
                                                    sx={{
                                                        background: 'transparent',
                                                        color: 'rgba(255,255,255,.68)',
                                                        fontSize: '0.75rem',
                                                        py: 1.5
                                                    }}
                                                >
                                                    Select brands
                                                </ListSubheader>
                                            }
                                        >
                                            {filters.brands?.map(({ id, brand }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => toggleFilter('f_brand', id)}
                                                            sx={{
                                                                py: 1.5,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)'
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    checked={tempFilter.f_brand.indexOf(id) !== -1}
                                                                    sx={{
                                                                        color: 'rgba(255,255,255,.3)',
                                                                        '&.Mui-checked': { color: '#efcb77' }
                                                                    }}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={brand}
                                                                sx={{
                                                                    '& .MuiTypography-root': {
                                                                        color: 'rgba(255,255,255,.82)',
                                                                        fontSize: '0.9rem'
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider sx={{ borderColor: 'rgba(255,255,255,.05)' }} />
                                                </Box>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                {/* Color Filter */}
                                <Box role="tabpanel" hidden={filterTab !== 2}>
                                    <List
                                        subheader={
                                            <ListSubheader
                                                sx={{
                                                    background: 'transparent',
                                                    color: 'rgba(255,255,255,.68)',
                                                    fontSize: '0.75rem',
                                                    py: 1.5
                                                }}
                                            >
                                                Select colors
                                            </ListSubheader>
                                        }
                                    >
                                        {filters.colors?.map(({ id, hex, color }) => (
                                            <Box key={id}>
                                                <ListItem disablePadding>
                                                    <ListItemButton
                                                        onClick={() => toggleFilter('f_color', id)}
                                                        sx={{
                                                            py: 1.5,
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(221,180,93,.06)'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{ minWidth: '40px' }}>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={tempFilter.f_color.indexOf(id) !== -1}
                                                                sx={{
                                                                    color: 'rgba(255,255,255,.3)',
                                                                    '&.Mui-checked': { color: '#efcb77' }
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={color}
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    color: 'rgba(255,255,255,.82)',
                                                                    fontSize: '0.9rem'
                                                                }
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                backgroundColor: `#${hex}`,
                                                                height: '24px',
                                                                width: '40px',
                                                                border: '1px solid rgba(255,255,255,.2)',
                                                                borderRadius: '2px'
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider sx={{ borderColor: 'rgba(255,255,255,.05)' }} />
                                            </Box>
                                        ))}
                                    </List>
                                </Box>

                                {/* Size Filter */}
                                <Box role="tabpanel" hidden={filterTab !== 3}>
                                    <List
                                        subheader={
                                            <ListSubheader
                                                sx={{
                                                    background: 'transparent',
                                                    color: 'rgba(255,255,255,.68)',
                                                    fontSize: '0.75rem',
                                                    py: 1.5
                                                }}
                                            >
                                                Select sizes
                                            </ListSubheader>
                                        }
                                    >
                                        {filters.sizes?.map(({ id, size }) => (
                                            <Box key={id}>
                                                <ListItem disablePadding>
                                                    <ListItemButton
                                                        onClick={() => toggleFilter('f_size', id)}
                                                        sx={{
                                                            py: 1.5,
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(221,180,93,.06)'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{ minWidth: '40px' }}>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={tempFilter.f_size.indexOf(id) !== -1}
                                                                sx={{
                                                                    color: 'rgba(255,255,255,.3)',
                                                                    '&.Mui-checked': { color: '#efcb77' }
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={size}
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    color: 'rgba(255,255,255,.82)',
                                                                    fontSize: '0.9rem'
                                                                }
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider sx={{ borderColor: 'rgba(255,255,255,.05)' }} />
                                            </Box>
                                        ))}
                                    </List>
                                </Box>

                                {/* Discount Filter */}
                                <Box role="tabpanel" hidden={filterTab !== 4}>
                                    <List
                                        subheader={
                                            <ListSubheader
                                                sx={{
                                                    background: 'transparent',
                                                    color: 'rgba(255,255,255,.68)',
                                                    fontSize: '0.75rem',
                                                    py: 1.5
                                                }}
                                            >
                                                Select discount range
                                            </ListSubheader>
                                        }
                                    >
                                        {filters.discount?.map(({ id, discount }) => (
                                            <Box key={discount}>
                                                <ListItem disablePadding>
                                                    <ListItemButton
                                                        onClick={() => toggleFilter('f_discount', discount)}
                                                        sx={{
                                                            py: 1.5,
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(221,180,93,.06)'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{ minWidth: '40px' }}>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={tempFilter.f_discount.indexOf(discount) !== -1}
                                                                sx={{
                                                                    color: 'rgba(255,255,255,.3)',
                                                                    '&.Mui-checked': { color: '#efcb77' }
                                                                }}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={`${discount}% and Above`}
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    color: 'rgba(255,255,255,.82)',
                                                                    fontSize: '0.9rem'
                                                                }
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider sx={{ borderColor: 'rgba(255,255,255,.05)' }} />
                                            </Box>
                                        ))}
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box
                            sx={{
                                p: 2,
                                borderTop: '1px solid rgba(255,255,255,.08)',
                                background: 'rgba(0,0,0,.5)'
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={toggleDrawer('filter', false)}
                                        sx={{
                                            border: '1px solid rgba(255,255,255,.15)',
                                            color: 'white',
                                            py: 1.5,
                                            '&:hover': {
                                                borderColor: 'rgba(255,255,255,.3)',
                                                background: 'transparent'
                                            }
                                        }}
                                    >
                                        Close
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => {
                                            setFilter()
                                            toggleDrawer('filter', false)()
                                        }}
                                        sx={{
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                            color: '#000',
                                            py: 1.5,
                                            fontWeight: 700,
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </SwipeableDrawer>
            </Box>
        )
    )
}

export default MobileShopList;

// Made with Bob
