import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import HionImageUpload from "../../components/HionImageUpload";
import Loader from "../../components/Loader";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData, toImage } from "../../utils/util";

export default function EditCombo({ id = useParams()['id'] }) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetcher(`/api/combos/${id}`)
            .then(r => r.json())
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                name: Yup.string().max(100).required('Name is required'),
                category: Yup.number().nullable(true).required('Select a Category'),
                description: Yup.string().max(250).required('Description is required'),
                image: Yup.mixed().required('Upload an Image').test("fileSize", "The file is too large", value => {
                    if (!value || !value.length) return true;
                    return value[0].size <= 5242880
                })
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/combos/${id}`, {
                    method: 'put',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Combo Edited Successfully', { variant: 'success' })
                            navigate('/admin/combos')
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
            initialValues={{ ...data, imageChanged: false }}>
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
                                    <Typography variant="h2" textAlign="center">Edit Combo</Typography>
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
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                                <TextField
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
                        <Grid item xs={12}>
                            <HionImageUpload
                                defaultImages={[toImage(values.image)]}
                                name="image"
                                handleChange={handleChange}
                                handleRemove={() => {
                                    values.imageChanged = true
                                }}
                            />
                            {touched.image && errors.image && (
                                <FormHelperText error id="error-image">
                                    {errors.image}
                                </FormHelperText>
                            )}
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
        </Formik>
    )
}
