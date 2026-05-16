import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'

export default function RightsandDuties() {
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
                        Rights and Duties of the Direct Seller/Company
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
                        Understanding your rights and responsibilities as a direct seller or company representative. These guidelines ensure fair and transparent business practices.
                    </Typography>
                </Box>

                {/* Content Sections */}
                <Stack spacing={4}>
                    {/* Eligibility */}
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
                            Eligibility
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The direct seller must be eligible to enter into a valid contract under the Indian Contract Act, i.e. the direct seller must be above 18 years of age; of sound mind; and otherwise not disqualified by law to enter into a contract.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Agreement/Contract */}
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
                            Agreement/Contract
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The direct sellers must enter into an agreement with the company outlining the terms of such appointment.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Resignation */}
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
                            Resignation
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The direct seller may resign from the company without giving a reason.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Privacy */}
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
                            Privacy
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The company should have an online complaint resolution mechanism and all complaints should be resolved within 21 working days of being received by the company.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Complaint Resolution */}
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
                            Complaint Resolution
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

                    {/* Right to Know */}
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
                            Right to Know
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            Every individual (prospect) approached will have the full right to know the compensation plan and product details with relevant policies before enrolment.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Taxation */}
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
                            Taxation
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            TDS to be filed and deposited accurately and on time against the PAN numbers of the direct sellers as per the rules of the Income Tax Act, 1961.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Goods and Service Tax */}
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
                            Goods and Service Tax
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            If the company pays the Goods and Service Tax to the government on the Maximum Retail Price of the product sold to the direct sellers at wholesale prices, the direct sellers need not register for the Goods and Service tax number on crossing the threshold limit. If the company does not pay the Goods and Service Tax to the government on the Maximum Retail price of the product sold to the direct sellers at wholesale prices, the direct sellers will be required to register themselves as per the requirement.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* No Prohibition */}
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
                            No Prohibition
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            A direct seller may engage in multiple opportunities at the same time as long as he does not disturb the business of the company/ies he/she is associated with.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* No Compulsion */}
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
                            No Compulsion
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The direct selling company or direct seller should not force others to attend any event.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Essential Details */}
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
                            Essential Details
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            Each direct seller should be issued ID number with name, Address of the individual, Contact number, Address of the head office and Contact number of the company.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,.08)' }} />

                    {/* Notice */}
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
                            Notice
                        </Typography>
                        <Typography 
                            sx={{ 
                                color: 'rgba(255,255,255,.68)',
                                lineHeight: 2.1,
                                fontSize: { xs: '0.95rem', md: '1rem' }
                            }}
                        >
                            The direct sellers should be given a 3-months notice before addition or alteration of any policy related to the business.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

// Made with Bob
