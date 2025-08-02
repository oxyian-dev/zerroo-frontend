import * as Yup from "yup";
import fetcher from "../../../../utils/fetcher";
import {Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Formik} from "formik";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const AddSize = () => {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate()
    return (
        <Formik
            validationSchema={Yup.object().shape({
                size: Yup.string().max(100).required('Size is required'),
                index: Yup.number().nullable(true).required('Index is required')
            })}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)
                const formData = new FormData();
                formData.set('size', values.size.toUpperCase())
                formData.set('index', values.index)
                return await fetcher(`/api/variants/sizes`, {method: 'post', body: formData})
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Size Added Successfully', {variant: 'success'})
                            navigate('/admin/variants/size')
                        } else {
                            enqueueSnackbar('Exception occurred', {variant: 'error'})
                            setSubmitting(false)
                        }
                    })
                    .catch(() => {
                        enqueueSnackbar('Error occurred', {variant: 'error'})
                        setSubmitting(false)
                    })
            }}
            initialValues={{
                size: '',
                index: ''
            }}>
            {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h2" textAlign="center">Add Size</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.size && errors.size)}>
                                <TextField
                                    id="size"
                                    type="text"
                                    value={values.size}
                                    name="size"
                                    onBlur={handleBlur}
                                    onChange={(e) => setFieldValue('size', e.target.value.toUpperCase())}
                                    label="Size"
                                />
                                {touched.size && errors.size && (
                                    <FormHelperText error id="error-size">
                                        {errors.size}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.index && errors.index)}>
                                <TextField
                                    id="index"
                                    type="number"
                                    value={values.index}
                                    name="index"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Index"
                                />
                                {touched.index && errors.index && (
                                    <FormHelperText error id="error-index">
                                        {errors.index}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Box sx={{mt: 3}}>
                            <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{mt: 2}}>
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
export default AddSize;