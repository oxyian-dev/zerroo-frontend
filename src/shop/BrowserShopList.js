import {
    Box,
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
import { orange } from "@mui/material/colors";
import { IconArtboard, IconDiscount2, IconSortAscendingNumbers, IconSortDescendingNumbers } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { isLoggedIn } from "../auth/AuthProvider";
import Loader from "../components/Loader";
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
        fetcher(`/api/listing/items/category/${id}?${toQueryString(params)}`)
            .then(r => r.json())
            .then(({ listing, category }) => {
                const finalListing = []
                const unique = [];
                for (let i = 0; i < listing.length; i++) {
                    const u = listing[i].group_id + '-' + listing[i].color;
                    if (unique.indexOf(u) <= -1) {
                        unique.push(u);
                        finalListing.push(listing[i])
                    }
                }
                setMeta(category)
                setItemLoading(false)
                setData(finalListing)
            })
            .catch(console.log)
    }, [id, params])

    useEffect(() => {
        fetcher(`/api/listing/filter?category=${id}`)
            .then(r => r.json())
            .then(filters => {
                setFilters(filters)
                setFilterLoading(false)
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
        <Container sx={{ pb: { md: 8, xs: 4 } }}>
            <Grid container mt={2} spacing={4}>
                <Grid item xs={12}>
                    <Typography textAlign="center" variant="h1">{meta.category}</Typography>
                </Grid>
                <Grid item xs={3} position="sticky">
                    <h1>Filters</h1>
                    <Divider />
                    {filterLoading ? (
                        <Box display="flex" height="50vh" justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            {filters.categories.length > 0 && (
                                <React.Fragment>
                                    <Typography my={2} variant="h4">Categories</Typography>
                                    {filters.categories?.map(({ id, category }) => (
                                        <Box key={id}>
                                            <ListItem disablePadding>
                                                <ListItemButton role={undefined} onClick={() => {
                                                    toggleFilter('f_category', id)
                                                }}>
                                                    <ListItemIcon>
                                                        <Checkbox edge="start" tabIndex={-1}
                                                            inputProps={{ 'aria-labelledby': `cat-${id}` }}
                                                            checked={checkFilter('f_category', id)} />
                                                    </ListItemIcon>
                                                    <ListItemText id={`cat-${id}`} primary={category} />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ))}
                                </React.Fragment>
                            )}
                            {filters.brands?.length > 0 && (
                                <React.Fragment>
                                    <Typography my={2} variant="h4">Brands</Typography>
                                    {filters.brands?.map(({ id, brand }) => (
                                        <Box key={id}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => {
                                                    toggleFilter('f_brand', id)
                                                }} role={undefined}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            tabIndex={-1}
                                                            inputProps={{ 'aria-labelledby': `cat-${id}` }}
                                                            checked={checkFilter('f_brand', id)}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`cat-${id}`} primary={brand} />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ))}
                                </React.Fragment>
                            )}
                            {filters.colors?.length > 0 && (
                                <React.Fragment>
                                    <Typography mt={2} variant="h4">Colours</Typography>
                                    {filters.colors?.map(({ id, color, hex, count }) => (
                                        <Box key={id}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => {
                                                    toggleFilter('f_color', id)
                                                }} role={undefined}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            tabIndex={-1}
                                                            inputProps={{ 'aria-labelledby': `cat-${id}` }}
                                                            checked={checkFilter('f_color', id)}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`cat-${id}`} primary={color} />
                                                    <Box sx={{
                                                        backgroundColor: `#${hex}`,
                                                        height: '30px',
                                                        width: '50px'
                                                    }} />
                                                    <Typography ml={2} variant="caption">
                                                        {count}
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ))}
                                </React.Fragment>
                            )}
                            {filters.sizes?.length > 0 && (
                                <React.Fragment>
                                    <Typography my={2} variant="h4">Sizes</Typography>
                                    {filters.sizes?.map(({ id, size }) => (
                                        <Box key={id}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => {
                                                    toggleFilter('f_size', id)
                                                }} role={undefined}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            tabIndex={-1}
                                                            inputProps={{ 'aria-labelledby': `cat-${id}` }}
                                                            checked={checkFilter('f_size', id)}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`cat-${id}`} primary={size} />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ))}
                                </React.Fragment>
                            )}
                            {filters.discount?.length > 0 && (
                                <React.Fragment>
                                    <Typography my={2} variant="h4">Discount</Typography>
                                    {filters.discount?.map(({ discount, id, count }) => (
                                        <Box key={discount}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => {
                                                    toggleFilter('f_discount', discount)
                                                }} role={undefined}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            tabIndex={-1}
                                                            inputProps={{ 'aria-labelledby': `cat-${discount}` }}
                                                            checked={checkFilter('f_discount', discount)}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={`cat-${id}`}
                                                        primary={`${discount}% and Above`} />
                                                    <Typography
                                                        variant="caption">{count}</Typography>
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ))}
                                </React.Fragment>
                            )}
                        </Box>
                    )}
                </Grid>
                {itemLoading ? (
                    <Grid item xs={9}>
                        <Box mt={5}>
                            <Loader />
                        </Box>
                    </Grid>
                ) : (
                    <Grid item xs={9}>
                        <Grid container mb={4}>
                            <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="sort-label">Sort By</InputLabel>
                                    <Select labelId="sort-label" label="Sort By" value={params.sort || ''}
                                        onChange={({ target }) => {
                                            handleSort(target.value)
                                        }}>
                                        <MenuItem value="latest">
                                            <ListItemIcon>
                                                <IconArtboard />
                                                <ListItemText sx={{ ml: 2 }}>Latest</ListItemText>
                                            </ListItemIcon>
                                        </MenuItem>
                                        <MenuItem value="discount">
                                            <ListItemIcon>
                                                <IconDiscount2 />
                                                <ListItemText sx={{ ml: 2 }}>Discount</ListItemText>
                                            </ListItemIcon>
                                        </MenuItem>
                                        <MenuItem value="price-desc">
                                            <ListItemIcon>
                                                <IconSortDescendingNumbers />
                                                <ListItemText sx={{ ml: 2 }}>Price: High to Low</ListItemText>
                                            </ListItemIcon>
                                        </MenuItem>
                                        <MenuItem value="price-asc">
                                            <ListItemIcon>
                                                <IconSortAscendingNumbers />
                                                <ListItemText sx={{ ml: 2 }}>Price: Low to High</ListItemText>
                                            </ListItemIcon>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} />
                        </Grid>
                        <Grid container spacing={2}>
                            {data.length == 0 && (
                                <Grid item xs={12}>
                                    <Typography textAlign="center">No Items in this Selection</Typography>
                                </Grid>
                            )}
                            {data.map(({ id, category, title, image, brand, price, discount, mrp, pv }) => (
                                <Grid item xs={4} key={id}>
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
                                            to={`/p/${id}/${href(category)}/${href(title)}`}>
                                            <Box height="100%" overflow="hidden">
                                                <CardMedia
                                                    component="img"
                                                    image={toImage(image)}
                                                    alt={title} />
                                            </Box>
                                            <CardContent sx={{ p: 1 }}>
                                                <Box>
                                                    <Typography
                                                        noWrap={true}
                                                        overflow='hidden'
                                                        variant="h3">
                                                        {brand}
                                                    </Typography>
                                                    <Typography
                                                        fontWeight="normal"
                                                        variant="h4">
                                                        {title}
                                                    </Typography>
                                                    <Typography
                                                        noWrap={true}
                                                        overflow='hidden'
                                                        display='inline'
                                                        variant="subtitle1">
                                                        ₹{price}
                                                    </Typography>
                                                    {discount != 0 && (
                                                        <Typography
                                                            noWrap={true}
                                                            overflow='hidden'
                                                            ml={0.5}
                                                            display='inline'
                                                            variant='caption'
                                                            sx={{ textDecoration: 'line-through' }}>₹{mrp}</Typography>
                                                    )}
                                                    {discount != 0 && (
                                                        <Typography
                                                            noWrap={true}
                                                            display='inline'
                                                            ml={0.5}
                                                            color={orange[700]}>
                                                            ({discount}% OFF)
                                                        </Typography>
                                                    )}
                                                    {isLoggedIn() && (
                                                        <Typography
                                                            noWrap={true}
                                                            color={orange[700]}>
                                                            {config.pvName}: {pv}
                                                        </Typography>)}
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}
export default BrowserShopList