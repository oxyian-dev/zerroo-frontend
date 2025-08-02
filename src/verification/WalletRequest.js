import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import fetcher from "../utils/fetcher";
import { WorkDriveImage, constructFormData, toDate, toDateTime } from "../utils/util";

export default function WalletRequest() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    useEffect(() => {
        fetcher(`/api/verification/wallet/${id}`)
            .then(r => r.json())
            .then(res => {
                setData(res)
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
                    return await fetcher(`/api/verification/wallet/${id}`, {
                        method: 'PUT',
                        body: constructFormData(formValues)
                    })
                        .then(res => res.json())
                        .then(({ status, message = 'Exception occurred' }) => {
                            if (status === 'success') {
                                enqueueSnackbar('Status changed', { variant: 'success' })
                                navigate('/admin/wallet-requests/pending')
                            } else {
                                enqueueSnackbar(message, { variant: 'error' })
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
                        <Stack spacing={2}>
                            <Card elevation={2}>
                                <CardContent>
                                    <Typography textAlign="center" variant="h2">Wallet Request</Typography>
                                </CardContent>
                            </Card>

                            <Card elevation={2}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <Typography mb={2} variant="h4" textAlign="center">Proof Image</Typography>
                                            <WorkDriveImage image={data.proof} />
                                        </Grid>
                                        <Grid item md={6} xs={12} textAlign="center" alignSelf="center">
                                            <Stack spacing={2}>
                                                <Draggable>
                                                    <Typography variant="h1">{data.transaction_id}</Typography>
                                                </Draggable>
                                                <Typography variant="h3">Amount: {data.amount}</Typography>
                                                <Typography variant="h3">Date: {toDate(data.date)}</Typography>
                                                <Typography variant="h3">Bank: {data.bank}</Typography>
                                                <Typography variant="h3">Method: {data.method}</Typography>
                                                <Typography variant="h3">Depositor: {data.depositor}</Typography>
                                                <Typography variant="h3">ID: {data.username}</Typography>
                                                <Chip label={data.status} />
                                                <Typography variant="h3">{data.remark}</Typography>
                                                <Typography variant="h3">Request Time: {toDateTime(data.time)}</Typography>
                                            </Stack>
                                            {data.status === 'Pending' && (
                                                <FormControl sx={{ mt: 4 }}>
                                                    <FormLabel>Wallet Request Validations</FormLabel>
                                                    <FormGroup onChange={handleChange} onBlur={handleBlur}>
                                                        <FormControlLabel
                                                            control={<Checkbox name="reason" value="Bank details Mismatch" />}
                                                            label="Bank details Mismatch" />
                                                        <FormControlLabel
                                                            control={<Checkbox name="reason" value="Amount Mismatch" />}
                                                            label="Amount Mismatch" />
                                                        <FormControlLabel
                                                            control={<Checkbox name="reason" value="Image Not clear" />}
                                                            label="Image Not clear" />
                                                        <FormControlLabel
                                                            control={<Checkbox name="reason" value="Proof Mismatch" />}
                                                            label="Proof Mismatch" />
                                                        <FormControlLabel
                                                            control={<Checkbox name="reason" value="Enter UTR Number for PhonePe Transactions" />}
                                                            label="Enter UTR Number for PhonePe Transactions" />
                                                    </FormGroup>
                                                </FormControl>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            {data.status === 'Pending' && (
                                <Card elevation={2}>
                                    <CardContent>
                                        <Typography textAlign="center" mb={2} variant="h2">Additional Reject reason</Typography>
                                        <TextField fullWidth label="Reason" onChange={handleChange} name="custom_reason" />
                                    </CardContent>
                                </Card>
                            )}
                            {data.status === 'Pending' && (
                                <Box>
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
                        </Stack>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
