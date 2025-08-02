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

const CloneItem = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [defaultValues, setDefaultValues] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        fetcher(`/api/items/${id}`)
            .then(r => r.json())
            .then(setDefaultValues)
            .catch(console.error)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                group: Yup.number().required('Select an Item Group'),
                sku: Yup.string().required('SKU is mandatory'),
                hsn: Yup.number().min(100000, 'Minimum 6 digit is required').required('HSN is mandatory'),
                title: Yup.string().max(100).required('Title is required'),
                description: Yup.string().max(250).required('Description is required'),
                price: Yup.number().required('Select a Price List'),
                image: Yup.number().required('Select an Image List'),
                weight: Yup.number().positive().min(0.01),
                length: Yup.number().positive().min(1),
                breadth: Yup.number().positive().min(1),
                height: Yup.number().positive().min(1)
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/items`,
                    { method: 'post', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(({ status, message = 'Exception occurred' }) => {
                        if (status === 'success') {
                            enqueueSnackbar('Item Added Successfully', { variant: 'success' })
                            navigate('/admin/items')
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
            initialValues={nonull(defaultValues, 'price', 'image')}>
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
                                    <Typography variant="h2" textAlign="center">Clone Item</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    required
                                    id="group"
                                    select="group"
                                    name="group"
                                    label="Item Group"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.group}
                                />
                                {touched.group && errors.group && (
                                    <FormHelperText error id="error-group">
                                        {errors.group}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.sku && errors.sku)}>
                                <TextField
                                    required
                                    id="sku"
                                    type="text"
                                    value={values.sku}
                                    name="sku"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="SKU"
                                    helperText="Max 8 characters"
                                />
                                {touched.sku && errors.sku && (
                                    <FormHelperText error id="error-sku">
                                        {errors.sku}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.hsn && errors.hsn)}>
                                <TextField
                                    required
                                    id="hsn"
                                    type="number"
                                    value={values.hsn}
                                    name="hsn"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="HSN"
                                    helperText="Min 6 digits"
                                />
                                {touched.hsn && errors.hsn && (
                                    <FormHelperText error id="error-sku">
                                        {errors.hsn}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                                <TextField
                                    required
                                    id="title"
                                    type="text"
                                    value={values.title}
                                    name="title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Title"
                                    helperText="Max 100 characters"
                                />
                                {touched.title && errors.title && (
                                    <FormHelperText error id="error-title">
                                        {errors.title}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                                <TextField
                                    multiline
                                    required
                                    id="description"
                                    type="text"
                                    value={values.description}
                                    name="description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Description"
                                    helperText="Max 250 characters"
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="error-description">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    required
                                    id="price"
                                    select="price"
                                    name="price"
                                    label="Price List"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                />
                                {touched.price && errors.price && (
                                    <FormHelperText error id="error-price">
                                        {errors.price}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    required
                                    id="image"
                                    select="image"
                                    name="image"
                                    label="Image List"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.image}
                                />
                                {touched.image && errors.image && (
                                    <FormHelperText error id="error-image">
                                        {errors.image}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    id="size"
                                    select="size"
                                    name="size"
                                    label="Size"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.size}
                                />
                                {touched.size && errors.size && (
                                    <FormHelperText error id="error-size">
                                        {errors.size}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth>
                                <ServerAutocomplete
                                    id="color"
                                    select="color"
                                    name="color"
                                    label="Color"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.color}
                                />
                                {touched.color && errors.color && (
                                    <FormHelperText error id="error-color">
                                        {errors.color}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.weight && errors.weight)}>
                                <TextField
                                    id="weight"
                                    type="number"
                                    value={values.weight}
                                    name="weight"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Weight"
                                    helperText="Kg"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                    }}
                                />
                                {touched.weight && errors.weight && (
                                    <FormHelperText error id="error-weight">
                                        {errors.weight}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.length && errors.length)}>
                                <TextField
                                    id="length"
                                    type="number"
                                    value={values.length}
                                    name="length"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Length"
                                    helperText="cm"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}

                                />
                                {touched.length && errors.length && (
                                    <FormHelperText error id="error-length">
                                        {errors.length}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.breadth && errors.breadth)}>
                                <TextField
                                    id="breadth"
                                    type="number"
                                    value={values.breadth}
                                    name="breadth"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Breadth"
                                    helperText="cm"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                                {touched.breadth && errors.breadth && (
                                    <FormHelperText error id="error-breadth">
                                        {errors.breadth}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth error={Boolean(touched.height && errors.height)}>
                                <TextField
                                    id="height"
                                    type="number"
                                    value={values.height}
                                    name="height"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Height"
                                    helperText="cm"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }}
                                />
                                {touched.height && errors.height && (
                                    <FormHelperText error id="error-height">
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
                            Create
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default CloneItem;