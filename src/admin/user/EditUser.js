import { useParams } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../utils/fetcher";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { constructFormData } from "../../utils/util";
import { useEffect, useState } from "react";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetcher(`/api/users/${id}`)
            .then(r => r.json())
            .then(setData)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return (
        !loading &&
        <Formik
            validationSchema={Yup.object().shape({
                firstname: Yup.string().max(100).required('Firstname is required'),
                lastname: Yup.string().max(100).required('Lastname is required'),
                email: Yup.string().email().max(100).required('Email is required'),
                phone: Yup.number("Invalid Phone Number").nullable(true).min(6000000000, "Invalid Phone Number")
                    .max(9999999999, "Invalid Phone Number").required('Phone Number is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/admin/users`, {
                    method: 'put',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('User Edited Successfully', { variant: 'success' })
                            navigate(-1)
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
            initialValues={data}>
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
                        <Grid item xs={12}>
                            <Card variant="outlined" sx={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                                border: '1px solid rgba(255,255,255,.08)',
                            }}>
                                <CardContent>
                                    <Typography variant="h2" textAlign="center" textTransform="uppercase">
                                        Edit User
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="firstname"
                                    type="text"
                                    value={values.firstname}
                                    name="firstname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Firstname"
                                    inputProps={{
                                        'aria-label': 'Firstname',
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
                                            '&.Mui-error fieldset': {
                                                borderColor: '#ff6b6b',
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
                                            '&.Mui-error': {
                                                color: '#ff6b6b',
                                            },
                                        },
                                    }}
                                />
                                {touched.firstname && errors.firstname && (
                                    <FormHelperText error id="error-firstname">
                                        {errors.firstname}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="lastname"
                                    type="text"
                                    value={values.lastname}
                                    name="lastname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Lastname"
                                    inputProps={{
                                        'aria-label': 'Lastname',
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
                                            '&.Mui-error fieldset': {
                                                borderColor: '#ff6b6b',
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
                                            '&.Mui-error': {
                                                color: '#ff6b6b',
                                            },
                                        },
                                    }}
                                />
                                {touched.lastname && errors.lastname && (
                                    <FormHelperText error id="error-lastname">
                                        {errors.lastname}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="email"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Email"
                                    inputProps={{
                                        'aria-label': 'Email address',
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
                                            '&.Mui-error fieldset': {
                                                borderColor: '#ff6b6b',
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
                                            '&.Mui-error': {
                                                color: '#ff6b6b',
                                            },
                                        },
                                    }}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="error-email">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="password"
                                    type="text"
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Password"
                                    inputProps={{
                                        'aria-label': 'Password',
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
                                            '&.Mui-error fieldset': {
                                                borderColor: '#ff6b6b',
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
                                            '&.Mui-error': {
                                                color: '#ff6b6b',
                                            },
                                        },
                                    }}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText error id="error-password">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(touched.roles && errors.roles)}>
                                <ServerAutocomplete
                                    required
                                    multiple
                                    id="roles"
                                    name="roles"
                                    select="roles"
                                    label="Roles"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.roles}
                                />
                                {touched.roles && errors.roles && (
                                    <FormHelperText error id="error-roles">
                                        {errors.roles}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <LoadingButton
                            loading={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            aria-label="Edit user"
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
                            Edit User
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default EditUser;