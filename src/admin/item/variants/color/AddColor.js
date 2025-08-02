import * as Yup from "yup";
import fetcher from "../../../../utils/fetcher";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { constructFormData } from "../../../../utils/util";

const AddColor = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Yup.object().shape({
                color: Yup.string().max(100).required('Color is required'),
                hex: Yup.string().max(100).required('Hex Code is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                return await fetcher(`/api/variants/colors`,
                    { method: 'post', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Color Added Successfully', { variant: 'success' })
                            navigate('/admin/variants/color')
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
                color: '',
                hex: '#000000'
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
                                    <Typography variant="h2" textAlign="center">Add Colour</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.color && errors.color)}>
                                <TextField
                                    required
                                    id="color"
                                    type="text"
                                    value={values.color}
                                    name="color"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Color Name"
                                    helperText="Enter a Unique Color Code Name"
                                />
                                {touched.color && errors.color && (
                                    <FormHelperText error id="error-color">
                                        {errors.color}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.hex && errors.hex)}>
                                <TextField
                                    required
                                    id="hex"
                                    type="color"
                                    value={values.hex}
                                    name="hex"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Choose Color"
                                    helperText="Choose the exact colour from the Picker"
                                />
                                {touched.hex && errors.hex && (
                                    <FormHelperText error id="error-hex">
                                        {errors.hex}
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
                            Create
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default AddColor