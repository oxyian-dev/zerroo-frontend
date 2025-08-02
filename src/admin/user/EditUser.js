import { useParams } from "react-router-dom";
import * as Yup from "yup";
import fetcher from "../../utils/fetcher";
import { Box, FormControl, FormHelperText, Grid, TextField } from "@mui/material";
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
                        <Grid item xs={6}>
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
                                />
                                {touched.firstname && errors.firstname && (
                                    <FormHelperText error id="error-firstname">
                                        {errors.firstname}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
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
                                />
                                {touched.lastname && errors.lastname && (
                                    <FormHelperText error id="error-lastname">
                                        {errors.lastname}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
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
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="error-email">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
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
                        <Box mt={3}>
                            <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
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
                            Edit User
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default EditUser;