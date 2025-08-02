import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ServerAutocomplete from "../../../components/ServerAutocomplete";
import fetcher from "../../../utils/fetcher";
import { constructFormData } from "../../../utils/util";

const AddSpecificationList = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Formik
            validationSchema={Yup.object().shape({
                name: Yup.string().max(100).required('Enter a Name'),
                specifications: Yup.array().of(Yup.number()).min(1, 'Some Specifications has to be selected')
                    .nullable().required('Some Specifications has to be selected')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/item-specifications/list`,
                    { method: 'post', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Specification List Created Successfully', { variant: 'success' })
                            navigate('/admin/item-specifications/list')
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
                specifications: []
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
                                    <Typography variant="h2" textAlign="center">Add Specification List</Typography>
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
                                    label="List Name"
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="error-name">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.specifications && errors.specifications)}>
                                <ServerAutocomplete
                                    multiple
                                    id="specifications"
                                    name="specifications"
                                    select="specifications"
                                    label="Specifications"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.specifications}
                                />
                                {touched.specifications && errors.specifications && (
                                    <FormHelperText error id="error-specifications">
                                        {errors.specifications}
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
export default AddSpecificationList;
