import { Container, Stack, Typography } from '@mui/material'
import React from 'react'


export default function Transactions() {
    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h1" mb={4}>
                Transactions
            </Typography>
            <Stack spacing={2}>
                <Typography>
                    1.Payment of commissions/incentives to the direct sellers should be made via banks or platforms permitted by Reserve bank of India.
                </Typography>
                <Typography>
                    2.The payment should be made using valid instruments like Cheques / Demand drafts / Pay orders/ Wire Transfers (ECS, NEFT/EFT, RTGS, etc.) only.
                </Typography>
                <Typography>
                    3.The company should receive the payments against sales of product/s in its bank account/s in India and make payments to direct sellers in India via its bank accounts in India.
                </Typography>
                <Typography>
                    4.The company should have an account in Indian territory with a bank recognised by Reserve Bank of India through which the payments shall be received and made.
                </Typography>
            </Stack>
        </Container>
    )
}
