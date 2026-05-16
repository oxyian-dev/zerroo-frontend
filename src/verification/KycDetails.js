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
                        <Paper sx={{
                            p: { md: 3, xs: 2 },
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                        }} elevation={2}>
                            <Typography textAlign="center" mb={2} variant="h2" sx={{ textTransform: 'uppercase' }}>Aadhaar Section</Typography>
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
                        <Paper sx={{
                            p: { md: 3, xs: 2 },
                            mt: 2,
                            background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                            border: '1px solid rgba(255,255,255,.08)',
                        }} elevation={2}>
                            <Typography textAlign="center" mb={2} variant="h2" sx={{ textTransform: 'uppercase' }}>PAN Section</Typography>
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
                            <Paper sx={{
                                p: { md: 3, xs: 2 },
                                mt: 2,
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                            }} elevation={2}>
                                <Typography textAlign="center" mb={2} variant="h2" sx={{ textTransform: 'uppercase' }}>Additional Reject reason</Typography>
                                <TextField
                                    fullWidth
                                    label="Reason"
                                    onChange={handleChange}
                                    name="custom_reason"
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
                                    }}
                                />
                            </Paper>
                        )}
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
                                            aria-label="Reject KYC verification"
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
                                            aria-label="Verify KYC"
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
export default KycDetails