import { LoadingButton } from "@mui/lab";
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import { IconBoxMargin, IconCoin, IconPercentage } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../../utils/fetcher";
import { constructFormData, discount, round } from "../../../utils/util";

const AddPriceList = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    return (
        <Formik
            validationSchema={Yup.object().shape({
                name: Yup.string().max(200).required('Name is required'),
                description: Yup.string().max(40).required('Description is required'),
                mrp: Yup.number().min(1).required('MRP is Required'),
                price: Yup.number().min(1).required('Price is Required'),
                cost: Yup.number().min(1).required('Cost is Required'),
                gst: Yup.number().required('GST is Required'),
                pv: Yup.number().min(0).required('PV Required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/price-lists`,
                    { method: 'post', body: constructFormData(values) })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Price List Added Successfully', { variant: 'success' })
                            navigate('/admin/price-list/view')
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
                description: '',
                mrp: '',
                price: '',
                cost: '',
                gst: '',
                pv: '',
                margin: 0,
                discount: 0
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
                                    <Typography variant="h2" textAlign="center">Add Price List</Typography>
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
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="error-description">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.mrp && errors.mrp)}>
                                <TextField
                                    required
                                    id="mrp"
                                    type="number"
                                    value={values.mrp}
                                    name="mrp"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="MRP"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                    }}
                                />
                                {touched.mrp && errors.mrp && (
                                    <FormHelperText error id="error-mrp">
                                        {errors.mrp}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.price && errors.price)}>
                                <TextField
                                    required
                                    id="price"
                                    type="number"
                                    value={values.price}
                                    name="price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Selling Price"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                    }}
                                />
                                {touched.price && errors.price && (
                                    <FormHelperText error id="error-price">
                                        {errors.price}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.cost && errors.cost)}>
                                <TextField
                                    required
                                    id="cost"
                                    type="number"
                                    value={values.cost}
                                    name="cost"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Cost Price"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                    }}
                                />
                                {touched.cost && errors.cost && (
                                    <FormHelperText error id="error-cost">
                                        {errors.cost}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.gst && errors.gst)}>
                                <InputLabel id="gst">GST *</InputLabel>
                                <Select
                                    required
                                    id="gst"
                                    type="number"
                                    value={values.gst}
                                    name="gst"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="GST (%)"
                                >
                                    <MenuItem value={5} key={5}>5%</MenuItem>
                                    <MenuItem value={12} key={12}>12%</MenuItem>
                                    <MenuItem value={18} key={18}>18%</MenuItem>
                                    <MenuItem value={28} key={28}>28%</MenuItem>
                                </Select>
                                {touched.gst && errors.gst && (
                                    <FormHelperText error id="error-gst">
                                        {errors.gst}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.pv && errors.pv)}>
                                <TextField
                                    required
                                    id="pv"
                                    type="number"
                                    value={values.pv}
                                    name="pv"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="PV"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><IconCoin /></InputAdornment>
                                    }}
                                />
                                {touched.pv && errors.pv && (
                                    <FormHelperText error id="error-pv">
                                        {errors.pv}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.discount && errors.discount)}>
                                <TextField
                                    id="discount"
                                    type="number"
                                    value={discount(values.mrp, values.price) || 0}
                                    name="discount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Discount"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><IconPercentage /></InputAdornment>,
                                        readOnly: true
                                    }}
                                />
                                {touched.discount && errors.discount && (
                                    <FormHelperText error id="error-discount">
                                        {errors.discount}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Box mt={3}>
                            <FormHelperText id="error-submit" error>{errors.submit}</FormHelperText>
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
                            Create Price List
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default AddPriceList;