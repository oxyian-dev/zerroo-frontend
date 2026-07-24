import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from '../../components/Loader';
import fetcher from '../../utils/fetcher';
import { constructFormData } from '../../utils/util';

export default function EditDistributor({ id = useParams()['id'] }) {
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetcher(`/api/admin/users/distributors/${id}`)
            .then(r => r.json())
            .then(setData)
    }, [id])

    return (
        data === null ? (
            <Loader />
        ) : (
            <Formik
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(100).required('Enter Firstname'),
                    lastname: Yup.string().max(100).required('Enter Lastname'),
                    phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
                        .max(9999999999, "Invalid Number").required('Phone Number is required'),
                    email: Yup.string().email("Invalid Email").required('Email Required'),
                    referer: Yup.string().required('Email Referer ID'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    return await fetcher(`/api/admin/users/distributors/${id}`,
                        { method: 'put', body: constructFormData(values) })
                        .then(res => res.json())
                        .then(({ status, message = 'Exception occurred' }) => {
                            if (status === 'success') {
                                enqueueSnackbar('Distributor Edited Successfully', { variant: 'success' })
                                navigate('/admin/distributors')
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
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    referer: data.referer_username || '',
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
                                <Card variant="outlined" sx={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                    border: '1px solid rgba(255,255,255,.08)',
                                }}>
                                    <CardContent>
                                        <Typography variant="h2" textAlign="center" textTransform="uppercase">
                                            Edit Distributor Details
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="firstname"
                                        type="text"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="First Name"
                                        inputProps={{
                                            'aria-label': 'First Name',
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'rgba(255,255,255,.02)',
                                                transition: 'all 0.3s ease',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(239,203,119,0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#efcb77',
                                                },
                                                '&.Mui-error fieldset': {
                                                    borderColor: '#ff6b6b',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#fff !important',
                                                WebkitTextFillColor: '#fff !important',
                                                '&:-webkit-autofill': {
                                                    WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                    WebkitTextFillColor: '#fff !important',
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': {
                                                    color: '#efcb77',
                                                },
                                                '&.Mui-error': {
                                                    color: '#ff6b6b',
                                                },
                                            },
                                        }}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="error-firstname">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="lastname"
                                        type="text"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Last Name"
                                        inputProps={{
                                            'aria-label': 'Last Name',
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'rgba(255,255,255,.02)',
                                                transition: 'all 0.3s ease',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(239,203,119,0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#efcb77',
                                                },
                                                '&.Mui-error fieldset': {
                                                    borderColor: '#ff6b6b',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#fff !important',
                                                WebkitTextFillColor: '#fff !important',
                                                '&:-webkit-autofill': {
                                                    WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                    WebkitTextFillColor: '#fff !important',
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': {
                                                    color: '#efcb77',
                                                },
                                                '&.Mui-error': {
                                                    color: '#ff6b6b',
                                                },
                                            },
                                        }}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="error-lastname">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                    <TextField
                                        required
                                        type="tel"
                                        id="phone"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Phone Number"
                                        helperText="Same phone number can be used for up to 7 accounts"
                                        inputProps={{
                                            'aria-label': 'Phone Number',
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'rgba(255,255,255,.02)',
                                                transition: 'all 0.3s ease',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(239,203,119,0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#efcb77',
                                                },
                                                '&.Mui-error fieldset': {
                                                    borderColor: '#ff6b6b',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#fff !important',
                                                WebkitTextFillColor: '#fff !important',
                                                '&:-webkit-autofill': {
                                                    WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                    WebkitTextFillColor: '#fff !important',
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': {
                                                    color: '#efcb77',
                                                },
                                                '&.Mui-error': {
                                                    color: '#ff6b6b',
                                                },
                                            },
                                        }}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="error-phone">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                    <TextField
                                        required
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Email Address"
                                        helperText="Same email can be used for up to 7 accounts"
                                        inputProps={{
                                            'aria-label': 'Email Address',
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'rgba(255,255,255,.02)',
                                                transition: 'all 0.3s ease',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(239,203,119,0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#efcb77',
                                                },
                                                '&.Mui-error fieldset': {
                                                    borderColor: '#ff6b6b',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#fff !important',
                                                WebkitTextFillColor: '#fff !important',
                                                '&:-webkit-autofill': {
                                                    WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                    WebkitTextFillColor: '#fff !important',
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': {
                                                    color: '#efcb77',
                                                },
                                                '&.Mui-error': {
                                                    color: '#ff6b6b',
                                                },
                                            },
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
                                <FormControl fullWidth error={Boolean(touched.referer && errors.referer)}>
                                    <TextField
                                        required
                                        id="referer"
                                        value={values.referer}
                                        name="referer"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Referer ID"
                                        inputProps={{
                                            'aria-label': 'Referer ID',
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'rgba(255,255,255,.02)',
                                                transition: 'all 0.3s ease',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(239,203,119,0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#efcb77',
                                                },
                                                '&.Mui-error fieldset': {
                                                    borderColor: '#ff6b6b',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#fff !important',
                                                WebkitTextFillColor: '#fff !important',
                                                '&:-webkit-autofill': {
                                                    WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                    WebkitTextFillColor: '#fff !important',
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255,255,255,0.7)',
                                                '&.Mui-focused': {
                                                    color: '#efcb77',
                                                },
                                                '&.Mui-error': {
                                                    color: '#ff6b6b',
                                                },
                                            },
                                        }}
                                    />
                                    {touched.referer && errors.referer && (
                                        <FormHelperText error id="error-referer">
                                            {errors.referer}
                                        </FormHelperText>
                                    )}
                                </FormControl>
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
                                aria-label="Edit distributor"
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
                                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(255,255,255,.1)',
                                        color: 'rgba(255,255,255,.4)',
                                    },
                                }}
                            >
                                Edit
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        )
    )
}
