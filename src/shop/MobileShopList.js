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
import { orange } from "@mui/material/colors";
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
    const setFilterValue = (filter, value) => {
        const temp = { ...tempFilter };
        temp[filter] = value
        setTempFilter(temp)
    }

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
                setData(finalListing)
                setLayout({ ...layout, title: category.category, back: '/' })
            })
            .catch((e) => {
                alert(e)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id, params])

    useEffect(() => {
        fetcher(`/api/listing/filter?category=${id}`)
            .then(r => r.json())
            .then(filters => {
                setFilters(filters)
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
            <Box>
                <Grid container spacing={1} p={1}>
                    <Grid item xs={6}>
                        <Skeleton animation="wave" variant="rectangular" width='100%' height={250} />
                        <Skeleton animation="wave" height={15} width="100%" />
                        <Skeleton animation="wave" height={15} width="40%" />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton animation="wave" variant="rectangular" width='100%' height={250} />
                        <Skeleton animation="wave" height={15} width="100%" />
                        <Skeleton animation="wave" height={15} width="70%" />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton animation="wave" variant="rectangular" width='100%' height={250} />
                        <Skeleton animation="wave" height={15} width="100%" />
                        <Skeleton animation="wave" height={15} width="70%" />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton animation="wave" variant="rectangular" width='100%' height={250} />
                        <Skeleton animation="wave" height={15} width="100%" />
                        <Skeleton animation="wave" height={15} width="70%" />
                    </Grid>
                </Grid>
            </Box>
        ) : (
            <Box>
                <Grid container spacing={0.2}>
                    {data.map(({ id, category, price, mrp, discount, pv, title, brand, image }) => (
                        <Grid item xs={6} key={id}>
                            <Card sx={{ borderRadius: 0 }}>
                                <CardActionArea component={Link}
                                    to={`/p/${id}/${href(category)}/${href(title)}`}>
                                    <CardMedia component="img" image={toImage(image)} alt={title} />
                                    <CardContent sx={{ padding: '0.5rem', border: '1' }}>
                                        <Typography
                                            noWrap={true}
                                            overflow='hidden'
                                            variant="h3">{brand}</Typography>
                                        <Typography
                                            fontWeight="normal"
                                            variant="h4">{title}</Typography>
                                        <Typography
                                            noWrap={true}
                                            overflow='hidden'
                                            display='inline'
                                            variant="subtitle1">₹{price}</Typography>
                                        {discount != 0 && (
                                            <Typography noWrap={true} overflow='hidden' ml={0.5}
                                                display='inline' variant='caption'
                                                sx={{ textDecoration: 'line-through' }}>₹{mrp}</Typography>
                                        )}
                                        {discount != 0 && (
                                            <Typography noWrap={true} display='inline' ml={0.5}
                                                color={orange[700]}>
                                                ({discount}% OFF)
                                            </Typography>
                                        )}
                                        {isLoggedIn() && (
                                            <Typography noWrap={true} color={orange[700]}>
                                                {config.pvName}: {pv}
                                            </Typography>)}
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '.5rem'
                }}>
                    <Divider />
                    <Grid container textAlign='center'>
                        <Grid xs={6} item>
                            <Button sx={{ color: 'grey.A700' }} fullWidth onClick={toggleDrawer('sort', true)}
                                variant='text'>
                                <IconSortAscending /> Sort
                            </Button>
                        </Grid>
                        <Grid xs={6} item>
                            <Button sx={{ color: 'grey.A700' }} fullWidth onClick={toggleDrawer('filter', true)}
                                variant='text'>
                                <Badge badgeContent={getFilterCount()} color="primary">
                                    <IconFilter /> Filter
                                </Badge>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <SwipeableDrawer
                    anchor="bottom"
                    open={drawer.sort}
                    onClose={toggleDrawer('sort', false)}
                    onOpen={toggleDrawer('sort', true)}
                >
                    <Box>
                        <List>
                            <ListItem>
                                <Typography variant='h4'>Sort By</Typography>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton selected={params.sort === "latest"} onClick={() => {
                                    handleSort('latest')
                                }}>
                                    <ListItemIcon>
                                        <IconArtboard />
                                    </ListItemIcon>
                                    <ListItemText primary="Latest" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton selected={params.sort === "discount"}
                                    onClick={() => {
                                        handleSort('discount')
                                    }}>
                                    <ListItemIcon>
                                        <IconDiscount2 />
                                    </ListItemIcon>
                                    <ListItemText primary="Discount" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton selected={params.sort === "price-desc"} onClick={() => {
                                    handleSort('price-desc')
                                }}>
                                    <ListItemIcon>
                                        <IconSortDescendingNumbers />
                                    </ListItemIcon>
                                    <ListItemText primary="Price: High to Low" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton selected={params.sort === "price-asc"} onClick={() => {
                                    handleSort('price-asc')
                                }}>
                                    <ListItemIcon>
                                        <IconSortAscendingNumbers />
                                    </ListItemIcon>
                                    <ListItemText primary="Price: Low to High" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="bottom"
                    open={drawer.filter}
                    onClose={toggleDrawer('filter', false)}
                    onOpen={toggleDrawer('filter', true)}
                >
                    <Box>
                        <Grid container p={3} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h3">
                                    Filters
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="right">
                                <Button variant="outlined" color="error" onClick={() => {
                                    clearFilter()
                                }}>Clear All</Button>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container>
                            <Grid item xs={4}>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={filterTab}
                                    onChange={(_, v) => {
                                        setFilterTab(v)
                                    }}>
                                    <Tab
                                        value={0}
                                        label={
                                            <Badge
                                                variant="dot"
                                                color="warning"
                                                invisible={!Boolean(Array.isArray(params?.f_category) ? params.f_category.length : params?.f_category)}>
                                                Category
                                            </Badge>
                                        }
                                        id="category-filter"
                                        sx={{ alignItems: 'flex-start' }} />

                                    <Tab
                                        value={1}
                                        label={
                                            <Badge
                                                variant="dot"
                                                color="warning"
                                                invisible={!Boolean(Array.isArray(params?.f_brand) ? params?.f_brand?.length : params?.f_brand)}>
                                                Brands
                                            </Badge>}
                                        id="brand-filter"
                                        sx={{ alignItems: 'flex-start' }} />

                                    {filters.colors.length > 0 && (
                                        <Tab
                                            value={2}
                                            label={<Badge
                                                variant="dot"
                                                color="warning"
                                                invisible={!Boolean(Array.isArray(params?.f_color) ? params?.f_color?.length : params?.f_color)}
                                            >
                                                Colours
                                            </Badge>}
                                            id="color-filter"
                                            sx={{ alignItems: 'flex-start' }} />
                                    )}
                                    {filters.sizes.length > 0 && (
                                        <Tab
                                            value={3}
                                            label={<Badge
                                                variant="dot"
                                                color="warning"
                                                sx={{ alignItems: 'flex-start' }}
                                                invisible={!Boolean(Array.isArray(params?.f_size) ? params?.f_size?.length : params?.f_size)}>
                                                Size
                                            </Badge>
                                            }
                                            id="size-filter"
                                            sx={{ alignItems: 'flex-start' }} />
                                    )}

                                    <Tab
                                        value={4}
                                        label={<Badge
                                            variant="dot"
                                            color="warning"
                                            invisible={!Boolean(Array.isArray(params?.f_discount) ? params?.f_discount?.length : params?.f_discount !== undefined)}>
                                            Discount
                                        </Badge>}
                                        id="discount-filter"
                                        sx={{ alignItems: 'flex-start' }} />
                                </Tabs>
                            </Grid>
                            <Grid item xs={8}>
                                {filterTab === 0 && (
                                    <Box role="tabpanel" aria-labelledby="category-filter">
                                        <List subheader={(
                                            <ListSubheader>Select one or more categories</ListSubheader>
                                        )}>
                                            {filters.categories?.map(({ id, category }) => (
                                                <Box key={id}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton onClick={() => {
                                                            toggleFilter('f_category', id)
                                                        }} role={undefined}
                                                        >
                                                            <ListItemIcon>
                                                                <Checkbox
                                                                    edge="start"
                                                                    tabIndex={-1}
                                                                    inputProps={{ 'aria-labelledby': `cat-${id}` }}
                                                                    checked={tempFilter.f_category.indexOf(id) !== -1}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText id={`cat-${id}`}
                                                                primary={category} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider />
                                                </Box>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                                {filterTab === 1 && (
                                    <Box role="tabpanel"
                                        aria-labelledby="brand-filter">
                                        <List subheader={<ListSubheader>Select one or more Brands</ListSubheader>}>
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
                                                                    checked={tempFilter.f_brand.indexOf(id) !== -1}
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText id={`cat-${id}`} primary={brand} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider />
                                                </Box>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                                <Box role="tabpanel" aria-labelledby="color-filter" hidden={filterTab !== 2}>
                                    <List subheader={<ListSubheader>Select one or more Colours</ListSubheader>}>
                                        {filters.colors?.map(({ id, hex, color }) => (
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
                                                                checked={tempFilter.f_color.indexOf(id) !== -1}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={`cat-${id}`} primary={color} />
                                                        <Box sx={{
                                                            backgroundColor: `#${hex}`,
                                                            height: '30px',
                                                            width: '50px'
                                                        }} />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </List>
                                </Box>
                                <Box role="tabpanel" hidden={filterTab !== 3}
                                    aria-labelledby="size-filter">
                                    <List subheader={<ListSubheader>Select one or more Sizes</ListSubheader>}>
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
                                                                checked={tempFilter.f_size.indexOf(size.id) !== -1}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={`cat-${id}`} primary={size} />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </List>
                                </Box>
                                <Box role="tabpanel" hidden={filterTab !== 4}
                                    aria-labelledby="discount-filter">
                                    <List subheader={<ListSubheader>Select one or more Discount Range</ListSubheader>}>
                                        {filters.discount?.map(({ id, discount }) => (
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
                                                                checked={tempFilter.f_discount.indexOf(discount) !== -1}
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText id={`cat-${id}`}
                                                            primary={`${discount}% and Above`} />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container textAlign="center" mt={1} spacing={2} p={1}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    color="error"
                                    variant="outlined"
                                    onClick={toggleDrawer('filter', false)}>
                                    Close
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => {
                                        setFilter()
                                        toggleDrawer('filter', false)()
                                    }}>
                                    Apply
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </SwipeableDrawer>
            </Box>
        )
    )
}
export default MobileShopList