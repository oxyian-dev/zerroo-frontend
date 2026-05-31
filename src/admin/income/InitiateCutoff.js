import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import fetcher from "../../utils/fetcher";

const Cutoff = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const initiateCutoff = () => {
        setLoading(true);
        fetcher('/api/cutoffs/initiate', { method: 'post' })
            .then(r => r.json())
            .then(({ status, message = 'Exception occurred' }) => {
                if (status === 'success') {
                    enqueueSnackbar('Qualification Cutoff Initiated', { variant: 'success' })
                    navigate('/admin/cutoffs')
                } else {
                    enqueueSnackbar(message?.trim() || 'Unable to initiate cutoff', { variant: 'error' })
                }
                setLoading(false);
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
                setLoading(false);
            })
    }

    return (
        <Card elevation={2}>
            <CardContent>
                <Stack spacing={2}>
                    <Box textAlign="center">
                        <Image
                            width="200"
                            height="200"
                            src="/img/cutoff.webp"
                            alt=""
                        />
                    </Box>
                    <Typography gutterBottom variant="h3" component="div">
                        Initiate Qualification Cutoff?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This process is highly critical and cannot be undone. Are you sure you want to initiate this qualification cutoff?
                    </Typography>
                    <TextField required fullWidth value={value} onChange={({ target }) => {
                        setValue(target.value)
                    }} label="Enter Initiate Qualification Cutoff" helperText="Type Initiate Qualification Cutoff" />
                    <LoadingButton fullWidth loading={loading} size="large" variant="contained"
                        disabled={value !== 'Initiate Qualification Cutoff'}
                        onClick={() => {
                            initiateCutoff()
                        }}
                    >
                        Initiate
                    </LoadingButton>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Cutoff
