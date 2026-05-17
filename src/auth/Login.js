import { LoadingButton } from "@mui/lab";
import {
    Box, Button, Card, CardContent, Container, FormControl,
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
import PasswordField from "../components/PasswordField";
import LogoSection from "../layout/MainLayout/LogoSection";
import { clearCart, getCart } from "../utils/CartUtil";
import fetcher from "../utils/fetcher";
import { useQuery } from "../utils/useQuery";
import { clearAuthLocalStorage, getHomePage, isLoggedIn, setAuthToken } from "./AuthProvider";

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { params } = useQuery();
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
                                Welcome Back
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
                                Enter your credentials to continue
                            </Typography>

                            <Formik
                                validationSchema={Yup.object().shape({
                                    username: Yup.string().max(100).required('Enter Distributor ID'),
                                    password: Yup.string().required('Password is required'),
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true)
                                    const body = {
                                        username: values.username,
                                        password: values.password
                                    }
                                    return await fetcher(`/authenticate`, {
                                        method: 'post',
                                        body: JSON.stringify(body),
                                        headers: { "Content-type": "application/json" }
                                    })
                                        .then(res => {
                                            if (res.status == 200) {
                                                res.json().then(res => {
                                                    clearAuthLocalStorage()
                                                    localStorage.setItem("firstname", res.firstname);
                                                    if (res.lastname) {
                                                        localStorage.setItem("lastname", res.lastname);
                                                    }
                                                    localStorage.setItem("phone", res.phone);
                                                    localStorage.setItem("email", res.email);
                                                    localStorage.setItem("type", res.type);
                                                    localStorage.setItem("roles", JSON.stringify(res.roles));
                                                    if (res.avatar) {
                                                        localStorage.setItem("avatar", res.avatar);
                                                    }
                                                    localStorage.setItem("username", res.username);
                                                    
                                                    // Store auth token in localStorage as fallback for mobile browsers
                                                    if (res.token) {
                                                        setAuthToken(res.token);
                                                    }
                                                    
                                                    enqueueSnackbar('Login Success', { variant: 'success' });

                                                    const cart = getCart();
                                                    if (cart.length > 0) {
                                                        const body = new FormData()
                                                        cart.forEach(({ item, quantity, time }) => {
                                                            body.append('items', item)
                                                            body.append('quantities', quantity)
                                                            body.append('times', time)
                                                        })
                                                        fetcher('/api/carts/sync', { method: 'PUT', body })
                                                            .then(r => r.json())
                                                            .then(() => {
                                                                clearCart()
                                                                // Delay navigation to ensure localStorage is fully written
                                                                setTimeout(() => {
                                                                    navigate(params.ref || getHomePage())
                                                                }, 0)
                                                            })
                                                    } else {
                                                        // Delay navigation to ensure localStorage is fully written
                                                        setTimeout(() => {
                                                            navigate(params.ref || getHomePage())
                                                        }, 0)
                                                    }
                                                });
                                            } else {
                                                enqueueSnackbar('Bad Credentials', { variant: 'error' })
                                            }
                                        })
                                        .catch(() => {
                                            enqueueSnackbar('Error occurred', { variant: 'error' })
                                        })
                                }}
                                initialValues={{
                                    username: '',
                                    password: ''
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
                                    <form noValidate onSubmit={handleSubmit} aria-label="Login form">
                                        <Grid container spacing={3}>
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
                                                        label="Distributor ID"
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
                                            <Grid item xs={12}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                >
                                                    <PasswordField
                                                        required
                                                        id="password"
                                                        value={values.password}
                                                        name="password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Password"
                                                        aria-label="Password"
                                                        aria-required="true"
                                                        aria-invalid={Boolean(touched.password && errors.password)}
                                                        aria-describedby={touched.password && errors.password ? "error-password" : undefined}
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
                                                            },
                                                            '& .MuiIconButton-root': {
                                                                color: 'rgba(255,255,255,.68)',
                                                                '&:hover': {
                                                                    color: '#efcb77'
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    {touched.password && errors.password && (
                                                        <FormHelperText
                                                            error
                                                            id="error-password"
                                                            sx={{
                                                                color: '#ff6b6b',
                                                                fontSize: '0.78rem',
                                                                mt: 1,
                                                                ml: 0
                                                            }}
                                                        >
                                                            {errors.password}
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
                                                aria-label="Login button"
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
                                                Login
                                            </LoadingButton>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                            
                            <Box mt={2}>
                                <Button
                                    component={Link}
                                    to="/forgot-password"
                                    aria-label="Forgot password link"
                                    sx={{
                                        color: 'rgba(255,255,255,.82)',
                                        textTransform: 'none',
                                        fontSize: { md: '0.95rem', xs: '0.9rem' },
                                        fontWeight: 500,
                                        letterSpacing: '0.01em',
                                        padding: { md: '10px 20px', xs: '8px 16px' },
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: '#efcb77',
                                            background: 'rgba(239,203,119,.05)'
                                        },
                                        '&:focus-visible': {
                                            outline: '2px solid #efcb77',
                                            outlineOffset: '2px'
                                        }
                                    }}
                                >
                                    Forgot Password?
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}
export default Login