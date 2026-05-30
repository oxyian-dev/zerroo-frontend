import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'

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
                        Compensation Plan
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
                        Our compensation plan is designed to reward your efforts fairly and transparently. Learn about the guidelines and policies that govern our compensation structure.
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
                        Binary pair match rule: 80 PV on the left and 80 PV on the right completes one pair and earns ₹800. Unmatched PV carries forward until the opposite side is matched.
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
                            The commissions/incentives should only be paid out on the retail of product/s.
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
                            The direct seller should have the opportunity to earn by retailing of products even though he may not have introduced any direct sellers in his/her tree structure/marketing organization.
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
                            The direct seller should purchase the qualifying 80 PV product to activate and start earning income from the compensation plan. There is no compulsory purchase beyond this qualifying product, and any additional self-consumption or retail should be done only to support business growth and income qualification.
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
                            No charge/fees for enrolment.
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
                            No commissions/incentives or rewards should be given/offered to the direct sellers for enrolment of new direct sellers.
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
                            Payment of Incentives/Commission – The payment of commissions/incentives should be made without fail and delay as per the commitments of the compensation plan followed by the company.
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
                            Calculations for all the illustrations used for explaining the compensation plan (online and offline) should be done and shown in Indian rupees only.
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
                            Equal Opportunity – The company should follow a single ID per individual policy and not promote and/or offer multiple IDs to people while not encouraging direct sellers to offer/provide power legs/existing network of direct sellers or additional incentives to prospects or other direct sellers. The company should also not offer additional incentives other than those mentioned in the compensation plan. The promotions launched by the company in public domain from time to time is however allowed.
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
                                    content: '"9"',
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
                            The company should not provide commitments of returns on investment/s (on purchase of product/s or without the purchase of product/s) in the form of interest, salary, loan, help, donation, market development fees and support fund to/through the direct sellers, to any individual/s.
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
                            The company should not generate or pay-out or commit commissions/incentives against part payment or advance received against the sale or future commitment to sell any product/s.
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
                                    content: '"11"',
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
                            The company should not deduct any charges (except Tax deducted at source & Admin charges) from pay-outs of the direct sellers.
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
                                    content: '"12"',
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
                            The company should deduct (Tax deducted at source) from the pay-outs to the direct sellers
                            <br /><br />
                            TDS @ 10% in case of availability of the PAN details of the direct sellers.
                            <br /><br />
                            TDS @ 20% in the event of non-availability of PAN details
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
                                    content: '"13"',
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
                            Income/opportunity disclaimer to be the part of the compensation plan literature and should be displayed prominently before or after the presentation of the compensation plan every time.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

// Made with Bob
