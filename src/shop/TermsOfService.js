import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'
import Faq from '../components/Faq'

export default function TermsOfService() {
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
                        Terms Of Service
                    </Typography>
                    <Divider sx={{ 
                        borderColor: 'rgba(255,255,255,.08)',
                        mb: 4
                    }} />
                </Box>

                {/* Content Section */}
                <Stack spacing={3}>
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        Please read these terms carefully before using this website i.e. <Box component="a" href="http://www.victoryworld.in" target="_blank" rel="noopener noreferrer" sx={{ color: '#efcb77', textDecoration: 'none', '&:hover': { color: '#f5dc97' } }}>www.victoryworld.in</Box>. Using this website <Box component="a" href="http://www.victoryworld.in" target="_blank" rel="noopener noreferrer" sx={{ color: '#efcb77', textDecoration: 'none', '&:hover': { color: '#f5dc97' } }}>www.victoryworld.in</Box> indicates that you accept these terms. Please note that this is a business/commercial site and can be accessed only by a valid account holder. Your access and use of the Site is subject to the following terms and conditions ("Website Terms and Conditions") and all applicable laws. By accessing and browsing this Site, you accept, without limitation or qualification, the Website Terms and Conditions. If you do not agree with any of the below Terms and Conditions, do not use this Site. We reserve the right, in our sole discretion, to modify, alter or otherwise update these Website Terms and Conditions at any time and you agree to be bound by such modifications, alterations or updates. This website (operated by us from our office located in Dindigul, India) is intended as a service to the above mentioned categories of people located in India. Therefore any person who accesses this website from outside India shall do so at his/her own risk and is responsible for compliance with the laws of his/her respective jurisdiction.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        <Box component="a" href="http://www.victoryworld.in" target="_blank" rel="noopener noreferrer" sx={{ color: '#efcb77', textDecoration: 'none', '&:hover': { color: '#f5dc97' } }}>www.victoryworld.in</Box> (the "Site") is owned and operated by Victory World ("we" or "us" or Victory World), a company incorporated under the laws of India and having its Registered Office at 5/837, Naal road, Thennampatti, Vedasandur (Taluk), Dindigul -624802, India. By using this Site, you agree to the terms and conditions which constitute the entire agreement between Victory World and you. These Terms supersede all prior and contemporaneous representations, warranties and understandings, whether oral or written with respect to the Site, its contents and any services provided on the site. In the event of any conflict between these Terms and any agreement or understanding related to the Site, the Terms shall control.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        Users agree not to use the site <Box component="a" href="http://www.victoryworld.in" target="_blank" rel="noopener noreferrer" sx={{ color: '#efcb77', textDecoration: 'none', '&:hover': { color: '#f5dc97' } }}>www.victoryworld.in</Box> for sale, trade or other commercial purposes. Users may not use language that is threatening, abusive, vulgar, discourteous or criminal. Users also may not post or transmit information or materials that would violate rights of any third party or which contains a virus or other harmful component. Victory World reserves the right to remove or edit any messages or material submitted by users.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        This site is provided by Victory World on an "as is" and "as available" basis. Victory World makes no representations or warranties of any kind express or implied, as to the operation of this site or the information, content, materials, or products included on this site. You expressly agree that your use of this site is at your sole risk. To the full extent permissible by applicable law, Victory World disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        Victory World does not warrant that this site, its servers, or e-mail sent from Victory World are free of viruses or other harmful components. Victory World will not be liable for any damages of any kind arising from the use of this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        The User understands and acknowledges that any links which takes the User to third party sites is not maintained by Victory World and Victory World privacy policy does not apply. This link is provided to you for convenience and does not serve as an endorsement by Victory World of any information or contacts that you may find on this non-Victory World site. Under no circumstances, including but not limited to negligence, will Victory World be liable for special or consequential damages that result from the use or inability to use the materials in this site.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        This agreement is effective until terminated by either party. You may terminate this agreement at any time by discontinuing your use of this site and destroying all materials obtained from it.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        By using this Site you agree that these terms shall be governed by and construed in accordance with the laws of the jurisdiction of the State of Tamilnadu, India, without regard to its conflict of laws rules. By using this Site you also agree that any litigation arising out of or in connection with these Terms shall be brought in the courts of Coimbatore jurisdiction.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            pl: 3,
                            position: 'relative',
                            '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#efcb77',
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        If any provision of this agreement shall be unlawful, void, or for any reason unenforceable then that provision shall be deemed severable from this agreement and shall not affect the validity and enforceability of any remaining provisions. We may at any time revise these Terms and Conditions by updating this posting. You are bound by any such revisions and should therefore periodically visit this page to review the then current Terms and Conditions to which you are bound.
                    </Typography>
                </Stack>

                <Divider sx={{ 
                    borderColor: 'rgba(255,255,255,.08)',
                    my: 4
                }} />

                {/* FAQ Section */}
                <Box>
                    <Typography 
                        variant="h4"
                        sx={{
                            color: '#fff',
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            fontWeight: 500,
                            mb: 4
                        }}
                    >
                        Additional Terms & Policies
                    </Typography>
                    <Faq faqs={[
                        {
                            question: "COPYRIGHTS",
                            answer: `Material on this website, including but not limited to text, images, illustrations, etc. are protected by copyrights which are owned and controlled by us and is the property of the Victory World. All rights in this material are reserved. The information and images presented here may not under any circumstances be reproduced or used without prior written permission. Users may view and download material from this site only for personal, non-commercial home use. Any act to copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way or publicly display material from this website without the written permission of Victory World will constitute an infringement of the Copyright.<br>
                               You may not use any Victory World logo or other proprietary graphic or trademark as part of the link without express written permission.`
                        },
                        {
                            question: "INFORMATION/IDEAS SUBMISSION BY THE NW IBO's/NLA's",
                            answer: `Any information or material submitted by you to Victory World website [www.victoryworld.in] (whether through e-mail, written letter or otherwise) will be deemed non-proprietary and non-confidential, and may be used by Victory World without restriction. Not with standing the foregoing, all personal data (e.g., name, address and telephone number) provided to Victory World will be handled in accordance with Victory World Policy.`
                        },
                        {
                            question: "LIMITATIONS",
                            answer: `If you are damaged or injured by any of the Material contained in the Site, or you are dissatisfied with the Site or Material for any reason, then your sole and exclusive remedy is to discontinue accessing and using the Site.<br>

<span><b>LINKED SITES</b></span><br>

We may provide links and pointers to Internet sites maintained by others ("Third Party Sites"). We are not responsible for the contents of or any products or services offered in such Third Party Sites.`
                        },
                        {
                            question: "REFUND POLICY",
                            answer: `We are confident about our products what we sell and we give a FULL MONEY BACK GUARANTEE (Deduction of Tax, shipping charges & Service charges) within 30 days of invoice date. If you are not satisfied with any product you may return it back to us and you will qualify for a full refund (minus of tax and handling charges), however the shipping charges will be borned by the user.
<br><br>
Refunds Terms & Conditions:<br><br>

1. If refund requested after delivery then we refund within 5 working days of product returned back to us and received by the Dispatch team of Victory World.
<br><br>
2. Refund only possible if, the product is delivered back & shipment cost to be borne by the customer.<br><br>
3. If the goods are delivered in the damaged condition to the customer, then the shipping cost is to be borne by the company. And we will reship the product.<br><br>
4. Mode of refund would be Fund Transfer i.e. NEFT/RTGS.<br><br>
5. No Exchange Policy: Customer can send product back and claim refund.<br><br>
6. No Cancellation Policy: If, customer cancels midway after product shipped they will have the ship it back and claim refund.<br><br>
7. If the product order needs to be cancelled due to any reason prior the receipt, shipping charges will not be charged if product not shipped at that point of time.`
                        },
                        {
                            question: "LEGAL ISSUES",
                            answer: `This agreement shall be governed by, construed and enforced solely in accordance with the laws of the India and the courts at Dindigul, Tamilnadu. Shall have exclusive jurisdiction in this regard. This is the entire agreement between the parties relating to the matters contained herein.`
                        },
                        {
                            question: "TERMINATION",
                            answer: `This agreement will terminate immediately without notice from us if in our sole discretion you fail to comply with any term or provision of this Agreement. Upon termination, you must destroy all materials obtained from this Site and all copies thereof, whether made under the terms of this Agreement or otherwise. In the event of termination, the disclaimers of warranties and limitations of liabilities, damages and remedies set forth in this Agreement shall survive.`
                        },
                        {
                            question: "DISCLAIMER OR LIMITATION OF LIABILITY",
                            answer: `Our products are not a medicine and not intended to treat, Cure or prevent any disease. The products, information, services and other content provided on and through this site, including without limitation any products, information, services and other content provided on any Linked Site, are provided for informational purposes only to facilitate discussions with your <b>Fashion products</b>.  
<br><br>
The information provided on this site and Linked Sites, including without limitation information relating to products and treatments is often provided in summary or aggregate form.</b> </span>
<br>
Images used in the website are imaginary representation only. Actual Product may vary.`
                        },
                    ]} />
                </Box>
            </Stack>
        </Container>
    )
}

// Made with Bob
