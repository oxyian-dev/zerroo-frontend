import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'

export default function BusinessInformationKit() {
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
                        Business Information Kit
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
                        Essential information about our Business Information Kit for distributors. Learn about requirements, contents, and policies.
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
                            Mandatory for all the direct sellers
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
                            No incentives/commission should be offered to the direct sellers on sale/purchase of the kit.
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
                            Should be priced below INR 1500 inclusive of applicable taxes (Marketable Conditions some products should be differ and prices also differ).
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
                            The kit should be available in language - English.
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
                                    content: '"5"',
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
                            Contents of the kit to include Business Manual including Policies and Procedures, Code of Conduct/Ethics, Details of the business model, Details of customer care including the contact numbers, Email IDs and addresses of the branches, Product catalogues, Compensation plan in detail and illustrations, Enrolment forms with terms and conditions, Product order forms and the Official website address.
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
                                    content: '"6"',
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
                            Cooling off Period – for the return of kit should be 30 days from billing date (with all contents intact and in marketable condition)
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
                                    content: '"7"',
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
                            In case of return of the kit, the company may deduct a maximum of 20% as handling charges and taxes and return the difference via cheque/ draft/reverse transaction within seven working days of receiving the returned kit at the designated address of the direct seller
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
                                    content: '"8"',
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
                            Renewal Fee of not more than INR 1500 (inclusive of applicable taxes) per year may be charged by the company to the direct seller wanting to continue association with the company. No incentive/commissions should be offered to direct sellers on renewal fees.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

// Made with Bob
