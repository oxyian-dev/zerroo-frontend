import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Card, CardContent, FormControl, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import { IconMinus, IconPlus } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ServerAutocomplete from "../../../components/ServerAutocomplete";
import fetcher from "../../../utils/fetcher";

const AddAdjustment = () => {
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

    function loadAdjustment(values, setValues, index) {
        let entries = [...values.entries]
        entries[index].adjustment = entries[index].quantity - entries[index].available
        setValues({ ...values, entries })
    }

    const handleAdd = (values, setValues) => {
        let entries = [...values.entries]
        entries.push({ item: '', available: '', quantity: '', adjustment: '' })
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
                reason: Yup.string().nullable().max(100).required('Reason is required'),
                inventory: Yup.number().nullable().required('Enter the Inventory where stock is stored'),
                entries: Yup.array().of(
                    Yup.object().shape({
                        item: Yup.number().nullable().min(1).required('Select an Item'),
                        quantity: Yup.number().moreThan(-1, 'Quantity should be >= 0').integer('Decimal not allowed')
                            .nullable().required('Enter Stock Quantity')
                    })
                )
            })}
            onSubmit={async (values, { setSubmitting }) => {
                const formData = new FormData();
                formData.set('description', values.description)
                formData.set('reason', values.reason)
                formData.append('inventory', values.inventory)
                for (let i = 0; i < values.entries.length; i++) {
                    formData.append('items', values.entries[i].item)
                    formData.append('adjustments', values.entries[i].adjustment)
                }
                return await fetcher(`/api/stocks/adjustment`, { method: 'post', body: formData })
                    .then(r => r.json())
                    .then(res => {
                        if (res.status === 'success') {
                            enqueueSnackbar('Adjustment added Successfully', { variant: 'success' })
                            navigate('/admin/stocks/adjustment')
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
                inventory: '',
                entries: [{ item: '', available: '', quantity: '', adjustment: '' }]
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
                                    <Typography variant="h2" textAlign="center">New Adjustment</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
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
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="description">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={Boolean(touched.reason && errors.reason)}>
                                <Autocomplete
                                    freeSolo
                                    autoSelect
                                    options={[
                                        'Stock on Fire',
                                        'Stolen Goods',
                                        'Damaged Goods',
                                        'Stock Written Off',
                                        'Stocktaking results',
                                        'Inventory Revaluation',
                                        'Sales'
                                    ]}
                                    id="reason"
                                    type="text"
                                    value={values.reason}
                                    name="reason"
                                    onBlur={handleBlur}
                                    onChangeCapture={({ target }) => {
                                        const value = target.value
                                        handleChange({ target: { name: 'reason', value } }, value)
                                    }}
                                    onChange={handleChange}
                                    onSelect={({ target }) => {
                                        const value = target.value
                                        handleChange({ target: { name: 'reason', value } }, value)
                                    }}
                                    renderInput={params => <TextField required {...params} label="Reason" />}
                                />
                                {touched.reason && errors.reason && (
                                    <FormHelperText error id="error-reason">
                                        {errors.reason}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth
                                error={Boolean(touched.inventory && errors.inventory)}>
                                <ServerAutocomplete
                                    required
                                    select="inventory"
                                    id="inventory"
                                    value={values.inventory}
                                    name="inventory"
                                    label="Inventory"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.inventory && errors.inventory && (
                                    <FormHelperText error id="error-inventorY">
                                        {errors.inventory}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {values.entries.map((entry, index) =>
                                <Grid key={`entry-${index}`} container spacing={2} mt={1}>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.item && errors.entries?.[index]?.item)}>
                                            <ServerAutocomplete
                                                required
                                                select="item"
                                                id={`entries.${index}.item`}
                                                value={values.entries[index].item}
                                                name={`entries.${index}.item`}
                                                label="Item"
                                                onBlur={(t) => {
                                                    handleBlur(t)
                                                    loadStock(values, setValues, index, t.target.value, values.inventory)
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
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
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
                                    <Grid item xs={3}>
                                        <FormControl fullWidth
                                            error={Boolean(touched.entries?.[index]?.quantity && errors.entries?.[index]?.quantity)}>
                                            <TextField
                                                required
                                                type='number'
                                                id={`items.${index}.quantity`}
                                                value={values.entries[index].quantity}
                                                name={`entries.${index}.quantity`}
                                                label="Quantity"
                                                onBlur={t => {
                                                    handleBlur(t)
                                                    loadAdjustment(values, setValues, index)
                                                }}
                                                onChange={handleChange}
                                                aria-valuemin={1}
                                            />
                                            {touched.entries?.[index]?.quantity && errors.entries?.[index]?.quantity && (
                                                <FormHelperText error id={`error-quantities-${index}`}>
                                                    {errors.entries?.[index]?.quantity}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                id={`entries.${index}.adjustment`}
                                                value={values.entries[index].adjustment}
                                                name={`entries.${index}.adjustment`}
                                                label="Adjusted"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="number"
                                                disabled={true}
                                                inputProps={{ readOnly: true }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    {index + 1 === values.entries.length && <Grid item xs={1}>
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
                    <Box sx={{ mt: 3 }}>
                        <LoadingButton
                            loading={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Add New Adjustment
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default AddAdjustment;