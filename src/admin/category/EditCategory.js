import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { IconDeviceFloppy } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import HionImageUpload from "../../components/HionImageUpload";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData, nonull, toImage } from "../../utils/util";

const EditCategory = () => {
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar();
    const [categoryValues, setCategoryValues] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetcher(`/api/categories/${id}`)
            .then(res => res.json())
            .then((value) => {
                setCategoryValues(value)
                setLoading(false)
            })
    }, [id])
    return (
        loading ?
            <Box sx={{ width: '100%' }}>
                <Skeleton height={100} />
                <Skeleton animation="wave" height={150} />
                <Skeleton animation={false} height={300} />
            </Box> : <Formik
                validationSchema={Yup.object().shape({
                    category: Yup.string().max(100).required('Category is required')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    return await fetcher(`/api/categories/${id}`,
                        { method: 'PUT', body: constructFormData(values) })
                        .then(r => r.json())
                        .then(res => {
                            if (res.status === 'success') {
                                enqueueSnackbar('Category Edited Successfully', { variant: 'success' })
                                navigate('/admin/categories/view')
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
                initialValues={{ ...nonull(categoryValues), removed: false }}>
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
                                        <Typography variant="h2" textAlign="center">Edit Category</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                                    <InputLabel htmlFor="category">Category Name</InputLabel>
                                    <OutlinedInput
                                        id="category"
                                        type="text"
                                        value={values.category}
                                        name="category"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Category Name"
                                        inputProps={{}}
                                    />
                                    {touched.category && errors.category && (
                                        <FormHelperText error id="category-error">
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
                                        value={values.parent}
                                        label="Parent Category"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <HionImageUpload
                                    defaultImages={categoryValues.image ? [toImage(categoryValues.image)] : []}
                                    name="image"
                                    handleChange={handleChange}
                                    handleRemove={() => {
                                        values.removed = true
                                    }}
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
                                fullWidth
                                size="large"
                                type="submit"
                                loading={isSubmitting}
                                loadingPosition="start"
                                startIcon={<IconDeviceFloppy />}
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
export default EditCategory;