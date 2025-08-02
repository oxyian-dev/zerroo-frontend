import { LoadingButton } from "@mui/lab";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { BrowserView, MobileView } from 'react-device-detect';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import * as Yup from "yup";
import { getName } from "../auth/AuthProvider";
import AuthPage from "../components/AuthPage";
import ClientAutocomplete from "../components/ClientAutocomplete";
import PopoverAdornment from "../components/PopoverAdornment";
import States from "../data/States";
import fetcher from "../utils/fetcher";
import { constructFormData } from "../utils/util";

const AddAddress = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [setLayout, layout] = useOutletContext()

    useEffect(() => {
        setLayout({ ...layout, title: "Address", back: '/cart' })
    }, [])

    return (
        <AuthPage>
            <BrowserView>
                <Navigate to="/address" />
            </BrowserView>
            <MobileView>
                <Box p={1}>
                    <Typography
                        borderRadius={2.4}
                        bgcolor={blue[100]}
                        variant="h3"
                        textAlign="center"
                        py={1.5}
                        mt={1}
                        mb={2}>
                        Add Shipping Address
                    </Typography>
                    <Formik
                        validationSchema={Yup.object().shape({
                            saved_name: Yup.string().max(100).required('Enter a name to save the Address'),
                            firstname: Yup.string().max(100).required('Firstname is required'),
                            lastname: Yup.string().min(1).required('Lastname is required'),
                            phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
                                .max(9999999999, "Invalid Number").required('Phone Number is required'),
                            alt_phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
                                .max(9999999999, "Invalid Number"),
                            email: Yup.string().email("Invalid Email").required('Email Required'),
                            address_1: Yup.string().max(150).required('Enter Address Line 1'),
                            address_2: Yup.string().max(150).required('Enter Address Line 2'),
                            landmark: Yup.string().max(100),
                            postcode: Yup.number().nullable(true).min(100000, "Invalid Pin Code")
                                .max(999999, "Invalid Pin Code").required('Pin Code is required'),
                            city: Yup.string().max(150).required('Enter City / District'),
                            state: Yup.string().max(150).required('Enter State')
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            const formData = constructFormData(values)
                            return await fetcher(`/api/addresses`, {
                                method: 'post',
                                body: formData
                            })
                                .then(res => res.json())
                                .then(res => {
                                    if (res.status === 'success') {
                                        enqueueSnackbar('Address Added Successfully', { variant: 'success' })
                                        navigate('/address')
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
                            saved_name: '',
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
                            is_default: false
                        }}>
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                            <TextField
                                                required
                                                id="phone"
                                                type="tel"
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
                                    <Grid item xs={12}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.alt_phone && errors.alt_phone)}>
                                            <TextField
                                                id="alt_phone"
                                                type="tel"
                                                value={values.alt_phone}
                                                name="alt_phone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Alternate Phone No"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PopoverAdornment
                                                                content="Maybe used if the main Phone Number is not available" />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            {touched.alt_phone && errors.alt_phone && (
                                                <FormHelperText error id="error-alt_phone">
                                                    {errors.alt_phone}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.landmark && errors.landmark)}>
                                            <TextField
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                            />
                                            {touched.state && errors.state && (
                                                <FormHelperText error id="error-state">
                                                    {errors.state}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={Boolean(touched.saved_name && errors.saved_name)}>
                                            <TextField
                                                required
                                                id="saved_name"
                                                type="text"
                                                value={values.saved_name}
                                                name="saved_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Save this Address as"
                                                helperText={`Eg: ${getName()}'s Home`}
                                            />
                                            {touched.saved_name && errors.saved_name && (
                                                <FormHelperText error id="error-name">
                                                    {errors.saved_name}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormGroup>
                                            <FormControlLabel control={
                                                <Checkbox name="is_default" value={values.default}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange} />
                                            } label="Make default" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <LoadingButton
                                        loading={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Add Address
                                    </LoadingButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </MobileView>
        </AuthPage>
    )
}
export default AddAddress