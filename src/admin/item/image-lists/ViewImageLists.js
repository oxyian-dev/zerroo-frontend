/**
 * View Image Lists
 * Add Image to existing List
 * Remove Image from existing List
 * Rearrange Image order
 */
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { IconCirclePlus, IconPhoto } from "@tabler/icons";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";
import fetcher from "../../../utils/fetcher";
import { WorkDriveImage } from "../../../utils/util";
import ImageListDetails from "./ImageListDetails";

const AddImageDialog = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (!name) {
            setError(true)
        } else {
            setIsSubmitting(true)
            const body = new FormData();
            body.set('name', name)
            fetcher(`/api/image-lists`, { method: 'POST', body })
                .then(res => res.json())
                .then(({ status, id }) => {
                    if (status === 'success') {
                        enqueueSnackbar('Image List Added Successfully', { variant: 'success' })
                        navigate(`/admin/image-lists/${id}`)
                    } else {
                        enqueueSnackbar('Exception Occurred', { variant: 'error' })
                        setIsSubmitting(false)
                    }
                })
                .catch(() => {
                    enqueueSnackbar('Error occurred', { variant: 'error' })
                    setIsSubmitting(false)
                })
        }
    }
    return (
        <Box>
            <Box textAlign="right" mb={2}>
                <Button fullWidth size="large" color="success" variant="contained" onClick={handleClickOpen}
                    startIcon={<IconCirclePlus />}>
                    Add
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new Image List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name and click Add. This name should be unique and is used for mapping images to items.
                    </DialogContentText>
                    <TextField
                        sx={{ mt: 3 }}
                        autoFocus
                        id="name"
                        label="Image List Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        error={error}
                        value={name}
                        onChange={({ target }) => {
                            if (target.value) {
                                setError(false)
                            }
                            setName(target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <LoadingButton loading={isSubmitting} onClick={handleSubmit} variant="contained">Add</LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const ViewImageDataGrid = () => {
    const render = [];
    render[0] = ({ value }) => (
        <Tooltip title="View Images" placement="top">
            <IconButton component={Link} to={`/admin/image-lists/${value}`}><IconPhoto /></IconButton>
        </Tooltip>
    )
    render[2] = ({ value }) => <>{value.map(image => <WorkDriveImage key={image} auto="width" image={image} alt="" />)}</>

    const filter = [false, false, false]

    const sortable = [false]

    const width = [100, 300, 450]

    const ListDetailComponent = useCallback(({ row }) => {
        const apiRef = useGridApiContext();
        const [width, setWidth] = useState(() => {
            const dimensions = apiRef.current.getRootDimensions();
            return dimensions.viewportInnerSize.width;
        });

        const handleViewportInnerSizeChange = useCallback(() => {
            const dimensions = apiRef.current.getRootDimensions();
            setWidth(dimensions.viewportInnerSize.width);
        }, [apiRef]);

        useEffect(() => {
            return apiRef.current.subscribeEvent(
                'viewportInnerSizeChange',
                handleViewportInnerSizeChange,
            );
        }, [apiRef, handleViewportInnerSizeChange]);

        return (
            <Box width={width} p={2} borderTop={1}>
                <ImageListDetails id={row.id} />
            </Box>
        )
    }, [])

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">View Image List</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                render={render}
                filter={filter}
                width={width}
                sortable={sortable}
                ajax={{ url: '/api/image-lists' }}
                customize={{ rowHeight: 150 }}
                getDetailPanelContent={({ row }) => <ListDetailComponent row={row} />}
                getDetailPanelHeight={() => 'auto'}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Name", "field": "Name", "width": "300", "id": "Name" },
                    { "headerName": "Images", "field": "Images", "width": "450", "id": "Images" },
                    { "headerName": "Items", "field": "Items", "width": "200", "id": "Items" }
                ]}
            />
        </Stack>
    )
}

const ViewImageLists = () => {
    return (
        <Box>
            <AddImageDialog />
            <ViewImageDataGrid />
        </Box>
    )
}
export default ViewImageLists;