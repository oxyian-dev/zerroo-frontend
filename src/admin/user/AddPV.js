import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import Loader from '../../components/Loader';
import fetcher from '../../utils/fetcher';
import { constructFormData, formatName } from '../../utils/util';

export default function AddPV() {

    const [data, setData] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const { id } = useParams()

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
                    pv: Yup.number().moreThan(0, "PV should be greater than 0").required("Enter PV"),
                    recursive: Yup.string().required("Select Recursive Type")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    return await fetcher(`/api/admin/users/distributors/${id}/pv`, {
                        method: 'post',
                        body: constructFormData(values)
                    })
                        .then(res => res.json())
                        .then(({ status, message = 'Exception occurred' }) => {
                            if (status === 'success') {
                                enqueueSnackbar('PV Added Successfully', { variant: 'success' })
                                navigate('/admin/distributors')
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
                    username: data.username,
                    name: formatName(data),
                    self_pv: data.self_pv,
                    cutoff_self_pv: data.cutoff_self_pv,
                    recursive: '',
                    pv: 0
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
                                            Add PV
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="username"
                                        type="text"
                                        value={values.username}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="ZID"
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="name"
                                        type="text"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Name"
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="self_pv"
                                        type="number"
                                        value={values.self_pv}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Self PV"
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="cutoff_self_pv"
                                        type="number"
                                        value={values.cutoff_self_pv}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Cutoff Self PV"
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={Boolean(touched.pv && errors.pv)}>
                                    <TextField
                                        required
                                        id="pv"
                                        type="number"
                                        value={values.pv}
                                        name="pv"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="PV"
                                    />
                                    {touched.pv && errors.pv && (
                                        <FormHelperText error id="error-pv">
                                            {errors.pv}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.recursive && errors.recursive)}>
                                    <FormControl>
                                        <FormLabel id="recursive">PV Scope</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="recursive"
                                            name="recursive"
                                            value={values.recursive}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="true" control={<Radio />} label="Entire Upline Genealogy (left/right by side)" />
                                            <FormControlLabel value="false" control={<Radio />} label="Only This Distributor" />
                                        </RadioGroup>
                                    </FormControl>
                                    {touched.recursive && errors.recursive && (
                                        <FormHelperText error id="error-recursive">
                                            {errors.recursive}
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
                                Add
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        )
    )
}
