import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image";
import fetcher from "../../utils/fetcher";

const InitiatePayout = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const initiatePayout = () => {
        setLoading(true);
        fetcher('/api/payouts/initiate', { method: 'post' })
            .then(r => r.json())
            .then(({ status, message = 'Exception occurred' }) => {
                if (status === 'success') {
                    enqueueSnackbar('Payout Initiated', { variant: 'success' })
                    navigate('/admin/payouts')
                } else {
                    enqueueSnackbar(message, { variant: 'error' })
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
                            src="/img/payout.webp"
                            alt=""
                        />
                    </Box>
                    <Typography gutterBottom variant="h3" component="div">
                        Initiate Payout?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This process is Highly critical and cannot be undone. Are you sure you want to initiate this Payout?
                    </Typography>
                    <TextField required fullWidth value={value} onChange={({ target }) => {
                        setValue(target.value)
                    }} label="Enter Initiate Payout" helperText="Type Initiate Payout" />
                    <LoadingButton fullWidth loading={loading} size="large" variant="contained"
                        disabled={value !== 'Initiate Payout'}
                        onClick={() => {
                            initiatePayout()
                        }}
                    >
                        Initiate
                    </LoadingButton>
                </Stack>
            </CardContent>
        </Card>

    )
}

export default InitiatePayout