import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData, nonull } from "../../utils/util";


export default function DispatchShipment({ id = useParams()['id'] }) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetcher(`/api/shipments/${id}`)
            .then(r => r.json())
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [id])
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    return loading ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                transporter: Yup.number().required('Transporter is required'),
                courier: Yup.number().required('Courier is required'),
                awb: Yup.string().required('AWB is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/shipments/${id}/dispatch`, {
                    method: 'put',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(({ status }) => {
                        if (status === 'success') {
                            enqueueSnackbar('Shipment Updated Successfully', { variant: 'success' })
                            navigate('/admin/shipments/pending')
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
                            <Card>
                                <CardContent>
                                    <Typography variant="h2" textAlign="center">Dispatch Shipment</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.transporter && errors.transporter)}>
                                <ServerAutocomplete
                                    required
                                    select="transporter"
                                    id="transporter"
                                    type="text"
                                    value={values.transporter}
                                    name="transporter"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Transporter Name"
                                />
                                {touched.transporter && errors.transporter && (
                                    <FormHelperText error id="transporter">
                                        {errors.transporter}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.courier && errors.courier)}>
                                <ServerAutocomplete
                                    required
                                    id="courier"
                                    select="courier"
                                    name="courier"
                                    label="Select Courier"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.courier}
                                />
                                {touched.courier && errors.courier && (
                                    <FormHelperText error id="error-courier">
                                        {errors.courier}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.awb && errors.awb)}>
                                <TextField
                                    required
                                    type="text"
                                    id="awb"
                                    value={values.awb}
                                    name="awb"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="AWB"
                                />
                                {touched.awb && errors.awb && (
                                    <FormHelperText error id="awb">
                                        {errors.awb}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.weight && errors.weight)}>
                                <TextField
                                    type="number"
                                    id="weight"
                                    value={values.weight}
                                    name="weight"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Weight"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                    }}
                                />
                                {touched.weight && errors.weight && (
                                    <FormHelperText error id="weight">
                                        {errors.weight}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.length && errors.length)}>
                                <TextField
                                    id="length"
                                    type="number"
                                    value={values.length}
                                    name="length"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Length"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                                {touched.length && errors.length && (
                                    <FormHelperText error id="length">
                                        {errors.length}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.breadth && errors.breadth)}>
                                <TextField
                                    id="breadth"
                                    type="number"
                                    value={values.breadth}
                                    name="breadth"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Breadth"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                                {touched.breadth && errors.breadth && (
                                    <FormHelperText error id="breadth">
                                        {errors.breadth}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.height && errors.height)}>
                                <TextField
                                    id="height"
                                    type="number"
                                    value={values.height}
                                    name="height"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Height"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                                {touched.height && errors.height && (
                                    <FormHelperText error id="height">
                                        {errors.height}
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
                            Update
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
