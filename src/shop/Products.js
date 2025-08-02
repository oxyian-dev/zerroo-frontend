import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Faq from '../components/Faq'

export default function Products() {
    return (
        <Container sx={{ my: 4 }}>
            <Stack spacing={2}>
                <Typography variant="h1">
                    Products
                </Typography>
                <Typography>
                    <b>Price</b> – Maximum Retail Price of the product/s should be displayed clearly on the package and the official website of the company.

                </Typography>
                <Typography>
                    The company should give a notice of at least 30 days to all its              active direct sellers before modifying the price of any product.
                </Typography>
                <Typography>
                    <b>Tax</b> – the company should pay the applicable tax (Goods and Service tax) at M.R.P. (Maximum retail price).
                </Typography>
                <Typography>
                    <b>Satisfaction Guarantee</b> – A Satisfaction Guarantee / Refund Policy of at least 30 days from invoicing of the product. This policy will be applicable only if not more than 30% of the product is consumed in case of consumable products. The consumer should be refunded 100% (minus the taxes) of the amount collected against the product by the direct seller. In case of non-consumable products, the product may only be returned if in marketable condition. The consumer should also be given an opportunity to exchange the goods within 30 days if they find any manufacturing defect or the product is not useful for the purpose it was meant.
                </Typography>
                <Typography>
                    <b>Money back Guarantee</b> – Money back guarantee within 30 days from invoicing of the product. This policy would apply to all the goods returned in marketable condition. The direct sellers should be refunded 100% (minus the taxes) of the invoiced amount, however the shipping charges will be borned by the user.

                </Typography>
                <Typography>
                    <b>Service support</b> – for products promoted by the company is the responsibility of the direct selling company.
                </Typography>
                <Typography>
                    <b> Non-delivery of product/s</b> – On non-delivery of the products / services to the direct seller within 20 days of invoicing (after the receipt of the payment by the company), the company, on request by the direct seller via email or post, will refund the entire amount paid by the direct seller by cheque / demand draft / pay order / reverse transaction within 7 working days of receiving the request.

                </Typography>
                <Typography>
                    <b> Product Claims</b> – all the claims made by the company (on the official website and literature, including brochures, packaging, and labels)
                </Typography>
                <Typography>

                    <b>Products to be promoted under specific conditions</b>:

                </Typography>
                <Typography>
                    <b> Gift Vouchers / Coupons</b> – commissions / incentives to paid out only after redemption of the vouchers / coupons.

                </Typography>
                <Typography>
                    <b>Discount vouchers / coupons / promissory notes</b> – commissions / incentives to be paid out only for the purchase of products bought using the same.

                </Typography>
                <Typography>
                    Online products including software applications / products, e-learning, websites, video emails / mails, etc. should have a money back guarantee of a minimum of 30 days after activation by the consumer. In case of non-activation of an online product for more than one month, the sale would be considered invalid, after which the consumer would have full right to demand his money back. Activation should include confirmation via email registered to the consumer and mobile number.

                </Typography>
            </Stack>
        </Container>
    )
}