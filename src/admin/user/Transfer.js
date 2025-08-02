import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as Yup from "yup";
import fetcher from '../../utils/fetcher';
import { constructFormData } from '../../utils/util';

export default function Transfer() {
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Enter ID'),
                destination: Yup.string().required('Enter Destination'),
                placement: Yup.bool().required('Select Placement'),
                referer: Yup.string().required('Enter Referer ID')
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                return await fetcher('/api/admin/users/distributors/transfer', {
                    method: 'post',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(({ status, message = 'Exception occurred' }) => {
                        if (status === 'success') {
                            enqueueSnackbar('Account transferred Successfully', { variant: 'success' })
                            resetForm()
                        } else {
                            enqueueSnackbar(message, { variant: 'warning' })
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
                destination: '',
                placement: '',
                referer: ''
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
                                        Genealogy Transfer
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.username && errors.username)}>
                                <TextField
                                    id="username"
                                    type="text"
                                    value={values.username}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="ZID"
                                />
                                {touched.username && errors.username && (
                                    <FormHelperText error id="error-username">
                                        {errors.username}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.destination && errors.destination)}>
                                <TextField
                                    id="destination"
                                    type="text"
                                    value={values.destination}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Destination"
                                />
                                {touched.destination && errors.destination && (
                                    <FormHelperText error id="error-destination">
                                        {errors.destination}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.referer && errors.referer)}>
                                <TextField
                                    id="referer"
                                    type="text"
                                    value={values.referer}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Referer"
                                />
                                {touched.referer && errors.referer && (
                                    <FormHelperText error id="error-referer">
                                        {errors.referer}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.placement && errors.placement)}>
                                <FormControl>
                                    <FormLabel id="placement">Placement</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="placement"
                                        name="placement"
                                        value={values.type}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Left" />
                                        <FormControlLabel value="false" control={<Radio />} label="Right" />
                                    </RadioGroup>
                                </FormControl>
                                {touched.placement && errors.placement && (
                                    <FormHelperText error id="error-placement">
                                        {errors.placement}
                                    </FormHelperText>
                                )}
                            </FormControl>
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
                            Transfer
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
