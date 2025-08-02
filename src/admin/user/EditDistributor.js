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
                        .then(({ status }) => {
                            if (status === 'success') {
                                enqueueSnackbar('Distributor Edited Successfully', { variant: 'success' })
                                navigate('/admin/distributors')
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
                                <Card variant="outlined">
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
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Email Address"
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
