import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { IconMinus, IconPlus } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ServerAutocomplete from "../../../components/ServerAutocomplete";
import fetcher from "../../../utils/fetcher";

const Inward = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const handleAdd = (values, setValues) => {
        let entries = [...values.entries]
        entries.push({ item: '', quantity: '', inventory: '' })
        setValues({ ...values, entries })
    }

    const handleRemove = (index, values, setValues, touched, setTouched, errors, setErrors) => {
        let entries = [...values.entries];
        entries.splice(index, 1);
        setValues({ ...values, entries });
        if (touched.entries) {
            entries = [...touched.entries];
            entries.splice(index, 1);
            setTouched({ ...values, entries });
        }
        if (errors.entries) {
            entries = [...errors.entries];
            entries.splice(index, 1);
            setErrors({ ...values, entries });
        }
    }

    return (
        <Formik
            validationSchema={Yup.object().shape({
                description: Yup.string().max(100).required('Description is required'),
                entries: Yup.array().of(
                    Yup.object().shape({
                        item: Yup.number().nullable().min(1).required('Select an Item'),
                        quantity: Yup.number().positive('Quantity should be >= 1').nullable().required('Enter Stock Quantity'),
                        inventory: Yup.number().nullable().required('Enter the Inventory where stock is stored')
                    })
                )
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                const body = new FormData();
                body.set('description', values.description)
                if (values.ref) {
                    body.set('ref', values.ref)
                }
                for (let i = 0; i < values.entries.length; i++) {
                    body.append('items', values.entries[i].item)
                    body.append('quantities', values.entries[i].quantity)
                    body.append('inventories', values.entries[i].inventory)
                }
                return await fetcher(`/api/stocks/inward`, { method: 'post', body })
                    .then(r => r.json())
                    .then(({ status = 'success', message = 'Exception occurred' }) => {
                        if (status === 'success') {
                            enqueueSnackbar('Inward added Successfully', { variant: 'success' })
                            navigate('/admin/stocks/inward/view')
                        } else {
                            enqueueSnackbar(message, { variant: 'error' })
                        }
                    })
                    .catch(() => {
                        enqueueSnackbar('Error occurred', { variant: 'error' })
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }}
            initialValues={{
                description: '',
                ref: '',
                entries: [{ item: '', quantity: '', inventory: '' }]
            }}
        >
            {({
                errors,
                setErrors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                setTouched,
                values,
                setValues
            }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid textAlign='center' justifyContent="center" alignItems="center" container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h2" textAlign="center">New Inward</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
                                <TextField
                                    required
                                    id="description"
                                    type="text"
                                    value={values.description}
                                    name="description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Description"
                                    helperText="Max 250 characters"
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="description">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={Boolean(touched.ref && errors.ref)}>
                                <TextField
                                    required
                                    id="ref"
                                    type="text"
                                    value={values.ref}
                                    name="ref"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Reference ID"
                                    helperText="Max 20 characters"
                                />
                                {touched.ref && errors.ref && (
                                    <FormHelperText error id="error-ref">
                                        {errors.ref}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {values.entries.map((_, index) => (
                                <Grid key={`item-${index}`} container spacing={2} mt={1}>
                                    <Grid item xs={5}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.item && errors.entries?.[index]?.item)}>
                                            <ServerAutocomplete
                                                required
                                                select="item"
                                                id={`items.${index}.item`}
                                                value={values.entries[index].item}
                                                name={`entries.${index}.item`}
                                                label="Item"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.entries?.[index]?.item && errors.entries?.[index]?.item && (
                                                <FormHelperText error id={`error-item-${index}`}>
                                                    {errors.entries?.[index]?.item}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.quantity && errors.entries?.[index]?.quantity)}>
                                            <TextField
                                                required
                                                type='number'
                                                id={`items.${index}.quantity`}
                                                value={values.entries[index].quantity}
                                                name={`entries.${index}.quantity`}
                                                label="Quantity"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                aria-valuemin={1}
                                            />
                                            {touched.entries?.[index]?.quantity && errors.entries?.[index]?.quantity && (
                                                <FormHelperText error id={`error-quantities-${index}`}>
                                                    {errors?.entries?.[index]?.quantity}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.inventory && errors.entries?.[index]?.inventory)}>
                                            <ServerAutocomplete
                                                required
                                                select="inventory"
                                                id={`inventories.${index}.inventory`}
                                                value={values.entries[index].inventory}
                                                name={`entries.${index}.inventory`}
                                                label="Inventory"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.entries?.[index]?.inventory && errors.entries?.[index]?.inventory && (
                                                <FormHelperText error id={`error-inventories-${index}`}>
                                                    {errors?.entries?.[index]?.inventory}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    {index + 1 === values.entries.length && <Grid item xs={1}>
                                        <Tooltip title="Remove this line">
                                            <span>
                                                <IconButton disabled={values.entries.length < 2} size='large' onClick={() => {
                                                    handleRemove(index, values, setValues, touched, setTouched, errors, setErrors)
                                                }}>
                                                    <IconMinus />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Grid>}
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={12} mt={3}>
                            <Button onClick={() => {
                                handleAdd(values, setValues)
                            }} variant='outlined' endIcon={<IconPlus />}>
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>
                    {errors.submit && (
                        <Box mt={3}>
                            <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box mt={3}>
                        <LoadingButton
                            loading={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Add New Inward
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default Inward;