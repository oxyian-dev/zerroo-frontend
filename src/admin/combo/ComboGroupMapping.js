import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormHelperText, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import fetcher from "../../utils/fetcher";
import { constructFormData } from "../../utils/util";

import { Stack } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ClientDataGrid from "../../components/ClientDataGrid";
import ServerAutocomplete from "../../components/ServerAutocomplete";

export default function ComboGroupMapping({ id = useParams()['id'] }) {
    const { enqueueSnackbar } = useSnackbar();
    const [refresh, setRefresh] = useState(0)
    return (
        <Stack spacing={2}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Formik
                    validationSchema={Yup.object().shape({
                        group: Yup.number().required('Select a Combo Group'),
                        quantity: Yup.number().required('Enter the quantity')
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        return await fetcher(`/api/combos/${id}/mapping`, {
                            method: 'post',
                            body: constructFormData(values)
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (res.status === 'success') {
                                    enqueueSnackbar('Mapping Added Successfully', { variant: 'success' })
                                    setRefresh(refresh => refresh + 1)
                                    resetForm()
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
                        group: '',
                        quantity: ''
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
                                    <Typography variant="h3" textAlign="center">New Mapping</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <ServerAutocomplete
                                            required
                                            id="combo-group"
                                            name="group"
                                            select="combo-group"
                                            label="Combo Group"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.group}
                                        />
                                        {touched.group && errors.group && (
                                            <FormHelperText error id="error-group">
                                                {errors.group}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth error={Boolean(touched.quantity && errors.quantity)}>
                                        <TextField
                                            id="quantity"
                                            type="number"
                                            value={values.quantity}
                                            name="quantity"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Quantity"
                                        />
                                        {touched.quantity && errors.quantity && (
                                            <FormHelperText error id="error-quantity">
                                                {errors.quantity}
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
                                    Add
                                </LoadingButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Paper>
            <ClientDataGrid
                width={[
                    100,
                    null,
                    100,
                    100,
                    100,
                ]}
                refresh={refresh}
                client={true}
                sortable={[false]}
                filter={[false]}
                datatype={[
                    null,
                    null,
                    null,
                    'number'
                ]}
                render={[
                    ({ value }) => <IconButton><IconTrash /></IconButton>
                ]}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Combo", "field": "Combo", "width": "200", "id": "Combo" },
                    { "headerName": "Group", "field": "Group", "width": "200", "id": "Group" },
                    { "headerName": "Quantity", "field": "Quantity", "width": "200", "id": "Quantity", "type": 'number' }]
                }
                ajax={{ url: `/api/combos/${id}/mapping` }}
            />
        </Stack>
    )
}
