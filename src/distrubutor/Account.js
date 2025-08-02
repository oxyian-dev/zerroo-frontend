import { LoadingButton } from "@mui/lab";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { isDistributor } from "../auth/AuthProvider";
import AadhaarField from "../components/AadhaarField";
import ClientAutocomplete from "../components/ClientAutocomplete";
import CropAvatar from "../components/CropAvatar";
import HionImageUpload from "../components/HionImageUpload";
import PanField from "../components/PanField";
import PasswordField from "../components/PasswordField";
import Gender from "../data/Gender";
import fetcher from "../utils/fetcher";
import REGEX from "../utils/regex";
import { constructFormData, toImage } from "../utils/util";
import States from "../data/States";
import NomineeRelation from "../data/NomineeRelation";

const Account = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [tab, setTab] = useState(0)
    const [profileLoading, setProfileLoading] = useState(true)
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        dob: '2000-01-01',
        phone: '',
        email: '',
        address_1: '',
        address_2: '',
        landmark: '',
        postcode: '',
        city: '',
        state: '',
        nominee_name: '',
        nominee_relation: ''
    })

    useEffect(() => {
        fetcher('/api/users/profile')
            .then(r => r.json())
            .then(profile => {
                setProfile({
                    ...profile,
                    lastname: profile.lastname || '',
                    dob: profile.dob || '2000-01-01',
                    gender: profile.gender || '',
                    phone: profile.phone || '',
                    email: profile.email || '',
                    address_1: profile.address_1 || '',
                    address_2: profile.address_2 || '',
                    landmark: profile.landmark || '',
                    postcode: profile.postcode || '',
                    city: profile.city || '',
                    state: profile.state || '',
                    nominee_name: profile.nominee_name || '',
                    nominee_relation: profile.nominee_relation || ''
                })
                setSet(profile.firstname && profile.lastname && profile.email)
                setPhoneVerified(profile.phone_verified)
                setEmailVerified(profile.email_verified)
            })
            .finally(() => {
                setProfileLoading(false)
            })
    }, [])

    const distributor = isDistributor()
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [phoneVerificationRequested, setPhoneVerificationRequested] = useState(false)
    const [phoneOtp, setPhoneOtp] = useState('')
    const [phoneVerificationId, setPhoneVerificationId] = useState(null)


    const [emailVerified, setEmailVerified] = useState(false)
    const [emailVerificationRequested, setEmailVerificationRequested] = useState(false)
    const [emailOtp, setEmailOtp] = useState('')
    const [emailVerificationId, setEmailVerificationId] = useState(null)
    const [verifyPhoneLoading, setVerifyPhoneLoading] = useState(false);
    const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);

    const [set, setSet] = useState(false)

    const [avatar, setAvatar] = useState(null)
    const avatarRef = useRef(null)
    const imageRef = useRef(null)
    const handleUploadImage = ({ current } = avatarRef) => {
        if (current.files && current.files[0]) {
            let reader = new FileReader();
            reader.onload = ({ target }) => {
                setAvatar(target.result)
            }
            reader.readAsDataURL(current.files[0]);
        }
    }

    const verifyPhone = () => {
        setVerifyPhoneLoading(true)
        if (phoneOtp) {
            const formData = new FormData()
            formData.set('code', phoneOtp)
            fetcher(`/api/verification/phone/${phoneVerificationId}`, { method: 'POST', body: formData })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        setPhoneVerified(true)
                        enqueueSnackbar('Phone Verified', { variant: 'success' })
                    } else {
                        enqueueSnackbar(res.message, { variant: 'error' })
                    }
                    setVerifyPhoneLoading(false)
                })
        } else {
            fetcher('/api/verification/phone', { method: 'POST' })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        setPhoneVerificationRequested(true)
                        setPhoneVerificationId(res.id)
                    } else {
                        enqueueSnackbar(res.message, { variant: 'error' })
                    }
                    setVerifyPhoneLoading(false)
                })
        }
    }

    const verifyEmail = () => {
        setVerifyEmailLoading(true)
        if (emailOtp) {
            const formData = new FormData()
            formData.set('code', emailOtp)
            fetcher(`/api/verification/email/${emailVerificationId}`, { method: 'POST', body: formData })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        setEmailVerified(true)
                        enqueueSnackbar('Email Verified', { variant: 'success' })
                    } else {
                        enqueueSnackbar(res.message, { variant: 'error' })
                    }
                    setVerifyEmailLoading(true)
                })
        } else {
            fetcher('/api/verification/email', { method: 'POST' })
                .then(r => r.json())
                .then(res => {
                    if (res.status === 'success') {
                        setEmailVerificationRequested(true)
                        setEmailVerificationId(res.id)
                    } else {
                        enqueueSnackbar(res.message, { variant: 'error' })
                    }
                    setVerifyEmailLoading(true)
                })
        }
    }

    const updateIfsc = (values, setValues) => {
        const { ifsc } = values
        if (REGEX.IFSC.test(ifsc)) {
            fetcher(`/api/ifsc/${ifsc}`)
                .then(r => r.json())
                .then(({ BANK, BRANCH }) => {
                    const tempValue = { ...values }
                    tempValue.bank = BANK
                    tempValue.branch = BRANCH
                    setValues(tempValue)
                })
        } else {
            const tempValue = { ...values }
            tempValue.bank = ''
            tempValue.branch = ''
            setValues(tempValue)
        }
    }

    return (
        <Box>
            <Card variant="elevation" elevation={1}>
                <CardContent>
                    <Typography variant="h2" textAlign="center">Account</Typography>
                </CardContent>
            </Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, mt: 1 }}>
                <Tabs value={tab}
                    onChange={(_, v) => {
                        setTab(v)
                    }}>
                    <Tab label="Profile" id="profile" value={0} />
                    <Tab label="Password" id="password" value={1} />
                    {distributor && (
                        <Tab label="KYC" id="kyc" value={2} />
                    )}
                    {distributor && (
                        <Tab label="Bank" id="bank" value={3} />
                    )}
                </Tabs>
            </Box>
            <Box>
                {tab === 0 && (
                    <div role="tabpanel" aria-labelledby="profile">
                        {!profileLoading && (
                            <Formik
                                validationSchema={Yup.object().shape({
                                    firstname: Yup.string().max(100).required('Firstname is required'),
                                    lastname: Yup.string().min(1).max(100).required('Lastname is required'),
                                    phone: Yup.number().nullable(true).min(6000000000, "Invalid Number")
                                        .max(9999999999, "Invalid Number").required('Phone Number is required'),
                                    gender: Yup.string().nullable(true).required('Select your gender'),
                                    email: Yup.string().email("Invalid Email").required('Email Required'),
                                    address_1: Yup.string().max(150).required('Enter Address Line 1'),
                                    address_2: Yup.string().max(150).required('Enter Address Line 2'),
                                    landmark: Yup.string().max(100),
                                    postcode: Yup.number().nullable(true).min(100000, "Invalid Pin Code")
                                        .max(999999, "Invalid Pin Code").required('Pin Code is required'),
                                    city: Yup.string().max(150).required('Enter City / District'),
                                    state: Yup.string().max(150).required('Enter State'),
                                    nominee_name: Yup.string().min(1).max(100).required('Nominee name is required'),
                                    nominee_relation: Yup.string().nullable(true).required('Nominee relationship is required'),

                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true)
                                    const formData = constructFormData(values)
                                    return await fetcher(`/api/users/profile`, {
                                        method: 'PUT',
                                        body: formData
                                    })
                                        .then(res => res.json())
                                        .then(({ status, message = "Exception occurred" }) => {
                                            if (status === 'success') {
                                                enqueueSnackbar('Account Edited Successfully', { variant: 'success' })
                                                setProfile({ ...profile, ...values })
                                                setSet(true)
                                            } else {
                                                enqueueSnackbar(message, { variant: 'warning' })
                                                setSubmitting(false)
                                            }
                                        })
                                        .catch(() => {
                                            enqueueSnackbar('Error occurred', { variant: 'error' })
                                            setSubmitting(false)
                                        })
                                }}
                                initialValues={profile}>
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
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h3" textAlign="center">Profile</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                    <Grid item xs={12} display="flex" justifyContent="center">
                                                        {avatar ? (
                                                            <CropAvatar
                                                                src={avatar}
                                                                handleClose={() => {
                                                                    setAvatar(null)
                                                                }}
                                                                handleSet={blob => {
                                                                    const avatar = new File([blob], 'avatar', { type: blob.type });
                                                                    const body = new FormData()
                                                                    body.set('avatar', avatar)
                                                                    fetcher('/api/users/avatar', { method: 'POST', body })
                                                                        .then(r => r.json())
                                                                        .then(({ status, message, avatar }) => {
                                                                            if (status === 'success') {
                                                                                enqueueSnackbar('Avatar Updated', { variant: 'success' })
                                                                                setAvatar(null)
                                                                                localStorage.setItem('avatar', avatar)
                                                                                window.location.reload();
                                                                            } else {
                                                                                enqueueSnackbar(message, { variant: 'error' })
                                                                            }
                                                                        })
                                                                        .catch(() => {
                                                                            enqueueSnackbar("Try again", { variant: 'error' })
                                                                        })
                                                                }}
                                                            />
                                                        ) : (
                                                            <ButtonBase
                                                                sx={{
                                                                    width: {
                                                                        xs: 100,
                                                                        md: 150
                                                                    },
                                                                    borderRadius: '50%',
                                                                }}
                                                                component="label"
                                                            >
                                                                <input
                                                                    ref={avatarRef}
                                                                    hidden
                                                                    type="file"
                                                                    accept="image/jpg,image/jpeg,image/png"
                                                                    onChange={() => {
                                                                        handleUploadImage()
                                                                    }}
                                                                />
                                                                {profile.avatar ? (
                                                                    <img
                                                                        ref={imageRef}
                                                                        src={toImage(profile.avatar)}
                                                                        alt=""
                                                                        style={{
                                                                            width: '100%',
                                                                            height: 'auto',
                                                                            borderRadius: '50%'
                                                                        }} />
                                                                ) : (
                                                                    <Avatar sx={{
                                                                        height: { xs: 100, md: 150 },
                                                                        width: { xs: 100, md: 150 },
                                                                        bgcolor: 'primary.main',
                                                                        color: 'primary.light',
                                                                    }} />
                                                                )}
                                                            </ButtonBase>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)}>
                                                            <TextField
                                                                fullWidth={true}
                                                                required
                                                                id="firstname"
                                                                type="text"
                                                                value={values.firstname}
                                                                name="firstname"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Firstname"
                                                                InputProps={{ readOnly: distributor && Boolean(values.firstname && values.lastname) }}
                                                                helperText={distributor && values.firstname && values.lastname ? "Once set, Name cannot be changed" : ""}
                                                            />
                                                            {touched.firstname && errors.firstname && (
                                                                <FormHelperText error id="error-firstname">
                                                                    {errors.firstname}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.lastname && errors.lastname)}>
                                                            <TextField
                                                                required
                                                                id="lastname"
                                                                type="text"
                                                                value={values.lastname}
                                                                name="lastname"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Lastname"
                                                                InputProps={{ readOnly: distributor && Boolean(values.firstname && values.lastname) }}
                                                                helperText={distributor && values.firstname && values.lastname ? "Once set, Name cannot be changed" : ""}
                                                            />
                                                            {touched.lastname && errors.lastname && (
                                                                <FormHelperText error id="error-lastname">
                                                                    {errors.lastname}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.dob && errors.dob)}>
                                                            <TextField
                                                                required
                                                                id="dob"
                                                                type="date"
                                                                value={values.dob}
                                                                name="dob"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Date of Birth"
                                                            />
                                                            {touched.dob && errors.dob && (
                                                                <FormHelperText error id="error-dob">
                                                                    {errors.dob}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.gender && errors.gender)}>
                                                            <ClientAutocomplete
                                                                required
                                                                options={Gender}
                                                                name="gender"
                                                                value={values.gender}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                id="gender"
                                                                label="Gender"
                                                            />
                                                            {touched.gender && errors.gender && (
                                                                <FormHelperText error id="error-gender">
                                                                    {errors.gender}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.phone && errors.phone)}>
                                                            <TextField
                                                                required
                                                                id="phone"
                                                                type="number"
                                                                value={values.phone}
                                                                name="phone"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Phone"
                                                                InputProps={{ readOnly: true }}
                                                                helperText={distributor ? "Once set, Phone number cannot be changed" : ""}
                                                            />
                                                            {touched.phone && errors.phone && (
                                                                <FormHelperText error id="error-phone">
                                                                    {errors.phone}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                        {false && distributor && values.phone && !phoneVerified && !phoneVerificationRequested && (
                                                            <Alert sx={{ my: 2 }} severity="error" action={
                                                                <Button
                                                                    variant="outlined"
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        verifyPhone()
                                                                    }}>
                                                                    Verify now
                                                                </Button>
                                                            }>
                                                                Phone Number not verified
                                                            </Alert>
                                                        )}
                                                        {set && phoneVerificationRequested && !phoneVerified && (
                                                            <Box mt={2}>
                                                                <TextField fullWidth label="Enter OTP"
                                                                    helperText="Enter the OTP sent to your Phone Number"
                                                                    value={phoneOtp}
                                                                    onChange={({ target }) => {
                                                                        setPhoneOtp(target.value)
                                                                    }}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <LoadingButton
                                                                                loading={verifyPhoneLoading}
                                                                                onClick={() => {
                                                                                    verifyPhone()
                                                                                }}>Verify</LoadingButton>
                                                                        )
                                                                    }}
                                                                />
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.email && errors.email)}>
                                                            <TextField
                                                                required
                                                                id="email"
                                                                type="email"
                                                                value={values.email}
                                                                name="email"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Email"
                                                                InputProps={{ readOnly: Boolean(!distributor || (distributor && set)) }}
                                                                helperText={distributor ? "Once set, Email cannot be changed" : ""}
                                                            />
                                                            {touched.email && errors.email && (
                                                                <FormHelperText error id="error-email">
                                                                    {errors.email}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                        {false && distributor && set && values.email && !emailVerified && !emailVerificationRequested && (
                                                            <Alert sx={{ my: 2 }} severity="error" action={
                                                                <LoadingButton
                                                                    variant="outlined"
                                                                    loading={verifyEmailLoading}
                                                                    color="inherit"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        verifyEmail()
                                                                    }}>
                                                                    Verify now
                                                                </LoadingButton>
                                                            }>
                                                                Email not verified
                                                            </Alert>
                                                        )}
                                                        {emailVerificationRequested && !emailVerified && (
                                                            <Box mt={2}>
                                                                <TextField fullWidth label="Enter OTP"
                                                                    helperText="Enter the OTP sent to your Email"
                                                                    value={emailOtp}
                                                                    onChange={({ target }) => {
                                                                        setEmailOtp(target.value)
                                                                    }}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <LoadingButton onClick={() => {
                                                                                verifyEmail()
                                                                            }}>Verify</LoadingButton>
                                                                        )
                                                                    }}
                                                                />
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.address_1 && errors.address_1)}>
                                                            <TextField
                                                                required
                                                                id="address_1"
                                                                type="text"
                                                                value={values.address_1}
                                                                name="address_1"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Flat, House no., Building, Company, Apartment"


                                                            />
                                                            {touched.address_1 && errors.address_1 && (
                                                                <FormHelperText error id="error-address_1">
                                                                    {errors.address_1}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.address_2 && errors.address_2)}>
                                                            <TextField
                                                                required
                                                                id="address_2"
                                                                type="text"
                                                                value={values.address_2}
                                                                name="address_2"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Street Name, Area"
                                                            />
                                                            {touched.address_2 && errors.address_2 && (
                                                                <FormHelperText error id="error-address_2">
                                                                    {errors.address_2}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth error={Boolean(touched.landmark && errors.landmark)}>
                                                            <TextField
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
                                                    <Grid item xs={12} md={6}>
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
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth error={Boolean(touched.city && errors.city)}>
                                                            <TextField
                                                                required
                                                                id="city"
                                                                type="text"
                                                                value={values.city}
                                                                name="city"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="City / District"
                                                            />
                                                            {touched.city && errors.city && (
                                                                <FormHelperText error id="error-city">
                                                                    {errors.city}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
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
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth error={Boolean(touched.nominee_name && errors.nominee_name)}>
                                                            <TextField
                                                                required
                                                                id="nominee_name"
                                                                type="text"
                                                                value={values.nominee_name}
                                                                name="nominee_name"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Nominee Name"

                                                            />
                                                            {touched.nominee_name && errors.nominee_name && (
                                                                <FormHelperText error id="error-nominee_name">
                                                                    {errors.nominee_name}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth error={Boolean(touched.nominee_relation && errors.nominee_relation)}>
                                                            <ClientAutocomplete
                                                                required
                                                                options={NomineeRelation}
                                                                name="nominee_relation"
                                                                value={values.nominee_relation}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                id="nominee_relation"
                                                                label="Nominee Relationship"
                                                            />
                                                            {touched.nominee_relation && errors.nominee_relation && (
                                                                <FormHelperText error id="error-nominee_relation">
                                                                    {errors.nominee_relation}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>


                                                    <Grid item xs={12}>
                                                        <LoadingButton
                                                            loading={isSubmitting}
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                        >
                                                            Edit
                                                        </LoadingButton>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </form>
                                )}
                            </Formik>
                        )}
                    </div>
                )}
                {tab === 1 && (
                    <div role="tabpanel" aria-labelledby="password">
                        <Formik
                            validationSchema={Yup.object().shape({
                                old: Yup.string().nullable().max(100).required('Enter your Current Password'),
                                password: Yup.string().nullable().min(6, 'Password should be minimum 6 characters').notOneOf([Yup.ref('old')], 'Password cannot be the same')
                                    .max(100).required('Enter New Password'),
                                retype: Yup.string().nullable().oneOf([Yup.ref('password')], 'Password must match')
                                    .max(100).required('Retype Password')
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                return await fetcher('/api/users/password',
                                    { method: 'PUT', body: constructFormData(values) })
                                    .then(r => r.json())
                                    .then(res => {
                                        if (res.status === 'success') {
                                            enqueueSnackbar('Password Update Successfully', { variant: 'success' })
                                        } else {
                                            enqueueSnackbar(res.message || 'Exception occurred', { variant: 'error' })
                                            setSubmitting(false)
                                        }
                                    })
                                    .catch(() => {
                                        enqueueSnackbar('Error occurred', { variant: 'error' })
                                        setSubmitting(false)
                                    })
                            }}
                            initialValues={{
                                old: '',
                                password: '',
                                retype: '',
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
                                    <Card elevation={2}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h3" textAlign="center">Change Password</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth error={Boolean(touched.old && errors.old)}>
                                                        <PasswordField
                                                            required
                                                            id="old-password"
                                                            value={values.old}
                                                            name="old"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Old Password"
                                                        />
                                                        {touched.old && errors.old && (
                                                            <FormHelperText error id="error-old">
                                                                {errors.old}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                                                        <PasswordField
                                                            required
                                                            id="new-password"
                                                            value={values.password}
                                                            name="password"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="New Password"
                                                        />
                                                        {touched.password && errors.password && (
                                                            <FormHelperText error id="error-password">
                                                                {errors.password}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth error={Boolean(touched.retype && errors.retype)}>
                                                        <PasswordField
                                                            required
                                                            id="retype-password"
                                                            value={values.retype}
                                                            name="retype"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            label="Retype Password"
                                                        />
                                                        {touched.retype && errors.retype && (
                                                            <FormHelperText error id="error-retype">
                                                                {errors.retype}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LoadingButton
                                                        loading={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        Update Password
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </form>
                            )}
                        </Formik>
                    </div>
                )}
                {tab === 2 && (
                    <div role="tabpanel" aria-labelledby="kyc">
                        {profile.kyc_status === 'Rejected' && (
                            <Alert severity="error">
                                <AlertTitle>KYC Verification Failed</AlertTitle>
                                Reason: <strong>{profile.kyc_rejection_reason}</strong>
                            </Alert>
                        )}
                        {(profile.kyc_status === null || profile.kyc_status === 'Rejected') && (
                            <Formik
                                validationSchema={Yup.object().shape({
                                    aadhaar: Yup.string().matches(REGEX.AADHAAR, 'Invalid Aadhaar')
                                        .required('Enter your Aadhaar'),
                                    aadhaar_front: Yup.mixed().required('Upload Aadhaar Front Image'),
                                    aadhaar_back: Yup.mixed().required('Upload Aadhaar Back Image'),
                                    pan: Yup.string().matches(REGEX.PAN, 'Invalid PAN').required('PAN required'),
                                    pan_image: Yup.mixed().required('Upload PAN Card Image'),
                                    pan_firstname: Yup.string().max(100).required('Enter Firstname as per PAN'),
                                    pan_lastname: Yup.string().min(1).max(100).required('Enter Lastname as per PAN')
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true)
                                    const formData = constructFormData(values)
                                    formData.set('aadhaar', values.aadhaar.split(' ').join(''))
                                    return await fetcher('/api/verification/kyc',
                                        { method: 'POST', body: formData })
                                        .then(r => r.json())
                                        .then(({ status, message = 'Exception occurred' }) => {
                                            if (status === 'success') {
                                                enqueueSnackbar('KYC Requested Successfully', { variant: 'success' })
                                                setProfile({
                                                    ...profile,
                                                    kyc_status: 'Pending'
                                                })
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
                                    aadhaar: '',
                                    aadhaar_front: '',
                                    aadhaar_back: '',
                                    pan: '',
                                    pan_firstname: '',
                                    pan_lastname: '',
                                    pan_image: '',
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
                                        <Stack spacing={2}>
                                            <Card elevation={2}>
                                                <CardContent>
                                                    <Box
                                                        sx={{
                                                            height: '40vh',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Card sx={{ maxWidth: 400, width: '100%' }}>

                                                            <CardMedia
                                                                component="img"
                                                                height="220"
                                                                image="/img/Kyc_verification.jpeg"
                                                                alt="KYC updation Screen Shot"
                                                                
                                                            />


                                                            <CardActions sx={{ justifyContent: 'center' }}>
                                                                <Button size="small" component="a" href="/pdf/ZERROO KYC VERIFICATION PROCESS.pdf" target="_blank" rel="noopener noreferrer">View More</Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Box>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} textAlign="center">
                                                            <Typography variant="h3">Aadhaar Section</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth
                                                                error={Boolean(touched.aadhaar && errors.aadhaar)}>
                                                                <AadhaarField
                                                                    required
                                                                    type="text"
                                                                    id="aadhaar"
                                                                    value={values.aadhaar}
                                                                    name="aadhaar"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Aadhaar Number"
                                                                />
                                                                {touched.aadhaar && errors.aadhaar && (
                                                                    <FormHelperText error id="error-aadhaar">
                                                                        {errors.aadhaar}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth
                                                                error={Boolean(touched.aadhaar_front && errors.aadhaar_front)}
                                                                sx={{
                                                                    borderRight: {
                                                                        md: "1px solid grey",
                                                                        xs: 0
                                                                    }
                                                                }}
                                                            >
                                                                <HionImageUpload
                                                                    paperElevation={0}
                                                                    buttonText="Upload Aadhaar Front"
                                                                    name="aadhaar_front"
                                                                    handleChange={handleChange}
                                                                />
                                                                {touched.aadhaar_front && errors.aadhaar_front && (
                                                                    <FormHelperText error id="error-aadhaar_front">
                                                                        {errors.aadhaar_front}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth
                                                                error={Boolean(touched.aadhaar_back && errors.aadhaar_back)}>
                                                                <HionImageUpload
                                                                    paperElevation={0}
                                                                    buttonText="Upload Aadhaar Back"
                                                                    name="aadhaar_back"
                                                                    handleChange={handleChange}
                                                                    maxFileSize={5242880}
                                                                />
                                                                {touched.aadhaar_back && errors.aadhaar_back && (
                                                                    <FormHelperText error id="error-aadhaar_back">
                                                                        {errors.aadhaar_back}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <Card elevation={2}>
                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} textAlign="center">
                                                            <Typography variant="h3">PAN Section</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth error={Boolean(touched.pan && errors.pan)}>
                                                                <PanField
                                                                    required
                                                                    type="text"
                                                                    id="pan"
                                                                    value={values.pan}
                                                                    name="pan"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="PAN"
                                                                />
                                                                {touched.pan && errors.pan && (
                                                                    <FormHelperText error id="error-pan">
                                                                        {errors.pan}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl
                                                                fullWidth
                                                                error={Boolean(touched.pan_firstname && errors.pan_firstname)}>
                                                                <TextField
                                                                    fullWidth={true}
                                                                    required
                                                                    id="pan_firstname"
                                                                    type="text"
                                                                    value={values.pan_firstname}
                                                                    name="pan_firstname"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Firstname as per PAN"
                                                                />
                                                                {touched.pan_firstname && errors.pan_firstname && (
                                                                    <FormHelperText error id="error-pan_firstname">
                                                                        {errors.pan_firstname}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth
                                                                error={Boolean(touched.pan_lastname && errors.pan_lastname)}>
                                                                <TextField
                                                                    required
                                                                    id="pan_lastname"
                                                                    type="text"
                                                                    value={values.pan_lastname}
                                                                    name="pan_lastname"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    label="Lastname as per PAN"
                                                                />
                                                                {touched.pan_lastname && errors.pan_lastname && (
                                                                    <FormHelperText error id="error-pan_lastname">
                                                                        {errors.pan_lastname}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth
                                                                error={Boolean(touched.pan_image && errors.pan_image)}>
                                                                <HionImageUpload
                                                                    paperElevation={0}
                                                                    buttonText="Upload PAN Image"
                                                                    name="pan_image"
                                                                    handleChange={handleChange}
                                                                />
                                                                {touched.pan_image && errors.pan_image && (
                                                                    <FormHelperText error id="error-pan_image">
                                                                        {errors.pan_image}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <LoadingButton
                                                loading={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Update KYC
                                            </LoadingButton>
                                        </Stack>
                                    </form>
                                )}
                            </Formik>
                        )}
                        {profile.kyc_status === 'Verified' && (
                            <Alert severity="success">
                                <AlertTitle>KYC Verified</AlertTitle>
                            </Alert>
                        )}
                        {profile.kyc_status === 'Pending' && (
                            <Alert severity="info">
                                <AlertTitle>KYC Verification requested</AlertTitle>
                                It'll take some time to verify your KYC details. Check again later
                            </Alert>
                        )}
                    </div>
                )}
                {tab === 3 && (
                    <div role="tabpanel" aria-labelledby="bank">
                        {profile.bank_status === 'Rejected' && (
                            <Alert severity="error">
                                <AlertTitle>Bank Verification Failed</AlertTitle>
                                Reason: <strong>{profile.bank_rejection_reason}</strong>
                            </Alert>
                        )}
                        {(profile.bank_status === null || profile.bank_status === 'Rejected') && (
                            <Formik
                                validationSchema={Yup.object().shape({
                                    ifsc: Yup.string().required('IFSC Code Required').matches(REGEX.IFSC, 'Invalid Ifsc'),
                                    bank: Yup.string().required('Bank required'),
                                    branch: Yup.string().required('Branch required'),
                                    acc: Yup.number().nullable(true).required('Account Number required'),
                                    image: Yup.mixed().required('Upload Bank PassBook or Cancelled Cheque Leaf Image')
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true)
                                    return await fetcher(`/api/verification/bank`, {
                                        method: 'post',
                                        body: constructFormData(values)
                                    })
                                        .then(res => res.json())
                                        .then(res => {
                                            if (res.status === 'success') {
                                                enqueueSnackbar('Bank Details uploaded Successfully', { variant: 'success' })
                                                setProfile({
                                                    ...profile,
                                                    bank_status: 'Pending'
                                                })
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
                                    ifsc: '',
                                    bank: '',
                                    branch: '',
                                    acc: '',
                                    image: ''
                                }}>
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    touched,
                                    values,
                                    setValues
                                }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h3" textAlign="center">Bank</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.ifsc && errors.ifsc)}>
                                                            <TextField
                                                                id="ifsc"
                                                                type="text"
                                                                value={values.ifsc}
                                                                name="ifsc"
                                                                onBlur={({ target }) => {
                                                                    handleBlur({
                                                                        target: {
                                                                            name: 'ifsc',
                                                                            value: target.value
                                                                        }
                                                                    }, target.value)
                                                                    updateIfsc(values, setValues)
                                                                }}
                                                                onChange={handleChange}
                                                                label="IFSC Code"
                                                            />
                                                            {touched.ifsc && errors.ifsc && (
                                                                <FormHelperText error id="error-ifsc">
                                                                    {errors.ifsc}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.bank && errors.bank)}>
                                                            <TextField
                                                                id="bank"
                                                                type="text"
                                                                value={values.bank}
                                                                name="bank"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Bank Name"
                                                                InputProps={{ readOnly: true }}
                                                            />
                                                            {touched.bank && errors.bank && (
                                                                <FormHelperText error id="error-bank">
                                                                    {errors.bank}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth
                                                            error={Boolean(touched.branch && errors.branch)}>
                                                            <TextField
                                                                id="branch"
                                                                type="text"
                                                                value={values.branch}
                                                                name="branch"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Branch"
                                                                InputProps={{ readOnly: true }}
                                                            />
                                                            {touched.branch && errors.branch && (
                                                                <FormHelperText error id="error-branch">
                                                                    {errors.branch}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth error={Boolean(touched.acc && errors.acc)}>
                                                            <TextField
                                                                id="acc"
                                                                type="text"
                                                                value={values.acc}
                                                                name="acc"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Account Number"
                                                            />
                                                            {touched.acc && errors.acc && (
                                                                <FormHelperText error id="error-acc">
                                                                    {errors.acc}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth error={Boolean(touched.image && errors.image)}>
                                                            <HionImageUpload
                                                                paperElevation={0}
                                                                name="image"
                                                                buttonText="Upload Bank Passbook"
                                                                handleChange={handleChange}
                                                            />
                                                            {touched.image && errors.image && (
                                                                <FormHelperText error id="error-image">
                                                                    {errors.image}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <LoadingButton
                                                            loading={isSubmitting}
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                        >
                                                            Update Bank Details
                                                        </LoadingButton>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </form>
                                )}
                            </Formik>
                        )}
                        {profile.bank_status === 'Verified' && (
                            <Alert severity="success">
                                <AlertTitle>Bank Verified</AlertTitle>
                            </Alert>
                        )}
                        {profile.bank_status === 'Pending' && (
                            <Alert severity="info">
                                <AlertTitle>Bank Verification requested</AlertTitle>
                                It'll take some time to verify your Bank details. Check again later
                            </Alert>
                        )}
                    </div>
                )}
            </Box>
        </Box>
    )
}
export default Account