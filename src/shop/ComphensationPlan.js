import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'

const sections = [
    {
        title: 'Direct Selling Compensation',
        text: 'Direct Sellers will receive commissions, offers, or other benefits only from the profits earned through the sale of products or services. The Company does not collect any entry fee, registration fee, recruitment charge, membership fee, or subscription fee to become a customer, member, Direct Seller, Independent Distributor, Business Associate, or Business Promoter of the Company. Any person who wishes to join the Direct Selling business of the Company may do so voluntarily, based entirely on their own free will and consent.'
    },
    {
        title: 'Fast Track Weekly Income',
        text: 'We are currently providing Fast Track Weekly Income. In future, we will introduce Monthly Income also. Eligible MPV, limited to 6,000 MPV in a week after reducing any MPV allotted to Super Discount Vouchers, will be considered for the Weekly Income. One MPV is equal to Rs.10 at present and may vary from time to time; direct sellers will be informed accordingly. The eligible MPV will be multiplied by Rs.10 and credited as commission to the respective direct seller’s bank account after deduction of TDS.'
    },
    {
        title: 'Participation Rule',
        text: 'To participate in the Fast Track Weekly Cycle, each business center has to purchase at least any one of the available special or combo product packs. This purchase is not compulsory and is optional only.'
    },
    {
        title: 'Weekly Cycle Illustration',
        text: 'Matched PV of BC1 = 6,000 PV. In that case, 6,000 PV will be accounted as commission.'
    },
    {
        title: 'Fast Track Weekly Conditions',
        text: 'Matched PV is limited to 6,000 PV. Unmatched PV will be carried forward to the next week. Trimming is applicable. Tail is applicable.'
    },
    {
        title: 'Definitions',
        text: 'PV means Point Value. MPV means Matched Point Value. BV means Business Value, and in general it is approximately equal to the invoice value of a product less GST and other costs, if any. MPV to INR conversion may vary from time to time, and direct sellers will be informed accordingly. Current value of 1 MPV is equal to Rs.10 only.'
    },
    {
        title: 'Carry Forward',
        text: 'Carry Forwards means that in the Fast Track Weekly Cycle, unmatched PV will be carried forward to the next week. In the Solid Monthly Cycle, unmatched PV will not be carried forward to the next month.'
    },
    {
        title: 'Trimming',
        text: 'Trimming is applicable when the total benefit to all the direct sellers of the company exceeds the allotted 80% share of profit from the sale of products and services. This is applicable in both the Solid Monthly and Fast Track Weekly Cycles.'
    },
    {
        title: 'Tail',
        text: 'Tail means the first-time MPV qualifier needs a minimum of 120 PV from any one of the team. It is applicable only in the Fast Track Weekly Cycle and not applicable in the Solid Monthly Cycle.'
    }
]

export default function ComphensationPlan() {
    return (
        <Container
            maxWidth="lg"
            sx={{
                py: { md: 14, xs: 10 },
                px: { md: 10, xs: 3 }
            }}
        >
            <Stack spacing={6}>
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
                        Compensation Plan
                    </Typography>
                    <Divider
                        sx={{
                            borderColor: 'rgba(255,255,255,.08)',
                            mb: 4
                        }}
                    />
                    <Typography
                        sx={{
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        This page explains the current Fast Track Weekly Income policy and the planned Monthly Income structure for direct sellers. It also defines MPV, PV, BV, carry forward, trimming, and tail so the compensation logic is clear and transparent.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'rgba(239, 203, 119, 0.08)',
                        border: '1px solid rgba(239, 203, 119, 0.18)'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#ffffff',
                            lineHeight: 1.9,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            fontWeight: 500
                        }}
                    >
                        Current Value of 1 MPV is equal to Rs.10 only. Eligible MPV in a week, after excluding any MPV allotted to Super Discount Vouchers, will be considered for Weekly Income and credited after deduction of TDS.
                    </Typography>
                </Box>

                <Stack spacing={3}>
                    {sections.map((section, index) => (
                        <Box
                            key={section.title}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                bgcolor: 'rgba(239, 203, 119, 0.05)',
                                border: '1px solid rgba(239, 203, 119, 0.1)'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#efcb77',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    mb: 1.5,
                                    pl: 3,
                                    position: 'relative',
                                    '&::before': {
                                        content: `"${index + 1}"`,
                                        position: 'absolute',
                                        left: 0,
                                        color: '#efcb77',
                                        fontWeight: 'bold',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: '2px solid #efcb77',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.875rem'
                                    }
                                }}
                            >
                                {section.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    lineHeight: 2.1,
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    pl: 3
                                }}
                            >
                                {section.text}
                            </Typography>
                        </Box>
                    ))}

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            bgcolor: 'rgba(239, 203, 119, 0.05)',
                            border: '1px solid rgba(239, 203, 119, 0.1)'
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#efcb77',
                                fontSize: '1rem',
                                fontWeight: 600,
                                mb: 1.5,
                                pl: 3,
                                position: 'relative',
                                '&::before': {
                                    content: '"10"',
                                    position: 'absolute',
                                    left: 0,
                                    color: '#efcb77',
                                    fontWeight: 'bold',
                                    width: '28px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    border: '2px solid #efcb77',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem'
                                }
                            }}
                        >
                            Summary
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                pl: 3
                            }}
                        >
                            This compensation plan is based on direct selling, fast track weekly cycle income, and future monthly income. Unmatched PV carries forward in the weekly cycle, trimming applies where required, and tail applies only in the Fast Track Weekly Cycle.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

