import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../utils/fetcher";
import REGEX from "../../utils/regex";
import { constructFormData, nonull } from "../../utils/util";
import Loader from "../../components/Loader";


export default function EditBankDetails({ id = useParams()['id'] }) {

    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetcher(`/api/admin/users/distributors/${id}`)
            .then(r => r.json())
            .then(setData)
    }, [id])

    const updateIfsc = (values, setValues) => {
        console.log(values)
        const { ifsc } = values
        if (REGEX.IFSC.test(ifsc)) {
            fetcher(`/api/ifsc/${ifsc}`)
                .then(r => r.json())
                .then(({ BANK, BRANCH }) => {
                    const tempValue = { ...values }
                    tempValue.bank = BANK
                    tempValue.branch = BRANCH
                    setValues(tempValue)
                })
        } else {
            const tempValue = { ...values }
            tempValue.bank = ''
            tempValue.branch = ''
            setValues(tempValue)
        }
    }

    return (data === null ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                ifsc: Yup.string().required('IFSC Code Required').matches(REGEX.IFSC, 'Invalid Ifsc'),
                bank: Yup.string().required('Bank required'),
                branch: Yup.string().required('Branch required'),
                account_no: Yup.number().nullable(true).required('Account Number required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/admin/users/distributors/${id}/bank`, {
                    method: 'put',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Bank details Edited Successfully', { variant: 'success' })
                            navigate(`/admin/distributors/${id}`)
                        } else {
                            enqueueSnackbar(res.message || 'Exception occurred', { variant: 'error' })
                            setSubmitting(false)
                        }
                    })
                    .catch(() => {
                        enqueueSnackbar('Error occurred', { variant: 'error' })
                        setSubmitting(false)
                    })
            }}
            initialValues={nonull(data)}>
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setValues
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h2" textAlign="center">Edit Bank Details</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth
                                error={Boolean(touched.ifsc && errors.ifsc)}>
                                <TextField
                                    id="ifsc"
                                    type="text"
                                    value={values.ifsc}
                                    name="ifsc"
                                    onBlur={({ target }) => {
                                        handleBlur({
                                            target: {
                                                name: 'ifsc',
                                                value: target.value
                                            }
                                        }, target.value)
                                        updateIfsc(values, setValues)
                                    }}
                                    onChange={handleChange}
                                    label="IFSC Code"
                                />
                                {touched.ifsc && errors.ifsc && (
                                    <FormHelperText error id="error-ifsc">
                                        {errors.ifsc}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth
                                error={Boolean(touched.bank && errors.bank)}>
                                <TextField
                                    id="bank"
                                    type="text"
                                    value={values.bank}
                                    name="bank"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Bank Name"
                                    InputProps={{ readOnly: true }}
                                />
                                {touched.bank && errors.bank && (
                                    <FormHelperText error id="error-bank">
                                        {errors.bank}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth
                                error={Boolean(touched.branch && errors.branch)}>
                                <TextField
                                    id="branch"
                                    type="text"
                                    value={values.branch}
                                    name="branch"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Branch"
                                    InputProps={{ readOnly: true }}
                                />
                                {touched.branch && errors.branch && (
                                    <FormHelperText error id="error-branch">
                                        {errors.branch}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.account_no && errors.account_no)}>
                                <TextField
                                    id="account_no"
                                    type="text"
                                    value={values.account_no}
                                    name="account_no"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Account Number"
                                />
                                {touched.account_no && errors.account_no && (
                                    <FormHelperText error id="error-account_no">
                                        {errors.account_no}
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
                            Update Bank details
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    ))
}
