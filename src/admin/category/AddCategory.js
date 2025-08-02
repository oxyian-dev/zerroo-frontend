import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import HionImageUpload from "../../components/HionImageUpload";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";

const AddCategory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Yup.object().shape({
                category: Yup.string().max(100).required('Category is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/categories`, {
                    method: 'post',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(({ status, message = 'Exception occurred' }) => {
                        if (status === 'success') {
                            enqueueSnackbar('Category Added Successfully', { variant: 'success' })
                            navigate('/admin/categories/view')
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
                category: ''
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
                                    <Typography variant="h2" textAlign="center">Add Category</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                <TextField
                                    id="category"
                                    type="text"
                                    value={values.category}
                                    name="category"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Category Name"
                                />
                                {touched.category && errors.category && (
                                    <FormHelperText error id="error-category">
                                        {errors.category}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    id="parent"
                                    name="parent"
                                    select="category"
                                    label="Parent Category"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.parent}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <HionImageUpload
                                buttonText="Choose image"
                                name="image"
                                handleChange={handleChange}
                            />
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
export default AddCategory;