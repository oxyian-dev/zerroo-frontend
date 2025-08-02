import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";
const AddTransporter = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Yup.object().shape({
                transporter: Yup.string().max(100).required('Transporter is required'),
                couriers: Yup.array().of(Yup.number()).min(1, 'Some Couriers has to be selected').nullable()
                    .required('Some Couriers has to be selected')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/transporters`, {
                    method: 'post',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Transporter Added Successfully', { variant: 'success' })
                            navigate('/admin/transporters')
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
                transporter: '',
                couriers: []
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
                                    <Typography variant="h2" textAlign="center">Add Transporter</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.transporter && errors.transporter)}>
                                <TextField
                                    id="transporter"
                                    type="text"
                                    value={values.transporter}
                                    name="transporter"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Transporter Name"
                                />
                                {touched.transporter && errors.transporter && (
                                    <FormHelperText error id="error-transporter">
                                        {errors.transporter}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    multiple={true}
                                    id="courier"
                                    select="courier"
                                    name="couriers"
                                    label="Select Couriers"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.couriers}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth
                                error={Boolean(touched.inventory_id && errors.inventory_id)}>
                                <ServerAutocomplete
                                    required
                                    select="inventory"
                                    id="inventory_id"
                                    value={values.inventory_id}
                                    name="inventory_id"
                                    label="Inventory"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.inventory_id && errors.inventory_id && (
                                    <FormHelperText error id={`error-inventory_id`}>
                                        {errors.inventory_id}
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
export default AddTransporter;