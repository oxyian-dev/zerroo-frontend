import { Container, Stack, Typography, Box, Divider, Grid } from '@mui/material'
import React from 'react'

const sections = [
    {
        title: 'Direct Selling Compensation',
        text: 'Direct Sellers receive commissions, offers, or other benefits only from the profits earned through the sale of products or services. The Company does not collect any entry fee, registration fee, recruitment charge, membership fee, or subscription fee to become a customer, member, Direct Seller, Independent Distributor, Business Associate, or Business Promoter. Joining the direct selling business is entirely voluntary.'
    },
    {
        title: '2:1 Qualification Requirement',
        text: 'Every qualifying product generates 80 PV. A user first becomes eligible for income when the left and right sides achieve a 2:1 PV ratio during cutoff processing. At that stage, the first qualification payout of ₹800 is credited.'
    },
    {
        title: 'First Income Payout',
        text: 'The initial qualification payout is a one-time event. It is paid only when the 2:1 ratio condition is met and the cutoff is processed.'
    },
    {
        title: 'Subsequent 1:1 Pair Matching',
        text: 'After the qualification payout, the plan switches to 1:1 pair matching. Every additional 80 PV on the left and 80 PV on the right forms one pair and earns ₹800.'
    },
    {
        title: 'Carry Forward',
        text: 'Unmatched PV is carried forward and can be used in future cutoff cycles. This keeps the balance ready until the opposite side matches.'
    },
    {
        title: 'Income Summary',
        text: 'Initial qualification payout = ₹800. Each subsequent 1:1 pair = ₹800. Unmatched PV remains in carry forward until a matching PV appears on the opposite side.'
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
                            fontWeight: 700,
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
                        This page explains the 2:1 qualification stage first and the 1:1 pair-matching stage thereafter so the compensation rule is clear and transparent.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 3,
                                height: '100%',
                                borderRadius: 2,
                                bgcolor: 'rgba(239, 203, 119, 0.08)',
                                border: '1px solid rgba(239, 203, 119, 0.18)'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#efcb77',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    mb: 1.5
                                }}
                            >
                                Quick Rule
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#fff',
                                    fontSize: { xs: '1.4rem', md: '1.8rem' },
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    mb: 2
                                }}
                            >
                                2:1 qualification first, then 1:1 pair matching
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    lineHeight: 2,
                                    fontSize: { xs: '0.95rem', md: '1rem' }
                                }}
                            >
                                The first payout happens when the 2:1 PV ratio is achieved and the cutoff is processed. After that, each new 80 PV left plus 80 PV right pair earns the standard ₹800 gross income.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                p: 3,
                                height: '100%',
                                borderRadius: 2,
                                bgcolor: 'rgba(239, 203, 119, 0.05)',
                                border: '1px solid rgba(239, 203, 119, 0.1)'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#efcb77',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    mb: 1.5
                                }}
                            >
                                Income Flow
                            </Typography>
                            <Stack spacing={1.25}>
                                {[
                                    'Qualification payout = ₹800',
                                    'Every 1:1 pair = ₹800',
                                    'Unmatched PV carries forward',
                                    'Cutoff processing applies the payout'
                                ].map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                            px: 2,
                                            py: 1.35,
                                            borderRadius: 1.5,
                                            bgcolor: 'rgba(255,255,255,.03)',
                                            border: '1px solid rgba(255,255,255,.06)',
                                            color: 'rgba(255,255,255,.82)',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {item}
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

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
                </Stack>
            </Stack>
        </Container>
    )
}
