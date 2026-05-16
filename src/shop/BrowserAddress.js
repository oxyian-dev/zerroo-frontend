import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack, TextField,
    Typography
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { IconCash, IconPlus } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { getName } from "../auth/AuthProvider";
import ClientAutocomplete from "../components/ClientAutocomplete";
import PopoverAdornment from "../components/PopoverAdornment";
import config from "../config";
import States from "../data/States";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, constructFormData, findSum, href, round } from "../utils/util";

const BrowserAddress = () => {
    const [addresses, setAddresses] = useState([])
    const [cart, setCart] = useState([])
    const [selectedAddress, selectAddress] = useState(null)
    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false)
    const [editAddressDialogOpen, setEditAddressDialogOpen] = useState(false)
    const [reload, setReload] = useState(1)
    const { enqueueSnackbar } = useSnackbar();

    const addressValidation = Yup.object().shape({
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
    })


    const AddAddressDialog = () => {
        return (
            <Dialog
                open={addAddressDialogOpen}
                onClose={() => {
                    setAddAddressDialogOpen(false)
                }}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,.08)',
                        borderRadius: '4px',
                        maxWidth: '600px'
                    }
                }}
            >
                <DialogTitle>
                    <Typography
                        textAlign="center"
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontSize: { md: 'clamp(2rem, 4vw, 3.5rem)', xs: 'clamp(1.5rem, 6vw, 2rem)' },
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        Add Address
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box mt={2}>
                        <Formik
                            validationSchema={addressValidation}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                const formData = constructFormData(values)
                                return await fetcher(`/api/addresses`, {
                                    method: 'post',
                                    body: formData
                                })
                                    .then(res => res.json())
                                    .then(({ status, message = "Exception occurred" }) => {
                                        if (status === 'success') {
                                            setAddAddressDialogOpen(false)
                                            setReload(reload + 1)
                                            enqueueSnackbar('Address Added Successfully', { variant: 'success' })
                                        } else {
                                            enqueueSnackbar(message, { variant: 'error' })
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)}>
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
                                                            '&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
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
                                        <Grid item xs={6}>
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
                                                            '&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
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
                                        <Grid item xs={6}>
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
                                                            '&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth error={Boolean(touched.alt_phone && errors.alt_phone)}>
                                                <TextField
                                                    id="alt_phone"
                                                    type="number"
                                                    value={values.alt_phone}
                                                    name="alt_phone"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Alternate Phone No"
                                                    inputProps={{
                                                        'aria-label': 'Alternate Phone Number'
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <PopoverAdornment
                                                            content="Maybe used if the main Phone Number is not available" />
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
                                                            '&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
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
                                                            '&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
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
                                            <FormControl fullWidth error={Boolean(touched.address_1 && errors.address_1)}>
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
                                            <FormControl fullWidth error={Boolean(touched.address_2 && errors.address_2)}>
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
                                        <Grid item xs={6}>
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
                                        <Grid item xs={6}>
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
                                        <Grid item xs={6}>
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
                                        <Grid item xs={6}>
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
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            color: 'white',
                                                            '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                            '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                        },
                                                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                        '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                        '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,.62)' }
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
                                            sx={{
                                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                color: '#000',
                                                padding: { md: '18px 42px', xs: '16px 36px' },
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.22em',
                                                fontSize: { md: '0.78rem', xs: '0.72rem' },
                                                fontWeight: 700,
                                                boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                                transition: 'all 0.4s ease',
                                                borderRadius: 0,
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
                </DialogContent>
            </Dialog>
        )
    }
    const [editAddressId, setEditAddressId] = useState(null)

    const EditAddressDialog = () => {
        const [loading, setLoading] = useState(true)
        const [address, setAddress] = useState({
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
            saved_name: '',
            is_default: false
        })
        useEffect(() => {
            if (editAddressDialogOpen && editAddressId) {
                fetcher(`/api/addresses/${editAddressId}`)
                    .then(r => r.json())
                    .then(setAddress)
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }, [editAddressId])

        return (
            <Dialog open={editAddressDialogOpen} onClose={() => {
                setEditAddressDialogOpen(false)
            }}>
                <DialogTitle>
                    <Typography textAlign="center" variant="h3" mb={2}>Edit Address</Typography>
                </DialogTitle>
                {loading ? (
                    <Box textAlign="center" width="250px" height="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <DialogContent>
                        <Formik
                            validationSchema={addressValidation}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                const formData = constructFormData(values)
                                return await fetcher(`/api/addresses/${editAddressId}`, {
                                    method: 'put',
                                    body: formData
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        if (res.status === 'success') {
                                            setEditAddressDialogOpen(false)
                                            setReload(reload => reload + 1)
                                            enqueueSnackbar('Address Edited Successfully', { variant: 'success' })
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
                            initialValues={address}>
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth sx={{ marginTop: 2 }}
                                                error={Boolean(touched.firstname && errors.firstname)}>
                                                <TextField
                                                    required
                                                    id="edit-firstname"
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth sx={{ marginTop: 2 }}
                                                error={Boolean(touched.lastname && errors.lastname)}>
                                                <TextField
                                                    required
                                                    id="edit-lastname"
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                                <TextField
                                                    required
                                                    id="edit-phone"
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth
                                                error={Boolean(touched.alt_phone && errors.alt_phone)}>
                                                <TextField
                                                    id="edit-alt_phone"
                                                    type="number"
                                                    value={values.alt_phone || undefined}
                                                    name="alt_phone"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Alternate Phone No"
                                                    InputProps={{
                                                        endAdornment: <PopoverAdornment
                                                            content="Maybe used if the main Phone Number is not available" />
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
                                                    id="edit-email"
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
                                                    id="edit-address_1"
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
                                                    id="edit-address_2"
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth
                                                error={Boolean(touched.landmark && errors.landmark)}>
                                                <TextField
                                                    id="edit-landmark"
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth
                                                error={Boolean(touched.postcode && errors.postcode)}>
                                                <TextField
                                                    required
                                                    id="edit-postcode"
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
                                        <Grid item xs={6}>
                                            <FormControl fullWidth error={Boolean(touched.city && errors.city)}>
                                                <TextField
                                                    required
                                                    id="edit-city"
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
                                        <Grid item xs={6}>
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
                                            <FormControl fullWidth
                                                error={Boolean(touched.saved_name && errors.saved_name)}>
                                                <TextField
                                                    required
                                                    id="edit-saved_name"
                                                    type="text"
                                                    value={values.saved_name}
                                                    name="saved_name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Save this Address as"
                                                    helperText={`Eg: ${getName()}'s Home`}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            color: 'white',
                                                            '& fieldset': { borderColor: 'rgba(255,255,255,.15)' },
                                                            '&:hover fieldset': { borderColor: 'rgba(255,255,255,.3)' },
                                                            '&.Mui-focused fieldset': { borderColor: '#efcb77' }
                                                        },
                                                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.68)' },
                                                        '& .MuiInputLabel-root.Mui-focused': { color: '#efcb77' },
                                                        '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,.62)' }
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
                                                            value={values.is_default}
                                                            onBlur={handleBlur}
                                                            checked={values.is_default}
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
                                            sx={{
                                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                color: '#000',
                                                padding: { md: '18px 42px', xs: '16px 36px' },
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.22em',
                                                fontSize: { md: '0.78rem', xs: '0.72rem' },
                                                fontWeight: 700,
                                                boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                                transition: 'all 0.4s ease',
                                                borderRadius: 0,
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
                                                }
                                            }}
                                        >
                                            Edit Address
                                        </LoadingButton>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </DialogContent>
                )}
            </Dialog>
        )
    }

    useEffect(() => {
        fetcher('/api/carts')
            .then(r => r.json())
            .then(({ carts }) => {
                setCart(carts)
            })
            .finally()
    }, [])

    useEffect(() => {
        fetcher(`/api/addresses`)
            .then(r => r.json())
            .then(({ addresses }) => setAddresses(addresses))
    }, [reload])

    const remove = (id) => {
        fetcher(`/api/addresses/${id}`, { method: 'delete' })
            .then(r => r.json())
            .then(res => {
                if (res.status === 'success') {
                    if (selectedAddress === id) {
                        selectAddress(null)
                    }
                    enqueueSnackbar('Address Removed', { variant: 'success' })
                    setReload(reload => reload + 1)
                } else {
                    enqueueSnackbar('Exception Occurred', { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error Occurred', { variant: 'error' })
            })
    }

    return (
        <Container sx={{ mb: 4, px: { md: 10, xs: 3 } }}>
            <Box my={5} textAlign="center">
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <Typography
                        color="#efcb77"
                        fontSize={{ md: 18, xs: 16 }}
                        mr={2}
                        display="inline"
                        sx={{
                            letterSpacing: '0.16em',
                            transition: 'all 0.3s ease',
                            '&:hover': { color: '#f5dc97' }
                        }}
                    >
                        CART
                    </Typography>
                </Link>
                <Typography
                    fontSize={{ md: 18, xs: 16 }}
                    display="inline"
                    sx={{ color: 'rgba(255,255,255,.3)' }}
                >
                    ---------------
                </Typography>
                <Typography
                    fontWeight="bold"
                    fontSize={{ md: 18, xs: 16 }}
                    mx={1}
                    display="inline"
                    sx={{
                        color: 'white',
                        letterSpacing: '0.16em'
                    }}
                >
                    ADDRESS
                </Typography>
                <Typography
                    fontSize={{ md: 18, xs: 16 }}
                    display="inline"
                    sx={{ color: 'rgba(255,255,255,.3)' }}
                >
                    ---------------
                </Typography>
                <Typography
                    fontSize={{ md: 18, xs: 16 }}
                    ml={2}
                    display="inline"
                    sx={{
                        color: 'rgba(255,255,255,.68)',
                        letterSpacing: '0.16em'
                    }}
                >
                    PAYMENT
                </Typography>
            </Box>
            <Grid container>
                <Grid item xs={8} pr={5}>
                    <Grid container mb={2}>
                        <Grid item xs={6}>
                            <Typography
                                fontSize={{ md: 20, xs: 18 }}
                                variant="subtitle1"
                                sx={{
                                    color: 'white',
                                    fontWeight: 600
                                }}
                            >
                                Select Delivery Address
                            </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Button
                                onClick={() => {
                                    setAddAddressDialogOpen(true)
                                }}
                                startIcon={<IconPlus />}
                                variant="outlined"
                                sx={{
                                    border: '1px solid rgba(255,255,255,.15)',
                                    color: 'white',
                                    padding: { md: '12px 28px', xs: '10px 24px' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    fontSize: { md: '0.78rem', xs: '0.72rem' },
                                    fontWeight: 600,
                                    transition: 'all 0.35s ease',
                                    borderRadius: 0,
                                    '&:hover': {
                                        borderColor: '#ddb45d',
                                        color: '#ddb45d',
                                        background: 'transparent'
                                    }
                                }}
                            >
                                Add New Address
                            </Button>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth>
                        <RadioGroup name="address" value={selectedAddress}>
                            {addresses.map(address => (
                                <Box key={address.id} mb={3}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                            border: '1px solid rgba(255,255,255,.08)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                            borderRadius: '4px',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                borderColor: 'rgba(221,180,93,.2)',
                                                boxShadow: '0 25px 60px rgba(0,0,0,.45)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: { md: 3, xs: 2 } }}>
                                            <FormControlLabel
                                                value={address.id}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: 'rgba(255,255,255,.68)',
                                                            '&.Mui-checked': { color: '#efcb77' }
                                                        }}
                                                    />
                                                }
                                                sx={{ width: '100%', alignItems: 'flex-start' }}
                                                onChange={() => {
                                                    selectAddress(address.id)
                                                }}
                                                label={(
                                                    <Box>
                                                        <Chip
                                                            label={address.saved_name}
                                                            sx={{
                                                                mb: 2,
                                                                background: address.id === selectedAddress
                                                                    ? 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
                                                                    : 'rgba(255,255,255,.08)',
                                                                color: address.id === selectedAddress ? '#000' : 'rgba(255,255,255,.82)',
                                                                fontWeight: 600,
                                                                letterSpacing: '0.05em'
                                                            }}
                                                        />
                                                        <Typography sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                                                            {address.firstname} {address.lastname}
                                                        </Typography>
                                                        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                                            {address.address_1}
                                                        </Typography>
                                                        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                                            {address.address_2}
                                                        </Typography>
                                                        {address.landmark && (
                                                            <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                                                {address.landmark}
                                                            </Typography>
                                                        )}
                                                        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                                            {address.city}, {address.state} - {address.postcode}
                                                        </Typography>
                                                        <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem', mt: 1 }}>
                                                            Phone: {address.phone}
                                                        </Typography>
                                                        {address.alt_phone && (
                                                            <Typography sx={{ color: 'rgba(255,255,255,.68)', fontSize: '0.9rem' }}>
                                                                Alt: {address.alt_phone}
                                                            </Typography>
                                                        )}
                                                        {address.id === selectedAddress && (
                                                            <Stack direction="row" mt={2} spacing={2}>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        remove(address.id)
                                                                    }}
                                                                    sx={{
                                                                        border: '1px solid #ff6b6b',
                                                                        color: '#ff6b6b',
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '0.1em',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 600,
                                                                        transition: 'all 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'rgba(255,107,107,.1)',
                                                                            borderColor: '#ff6b6b'
                                                                        }
                                                                    }}
                                                                >
                                                                    Remove
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        setEditAddressId(address.id)
                                                                        setEditAddressDialogOpen(true)
                                                                    }}
                                                                    sx={{
                                                                        border: '1px solid #ffa94d',
                                                                        color: '#ffa94d',
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '0.1em',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 600,
                                                                        transition: 'all 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'rgba(255,169,77,.1)',
                                                                            borderColor: '#ffa94d'
                                                                        }
                                                                    }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Stack>
                                                        )}
                                                    </Box>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '4px',
                            p: { md: 3, xs: 2 }
                        }}
                    >
                        <Typography
                            mb={2}
                            fontSize={{ md: 18, xs: 16 }}
                            variant="subtitle1"
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                letterSpacing: '0.05em'
                            }}
                        >
                            Order Details:
                        </Typography>
                        {cart.map(item => (
                        <Box key={item.item}>
                            <Grid container>
                                <Grid item xs={4} p={1}>
                                    {item.combo_id ? (
                                        <WorkDriveImage image={item.images[0]}
                                            alt={`${item.category} ${item.title} ${item.description}`} />
                                    ) : (
                                        <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}>
                                            <WorkDriveImage image={item.images[0]}
                                                alt={`${item.category} ${item.title} ${item.description}`} />
                                        </Link>
                                    )}
                                </Grid>
                                <Grid item xs={8} p={1}>
                                    {item.combo_id ? (
                                        <React.Fragment>
                                            <Typography color='primary.main' variant='h5'>{item.brand}</Typography>
                                            <Typography variant='h4'>{item.title}</Typography>
                                            <Typography noWrap overflow='hidden' display='inline'
                                                variant="subtitle1">₹{item.price}</Typography>
                                            {item.price !== item.mrp && (
                                                <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                    variant='subtitle1' sx={{ textDecoration: 'line-through' }}>
                                                    ₹{item.mrp}
                                                </Typography>
                                            )}
                                            {item.discount !== 0 && (
                                                <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                    color={orange[700]}>
                                                    ({item.discount}% OFF)
                                                </Typography>
                                            )}
                                            {item.size && (
                                                <Typography>Size: {item.size}</Typography>
                                            )}
                                            <Typography>Quantity: {item.quantity}</Typography>
                                        </React.Fragment>
                                    ) : (
                                        <Link to={`/p/${item.item}/${href(item.category)}/${href(item.title)}`}
                                            style={{ textDecoration: 'none' }}>
                                            <Typography color='primary.main' variant='h5'>{item.brand}</Typography>
                                            <Typography variant='h4'>{item.title}</Typography>
                                            <Typography noWrap overflow='hidden' display='inline'
                                                variant="subtitle1">₹{item.price}</Typography>
                                            {item.price !== item.mrp && (
                                                <Typography noWrap overflow='hidden' ml={0.5} display='inline'
                                                    variant='subtitle1' sx={{ textDecoration: 'line-through' }}>
                                                    ₹{item.mrp}
                                                </Typography>
                                            )}
                                            {item.discount !== 0 && (
                                                <Typography noWrap display='inline' ml={0.5} variant="subtitle1"
                                                    color={orange[700]}>
                                                    ({item.discount}% OFF)
                                                </Typography>
                                            )}
                                            {item.size && (
                                                <Typography>Size: {item.size}</Typography>
                                            )}
                                            <Typography>Quantity: {item.quantity}</Typography>
                                        </Link>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                        <Box
                            mt={3}
                            pt={3}
                            sx={{
                                borderTop: '1px solid rgba(255,255,255,.08)'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: '1rem'
                                }}
                            >
                                Price Details ({findSum(cart, 'quantity')} Items)
                            </Typography>
                            <Stack spacing={1}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                        Total MRP:
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.95rem' }}>
                                        ₹{round(cart.map(({ mrp, quantity }) => mrp * quantity).reduce((a, b) => a + b, 0))}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: '#51cf66', fontSize: '0.95rem' }}>
                                        Discount on MRP:
                                    </Typography>
                                    <Typography sx={{ color: '#51cf66', fontSize: '0.95rem' }}>
                                        -₹{round(cart.map(({ discount, quantity }) => discount * quantity).reduce((a, b) => a + b, 0))}
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    pt={2}
                                    mt={1}
                                    sx={{ borderTop: '1px solid rgba(255,255,255,.08)' }}
                                >
                                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.05rem' }}>
                                        Total:
                                    </Typography>
                                    <Typography sx={{ color: '#efcb77', fontWeight: 700, fontSize: '1.05rem' }}>
                                        ₹{round(cart.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0))}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography sx={{ color: 'rgba(255,255,255,.82)', fontSize: '0.9rem' }}>
                                        {config.pvName}:
                                    </Typography>
                                    <Typography sx={{ color: '#efcb77', fontSize: '0.9rem', fontWeight: 600 }}>
                                        {round(cart.map(({ pv, quantity }) => pv * quantity).reduce((a, b) => a + b, 0))}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box mt={3}>
                            {selectedAddress === null && (
                                <Typography
                                    sx={{
                                        color: '#ffa94d',
                                        fontSize: '0.9rem',
                                        mb: 2,
                                        textAlign: 'center'
                                    }}
                                >
                                    Select or add an Address to Checkout
                                </Typography>
                            )}
                            <Button
                                component={Link}
                                to="/checkout"
                                disabled={selectedAddress === null}
                                startIcon={<IconCash />}
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    sessionStorage.setItem('address', selectedAddress)
                                }}
                                sx={{
                                    background: selectedAddress === null
                                        ? 'rgba(255,255,255,.1)'
                                        : 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    color: selectedAddress === null ? 'rgba(255,255,255,.4)' : '#000',
                                    padding: { md: '18px 42px', xs: '16px 36px' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.22em',
                                    fontSize: { md: '0.78rem', xs: '0.72rem' },
                                    fontWeight: 700,
                                    boxShadow: selectedAddress === null ? 'none' : '0 15px 35px rgba(221,180,93,.15)',
                                    transition: 'all 0.4s ease',
                                    borderRadius: 0,
                                    '&:hover': {
                                        transform: selectedAddress === null ? 'none' : 'translateY(-5px)',
                                        boxShadow: selectedAddress === null ? 'none' : '0 20px 50px rgba(221,180,93,.22)',
                                        background: selectedAddress === null
                                            ? 'rgba(255,255,255,.1)'
                                            : 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(255,255,255,.1)',
                                        color: 'rgba(255,255,255,.4)'
                                    }
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <AddAddressDialog />
            <EditAddressDialog />
        </Container>
    )
}
export default BrowserAddress;