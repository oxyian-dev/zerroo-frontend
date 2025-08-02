import * as Yup from "yup";
import fetcher from "../../../utils/fetcher";
import { Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import ServerAutocomplete from "../../../components/ServerAutocomplete";
import { IconMinus, IconPlus } from "@tabler/icons";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const StockTransfer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    function loadStock(values, setValues, index, item, inventory) {
        if (item && inventory) {
            fetcher(`/api/stocks/items/${item}?inventory=${inventory}`)
                .then(r => r.json())
                .then(res => {
                    let entries = [...values.entries]
                    entries[index].available = res.quantity
                    setValues({ ...values, entries })
                })
        }
    }

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
                description: Yup.string().max(250).required('Description is required'),
                reason: Yup.string().max(100).required('Reason is required'),
                entries: Yup.array().of(
                    Yup.object().shape({
                        item: Yup.number().nullable().min(1).required('Select an Item'),
                        quantity: Yup.number().positive('Quantity should be >= 1').nullable().required('Enter Stock Quantity'),
                        from: Yup.number().nullable().required('Select Source Inventory'),
                        to: Yup.number().nullable().required('Select Destination Inventory')
                    })
                )
            })}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                const formData = new FormData();
                formData.set('description', values.description)
                formData.set('reason', values.reason)
                for (let i = 0; i < values.entries.length; i++) {
                    formData.append('items', values.entries[i].item)
                    formData.append('quantities', values.entries[i].quantity)
                    formData.append('froms', values.entries[i].from)
                    formData.append('tos', values.entries[i].to)
                }
                return await fetcher(`/api/stocks/transfer`, { method: 'post', body: formData })
                    .then(r => r.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Stocks Transferred Successfully', { variant: 'success' })
                            navigate('/admin/stocks/transfer/view')
                        } else {
                            enqueueSnackbar(res.message || 'Exception occurred', { variant: 'error' })
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
                reason: '',
                entries: [{ item: '', quantity: '', from: '', available: '', to: '' }]
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
                                    <Typography variant="h2" textAlign="center">Stock Transfer</Typography>
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
                            <FormControl fullWidth error={Boolean(touched.reason && errors.reason)}>
                                <TextField
                                    required
                                    id="reason"
                                    type="text"
                                    value={values.reason}
                                    name="reason"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Reason"
                                    helperText="Max 100 characters"
                                />
                                {touched.reason && errors.reason && (
                                    <FormHelperText error id="error-reason">
                                        {errors.reason}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {values.entries.map((item, index) =>
                                <Grid key={`item-${index}`} container spacing={2} mt={1}>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.item && errors.entries?.[index]?.item)}>
                                            <ServerAutocomplete
                                                required
                                                select="item"
                                                id={`items.${index}.item`}
                                                value={values.entries[index].item}
                                                name={`entries.${index}.item`}
                                                label="Item"
                                                onBlur={(t) => {
                                                    handleBlur(t)
                                                    loadStock(values, setValues, index, t.target.value, values.entries[index].inventory)
                                                }}
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
                                            error={Boolean(touched.entries?.[index]?.from && errors.entries?.[index]?.from)}>
                                            <ServerAutocomplete
                                                required
                                                select="inventory"
                                                id={`inventories.${index}.from`}
                                                value={values.entries[index].from}
                                                name={`entries.${index}.from`}
                                                label="From Inventory"
                                                onBlur={(t) => {
                                                    handleBlur(t)
                                                    loadStock(values, setValues, index, values.entries[index].item, t.target.value)
                                                }}
                                                onChange={handleChange}
                                            />
                                            {touched.entries?.[index]?.from && errors.entries?.[index]?.from && (
                                                <FormHelperText error id={`error-from-${index}`}>
                                                    {errors?.entries?.[index]?.from}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id={`entries.${index}.available`}
                                                value={values.entries[index].available}
                                                name={`entries.${index}.available`}
                                                label="Available"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="number"
                                                disabled={true}
                                                inputProps={{ readOnly: true }}
                                            />
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
                                    <Grid item xs={2}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.to && errors.entries?.[index]?.to)}>
                                            <ServerAutocomplete
                                                required
                                                select="inventory"
                                                id={`inventories.${index}.to`}
                                                value={values.entries[index].to}
                                                name={`entries.${index}.to`}
                                                label="To Inventory"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {touched.entries?.[index]?.to && errors.entries?.[index]?.to && (
                                                <FormHelperText error id={`error-to-${index}`}>
                                                    {errors?.entries?.[index]?.to}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    {index + 1 === values.entries.length &&
                                        <Grid item xs={1}>
                                            <IconButton disabled={values.entries.length < 2} size='large' onClick={() => {
                                                handleRemove(index, values, setValues, touched, setTouched, errors, setErrors)
                                            }}>
                                                <IconMinus />
                                            </IconButton>
                                        </Grid>}
                                </Grid>)}
                        </Grid>
                        <Grid item xs={12} mt={3}>
                            <Button onClick={() => {
                                handleAdd(values, setValues)
                            }} color='success' variant='contained' endIcon={<IconPlus />}>
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
                            Transfer
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default StockTransfer;