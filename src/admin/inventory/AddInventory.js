import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import States from "../../data/States";
import ClientAutocomplete from "../../components/ClientAutocomplete";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";
const AddInventory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    return (
        <Box>
            <Formik
                validationSchema={Yup.object().shape({
                    inventory: Yup.string().max(100).required('Inventory is required'),
                    contact: Yup.string().max(100).required('Contact Name is required'),
                    phone: Yup.number("Invalid Phone Number").nullable(true).min(6000000000, "Invalid Phone Number")
                        .max(9999999999, "Invalid Phone Number").required('Phone Number is required'),
                    address_1: Yup.string().max(60).required('Address 1 is required'),
                    address_2: Yup.string().max(60).required('Address 2 is required'),
                    postcode: Yup.number().nullable(true).min(100000, "Invalid Pin Code")
                        .max(999999, "Invalid Pin Code").required('Pin Code is required'),
                    landmark: Yup.string().max(30).required('Landmark is required'),
                    city: Yup.string().max(20).required('City is required'),
                    state: Yup.string().max(40).required('State is required'),
                    branch: Yup.number().required('Select Branch')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    return await fetcher(`/api/inventories`, {
                        method: 'post',
                        body: constructFormData(values)
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 'success') {
                                enqueueSnackbar('Inventory Added Successfully', { variant: 'success' })
                                navigate('/admin/inventories')
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
                    inventory: '',
                    contact: '',
                    phone: '',
                    address_1: '',
                    address_2: '',
                    landmark: '',
                    postcode: '',
                    city: '',
                    state: '',
                    branch: ''
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
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.inventory && errors.inventory)}>
                                    <TextField
                                        required
                                        id="inventory"
                                        type="text"
                                        value={values.inventory}
                                        name="inventory"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Inventory Name"
                                    />
                                    {touched.inventory && errors.inventory && (
                                        <FormHelperText error id="error-inventory">
                                            {errors.inventory}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <ServerAutocomplete
                                        required
                                        id="branch"
                                        name="branch"
                                        select="branch"
                                        label="Branch"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.branch}
                                    />
                                    {touched.branch && errors.branch && (
                                        <FormHelperText error id="error-branch">
                                            {errors.branch}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.contact && errors.contact)}>
                                    <TextField
                                        required
                                        id="contact"
                                        type="text"
                                        value={values.contact}
                                        name="contact"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Contact Name"
                                    />
                                    {touched.contact && errors.contact && (
                                        <FormHelperText error id="error-contact">
                                            {errors.contact}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                    <TextField
                                        required
                                        id="phone"
                                        type="number"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Phone Number"
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="error-phone">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.address_1 && errors.address_1)}>
                                    <TextField
                                        required
                                        id="address_1"
                                        type="text"
                                        value={values.address_1}
                                        name="address_1"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Address 1"
                                    />
                                    {touched.address_1 && errors.address_1 && (
                                        <FormHelperText error id="error-address_1">
                                            {errors.address_1}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.address_2 && errors.address_2)}>
                                    <TextField
                                        required
                                        id="address_2"
                                        type="text"
                                        value={values.address_2}
                                        name="address_2"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Address 2"
                                    />
                                    {touched.address_2 && errors.address_2 && (
                                        <FormHelperText error id="error-address_2">
                                            {errors.address_2}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.postcode && errors.postcode)}>
                                    <TextField
                                        required
                                        id="postcode"
                                        type="number"
                                        value={values.postcode}
                                        name="postcode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Postcode"
                                    />
                                    {touched.postcode && errors.postcode && (
                                        <FormHelperText error id="error-postcode">
                                            {errors.postcode}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.landmark && errors.landmark)}>
                                    <TextField
                                        required
                                        id="landmark"
                                        type="text"
                                        value={values.landmark}
                                        name="landmark"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Landmark"
                                    />
                                    {touched.landmark && errors.landmark && (
                                        <FormHelperText error id="error-landmark">
                                            {errors.landmark}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.city && errors.city)}>
                                    <TextField
                                        required
                                        id="city"
                                        type="text"
                                        value={values.city}
                                        name="city"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="City"
                                    />
                                    {touched.city && errors.city && (
                                        <FormHelperText error id="error-city">
                                            {errors.city}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.state && errors.state)}>
                                    <ClientAutocomplete
                                        name="state"
                                        required={true}
                                        id="state"
                                        label="State"
                                        options={States}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.state}
                                    />
                                    {touched.state && errors.state && (
                                        <FormHelperText error id="error-state">
                                            {errors.state}
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
                                Add
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default AddInventory