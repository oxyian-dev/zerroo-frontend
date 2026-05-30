import { LoadingButton } from "@mui/lab";
import { Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";

export default function AddBrand() {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    return (
        <Formik
            validationSchema={Yup.object().shape({
                brand: Yup.string().max(100).required('Brand is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher('/api/brands', {
                    method: 'post',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(({ status, message = 'Exception occurred' }) => {
                        if (status === 'success') {
                            enqueueSnackbar('Brand Added Successfully', { variant: 'success' })
                            navigate('/admin/brands')
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
                brand: ''
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
                                    <Typography variant="h2" textAlign="center">Add Brand</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(touched.brand && errors.brand)}>
                                <TextField
                                    id="brand"
                                    type="text"
                                    value={values.brand}
                                    name="brand"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Brand"
                                />
                                {touched.brand && errors.brand && (
                                    <FormHelperText error id="error-brand">
                                        {errors.brand}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                loading={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Create
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    )
}
