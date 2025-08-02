import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import HionImageUpload from "../../../components/HionImageUpload";
import ServerAutocomplete from "../../../components/ServerAutocomplete";
import fetcher from "../../../utils/fetcher";
import { constructFormData } from "../../../utils/util";

const AddItemGroup = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Formik
            validationSchema={Yup.object().shape({
                name: Yup.string().max(25).required('Name is required'),
                category: Yup.number().nullable(true).required('Select a Category'),
                brand: Yup.number().nullable(true).required('Select a Brand')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/item-groups`,
                    { method: 'post', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Item Group Added Successfully', { variant: 'success' })
                            navigate('/admin/item-groups/view')
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
                name: '',
                category: '',
                brand: '',
                specification: '',
                size: ''
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
                                    <Typography variant="h2" textAlign="center">Add Item Group</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="name"
                                    type="text"
                                    value={values.name}
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Name"
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="error-name">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                <ServerAutocomplete
                                    name="category"
                                    onChange={handleChange}
                                    value={values.category}
                                    onBlur={handleBlur}
                                    id="category"
                                    select="category"
                                    label="Category"
                                />
                                {touched.category && errors.category && (
                                    <FormHelperText error id="error-category">
                                        {errors.category}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.brand && errors.brand)}>
                                <ServerAutocomplete
                                    name="brand"
                                    onChange={handleChange}
                                    value={values.brand}
                                    onBlur={handleBlur}
                                    id="brand"
                                    select="brand"
                                    label="Brand"
                                />
                                {touched.brand && errors.brand && (
                                    <FormHelperText error id="error-brand">
                                        {errors.brand}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.specification && errors.specification)}>
                                <ServerAutocomplete
                                    name="specification"
                                    onChange={handleChange}
                                    value={values.specification}
                                    onBlur={handleBlur}
                                    id="specification"
                                    select="specification-list"
                                    label="Specification List"
                                />
                                {touched.specification && errors.specification && (
                                    <FormHelperText error id="error-specification">
                                        {errors.specification}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <HionImageUpload
                                name="image"
                                handleChange={handleChange}
                                handleRemove={() => {
                                    values.imageChanged = true
                                }}
                                buttonText='Add Size Chart Image'
                            />
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
                            Create Item Group
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default AddItemGroup;