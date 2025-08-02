import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog, DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    IconButton,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { IconCopy, IconEdit } from "@tabler/icons";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ServerDataGrid from "../../components/ServerDataGrid";
import fetcher from "../../utils/fetcher";
import { WorkDriveImage } from "../../utils/util";

const ItemList = () => {
    const render = []
    const [changeStatusData, setChangeStatusData] = useState({})
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };

    render[0] = ({ value }) => (
        <Stack direction="row" spacing={1}>
            <Tooltip title="Edit item's data" placement="top">
                <IconButton component={Link} to={`/admin/items/${value}/edit`}>
                    <IconEdit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Create a new item by with predefined values of another item's data" placement="top">
                <IconButton component={Link} to={`/admin/items/${value}/clone`}>
                    <IconCopy />
                </IconButton>
            </Tooltip>
        </Stack>)

    render[1] = ({ value }) => value && (
        <Button component={Link} to={`/admin/image-lists/${value[1]}`} sx={{ height: "100%" }}>
            <WorkDriveImage auto='width' image={value[0]} alt="" />
        </Button>
    )

    render[4] = ({ value }) => <Tooltip title={value}><Typography>{value}</Typography></Tooltip>

    render[5] = ({ id, value }) => (
        <Switch
            defaultChecked={value}
            onClick={({ target }) => {
                setChangeStatusData({ id, value: target.checked })
                setOpen(true)
            }}
        />
    )
    render[9] = ({ value }) => <Box width={100} height={100} bgcolor={`#${value}`} />

    render[10] = ({ id, value }) => (
        <Switch
            defaultChecked={value}
            onClick={({ target }) => {
                const featured_status = target.checked;
                const body = new FormData();
                body.set('featured_status',featured_status)
                console.log({ id, featured_status })
                return fetcher(`/api/items/${id}/featured_status`, { method: 'PUT', body })
                .then(res => res.json())
                .then(({ status }) => {
                    if (status === 'success') {
                        enqueueSnackbar("Item's Status changed Successfully", { variant: 'success' })
                    } else {
                        enqueueSnackbar('Exception Occurred', { variant: 'error' })

                    }
                })
                .catch(() => {
                    enqueueSnackbar('Error occurred', { variant: 'error' })
                })


                
            }}
        />
    )

    const filter = [false, false]
    const datatype = [];
    datatype[5] = 'boolean';
    const sortable = [false, false]
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Item's Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the reason to change the status of the Item
                    </DialogContentText>
                    <Formik
                        validationSchema={Yup.object().shape({
                            reason: Yup.string().max(100).required('Enter the reason')
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            const body = new FormData();
                            body.set('status', changeStatusData.value)
                            body.set('reason', values.reason)
                            return fetcher(`/api/items/${changeStatusData.id}/status`, { method: 'PUT', body })
                                .then(res => res.json())
                                .then(({ status }) => {
                                    if (status === 'success') {
                                        enqueueSnackbar("Item's Status changed Successfully", { variant: 'success' })
                                        setSubmitting(false)
                                    } else {
                                        enqueueSnackbar('Exception Occurred', { variant: 'error' })
                                        setSubmitting(false)
                                    }
                                })
                                .catch(() => {
                                    enqueueSnackbar('Error occurred', { variant: 'error' })
                                    setSubmitting(false)
                                })
                                .finally(() => {
                                    handleClose()
                                })
                        }}
                        initialValues={{
                            reason: ''
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
                                <TextField
                                    sx={{ mt: 3 }}
                                    autoFocus
                                    id="reason"
                                    label="Reason"
                                    type="reason"
                                    fullWidth
                                    variant="standard"
                                    value={values.reason}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.reason && errors.reason && (
                                    <FormHelperText error id="error-reason">
                                        {errors.reason}
                                    </FormHelperText>
                                )}
                                {errors.submit && (
                                    <Box mt={3}>
                                        <FormHelperText id='error-submit' error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Box mt={3} textAlign="right">
                                    <Button sx={{ mr: 1 }} onClick={handleClose}>Cancel</Button>
                                    <LoadingButton
                                        sx={{ ml: 1 }}
                                        loading={isSubmitting}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Change
                                    </LoadingButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Stack spacing={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h2" textAlign="center">Item List</Typography>
                    </CardContent>
                </Card>
                <ServerDataGrid
                    sortable={sortable}
                    datatype={datatype}
                    customize={{ rowHeight: 150 }}
                    render={render}
                    filter={filter}
                    ajax={{ url: '/api/items' }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500, autoFocus: true }
                        }
                    }}
                    columns={[
                        { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                        { "headerName": "Image", "field": "Image", "width": "200", "id": "Image" },
                        { "headerName": "Group", "field": "Group", "width": "200", "id": "Group" },
                        { "headerName": "SKU", "field": "SKU", "width": "200", "id": "SKU" },
                        { "headerName": "Title", "field": "Title", "width": "200", "id": "Title" },
                        { "headerName": "Online Status", "field": "Online Status", "width": "200", "id": "Online Status", "type": "boolean" },
                        { "headerName": "Mrp", "field": "Mrp", "width": "200", "id": "Mrp", "type": "number" },
                        { "headerName": "Price", "field": "Price", "width": "200", "id": "Price", "type": "number" },
                        { "headerName": "Size", "field": "Size", "width": "200", "id": "Size" },
                        { "headerName": "Color", "field": "Color", "width": "200", "id": "Color" },
                        { "headerName": "Featured Status", "field": "Featured Status", "width": "200", "id": "Featured Status", "type": "boolean" }
                    ]}
                />
            </Stack>
        </Box>
    )
}
export default ItemList;