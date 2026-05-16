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
                <Box p={3}>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        py={2}
                        mt={1}
                        mb={3}
                        sx={{
                            color: 'white',
                            fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '4px'
                        }}
                    >
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
                                                inputProps={{
                                                    'aria-label': 'First Name',
                                                    'aria-required': 'true'
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white !important',
                                                        background: 'rgba(255,255,255,.02)',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                    '& input': {
                                                        color: 'white !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important',
                                                            caretColor: 'white !important',
                                                            transition: 'background-color 5000s ease-in-out 0s'
                                                        },
                                                        '&:-webkit-autofill:hover': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:focus': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:active': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        }
                                                    }
                                                }}
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
                                                inputProps={{
                                                    'aria-label': 'Last Name',
                                                    'aria-required': 'true'
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white !important',
                                                        background: 'rgba(255,255,255,.02)',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                    '& input': {
                                                        color: 'white !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important',
                                                            caretColor: 'white !important',
                                                            transition: 'background-color 5000s ease-in-out 0s'
                                                        },
                                                        '&:-webkit-autofill:hover': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:focus': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:active': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        }
                                                    }
                                                }}
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
                                                inputProps={{
                                                    'aria-label': 'Phone Number',
                                                    'aria-required': 'true'
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white !important',
                                                        background: 'rgba(255,255,255,.02)',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                    '& input': {
                                                        color: 'white !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important',
                                                            caretColor: 'white !important',
                                                            transition: 'background-color 5000s ease-in-out 0s'
                                                        },
                                                        '&:-webkit-autofill:hover': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:focus': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:active': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        }
                                                    }
                                                }}
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
                                                inputProps={{
                                                    'aria-label': 'Alternate Phone Number'
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PopoverAdornment
                                                                content="Maybe used if the main Phone Number is not available" />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white !important',
                                                        background: 'rgba(255,255,255,.02)',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                    '& input': {
                                                        color: 'white !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important',
                                                            caretColor: 'white !important',
                                                            transition: 'background-color 5000s ease-in-out 0s'
                                                        },
                                                        '&:-webkit-autofill:hover': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:focus': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:active': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        }
                                                    }
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
                                                inputProps={{
                                                    'aria-label': 'Email Address',
                                                    'aria-required': 'true'
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white !important',
                                                        background: 'rgba(255,255,255,.02)',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                    '& input': {
                                                        color: 'white !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important',
                                                            caretColor: 'white !important',
                                                            transition: 'background-color 5000s ease-in-out 0s'
                                                        },
                                                        '&:-webkit-autofill:hover': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:focus': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:active': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        }
                                                    }
                                                }}
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
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' }
                                                }}
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
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' }
                                                }}
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
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' }
                                                }}
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
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' }
                                                }}
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
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' }
                                                }}
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
                                                inputProps={{
                                                    'aria-label': 'Save Address As',
                                                    'aria-required': 'true'
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white !important',
                                                        background: 'rgba(255,255,255,.02)',
                                                        '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                        '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                    },
                                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                    '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,.62)' },
                                                    '& input': {
                                                        color: 'white !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important',
                                                            caretColor: 'white !important',
                                                            transition: 'background-color 5000s ease-in-out 0s'
                                                        },
                                                        '&:-webkit-autofill:hover': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:focus': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        },
                                                        '&:-webkit-autofill:active': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: 'white !important'
                                                        }
                                                    }
                                                }}
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
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="is_default"
                                                        value={values.default}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        sx={{
                                                            color: 'rgba(255,255,255,.68)',
                                                            '&.Mui-checked': { color: '#efcb77' }
                                                        }}
                                                    />
                                                }
                                                label="Make default"
                                                sx={{ '& .MuiFormControlLabel-label': { color: 'rgba(255,255,255,.82)' } }}
                                            />
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
                                        aria-label="Add Address"
                                        sx={{
                                            background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                            color: '#000',
                                            padding: '16px 36px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.22em',
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                            transition: 'all 0.4s ease',
                                            borderRadius: 0,
                                            minHeight: '44px',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
                                            }
                                        }}
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