import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import AadhaarField from "../../components/AadhaarField";
import Loader from "../../components/Loader";
import PanField from "../../components/PanField";
import fetcher from "../../utils/fetcher";
import REGEX from "../../utils/regex";
import { constructFormData, nonull } from "../../utils/util";


export default function EditKycDetails({ id = useParams()['id'] }) {

    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetcher(`/api/admin/users/distributors/${id}`)
            .then(r => r.json())
            .then(setData)
    }, [id])


    return (data === null ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                aadhaar: Yup.string().matches(REGEX.AADHAAR, 'Invalid Aadhaar')
                    .required('Enter your Aadhaar'),
                pan: Yup.string().matches(REGEX.PAN, 'Invalid PAN').required('PAN required'),
                pan_firstname: Yup.string().max(100).required('Enter Firstname as per PAN'),
                pan_lastname: Yup.string().min(1).max(100).required('Enter Lastname as per PAN')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                const body = constructFormData(values)
                body.set('aadhaar', values.aadhaar.split(' ').join(''))
                return await fetcher(`/api/admin/users/distributors/${id}/kyc`, {
                    method: 'put',
                    body
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Kyc details Edited Successfully', { variant: 'success' })
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
                values
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h2" textAlign="center">Edit KYC Details</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth
                                error={Boolean(touched.aadhaar && errors.aadhaar)}>
                                <AadhaarField
                                    required
                                    type="text"
                                    id="aadhaar"
                                    value={values.aadhaar}
                                    name="aadhaar"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Aadhaar Number"
                                />
                                {touched.aadhaar && errors.aadhaar && (
                                    <FormHelperText error id="error-aadhaar">
                                        {errors.aadhaar}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.pan && errors.pan)}>
                                <PanField
                                    required
                                    type="text"
                                    id="pan"
                                    value={values.pan}
                                    name="pan"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="PAN"
                                />
                                {touched.pan && errors.pan && (
                                    <FormHelperText error id="error-pan">
                                        {errors.pan}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.pan_firstname && errors.pan_firstname)}>
                                <TextField
                                    fullWidth={true}
                                    required
                                    id="pan_firstname"
                                    type="text"
                                    value={values.pan_firstname}
                                    name="pan_firstname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Firstname as per PAN"
                                />
                                {touched.pan_firstname && errors.pan_firstname && (
                                    <FormHelperText error id="error-pan_firstname">
                                        {errors.pan_firstname}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth
                                error={Boolean(touched.pan_lastname && errors.pan_lastname)}>
                                <TextField
                                    required
                                    id="pan_lastname"
                                    type="text"
                                    value={values.pan_lastname}
                                    name="pan_lastname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Lastname as per PAN"
                                />
                                {touched.pan_lastname && errors.pan_lastname && (
                                    <FormHelperText error id="error-pan_lastname">
                                        {errors.pan_lastname}
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
                            Update KYC details
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    ))
}
