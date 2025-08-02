import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../../../components/Loader";
import fetcher from "../../../../utils/fetcher";

const EditSize = () => {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [defaultValues, setDefaultValues] = useState({})
    useEffect(() => {
        fetcher(`/api/variants/sizes/${id}`)
            .then(r => r.json())
            .then(res => {
                setDefaultValues(res)
            })
            .catch(console.log)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                size: Yup.string().max(100).required('Size is required'),
                index: Yup.number().nullable(true).required('Index is required')
            })
            }
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                const formData = new FormData();
                formData.set('size', values.size)
                formData.set('index', values.index)
                return await fetcher(`/api/variants/sizes/${id}`, { method: 'put', body: formData })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Size Edited Successfully', { variant: 'success' })
                            navigate('/admin/variants/size')
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
            initialValues={defaultValues}>
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
                                    <Typography variant="h2" textAlign="center">Edit Size</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.size && errors.size)}>
                                <TextField
                                    id="size"
                                    type="text"
                                    value={values.size}
                                    name="size"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Size"
                                    InputProps={{ readOnly: true }}
                                    helperText="Size cannot be edited"
                                />
                                {touched.size && errors.size && (
                                    <FormHelperText error id="error-size">
                                        {errors.size}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.index && errors.index)}>
                                <TextField
                                    id="index"
                                    type="number"
                                    value={values.index}
                                    name="index"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Index"
                                />
                                {touched.index && errors.index && (
                                    <FormHelperText error id="error-index">
                                        {errors.index}
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
                            Edit
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik >
    )
}
export default EditSize;