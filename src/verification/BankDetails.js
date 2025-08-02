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
    Stack, TextField,
    Typography
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, constructFormData } from "../utils/util";

const BankDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    useEffect(() => {
        fetcher(`/api/verification/bank/${id}`)
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
                    return await fetcher(`/api/verification/bank/${id}`, {
                        method: 'PUT',
                        body: constructFormData(formValues)
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.status === 'success') {
                                enqueueSnackbar('Status changed', { variant: 'success' })
                                navigate('/admin/bank/pending')
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
                            <Grid container>
                                <Grid item xs={12} mb={2}>
                                    <Typography variant="h2" textAlign="center">Bank Verification</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <WorkDriveImage image={data.image} />
                                </Grid>
                                <Grid item xs={12} p={3} md={6}>
                                    <Stack spacing={3}>
                                        <Typography variant="h4">Name: {data.firstname} {data.lastname}</Typography>
                                        <Draggable>
                                            <Typography width="fit-content" variant="h3">
                                                IFSC: {data.ifsc}
                                            </Typography>
                                        </Draggable>
                                        <Draggable>
                                            <Typography width="fit-content" variant="h3">
                                                Account No.: {data.account_no}
                                            </Typography>
                                        </Draggable>
                                        <Typography variant="h4">Bank: {data.bank}</Typography>
                                        <Typography variant="h4">Branch: {data.branch}</Typography>
                                        {data.status === 1 && (
                                            <FormControl>
                                                <FormLabel>Validations</FormLabel>
                                                <FormGroup onChange={handleChange} onBlur={handleBlur}>
                                                    <FormControlLabel control={
                                                        <Checkbox name="reason" value="Wrong Image" />
                                                    } label="Wrong Image" />
                                                    <FormControlLabel control={
                                                        <Checkbox name="reason" value="Image not clear" />
                                                    } label="Image not clear" />
                                                    <FormControlLabel control={
                                                        <Checkbox name="reason" value="IFSC Mismatch" />
                                                    } label="IFSC Mismatch" />
                                                    <FormControlLabel control={
                                                        <Checkbox name="reason" value="Account Number Mismatch" />
                                                    } label="Account Number Mismatch" />
                                                    <FormControlLabel control={
                                                        <Checkbox name="reason" value="Name Mismatch" />
                                                    } label="Name Mismatch" />
                                                </FormGroup>
                                            </FormControl>
                                        )}
                                        {data.status === 1 && (
                                            <TextField
                                                fullWidth
                                                label="Additional Reject reason"
                                                onChange={handleChange}
                                                name="custom_reason"
                                                helperText="Enter any other reason to reject here"
                                            />
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                        {data.status === 1 && (
                            <Box sx={{ mt: 2 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6}>
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
                                    <Grid item xs={12} md={6}>
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
export default BankDetails;