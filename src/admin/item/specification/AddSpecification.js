import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ServerAutocomplete from "../../../components/ServerAutocomplete";
import fetcher from "../../../utils/fetcher";
import { constructFormData } from "../../../utils/util";

const AddSpecification = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Formik
            validationSchema={Yup.object().shape({
                type: Yup.number().nullable(true).required('Type is required'),
                value: Yup.string().max(100).required('Value is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/item-specifications`,
                    { method: 'post', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Specification Added Successfully', { variant: 'success' })
                            navigate('/admin/item-specifications/view')
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
                type: null,
                value: ''
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
                                    <Typography variant="h2" textAlign="center">Add Specification</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.type && errors.type)}>
                                <ServerAutocomplete
                                    name="type"
                                    onChange={handleChange}
                                    value={values.type}
                                    onBlur={handleBlur}
                                    id="type"
                                    select="specification-type"
                                    label="Specification Type"
                                />
                                {touched.type && errors.type && (
                                    <FormHelperText error id="error-type">
                                        {errors.type}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.value && errors.value)}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="value"
                                    type="text"
                                    value={values.value}
                                    name="value"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Value"
                                />
                                {touched.value && errors.value && (
                                    <FormHelperText error id="error-value">
                                        {errors.value}
                                    </FormHelperText>
                                )}
                            </FormControl>

                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText id="error-submit" error>{errors.submit}</FormHelperText>
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
                            Create
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default AddSpecification;