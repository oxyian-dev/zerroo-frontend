import { Container, Stack, Typography, Box, Divider } from '@mui/material'
import React from 'react'
import Faq from '../components/Faq'

export default function PrivacyPolicy() {
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
                        Privacy Policy
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
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        The purpose of this Privacy Policy is to inform you about the type of information we may collect when you visit <Box component="a" href="http://www.zerroo.in" target="_blank" rel="noopener noreferrer" sx={{ color: '#efcb77', textDecoration: 'none', '&:hover': { color: '#f5dc97' } }}>www.zerroo.in</Box>, how we may use the information and the choices you have regarding our use of your information and your ability to correct the information or its use at any point.
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        We, ZERABIZ ECOM LLP (<Box component="a" href="http://www.zerroo.in" target="_blank" rel="noopener noreferrer" sx={{ color: '#efcb77', textDecoration: 'none', '&:hover': { color: '#f5dc97' } }}>www.zerroo.in</Box>), consider your privacy as very important to us. Our relationship with you is our most valuable asset and is the very basis of our name and reputation. We understand the importance you place on the privacy and security of information that personally identifies you or your account information. We refer to and treat this information as "personal information".
                    </Typography>
                    
                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        We do reserve the right to disclose or report personal information in limited circumstances where we believe in good faith that disclosure is required under law, to cooperate with regulators or law enforcement authorities, or to protect our rights or property. Our Privacy Policy has stipulated guidelines to ensure your privacy is protected. The following guidelines ensure that the information we collect about you are not misused.
                    </Typography>

                    <Divider sx={{ 
                        borderColor: 'rgba(255,255,255,.08)',
                        my: 4
                    }} />

                    {/* Key Points Section */}
                    <Typography 
                        variant="h4"
                        sx={{
                            color: '#fff',
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            fontWeight: 500,
                            mb: 2
                        }}
                    >
                        Key Privacy Guidelines
                    </Typography>

                    <Stack spacing={2.5}>
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
                            If you choose to give us personal information via the Internet that we or our business partners may need -- to correspond with you, process an information request or provide you with a download, for example -- it is our intent to let you know how we will use such information. If you tell us that you do not wish to have this information used as a basis for further contact with you, we will respect your wishes.
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
                            We do not analyze the data which track the domain from which people visit us to identify you personally.
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
                            Except in circumstances where the law of the land requires us to disclose the information we will not disclose the information about you to any third party. This will also protect you from the sale, rent, trade or display of your personal information to any third parties; and we will not use your email address for unsolicited marketing unless we have your permission.
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
                            You also consent to Zerabiz Ecom LLP disclosing information about you to actual or potential parties to a lawsuit that Zerabiz Ecom LLP is or may become involved in (a) if it required to do so, (b) if it reasonably believes that such disclosures will potentially mitigate its liability, or (c) to enforce its rights.
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
                            On occasions we may assist a company that is not affiliated with Zerabiz Ecom LLP in providing or offering a product or service to you. In such circumstances, marketing materials will include instructions on how you can request not to receive those communications in the future. In all cases your personal information is protected by a strict confidentiality agreement. We do not allow any non-affiliated company to retain your personal information longer than necessary to provide the product, service, or information, unless you affirmatively grant us permission to do so.
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
                            In the case that Zerabiz Ecom LLP sold substantially all of its assets or was acquired (or went out of business or entered bankruptcy), customer information is typically one of the business assets that is transferred in connection with such a transaction. You acknowledge that such transfers may occur and that any acquirer of Zerabiz Ecom LLP may continue to use your personal information as set forth in this policy.
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
                            Zerabiz Ecom LLP corporate policies require that employees with access to confidential customer information may not use or disclose the information except for business use. All employees are required to safeguard such information, as specified in their confidentiality agreements with Zerabiz Ecom LLP.
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
                            We do reserve the right to disclose or report personal information in limited circumstances where we believe in good faith that disclosure is required under law, to cooperate with regulators or law enforcement authorities, or to protect our rights or property.
                        </Typography>
                    </Stack>

                    <Typography 
                        sx={{ 
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 2.1,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            mt: 3
                        }}
                    >
                        We continue to evaluate our efforts to protect personal information and make every effort to keep your personal information accurate and up to date. If you identify any error in your personal information or need to make a change to that information, please contact us and we will promptly update our records.
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
                        Frequently Asked Questions
                    </Typography>
                    <Faq faqs={[
                        {
                            question: "Use of Active-X and Java Applets on this Site",
                            answer: `Active-X programs and Java Applets are executable programs transferred to your computer's hard drive that cause your computer to perform functions in connection with your visit to a Web site.`
                        },
                        {
                            question: "Cookies",
                            answer: `To personalize your experience on our Website or with one of our promotions, we may assign your computer browser a unique random number, called a "cookie." Cookies enhance the Zerabiz Ecom LLP (www.zerroo.in) website performance in several important ways: they personalize your experience on our site, and they make your visit to our site more convenient for you.<br></br>
                            Your privacy and security are not compromised when you accept a cookie from our Website. We do not use cookies to collect personal information. Cookies can't read data from your computer's hard disk or read cookie files from other Websites. In addition, companies we may hire to evaluate our Web promotions may set cookies to assist with such an evaluation. Again, neither Zerabiz Ecom LLP nor companies acting on our behalf use cookies to collect personal information.`
                        },
                        {
                            question: "Use of Third-Party Media and Research Companies",
                            answer: `Our Site does not run third-party advertisements, nor do we use third-party media and research companies to place advertisements for us on other parties' Websites.`
                        },
                        {
                            question: "Links To Other Web Sites",
                            answer: `Links to third party Websites may be provided solely for your information and convenience. If you use these links, you will leave our Site. This Privacy Policy does not cover the information practices of those Web sites linked to our Site, nor do we control their content or privacy policies. We suggest that you carefully review the privacy policies of each site you visit.<br>
                            Currently we do not provide any links to other Web Sites from our Web <a href="http://www.zerroo.in" target="_blank" rel="noopener noreferrer">www.zerroo.in</a>`
                        },
                        {
                            question: "Changes To This Policy",
                            answer: `This site has security measures in place to protect the loss, misuse, and/or alteration of information under our control. The data resides behind a firewall, with access restricted to authorized Zerabiz Ecom LLP (<a href="http://www.zerroo.in" target="_blank" rel="noopener noreferrer">www.zerroo.in</a>)`
                        },
                        {
                            question: "Security",
                            answer: `This site has security measures in place to protect the loss, misuse, and/or alteration of information under our control. The data resides behind a firewall, with access restricted to authorized Zerabiz Ecom LLP (<a href="http://www.zerroo.in" target="_blank" rel="noopener noreferrer">www.zerroo.in</a>)`
                        },
                        {
                            question: "Contacting the Web (http://www.zerroo.in)",
                            answer: `If you have any questions or concerns about this privacy statement, the practices of this site, or your dealings with this Web site, you can contact:<br>
                        Zerabiz Ecom LLP (<a href="http://www.zerroo.in" target="_blank" rel="noopener noreferrer">www.zerroo.in</a>)<br>
                            Mail ID : support@zerroo.in`
                        },
                    ]} />
                </Box>
            </Stack>
        </Container>
    )
}

// Made with Bob
