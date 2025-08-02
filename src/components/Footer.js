import { Box, Container, IconButton, Link, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconDialpad, IconMail, IconPhoneCall, IconUserCheck } from '@tabler/icons';
import { Link as Route } from "react-router-dom";
import LogoSection from '../layout/MainLayout/LogoSection';

export default function Footer() {
    return (
        <Box bgcolor="primary.main" pt={{ md: 8, xs: 4 }} pb={2}>
            <Container>
                <Box textAlign="center" mb={{ md: 4, xs: 2 }}>
                    <LogoSection />
                </Box>
                <Typography variant="h4" textAlign="center" mb={4} color="white">
                    Join us for your second income by selling premium products. Zerroo provides the chance to open the franchise and promote the quality of its goods through minimal investments.
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-evenly"
                    flexDirection={{
                        md: "row",
                        xs: "column"
                    }}
                    textAlign={{
                        xs: "center",
                        md: "left"
                    }}
                    mb={4}
                >
                    <Box
                        sx={{
                            "& ol": {
                                listStylePosition: "inside"
                            }
                        }}>
                        <Typography color="white" variant="h2">Quick Links</Typography>
                        <List>
                            {[
                                {
                                    text: "Login",
                                    link: "/login"
                                },
                                {
                                    text: "Shipping",
                                    link: "/shipping"
                                },
                                {
                                    text: "Products",
                                    link: "/products"
                                },
                                {
                                    text: "Commonly used terms in Direct selling",
                                    link: "/commonly-terms-directselling"
                                },
                                {
                                    text: "Comphensation plan",
                                    link: "/comphensation-plan"
                                },
                                {
                                    text: "Transactions",
                                    link: "/transactions"
                                },
                                {
                                    text: "Rights and Duties",
                                    link: "/rights-and-duties"
                                },
                                {
                                    text: "Business Informtion Kit",
                                    link: "/business-informtion-kit"
                                },
                                {
                                    text: "Termination in Direct Selling Industry",
                                    link: "/termination-directselling"
                                },
                               
                                {
                                    text: "Privacy Policy",
                                    link: "/privacy-policy"
                                },
                                
                                {
                                    text: "Terms Of Service",
                                    link: "/terms-of-service"
                                },
                                {
                                    text:"Legal Documents",
                                    link:"/legal-documents"
                                },
                            ].map(({ text, link }, key) => (
                                <ListItem component={Route} to={link} key={key} sx={{ py: 0 }}>
                                    <ListItemText primaryTypographyProps={{
                                        sx: {
                                            textAlign: {
                                                xs: "center",
                                                md: "left"
                                            },
                                            color: "white"
                                        }
                                    }} primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <Typography color="white" mb={2} variant="h2">Reach Us</Typography>
                        <Stack spacing={2}>
                            <Typography color="white" pl={1}>
                                5/837, Naal road,<br />
                                Thennampatti, Vedasandur (TK),<br />
                                Dindigul - 624802<br />
                            </Typography>
                            <Stack spacing={1} pl={{md:0,xs:8}}>
                                <Box display="flex" alignItems="center">
                                    <IconButton component={Link} href="mailto:zerrooofficial2024@gmail.com" target='_blank'>
                                        <IconMail color="#FFF" size={20} />
                                    </IconButton>
                                    <Typography component={Link} color="white" href="mailto:zerrooofficial2024@gmail.com" ml={1}>
                                        zerrooofficial2024@gmail.com
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton component={Link} href="mailto:support@zerroo.in" target='_blank'>
                                        <IconUserCheck color="#FFF" size={20} />
                                    </IconButton>
                                    <Typography component={Link} color="white" href="mailto:support@zerroo.in" ml={1}>
                                        support@zerroo.in
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton component={Link} href="tel:+919384529159" target='_blank'>
                                        <IconPhoneCall color="#FFF" size={20} />
                                    </IconButton>
                                    <Typography component={Link} color="white" href="tel:+919384529159" ml={1}>
                                        +91 9384529159
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton component={Link} href="tel:+919176112453" target='_blank'>
                                        <IconDialpad color="#FFF" size={20} />
                                    </IconButton>
                                    <Typography component={Link} color="white" href="tel:+919176112453" ml={1}>
                                        +91 9176112453
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack  direction="row" spacing={2} px={{md:0,xs:8}}>
                                <IconButton component={Link} href="https://www.instagram.com/zerroo_official_?igsh=MTE1YnQ2MDd6MWdiZw==" target='_blank'>
                                    <IconBrandInstagram color="#FFF" size={24} />
                                </IconButton>
                                <IconButton component={Link} href="https://www.facebook.com/profile.php?id=61572047320496&mibextid=rS40aB7S9Ucbxw6v" target='_blank'>
                                    <IconBrandFacebook color="#FFF" size={24} />
                                </IconButton>
                                <IconButton component={Link} href="https://chat.whatsapp.com/GjzJy6U8qkh1njxgywvTg8" target='_blank'>
                                    <IconBrandWhatsapp color="#FFF" size={24} />
                                </IconButton>
                                <IconButton component={Link} href="https://www.linkedin.com/in/zerabiz-ecom-llp-883966348/" target='_blank'>
                                    <IconBrandLinkedin color="#FFF" size={24} />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>                    
            </Container>
        </Box>
    )
}
