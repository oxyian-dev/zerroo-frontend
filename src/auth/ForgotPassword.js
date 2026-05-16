import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LogoSection from "../layout/MainLayout/LogoSection";
import fetcher from "../utils/fetcher";
import { constructFormData } from "../utils/util";
import { getHomePage, isLoggedIn } from "./AuthProvider";

export default function ForgotPassword() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    return isLoggedIn() ? (
        <Navigate to={getHomePage()} />
    ) : (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#020202',
                py: { md: 8, xs: 4 },
                px: { md: 3, xs: 2 }
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    px: { md: 3, xs: 2 }
                }}
            >
                <Card
                    elevation={0}
                    sx={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                        border: '1px solid rgba(255,255,255,.08)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            borderColor: 'rgba(221,180,93,.2)',
                            boxShadow: '0 15px 35px rgba(0,0,0,.4)'
                        }
                    }}
                >
                    <CardContent
                        sx={{
                            p: { md: 6, xs: 4 }
                        }}
                    >
                        <Stack
                            spacing={3}
                            textAlign="center"
                            justifyContent="center"
                        >
                            <Box sx={{ mb: 2 }}>
                                <LogoSection />
                            </Box>
                            
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: { md: '1.5rem', xs: '1.2rem' },
                                    letterSpacing: '-0.02em',
                                    mb: 1
                                }}
                            >
                                Forgot Password
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    fontSize: { md: '1rem', xs: '0.95rem' },
                                    letterSpacing: '0.01em',
                                    mb: 2
                                }}
                            >
                                Enter your Distributor ID to reset your password
                            </Typography>

                            <Formik
                                validationSchema={Yup.object().shape({
                                    username: Yup.string().max(100).required('Enter Distributor ID')
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true)
                                    return await fetcher('/forgot-password', {
                                        method: 'post',
                                        body: constructFormData(values)
                                    })
                                        .then(r => r.json())
                                        .then(({ status, message = "Try again" }) => {
                                            if (status === "success") {
                                                enqueueSnackbar('Password sent to registered email', { variant: 'success' })
                                                navigate("/login")
                                            } else {
                                                enqueueSnackbar(message, { variant: 'error' })
                                            }
                                        })
                                        .catch(() => {
                                            enqueueSnackbar('Error occurred', { variant: 'error' })
                                        })
                                }}
                                initialValues={{
                                    username: ''
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
                                    <form noValidate onSubmit={handleSubmit} aria-label="Forgot password form">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.username && errors.username)}
                                                >
                                                    <TextField
                                                        required
                                                        id="username"
                                                        value={values.username}
                                                        name="username"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Distributor ID (ZID)"
                                                        aria-label="Distributor ID"
                                                        aria-required="true"
                                                        aria-invalid={Boolean(touched.username && errors.username)}
                                                        aria-describedby={touched.username && errors.username ? "error-username" : undefined}
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                color: 'white',
                                                                backgroundColor: 'rgba(255,255,255,.02)',
                                                                borderRadius: '4px',
                                                                transition: 'all 0.3s ease',
                                                                '& input': {
                                                                    color: 'white !important',
                                                                    backgroundColor: 'transparent !important',
                                                                    '&:-webkit-autofill': {
                                                                        WebkitBoxShadow: '0 0 0 1000px rgba(10,10,10,1) inset !important',
                                                                        WebkitTextFillColor: 'white !important',
                                                                        caretColor: 'white !important',
                                                                        transition: 'background-color 5000s ease-in-out 0s'
                                                                    },
                                                                    '&:-webkit-autofill:hover': {
                                                                        WebkitBoxShadow: '0 0 0 1000px rgba(10,10,10,1) inset !important',
                                                                        WebkitTextFillColor: 'white !important'
                                                                    },
                                                                    '&:-webkit-autofill:focus': {
                                                                        WebkitBoxShadow: '0 0 0 1000px rgba(10,10,10,1) inset !important',
                                                                        WebkitTextFillColor: 'white !important'
                                                                    },
                                                                    '&:-webkit-autofill:active': {
                                                                        WebkitBoxShadow: '0 0 0 1000px rgba(10,10,10,1) inset !important',
                                                                        WebkitTextFillColor: 'white !important'
                                                                    }
                                                                },
                                                                '& fieldset': {
                                                                    borderColor: 'rgba(255,255,255,.15)',
                                                                    transition: 'all 0.3s ease'
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: 'rgba(255,255,255,.3)'
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#efcb77',
                                                                    borderWidth: '2px'
                                                                },
                                                                '&.Mui-error fieldset': {
                                                                    borderColor: '#ff6b6b'
                                                                }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                color: 'rgba(255,255,255,.68)',
                                                                '&.Mui-focused': {
                                                                    color: '#efcb77'
                                                                },
                                                                '&.Mui-error': {
                                                                    color: '#ff6b6b'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                padding: { md: '16px 14px', xs: '14px 12px' }
                                                            }
                                                        }}
                                                    />
                                                    {touched.username && errors.username && (
                                                        <FormHelperText
                                                            error
                                                            id="error-username"
                                                            sx={{
                                                                color: '#ff6b6b',
                                                                fontSize: '0.78rem',
                                                                mt: 1,
                                                                ml: 0
                                                            }}
                                                        >
                                                            {errors.username}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        {errors.submit && (
                                            <Box mt={3}>
                                                <FormHelperText
                                                    id='error-submit'
                                                    error
                                                    sx={{
                                                        color: '#ff6b6b',
                                                        fontSize: '0.78rem',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {errors.submit}
                                                </FormHelperText>
                                            </Box>
                                        )}
                                        <Box mt={4}>
                                            <LoadingButton
                                                loading={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                aria-label="Submit forgot password request"
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
                                                    borderRadius: '4px',
                                                    border: 'none',
                                                    '&:hover': {
                                                        transform: 'translateY(-3px)',
                                                        boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                                                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)'
                                                    },
                                                    '&:active': {
                                                        transform: 'translateY(-1px)'
                                                    },
                                                    '&.Mui-disabled': {
                                                        background: 'rgba(255,255,255,.1)',
                                                        color: 'rgba(255,255,255,.4)'
                                                    },
                                                    '&:focus-visible': {
                                                        outline: '2px solid #efcb77',
                                                        outlineOffset: '2px'
                                                    }
                                                }}
                                            >
                                                Submit
                                            </LoadingButton>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                            
                            <Box mt={2}>
                                <Typography
                                    sx={{
                                        color: 'rgba(255,255,255,.68)',
                                        fontSize: { md: '0.95rem', xs: '0.9rem' },
                                        letterSpacing: '0.01em'
                                    }}
                                >
                                    Know your password?{' '}
                                    <Button
                                        component={Link}
                                        to="/login"
                                        aria-label="Back to login"
                                        sx={{
                                            color: '#efcb77',
                                            textTransform: 'none',
                                            fontSize: { md: '0.95rem', xs: '0.9rem' },
                                            fontWeight: 600,
                                            letterSpacing: '0.01em',
                                            padding: '4px 8px',
                                            minWidth: 'auto',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                color: '#fff7dc',
                                                background: 'rgba(239,203,119,.05)'
                                            },
                                            '&:focus-visible': {
                                                outline: '2px solid #efcb77',
                                                outlineOffset: '2px'
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

// Made with Bob
