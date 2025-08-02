import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import { IconMinus, IconPlus } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ClientAutocomplete from "../../components/ClientAutocomplete";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import States from "../../data/States";
import fetcher from "../../utils/fetcher";
import REGEX from "../../utils/regex";

const AddSaleOrder = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [customerDataLoading, setCustomerDataLoading] = useState(false)

    const loadCustomerData = (values, setValues) => {
        setCustomerDataLoading(true)
        const params = new URLSearchParams()
        params.set('username', values.username)
        fetcher(`/api/users/fetch?${params}`)
            .then(r => r.json())
            .then(res => {
                if (res.status === 'failed') {
                    enqueueSnackbar('No User data found', { variant: 'error' })
                    setValues({
                        ...values,
                        username: '',
                        user_firstname: '',
                        user_lastname: '',
                        firstname: '',
                        lastname: '',
                        phone: '',
                        alt_phone: '',
                        email: '',
                        address_1: '',
                        address_2: '',
                        landmark: '',
                        postcode: '',
                        city: '',
                        state: '',
                        inputState: ''
                    })
                } else {
                    res.inputState = res.state
                    setValues({ ...values, ...res })
                }
            })
            .finally(() => {
                setCustomerDataLoading(false)
            })

    }

    const loadItemData = (values, setValues, index, item) => {
        if (item && values.inventory) {
            fetcher(`/api/stocks/items/${item}?inventory=${values.inventory}`)
                .then(r => r.json())
                .then(res => {
                    let items = [...values.items]
                    items[index].available = res.quantity || 0
                    setValues({ ...values, items })
                })
        }
    }

    const handleAdd = (values, setValues) => {
        let items = [...values.items]
        items.push({ item: '', available: '', quantity: '' })
        setValues({ ...values, items })
    }

    const handleRemove = (index, values, setValues, touched, setTouched, errors, setErrors) => {
        let items = [...values.items];
        items.splice(index, 1);
        setValues({ ...values, items });
        if (touched.items) {
            items = [...touched.items];
            items.splice(index, 1);
            setTouched({ ...values, items });
        }
        if (errors.items) {
            items = [...errors.items];
            items.splice(index, 1);
            setErrors({ ...values, items });
        }
    }

    return (
        <Box>
            <Formik
                validationSchema={Yup.object().shape({
                    username: Yup.string().matches(REGEX.EMAIL_PHONE, "Invalid Email or Mobile")
                        .max(100).required('Enter Email/Mobile'),
                    firstname: Yup.string().max(100).required('Firstname is required'),
                    lastname: Yup.string().max(1).required('Lastname is required'),
                    phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
                        .max(9999999999, "Invalid Number").required('Phone Number is required'),
                    alt_phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
                        .max(9999999999, "Invalid Number").required('Phone Number is required'),
                    email: Yup.string().email("Invalid Email").required('Email Required'),
                    address_1: Yup.string().max(150).required('Enter Address Line 1'),
                    address_2: Yup.string().max(150).required('Enter Address Line 2'),
                    landmark: Yup.string().max(100).required('Landmark is required'),
                    postcode: Yup.number().nullable(true).min(100000, "Invalid Pin Code")
                        .max(999999, "Invalid Pin Code").required('Pin Code is required'),
                    city: Yup.string().max(150).required('Enter City / District'),
                    state: Yup.string().max(150).required('Enter State'),
                    branch: Yup.number().nullable().required('Select Branch'),
                    inventory: Yup.number().nullable().required('Select Inventory'),
                    items: Yup.array().of(
                        Yup.object().shape({
                            item: Yup.number().nullable().min(1).required('Select an Item'),
                            quantity: Yup.number().positive('Quantity should be >= 1').nullable().required('Enter Stock Quantity')
                                .max(Yup.ref('available'), 'Quantity should be less than Available')
                        })
                    )
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    return await fetcher('/api/sales/sale-orders', {
                        method: 'post',
                        body: JSON.stringify(values),
                        headers: { "Content-type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 'success') {
                                enqueueSnackbar('Order Placed Successfully', { variant: 'success' })
                                navigate('/admin/sale-orders')
                            } else {
                                enqueueSnackbar('Exception occurred', { variant: 'error' })
                                setSubmitting(false)
                            }
                        })
                        .catch(() => {
                            enqueueSnackbar('Error occurred', { variant: 'error' })
                            setSubmitting(false)
                        })
                }}
                initialValues={{
                    username: '',
                    user_firstname: '',
                    user_lastname: '',
                    firstname: '',
                    lastname: '',
                    phone: '',
                    alt_phone: '',
                    email: '',
                    address_1: '',
                    address_2: '',
                    landmark: '',
                    postcode: '',
                    city: '',
                    state: '',
                    inputState: '',
                    branch: undefined,
                    inventory: undefined,
                    items: [{ item: '', available: '', quantity: '' }]
                }}>
                {({
                    errors,
                    setErrors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    setTouched,
                    values,
                    setValues
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h2" textAlign="center">Add Sale Order</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="h3">Customer</Typography>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl fullWidth
                                    error={Boolean(touched.username && errors.username)}>
                                    <TextField
                                        required
                                        id="username"
                                        type="text"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Email or Phone Number"
                                        InputProps={{
                                            endAdornment:
                                                <LoadingButton
                                                    disabled={values.username.match(REGEX.EMAIL_PHONE) === null}
                                                    loading={customerDataLoading} onClick={() => {
                                                        loadCustomerData(values, setValues)
                                                    }}>Load</LoadingButton>
                                        }}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id="error-username">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl fullWidth
                                    error={Boolean(touched.user_firstname && errors.user_firstname)}>
                                    <TextField
                                        required
                                        id="user_firstname"
                                        type="text"
                                        value={values.user_firstname}
                                        name="user_firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Firstname"
                                        InputProps={{ readOnly: true }}
                                    />
                                    {touched.user_firstname && errors.user_firstname && (
                                        <FormHelperText error id="error-user_firstname">
                                            {errors.user_firstname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl fullWidth
                                    error={Boolean(touched.lastname && errors.lastname)}>
                                    <TextField
                                        required
                                        id="user_lastname"
                                        type="text"
                                        value={values.user_lastname}
                                        name="user_lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Last Name"
                                        InputProps={{ readOnly: true }}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="error-lastname">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="h3">Address</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth
                                    error={Boolean(touched.firstname && errors.firstname)}>
                                    <TextField
                                        required
                                        id="firstname"
                                        type="text"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="First Name"
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="error-firstname">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)}>
                                    <TextField
                                        required
                                        id="lastname"
                                        type="text"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Last Name"
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="error-lastname">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                    <TextField
                                        required
                                        id="phone"
                                        type="number"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Phone No"
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="error-phone">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl fullWidth
                                    error={Boolean(touched.alt_phone && errors.alt_phone)}>
                                    <TextField
                                        required
                                        id="alt_phone"
                                        type="number"
                                        value={values.alt_phone}
                                        name="alt_phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Alternate Phone No"
                                    />
                                    {touched.alt_phone && errors.alt_phone && (
                                        <FormHelperText error id="error-alt_phone">
                                            {errors.alt_phone}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                    <TextField
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Email"
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="error-email">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth
                                    error={Boolean(touched.address_1 && errors.address_1)}>
                                    <TextField
                                        required
                                        id="address_1"
                                        type="text"
                                        value={values.address_1}
                                        name="address_1"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Flat, House no., Building, Company, Apartment"
                                    />
                                    {touched.address_1 && errors.address_1 && (
                                        <FormHelperText error id="error-address_1">
                                            {errors.address_1}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth
                                    error={Boolean(touched.address_2 && errors.address_2)}>
                                    <TextField
                                        required
                                        id="address_2"
                                        type="text"
                                        value={values.address_2}
                                        name="address_2"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Street Name, Area"
                                    />
                                    {touched.address_2 && errors.address_2 && (
                                        <FormHelperText error id="error-address_2">
                                            {errors.address_2}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.landmark && errors.landmark)}>
                                    <TextField
                                        required
                                        id="landmark"
                                        type="text"
                                        value={values.landmark}
                                        name="landmark"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Landmark"
                                    />
                                    {touched.landmark && errors.landmark && (
                                        <FormHelperText error id="error-landmark">
                                            {errors.landmark}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.postcode && errors.postcode)}>
                                    <TextField
                                        required
                                        id="postcode"
                                        type="number"
                                        value={values.postcode}
                                        name="postcode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Postcode"
                                    />
                                    {touched.postcode && errors.postcode && (
                                        <FormHelperText error id="error-postcode">
                                            {errors.postcode}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.city && errors.city)}>
                                    <TextField
                                        required
                                        id="city"
                                        type="text"
                                        value={values.city}
                                        name="city"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="City / District"
                                    />
                                    {touched.city && errors.city && (
                                        <FormHelperText error id="error-city">
                                            {errors.city}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <FormControl fullWidth error={Boolean(touched.state && errors.state)}>
                                    <ClientAutocomplete
                                        name="state"
                                        required={true}
                                        id="state"
                                        label="State"
                                        options={States}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.state}
                                        inputValue={values.inputState}
                                        onInputChange={(e, o) => {
                                            if (e?.type || o !== "") {
                                                setValues({ ...values, inputState: o })
                                            }
                                        }}
                                    />
                                    {touched.state && errors.state && (
                                        <FormHelperText error id="error-state">
                                            {errors.state}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="h3">Branch &amp; Inventory</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ServerAutocomplete
                                    id="branch"
                                    name="branch"
                                    select="branch"
                                    label="Select Branch"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.branch}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ServerAutocomplete
                                    id="inventory"
                                    name="inventory"
                                    select="inventory"
                                    label="Select Inventory"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inventory}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="h3">Items</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {values.items.map((item, index) =>
                                    <Grid key={`item-${index}`} container spacing={1} mb={2}>
                                        <Grid item xs={5}>
                                            <FormControl fullWidth
                                                error={Boolean(touched.items?.[index]?.item && errors.items?.[index]?.item)}>
                                                <ServerAutocomplete
                                                    required
                                                    select="item"
                                                    id={`items.${index}.item`}
                                                    value={item.item}
                                                    name={`items.${index}.item`}
                                                    label="Item"
                                                    onBlur={t => {
                                                        handleBlur(t)
                                                        loadItemData(values, setValues, index, t.target.value, item.inventory)
                                                    }}
                                                    onChange={handleChange}
                                                    disabled={!Boolean(values.inventory)}
                                                    helperText={!Boolean(values.inventory) ? "Select an Inventory" : ""}
                                                    server={true}
                                                />
                                                {touched.items?.[index]?.item && errors.items?.[index]?.item && (
                                                    <FormHelperText error id={`error-item-${index}`}>
                                                        {errors.items?.[index]?.item}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth
                                                error={Boolean(touched.items?.[index]?.available && errors.items?.[index]?.available)}>
                                                <TextField
                                                    id={`items.${index}.available`}
                                                    value={item.available}
                                                    name={`items.${index}.available`}
                                                    label="Available Stock"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    InputProps={{ readOnly: true }}
                                                />
                                                {touched.items?.[index]?.available && errors.items?.[index]?.available && (
                                                    <FormHelperText error id={`error-item-${index}`}>
                                                        {errors.items?.[index]?.available}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth
                                                error={Boolean(touched.items?.[index]?.quantity && errors.items?.[index]?.quantity)}>
                                                <TextField
                                                    type="number"
                                                    id={`items.${index}.quantity`}
                                                    value={item.quantity}
                                                    name={`items.${index}.quantity`}
                                                    label="Select Quantity"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                {touched.items?.[index]?.quantity && errors.items?.[index]?.quantity && (
                                                    <FormHelperText error id={`error-item-${index}`}>
                                                        {errors.items?.[index]?.quantity}
                                                    </FormHelperText>)}
                                            </FormControl>
                                        </Grid>
                                        {values.items.length > 0 &&
                                            <Grid item xs={1}>
                                                <IconButton disabled={values.items.length < 2} size='large' onClick={() => {
                                                    handleRemove(index, values, setValues, touched, setTouched, errors, setErrors)
                                                }}>
                                                    <IconMinus />
                                                </IconButton>
                                            </Grid>}
                                    </Grid>
                                )}
                            </Grid>
                            <Grid textAlign='center' item xs={12}>
                                <Button onClick={() => {
                                    handleAdd(values, setValues)
                                }} color='success' variant='outlined' endIcon={<IconPlus />}>
                                    Add Item
                                </Button>
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box mt={2}>
                            <LoadingButton
                                loading={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Create
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default AddSaleOrder