import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";
const AddCourier = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Yup.object().shape({
                courier: Yup.string().max(100).required('Courier is required'),
                display: Yup.string().max(100).required('Display Name is required'),
                tracking: Yup.string().matches(/.*\$\{awb\}/, "Tracking URL should have a $ {awb}")
                    .max(100).required('Tracking URL is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/transporters/couriers`, {
                    method: 'post',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Courier Added Successfully', { variant: 'success' })
                            navigate('/admin/couriers')
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
                courier: '',
                display: '',
                tracking: ''
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
                                    <Typography variant="h2" textAlign="center">Add Courier</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.courier && errors.courier)}>
                                <TextField
                                    required
                                    id="courier"
                                    type="text"
                                    value={values.courier}
                                    name="courier"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Courier Name"
                                />
                                {touched.courier && errors.courier && (
                                    <FormHelperText error id="error-courier">
                                        {errors.courier}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.display && errors.display)}>
                                <TextField
                                    required
                                    id="display"
                                    type="text"
                                    value={values.display}
                                    name="display"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Display Name"
                                />
                                {touched.display && errors.display && (
                                    <FormHelperText error id="error-display">
                                        {errors.display}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(touched.tracking && errors.tracking)}>
                                <TextField
                                    required
                                    id="tracking"
                                    type="text"
                                    value={values.tracking}
                                    name="tracking"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Tracking URL"
                                />
                                {touched.tracking && errors.tracking && (
                                    <FormHelperText error id="error-tracking">
                                        {errors.tracking}
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
                            Create
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default AddCourier