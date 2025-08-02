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
import { clearAuthLocalStorage, getHomePage, isLoggedIn } from "./AuthProvider";

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { params } = useQuery();
    const navigate = useNavigate()

    return isLoggedIn() ? (
        <Navigate to={getHomePage()} />
    ) : (
        <Box bgcolor="primary.light" height="100vh" display="flex" alignItems="center">
            <Container maxWidth="sm">
                <Card elevation={2}>
                    <CardContent>
                        <Stack spacing={2} textAlign="center" justifyContent="center">
                            <LogoSection />
                            <Typography
                                variant="caption"
                                fontSize="16px"
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
                                                                navigate(params.ref || getHomePage())
                                                            })
                                                    } else {
                                                        navigate(params.ref || getHomePage())
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
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth
                                                    error={Boolean(touched.username && errors.username)}>
                                                    <TextField
                                                        required
                                                        id="username"
                                                        value={values.username}
                                                        name="username"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Distributor ID"
                                                    />
                                                    {touched.username && errors.username && (
                                                        <FormHelperText error id="error-username">
                                                            {errors.username}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth
                                                    error={Boolean(touched.password && errors.password)}>
                                                    <PasswordField
                                                        required
                                                        id="password"
                                                        value={values.password}
                                                        name="password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        label="Password" />
                                                    {touched.password && errors.password && (
                                                        <FormHelperText error id="error-password">
                                                            {errors.password}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        {errors.submit && (
                                            <Box mt={3}>
                                                <FormHelperText id='error-submit'
                                                    error>{errors.submit}</FormHelperText>
                                            </Box>
                                        )}
                                        <Box mt={2}>
                                            <LoadingButton
                                                loading={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Login
                                            </LoadingButton>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                            <Button component={Link} to="/forgot-password">
                                Forgot Password?
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box >
    )
}
export default Login