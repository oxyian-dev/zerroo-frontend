import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'

export default function Transactions() {
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
                        Transaction Policies
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
                        Our transaction policies ensure secure, transparent, and compliant financial operations. All transactions are processed through authorized banking channels in accordance with RBI regulations.
                    </Typography>
                </Box>

                {/* Content Section */}
                <Stack spacing={3}>
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
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                pl: 3,
                                position: 'relative',
                                '&::before': {
                                    content: '"1"',
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
                            Payment of commissions/incentives to the direct sellers should be made via banks or platforms permitted by Reserve Bank of India.
                        </Typography>
                    </Box>

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
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                pl: 3,
                                position: 'relative',
                                '&::before': {
                                    content: '"2"',
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
                            The payment should be made using valid instruments like Cheques / Demand drafts / Pay orders / Wire Transfers (ECS, NEFT/EFT, RTGS, etc.) only.
                        </Typography>
                    </Box>

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
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                pl: 3,
                                position: 'relative',
                                '&::before': {
                                    content: '"3"',
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
                            The company should receive the payments against sales of product/s in its bank account/s in India and make payments to direct sellers in India via its bank accounts in India.
                        </Typography>
                    </Box>

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
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                pl: 3,
                                position: 'relative',
                                '&::before': {
                                    content: '"4"',
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
                            The company should have an account in Indian territory with a bank recognised by Reserve Bank of India through which the payments shall be received and made.
                        </Typography>
                    </Box>
                </Stack>

                {/* Additional Information Box */}
                <Box
                    sx={{
                        mt: 4,
                        p: 4,
                        borderRadius: 2,
                        bgcolor: 'rgba(239, 203, 119, 0.08)',
                        border: '2px solid rgba(239, 203, 119, 0.2)'
                    }}
                >
                    <Typography 
                        variant="h5"
                        sx={{
                            color: '#efcb77',
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            fontWeight: 600,
                            mb: 2
                        }}
                    >
                        Security & Compliance
                    </Typography>
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        All financial transactions are conducted in strict compliance with Reserve Bank of India (RBI) guidelines and Indian banking regulations. We prioritize the security and transparency of every transaction to protect both the company and our direct sellers.
                    </Typography>
                </Box>
            </Stack>
        </Container>
    )
}

// Made with Bob
