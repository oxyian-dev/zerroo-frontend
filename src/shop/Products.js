import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'

export default function Products() {
    return (
        <Container 
            maxWidth="lg"
            sx={{ 
                py: { md: 14, xs: 10 }, 
                px: { md: 10, xs: 3 }
            }}
        >
            <Stack spacing={6}>
                {/* Page Header */}
                <Box>
                    <Typography 
                        variant="h1" 
                        sx={{
                            color: '#efcb77',
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            mb: 2
                        }}
                    >
                        Product Policies
                    </Typography>
                    <Divider sx={{ 
                        borderColor: 'rgba(255,255,255,.08)',
                        mb: 4
                    }} />
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        Our comprehensive product policies ensure transparency, quality, and customer satisfaction. Learn about pricing, guarantees, and service support.
                    </Typography>
                </Box>

                {/* Content Sections */}
                <Stack spacing={4}>
                    {/* Price Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Price
                        </Typography>
                        <Stack spacing={2}>
                            <Typography 
                                sx={{ 
                                    color: 'rgba(255,255,255,.68)',
                                    lineHeight: 2.1,
                                    fontSize: { xs: '0.95rem', md: '1rem' }
                                }}
                            >
                                Maximum Retail Price of the product/s should be displayed clearly on the package and the official website of the company.
                            </Typography>
                            <Typography 
                                sx={{ 
                                    color: 'rgba(255,255,255,.68)',
                                    lineHeight: 2.1,
                                    fontSize: { xs: '0.95rem', md: '1rem' }
                                }}
                            >
                                The company should give a notice of at least 30 days to all its active direct sellers before modifying the price of any product.
                            </Typography>
                        </Stack>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Tax Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Tax
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The company should pay the applicable tax (Goods and Service tax) at M.R.P. (Maximum retail price).
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Satisfaction Guarantee Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Satisfaction Guarantee
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            A Satisfaction Guarantee / Refund Policy of at least 30 days from invoicing of the product. This policy will be applicable only if not more than 30% of the product is consumed in case of consumable products. The consumer should be refunded 100% (minus the taxes) of the amount collected against the product by the direct seller. In case of non-consumable products, the product may only be returned if in marketable condition. The consumer should also be given an opportunity to exchange the goods within 30 days if they find any manufacturing defect or the product is not useful for the purpose it was meant.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Money Back Guarantee Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Money Back Guarantee
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            Money back guarantee within 30 days from invoicing of the product. This policy would apply to all the goods returned in marketable condition. The direct sellers should be refunded 100% (minus the taxes) of the invoiced amount. There are no delivery charges on Victory World orders.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Service Support Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Service Support
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            Service support for products promoted by the company is the responsibility of the direct selling company.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Non-delivery Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Non-delivery of Product/s
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            On non-delivery of the products / services to the direct seller within 20 days of invoicing (after the receipt of the payment by the company), the company, on request by the direct seller via email or post, will refund the entire amount paid by the direct seller by cheque / demand draft / pay order / reverse transaction within 7 working days of receiving the request.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Product Claims Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 2
                            }}
                        >
                            Product Claims
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            All the claims made by the company (on the official website and literature, including brochures, packaging, and labels) must be accurate and verifiable.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Special Conditions Section */}
                    <Box>
                        <Typography 
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            Products to be Promoted Under Specific Conditions
                        </Typography>
                        <Stack spacing={3}>
                            <Box>
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        color: '#f5dc97',
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        fontWeight: 500,
                                        mb: 1.5
                                    }}
                                >
                                    Gift Vouchers / Coupons
                                </Typography>
                                <Typography 
                                    sx={{ 
                                        color: 'rgba(255,255,255,.68)',
                                        lineHeight: 2.1,
                                        fontSize: { xs: '0.95rem', md: '1rem' }
                                    }}
                                >
                                    Commissions / incentives to be paid out only after redemption of the vouchers / coupons.
                                </Typography>
                            </Box>

                            <Box>
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        color: '#f5dc97',
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        fontWeight: 500,
                                        mb: 1.5
                                    }}
                                >
                                    Discount Vouchers / Coupons / Promissory Notes
                                </Typography>
                                <Typography 
                                    sx={{ 
                                        color: 'rgba(255,255,255,.68)',
                                        lineHeight: 2.1,
                                        fontSize: { xs: '0.95rem', md: '1rem' }
                                    }}
                                >
                                    Commissions / incentives to be paid out only for the purchase of products bought using the same.
                                </Typography>
                            </Box>

                            <Box>
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        color: '#f5dc97',
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        fontWeight: 500,
                                        mb: 1.5
                                    }}
                                >
                                    Online Products
                                </Typography>
                                <Typography 
                                    sx={{ 
                                        color: 'rgba(255,255,255,.68)',
                                        lineHeight: 2.1,
                                        fontSize: { xs: '0.95rem', md: '1rem' }
                                    }}
                                >
                                    Online products including software applications / products, e-learning, websites, video emails / mails, etc. should have a money back guarantee of a minimum of 30 days after activation by the consumer. In case of non-activation of an online product for more than one month, the sale would be considered invalid, after which the consumer would have full right to demand his money back. Activation should include confirmation via email registered to the consumer and mobile number.
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

// Made with Bob
