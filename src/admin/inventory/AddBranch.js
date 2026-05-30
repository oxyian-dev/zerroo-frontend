import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ClientAutocomplete from "../../components/ClientAutocomplete";
import States from "../../data/States";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";

const AddBranch = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return (
        <Box>
            <Formik
                validationSchema={Yup.object().shape({
                    branch: Yup.string().max(100).required("Branch is required"),
                    source_of_supply: Yup.string().max(60).required("Source of supply is required"),
                    phone: Yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Phone number is required"),
                    email: Yup.string().email().max(100).required("Email is required"),
                    address_1: Yup.string().max(60).required("Address 1 is required"),
                    address_2: Yup.string().max(60).required("Address 2 is required"),
                    postcode: Yup.string().matches(/^\d{6}$/, "Invalid pin code").required("Pin code is required"),
                    landmark: Yup.string().max(60).required("Landmark is required"),
                    city: Yup.string().max(50).required("City is required"),
                    state: Yup.string().max(50).required("State is required"),
                    country: Yup.string().max(50).required("Country is required"),
                    gstin: Yup.string().length(15, "GSTIN must be 15 characters").required("GSTIN is required")
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    return await fetcher("/api/branches", {
                        method: "post",
                        body: constructFormData(values)
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.status === "success") {
                                enqueueSnackbar("Branch Added Successfully", { variant: "success" });
                                navigate("/admin/branches");
                            } else {
                                enqueueSnackbar("Exception occurred", { variant: "error" });
                                setSubmitting(false);
                            }
                        })
                        .catch(() => {
                            enqueueSnackbar("Error occurred", { variant: "error" });
                            setSubmitting(false);
                        });
                }}
                initialValues={{
                    branch: "",
                    source_of_supply: "",
                    phone: "",
                    email: "",
                    address_1: "",
                    address_2: "",
                    postcode: "",
                    landmark: "",
                    city: "",
                    state: "",
                    country: "India",
                    gstin: ""
                }}
            >
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
                                <FormControl fullWidth error={Boolean(touched.branch && errors.branch)}>
                                    <TextField id="branch" name="branch" value={values.branch} onBlur={handleBlur} onChange={handleChange} label="Branch Name" />
                                    {touched.branch && errors.branch && <FormHelperText error>{errors.branch}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.source_of_supply && errors.source_of_supply)}>
                                    <TextField id="source_of_supply" name="source_of_supply" value={values.source_of_supply} onBlur={handleBlur} onChange={handleChange} label="Source Of Supply" />
                                    {touched.source_of_supply && errors.source_of_supply && <FormHelperText error>{errors.source_of_supply}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                                    <TextField id="phone" name="phone" value={values.phone} onBlur={handleBlur} onChange={handleChange} label="Phone Number" />
                                    {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                    <TextField id="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} label="Email" />
                                    {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.address_1 && errors.address_1)}>
                                    <TextField id="address_1" name="address_1" value={values.address_1} onBlur={handleBlur} onChange={handleChange} label="Address 1" />
                                    {touched.address_1 && errors.address_1 && <FormHelperText error>{errors.address_1}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.address_2 && errors.address_2)}>
                                    <TextField id="address_2" name="address_2" value={values.address_2} onBlur={handleBlur} onChange={handleChange} label="Address 2" />
                                    {touched.address_2 && errors.address_2 && <FormHelperText error>{errors.address_2}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.postcode && errors.postcode)}>
                                    <TextField id="postcode" name="postcode" value={values.postcode} onBlur={handleBlur} onChange={handleChange} label="Postcode" />
                                    {touched.postcode && errors.postcode && <FormHelperText error>{errors.postcode}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.landmark && errors.landmark)}>
                                    <TextField id="landmark" name="landmark" value={values.landmark} onBlur={handleBlur} onChange={handleChange} label="Landmark" />
                                    {touched.landmark && errors.landmark && <FormHelperText error>{errors.landmark}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.city && errors.city)}>
                                    <TextField id="city" name="city" value={values.city} onBlur={handleBlur} onChange={handleChange} label="City" />
                                    {touched.city && errors.city && <FormHelperText error>{errors.city}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.state && errors.state)}>
                                    <ClientAutocomplete
                                        name="state"
                                        required
                                        id="state"
                                        label="State"
                                        options={States}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.state}
                                    />
                                    {touched.state && errors.state && <FormHelperText error>{errors.state}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.country && errors.country)}>
                                    <TextField id="country" name="country" value={values.country} onBlur={handleBlur} onChange={handleChange} label="Country" />
                                    {touched.country && errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.gstin && errors.gstin)}>
                                    <TextField id="gstin" name="gstin" value={values.gstin} onBlur={handleBlur} onChange={handleChange} label="GSTIN" />
                                    {touched.gstin && errors.gstin && <FormHelperText error>{errors.gstin}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <LoadingButton loading={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Add Branch
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default AddBranch;
