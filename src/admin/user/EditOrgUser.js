import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import ServerAutocomplete from "../../components/ServerAutocomplete";
import fetcher from "../../utils/fetcher";
import { constructFormData, nonull } from "../../utils/util";

const EditOrgUser = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    useEffect(() => {
        fetcher(`/api/admin/users/org-users/${id}`)
            .then(r => r.json())
            .then(setData)
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return loading ? (
        <Loader />
    ) : (
        <Formik
            validationSchema={Yup.object().shape({
                firstname: Yup.string().max(100).required('Firstname is required'),
                lastname: Yup.string().max(100).required('Lastname is required'),
                email: Yup.string().email().max(100).required('Email is required'),
                roles: Yup.array().of(Yup.number()).min(1, 'Some Roles has to be selected').nullable()
                    .required('Some Roles has to be selected')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                return await fetcher(`/api/admin/users/org-users/${id}`, {
                    method: 'put',
                    body: constructFormData(values)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('User Edited Successfully', { variant: 'success' })
                            navigate('/admin/org-users')
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
            initialValues={nonull(data)}>
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
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h2" textAlign="center">Edit Org User</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
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
                        >
                            Edit User
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default EditOrgUser;