import { Container, Stack, Typography } from '@mui/material'
import React from 'react'


export default function BusinessInformationKit() {
    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h1" mb={4}>
                Business Information Kit
            </Typography>
            <Stack spacing={2}>
                <Typography>
                    1.Mandatory for all the direct sellers
                </Typography>
                <Typography>
                    2.No incentives/commission should be offered to the direct sellers on sale/purchase of the kit.
                </Typography>
                <Typography>
                    3.Should be priced below INR 1500 inclusive of applicable taxes (Marketable Conditions some products should be differ and prices also differ).
                </Typography>
                <Typography>
                    4.The kit should be available in language - English.
                </Typography>
                <Typography>
                    5.Contents of the kit to include Business Manual including Policies and Procedures, Code of Conduct/Ethics, Details of the business model, Details of customer care including the contact numbers, Email IDs and addresses of the branches, Product catalogues, Compensation plan in detail and illustrations, Enrolment forms with terms and conditions, Product order forms and the Official website address.
                </Typography>
                <Typography>
                    6.Cooling off Period – for the return of kit should be 30 days from billing date (with all contents intact and in marketable condition)

                </Typography>
                <Typography>
                    7.In case of return of the kit, the company may deduct a maximum of 20% as handling charges and taxes and return the difference via cheque/ draft/reverse transaction within seven working days of receiving the returned kit at the designated address of the direct seller
                </Typography>
                <Typography>
                    8.Renewal Fee of not more than INR 1500(inclusive of applicable taxes) per year may be charged by the company to the direct seller wanting to continue association with the company. No incentive/commissions should be offered to direct sellers on renewal fees.
                </Typography>
            </Stack>
        </Container>
    )
}
