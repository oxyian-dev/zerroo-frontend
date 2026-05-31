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

export default function AddCoin() {

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
                    amount: Yup.number().required("Enter Amount"),
                    type: Yup.string().required("Select Wallet Type")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    return await fetcher(`/api/admin/users/distributors/${id}/wallet`, {
                        method: 'post',
                        body: constructFormData(values)
                    })
                        .then(res => res.json())
                        .then(({ status, message = 'Exception occurred' }) => {
                            if (status === 'success') {
                                enqueueSnackbar('Wallet Added Successfully', { variant: 'success' })
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
                    income_wallet: data.income_wallet,
                    purchase_wallet: data.purchase_wallet,
                    amount: '',
                    type: ''
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
                                            Add Wallet Amount
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
                                        id="purchase_wallet"
                                        type="number"
                                        value={values.purchase_wallet}
                                        label="Purchase Wallet"
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        helperText="100% to Purchase Wallet"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="income_wallet"
                                        type="number"
                                        value={values.income_wallet}
                                        label="Income Wallet (Net)"
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
                                        helperText="95% will be added to net income wallet after 2% TDS and 3% admin deductions"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.amount && errors.amount)}>
                                    <TextField
                                        required
                                        id="amount"
                                        value={values.amount}
                                        name="amount"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Amount"
                                        helperText="Enter the amount to be added here"
                                    />
                                    {touched.amount && errors.amount && (
                                        <FormHelperText error id="error-amount">
                                            {errors.amount}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth error={Boolean(touched.type && errors.type)}>
                                    <FormControl>
                                        <FormLabel id="type">Wallet Type</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="type"
                                            name="type"
                                            value={values.type}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="purchase" control={<Radio />} label="Purchase Wallet" />
                                            <FormControlLabel value="income" control={<Radio />} label="Income Wallet (Net)" />
                                        </RadioGroup>
                                    </FormControl>
                                    {touched.type && errors.type && (
                                        <FormHelperText error id="error-type">
                                            {errors.type}
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
