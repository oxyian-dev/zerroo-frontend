import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { IconArtboard, IconDiscount2, IconSortAscendingNumbers, IconSortDescendingNumbers } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { isLoggedIn } from "../auth/AuthProvider";
import config from "../config";
import fetcher from "../utils/fetcher";
import { toQueryString, useQuery } from "../utils/useQuery";
import { href, toImage } from "../utils/util";

const BrowserShopList = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [filterLoading, setFilterLoading] = useState(true)
    const [itemLoading, setItemLoading] = useState(true)
    const { params } = useQuery()
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        brands: [],
        sizes: [],
        discount: [],
        categories: [],
        colors: []
    })
    const [meta, setMeta] = useState({})
    
    useEffect(() => {
        setItemLoading(true)
        const apiUrl = id
            ? `/api/listing/items/category/${id}?${toQueryString(params)}`
            : `/api/listing/items?${toQueryString(params)}`;
        
        fetcher(apiUrl)
            .then(r => r.json())
            .then(({ listing, items, category }) => {
                const finalListing = []
                const unique = [];
                // Add null check for listing array
                const records = listing || items || [];
                for (let i = 0; i < records.length; i++) {
                    const u = records[i].group_id + '-' + records[i].color;
                    if (unique.indexOf(u) <= -1) {
                        unique.push(u);
                        finalListing.push(records[i])
                    }
                }
                setMeta(category || { category: 'All Products' })
                setItemLoading(false)
                setData(finalListing)
            })
            .catch((error) => {
                console.error('Error fetching items:', error)
                setItemLoading(false)
                setData([])
                setMeta({ category: 'All Products' })
            })
    }, [id, params])

    useEffect(() => {
        if (!id) {
            setFilterLoading(false)
            return
        }
        
        fetcher(`/api/listing/filter?category=${id}`)
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
                setFilterLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching filters:', error)
                setFilterLoading(false)
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

    const { pathname } = useLocation()
    const handleSort = sort => {
        params.sort = sort
        navigate(`${pathname}?${toQueryString(params)}`)
    }
    const checkFilter = (filter, value) => {
        if (Array.isArray(params[filter])) {
            return params?.[filter].indexOf(value) > -1;
        } else {
            return params?.[filter] === value;
        }
    }

    const toggleFilter = (filter, value) => {
        if (params[filter] !== undefined) {
            if (Array.isArray(params[filter])) {
                const index = params[filter].indexOf(value)
                if (index > -1) {
                    params[filter].splice(index, 1)
                } else {
                    params[filter] = [...params[filter], value]
                }
            } else {
                if (params[filter] === value) {
                    delete params[filter]
                } else {
                    params[filter] = [params[filter], value]
                }
            }
        } else {
            params[filter] = value
        }
        navigate(`${pathname}?${toQueryString(params)}`)
    }

    return (
        <Box sx={{ background: '#020202', minHeight: '100vh', py: { md: 10, xs: 6 } }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', px: { md: 10, xs: 3 } }}>
                {/* Page Header */}
                <Box sx={{ mb: { md: 10, xs: 6 }, textAlign: 'center' }}>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            letterSpacing: '0.45em',
                            fontSize: { md: '0.78rem', xs: '0.7rem' },
                            fontWeight: 700,
                            color: '#efcb77',
                            mb: { md: 3, xs: 2 }
                        }}
                    >
                        Product Category
                    </Typography>
                    {/* <Typography
                        sx={{
                            fontSize: { xs: 'clamp(2rem, 8vw, 2.8rem)', md: 'clamp(2.8rem, 5vw, 5rem)' },
                            lineHeight: 1,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            color: 'white'
                        }}
                    >
                        {meta.category}
                    </Typography> */}
                </Box>

                <Grid container spacing={{ md: 6, xs: 4 }}>
                    {/* Filters Sidebar */}
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                position: 'sticky',
                                top: '110px',
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '4px',
                                p: { md: 4, xs: 3 },
                            }}
                        >
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.25em',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    color: '#efcb77',
                                    mb: 4
                                }}
                            >
                                Filters
                            </Typography>
                            <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,.08)' }} />
                            
                            {filterLoading ? (
                                <Box display="flex" height="30vh" justifyContent="center" alignItems="center">
                                    <CircularProgress sx={{ color: '#efcb77' }} />
                                </Box>
                            ) : (
                                <Box>
                                    {/* Categories Filter */}
                                    {filters.categories?.length > 0 && (
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    mb: 2
                                                }}
                                            >
                                                Categories
                                            </Typography>
                                            {filters.categories?.map(({ id, category }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            role={undefined}
                                                            onClick={() => toggleFilter('f_category', id)}
                                                            sx={{
                                                                py: 1.5,
                                                                px: 0,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)',
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    checked={checkFilter('f_category', id)}
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
                                                                        fontSize: '0.95rem'
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Box>
                                            ))}
                                            <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,.08)' }} />
                                        </Box>
                                    )}

                                    {/* Brands Filter */}
                                    {(filters.brands?.length || 0) > 0 && (
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    mb: 2
                                                }}
                                            >
                                                Brands
                                            </Typography>
                                            {filters.brands?.map(({ id, brand }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => toggleFilter('f_brand', id)}
                                                            role={undefined}
                                                            sx={{
                                                                py: 1.5,
                                                                px: 0,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)',
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    checked={checkFilter('f_brand', id)}
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
                                                                        fontSize: '0.95rem'
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Box>
                                            ))}
                                            <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,.08)' }} />
                                        </Box>
                                    )}

                                    {/* Colors Filter */}
                                    {(filters.colors?.length || 0) > 0 && (
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    mb: 2
                                                }}
                                            >
                                                Colors
                                            </Typography>
                                            {filters.colors?.map(({ id, color, hex, count }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => toggleFilter('f_color', id)}
                                                            role={undefined}
                                                            sx={{
                                                                py: 1.5,
                                                                px: 0,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)',
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    checked={checkFilter('f_color', id)}
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
                                                                        fontSize: '0.95rem'
                                                                    }
                                                                }}
                                                            />
                                                            <Box
                                                                sx={{
                                                                    backgroundColor: `#${hex}`,
                                                                    height: '24px',
                                                                    width: '40px',
                                                                    border: '1px solid rgba(255,255,255,.2)',
                                                                    borderRadius: '2px',
                                                                    mr: 1
                                                                }}
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    color: 'rgba(255,255,255,.5)',
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            >
                                                                {count}
                                                            </Typography>
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Box>
                                            ))}
                                            <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,.08)' }} />
                                        </Box>
                                    )}

                                    {/* Sizes Filter */}
                                    {(filters.sizes?.length || 0) > 0 && (
                                        <Box sx={{ mb: 4 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    mb: 2
                                                }}
                                            >
                                                Sizes
                                            </Typography>
                                            {filters.sizes?.map(({ id, size }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => toggleFilter('f_size', id)}
                                                            role={undefined}
                                                            sx={{
                                                                py: 1.5,
                                                                px: 0,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)',
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    checked={checkFilter('f_size', id)}
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
                                                                        fontSize: '0.95rem'
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Box>
                                            ))}
                                            <Divider sx={{ mt: 2, borderColor: 'rgba(255,255,255,.08)' }} />
                                        </Box>
                                    )}

                                    {/* Discount Filter */}
                                    {(filters.discount?.length || 0) > 0 && (
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    mb: 2
                                                }}
                                            >
                                                Discount
                                            </Typography>
                                            {filters.discount?.map(({ discount, id, count }) => (
                                                <Box key={discount}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton
                                                            onClick={() => toggleFilter('f_discount', discount)}
                                                            role={undefined}
                                                            sx={{
                                                                py: 1.5,
                                                                px: 0,
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(221,180,93,.06)',
                                                                }
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    checked={checkFilter('f_discount', discount)}
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
                                                                        fontSize: '0.95rem'
                                                                    }
                                                                }}
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    color: 'rgba(255,255,255,.5)',
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            >
                                                                {count}
                                                            </Typography>
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* Products Grid */}
                    <Grid item xs={12} md={9}>
                        {/* Sort Controls */}
                        <Box
                            sx={{
                                mb: { md: 6, xs: 4 },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                                p: 3,
                                borderRadius: '4px'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,.82)',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {data?.length || 0} Products
                            </Typography>
                            <FormControl
                                variant="outlined"
                                sx={{
                                    minWidth: 220,
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': {
                                            borderColor: 'rgba(255,255,255,.15)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255,255,255,.3)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#efcb77',
                                        },
                                    },
                                }}
                            >
                                <InputLabel
                                    sx={{
                                        color: 'rgba(255,255,255,.68)',
                                        '&.Mui-focused': {
                                            color: '#efcb77'
                                        }
                                    }}
                                >
                                    Sort By
                                </InputLabel>
                                <Select
                                    label="Sort By"
                                    value={params.sort || ''}
                                    onChange={({ target }) => handleSort(target.value)}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#1a1a1a',
                                        '& .MuiSelect-select': {
                                            backgroundColor: '#1a1a1a'
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            backgroundColor: '#1a1a1a'
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255,255,255,.15)'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255,255,255,.3)'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#efcb77'
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: 'rgba(255,255,255,.68)'
                                        }
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                bgcolor: '#1a1a1a',
                                                border: '1px solid rgba(255,255,255,.08)',
                                                '& .MuiMenuItem-root': {
                                                    color: 'rgba(255,255,255,.82)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(239,203,119,.1)',
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'rgba(239,203,119,.15)',
                                                        color: '#efcb77',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(239,203,119,.2)',
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="latest">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <IconArtboard size={18} />
                                            <span>Latest</span>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="discount">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <IconDiscount2 size={18} />
                                            <span>Discount</span>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="price-desc">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <IconSortDescendingNumbers size={18} />
                                            <span>Price: High to Low</span>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="price-asc">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <IconSortAscendingNumbers size={18} />
                                            <span>Price: Low to High</span>
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {itemLoading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                                <CircularProgress sx={{ color: '#efcb77' }} size={60} />
                            </Box>
                        ) : (
                            <Grid container spacing={{ md: 4, xs: 3 }}>
                                {data.length === 0 ? (
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                textAlign: 'center',
                                                py: 12,
                                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                                border: '1px solid rgba(255,255,255,.08)',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'rgba(255,255,255,.68)',
                                                    fontSize: '1.1rem',
                                                    mb: 2
                                                }}
                                            >
                                                No products found in this selection
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                onClick={() => navigate(pathname)}
                                                sx={{
                                                    mt: 2,
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        borderColor: '#ddb45d',
                                                        color: '#ddb45d',
                                                    }
                                                }}
                                            >
                                                Clear Filters
                                            </Button>
                                        </Box>
                                    </Grid>
                                ) : (
                                    data.map(({ id, category, title, image, brand, price, discount, mrp, pv }) => (
                                        <Grid item xs={12} sm={6} md={4} key={id}>
                                            <Card
                                                sx={{
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                                    border: '1px solid rgba(255,255,255,.08)',
                                                    backdropFilter: 'blur(10px)',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-12px)',
                                                        borderColor: 'rgba(221,180,93,.3)',
                                                        boxShadow: '0 30px 70px rgba(0,0,0,.5)',
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
                                                            '&:hover img': {
                                                                transform: 'scale(1.08)',
                                                            }
                                                        }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            image={toImage(image)}
                                                            alt={title}
                                                            sx={{
                                                                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                aspectRatio: '1/1',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        {discount > 0 && (
                                                            <Box
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 12,
                                                                    right: 12,
                                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                                                                    color: '#000',
                                                                    px: 2,
                                                                    py: 0.5,
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 700,
                                                                    letterSpacing: '0.1em',
                                                                    borderRadius: '2px'
                                                                }}
                                                            >
                                                                {discount}% OFF
                                                            </Box>
                                                        )}
                                                    </Box>
                                                    <CardContent sx={{ p: { md: 3, xs: 2.5 } }}>
                                                        <Typography
                                                            sx={{
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.18em',
                                                                fontSize: '0.7rem',
                                                                fontWeight: 700,
                                                                color: '#efcb77',
                                                                mb: 1
                                                            }}
                                                        >
                                                            {brand}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1.1rem',
                                                                lineHeight: 1.3,
                                                                fontWeight: 600,
                                                                color: 'white',
                                                                mb: 2,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                minHeight: '2.6rem'
                                                            }}
                                                        >
                                                            {title}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '1.25rem',
                                                                    fontWeight: 700,
                                                                    color: 'white'
                                                                }}
                                                            >
                                                                ₹{price}
                                                            </Typography>
                                                            {discount > 0 && (
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '0.9rem',
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
                                                                    fontSize: '0.85rem',
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
                                    ))
                                )}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default BrowserShopList;

// Made with Bob
