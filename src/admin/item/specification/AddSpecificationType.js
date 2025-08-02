import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../../utils/fetcher";
import { constructFormData } from "../../../utils/util";

const AddSpecificationType = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    return (
        <Formik
            validationSchema={Yup.object().shape({
                type: Yup.string().max(100).required('Type is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/item-specifications/types`, {
                    method: 'post',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Specification Type Added Successfully', { variant: 'success' })
                            navigate('/admin/item-specifications/types')
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
                                    <Typography variant="h2" textAlign="center">Add Specification Type</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                <TextField
                                    required
                                    id="type"
                                    type="text"
                                    value={values.type}
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Specification Type"
                                />
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
                            Add Specification Type
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default AddSpecificationType