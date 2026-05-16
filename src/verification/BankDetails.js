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
                        <Paper sx={{
                            p: { md: 3, xs: 2 },
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                        }} elevation={2}>
                            <Grid container>
                                <Grid item xs={12} mb={2}>
                                    <Typography variant="h2" textAlign="center" sx={{ textTransform: 'uppercase' }}>Bank Verification</Typography>
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
                                                inputProps={{
                                                    'aria-label': 'Additional rejection reason',
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        backgroundColor: 'rgba(255,255,255,.02)',
                                                        transition: 'all 0.3s ease',
                                                        '& fieldset': {
                                                            borderColor: 'rgba(255,255,255,0.1)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'rgba(239,203,119,0.5)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#efcb77',
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: '#fff !important',
                                                        WebkitTextFillColor: '#fff !important',
                                                        '&:-webkit-autofill': {
                                                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                                                            WebkitTextFillColor: '#fff !important',
                                                            transition: 'background-color 5000s ease-in-out 0s',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'rgba(255,255,255,0.7)',
                                                        '&.Mui-focused': {
                                                            color: '#efcb77',
                                                        },
                                                    },
                                                    '& .MuiFormHelperText-root': {
                                                        color: 'rgba(255,255,255,0.6)',
                                                    },
                                                }}
                                            />
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                        {data.status === 1 && (
                            <Box sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
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
                                            aria-label="Reject bank verification"
                                            sx={{
                                                background: '#ff6b6b',
                                                color: '#fff',
                                                padding: { md: '18px 42px', xs: '16px 36px' },
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.22em',
                                                fontSize: { md: '0.78rem', xs: '0.72rem' },
                                                fontWeight: 700,
                                                boxShadow: '0 15px 35px rgba(255,107,107,.15)',
                                                transition: 'all 0.4s ease',
                                                borderRadius: 0,
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 20px 50px rgba(255,107,107,.22)',
                                                    background: '#ff5252',
                                                },
                                                '&.Mui-disabled': {
                                                    background: 'rgba(255,255,255,.1)',
                                                    color: 'rgba(255,255,255,.4)',
                                                },
                                            }}
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
                                            aria-label="Verify bank details"
                                            sx={{
                                                background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                color: '#000',
                                                padding: { md: '18px 42px', xs: '16px 36px' },
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.22em',
                                                fontSize: { md: '0.78rem', xs: '0.72rem' },
                                                fontWeight: 700,
                                                boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                                                transition: 'all 0.4s ease',
                                                borderRadius: 0,
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                                                },
                                                '&.Mui-disabled': {
                                                    background: 'rgba(255,255,255,.1)',
                                                    color: 'rgba(255,255,255,.4)',
                                                },
                                            }}
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