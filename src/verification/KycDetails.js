import { LoadingButton } from "@mui/lab";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Draggable from 'react-draggable';
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, constructFormData } from "../utils/util";

const KycDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    useEffect(() => {
        fetcher(`/api/verification/kyc/${id}`)
            .then(r => r.json())
            .then(setData)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Box>
            <Formik
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    const formValues = { ...values }
                    if (formValues.custom_reason) {
                        formValues.reason = formValues.reason ? [...formValues.reason, formValues.custom_reason] : formValues.custom_reason
                    }
                    delete formValues.custom_reason
                    return await fetcher(`/api/verification/kyc/${id}`, {
                        method: 'PUT',
                        body: constructFormData(formValues)
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 'success') {
                                enqueueSnackbar('Status changed', { variant: 'success' })
                                navigate('/admin/kyc/pending')
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
                    reason: '',
                    custom_reason: '',
                    status: ''
                }}>
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Paper sx={{ p: 2 }} elevation={2}>
                            <Typography textAlign="center" mb={2} variant="h2">Aadhaar Section</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">Aadhaar Front</Typography>
                                    <WorkDriveImage image={data.aadhaar_front_image} />
                                    <Typography variant="h3">
                                        Firstname: {data.firstname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">Aadhaar Back</Typography>
                                    <WorkDriveImage image={data.aadhaar_back_image} />
                                    <Typography variant="h3">
                                        Lastname: {data.lastname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} textAlign="center" alignSelf="center">
                                    <Draggable>
                                        <Typography variant="h1">
                                            {data.aadhaar}
                                        </Typography>
                                    </Draggable>
                                </Grid>

                                <Grid item xs={6} textAlign="center" alignSelf="center">
                                    {data.status === 1 && (
                                        <FormControl>
                                            <FormLabel>Aadhaar Validations</FormLabel>
                                            <FormGroup onChange={handleChange} onBlur={handleBlur}>
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="Wrong Aadhaar Front Image" />
                                                } label="Wrong Front Image" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason"
                                                        value="Aadhaar Front Image not clear" />
                                                } label="Front Image not clear" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="Wrong Aadhaar Back Image" />
                                                } label="Wrong Back Image" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason"
                                                        value="Aadhaar Back Image not clear" />
                                                } label="Back Image not clear" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="Aadhaar Number Mismatch" />
                                                } label="Number Mismatch" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="Aadhaar Name Mismatch" />
                                                } label="Name Mismatch" />
                                            </FormGroup>
                                        </FormControl>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper sx={{ p: 2, mt: 2 }} elevation={2}>
                            <Typography textAlign="center" mb={2} variant="h2">PAN Section</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">PAN Image</Typography>
                                    <WorkDriveImage image={data.pan_image} />
                                </Grid>
                                <Grid item xs={6} textAlign="center" alignSelf="center">
                                    <Draggable>
                                        <Typography variant="h1">
                                            {data.pan}
                                        </Typography>
                                    </Draggable>
                                    <Draggable>
                                        <div>
                                            <Typography variant="h3">
                                                {data.pan_firstname}
                                            </Typography>
                                            <Typography variant="h3">
                                                {data.pan_lastname}
                                            </Typography>
                                        </div>
                                    </Draggable>
                                    {data.status === 1 && (
                                        <FormControl>
                                            <FormLabel>PAN Validations</FormLabel>
                                            <FormGroup onChange={handleChange} onBlur={handleBlur}>
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="Wrong PAN Image" />
                                                } label="Wrong Image" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="PAN Image not clear" />
                                                } label="Image not clear" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="PAN Number Mismatch" />
                                                } label="PAN Number Mismatch" />
                                                <FormControlLabel control={
                                                    <Checkbox name="reason" value="Minor PAN Card" />
                                                } label="Minor PAN Card" />
                                            </FormGroup>
                                        </FormControl>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                        {data.status === 1 && (
                            <Paper sx={{ p: 2, mt: 2 }} elevation={2}>
                                <Typography textAlign="center" mb={2} variant="h2">Additional Reject reason</Typography>
                                <TextField fullWidth label="Reason" onChange={handleChange} name="custom_reason" />
                            </Paper>
                        )}
                        {data.status === 1 && (
                            <Box sx={{ mt: 2 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <LoadingButton
                                            onClick={handleChange}
                                            name="status"
                                            value="false"
                                            loading={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="error"
                                        >
                                            Reject
                                        </LoadingButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LoadingButton
                                            onClick={handleChange}
                                            name="status"
                                            value="true"
                                            loading={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                        >
                                            Verify
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </form>
                )}
            </Formik>
        </Box>
    )
}
export default KycDetails