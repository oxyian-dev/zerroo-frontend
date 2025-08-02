import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../../../components/Loader";
import fetcher from "../../../../utils/fetcher";
import { constructFormData } from "../../../../utils/util";

const EditColor = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const { id } = useParams();
    const [defaultValues, setDefaultValues] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetcher(`/api/variants/colors/${id}`)
            .then(r => r.json())
            .then(setDefaultValues)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                color: Yup.string().max(100).required('Color is required'),
                hex: Yup.string().max(100).required('Hex Code is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                return await fetcher(`/api/variants/colors/${id}`,
                    { method: 'put', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Color Edited Successfully', { variant: 'success' })
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
            initialValues={defaultValues}>
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
                                    <Typography variant="h2" textAlign="center">Edit Colour</Typography>
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
                            Edit
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default EditColor;