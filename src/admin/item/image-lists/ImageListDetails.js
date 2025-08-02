import { LoadingButton } from "@mui/lab";
import {
    Backdrop,
    Box, Button,
    Card,
    CardContent,
    CircularProgress, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { IconX } from "@tabler/icons";
import { useSnackbar } from "notistack";
import React, { forwardRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import HionImageUpload from "../../../components/HionImageUpload";
import fetcher from "../../../utils/fetcher";
import { WorkDriveImage } from "../../../utils/util";

const HStack = forwardRef(({ children }, ref) => (
    <Stack sx={{ flexWrap: 'wrap' }} spacing={2} ref={ref} direction='row'>{children}</Stack>)
)

const ImageListDetails = ({ id = useParams()['id'] }) => {
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [newName, setNewName] = useState('')
    const [reload, setReload] = useState(1)
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [reordering, setReordering] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [imageToDelete, setImageToDelete] = useState('')

    function reorder() {
        setReordering(true)
        const body = new FormData();
        images.forEach(({ image }) => body.append('images', image))
        fetcher(`/api/image-lists/${id}/images/reorder`, { method: 'PUT', body })
            .then(r => r.json())
            .then(res => {
                if (res.status === 'success') {
                    enqueueSnackbar('Reordered Successfully', { variant: 'success' })
                } else {
                    enqueueSnackbar('Exception occurred', { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
            .finally(() => {
                setReordering(false)
            })
    }

    function remove() {
        setLoading(true)
        const body = new FormData()
        body.set('image', imageToDelete)
        fetcher(`/api/image-lists/${id}/images`, { method: 'delete', body })
            .then(r => r.json())
            .then(({ status, message = 'Exception occurred' }) => {
                if (status === 'success') {
                    setReload(reload + 1)
                    enqueueSnackbar('Image Removed Successfully', { variant: 'success' })
                } else {
                    enqueueSnackbar(message, { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
            .finally(() => {
                setLoading(false)
                setOpenDeleteDialog(false)
                setImageToDelete('')
            })
    }

    useEffect(() => {
        fetcher(`/api/image-lists/${id}`)
            .then(res => res.json())
            .then((values) => {
                setNewName(values.name)
                setImages(values.images)
                setLoading(false)
            })
            .catch(console.log)
    }, [id, reload])
    const { enqueueSnackbar } = useSnackbar();

    function updateName() {
        setSubmitting(true)
        const body = new FormData();
        body.set('name', newName)
        fetcher(`/api/image-lists/${id}`, { method: 'put', body })
            .then(res => res.json())
            .then(({ status, message = 'Exception occurred' }) => {
                if (status === 'success') {
                    enqueueSnackbar('Name Updated Successfully', { variant: 'success' })
                    setName(newName)
                } else {
                    enqueueSnackbar(message, { variant: 'error' })
                }
                setSubmitting(false)
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setSubmitting(false)
            })
    }

    function addImages({ target }) {
        setLoading(true)
        const body = new FormData()
        target.value.forEach(image => body.append('images', image))
        fetcher(`/api/image-lists/${id}/images`, { method: 'POST', body })
            .then(r => r.json())
            .then(({ status, message = 'Exception occurred' }) => {
                if (status === 'success') {
                    enqueueSnackbar('Images Added Successfully', { variant: 'success' })
                    setReload(reload + 1)
                } else {
                    enqueueSnackbar(message, { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: ({ zIndex }) => zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h2" textAlign="center">Image List Details</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={8} item>
                    <TextField
                        fullWidth
                        id="name"
                        type="text"
                        value={newName}
                        onChange={({ target }) => {
                            setNewName(target.value)
                        }}
                        name="name"
                        label="Name"
                        InputProps={{
                            endAdornment: (
                                <LoadingButton loading={submitting} onClick={updateName} disabled={newName === name}>
                                    Update
                                </LoadingButton>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Click and drag the images across to rearrange</Typography>
                </Grid>
                <Grid xs={12} item>
                    <ReactSortable tag={HStack} list={images} setList={setImages}>
                        {images.map(({ image }) => (
                            <Box key={image} position='relative' width={250}>
                                <Box position='absolute' zIndex={1}>
                                    <Tooltip title="Remove Image">
                                        <IconButton size='small' onClick={() => {
                                            setImageToDelete(image)
                                            setOpenDeleteDialog(true)
                                        }}><IconX /></IconButton>
                                    </Tooltip>
                                </Box>
                                <WorkDriveImage image={image} alt="" />
                            </Box>
                        ))}
                    </ReactSortable>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton loading={reordering} fullWidth variant='contained' onClick={reorder}>
                        Update Order
                    </LoadingButton>
                </Grid>

                <Grid item xs={12}>
                    <HionImageUpload
                        multiple
                        maxNumber={10}
                        buttonText="Choose image"
                        handleChange={addImages}
                    />
                </Grid>
            </Grid>
            <Dialog open={openDeleteDialog} onClose={() => {
                setOpenDeleteDialog(false)
            }}>
                <DialogTitle>Sure to remove the image?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action is irreversible. You'll loose the image forever
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDeleteDialog(false)
                    }}>Cancel</Button>
                    <LoadingButton onClick={() => {
                        remove()
                    }} loading={loading} variant="contained" color='error'>Remove</LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ImageListDetails;