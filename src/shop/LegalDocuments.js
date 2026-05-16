import { Box, Button, Container, Grid, Typography, Divider } from '@mui/material'
import React from 'react'
import DownloadIcon from '@mui/icons-material/Download'

export default function LegalDocuments() {
    return (
        <Container 
            maxWidth="lg"
            sx={{ 
                py: { md: 14, xs: 10 }, 
                px: { md: 10, xs: 3 }
            }}
        >
            {/* Page Header */}
            <Box mb={6}>
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
                    Legal Documents
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
                    Download our official legal documents and certificates. All documents are verified and up-to-date.
                </Typography>
            </Box>

            {/* Documents Grid */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            bgcolor: 'rgba(239, 203, 119, 0.05)',
                            border: '1px solid rgba(239, 203, 119, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'rgba(239, 203, 119, 0.08)',
                                border: '1px solid rgba(239, 203, 119, 0.2)',
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        <Typography 
                            variant='h4'
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            Certification of Incorporation
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            href="/pdf/Incorporation_Certificate_Zerabiz.pdf"
                            download="Incorporation_Certificate_Zerabiz.pdf"
                            sx={{
                                mt: 'auto',
                                background: 'linear-gradient(135deg, #efcb77 0%, #ddb45d 100%)',
                                color: '#000',
                                fontWeight: 600,
                                py: 1.5,
                                px: 3,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f5dc97 0%, #efcb77 100%)',
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 16px rgba(239, 203, 119, 0.3)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            bgcolor: 'rgba(239, 203, 119, 0.05)',
                            border: '1px solid rgba(239, 203, 119, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'rgba(239, 203, 119, 0.08)',
                                border: '1px solid rgba(239, 203, 119, 0.2)',
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        <Typography 
                            variant='h4'
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            Goods & Service Tax Certificate
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            href="/pdf/GST_CERTIFICATE_ZERABIZ.pdf"
                            download="GST_CERTIFICATE_ZERABIZ.pdf"
                            sx={{
                                mt: 'auto',
                                background: 'linear-gradient(135deg, #efcb77 0%, #ddb45d 100%)',
                                color: '#000',
                                fontWeight: 600,
                                py: 1.5,
                                px: 3,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f5dc97 0%, #efcb77 100%)',
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 16px rgba(239, 203, 119, 0.3)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            bgcolor: 'rgba(239, 203, 119, 0.05)',
                            border: '1px solid rgba(239, 203, 119, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'rgba(239, 203, 119, 0.08)',
                                border: '1px solid rgba(239, 203, 119, 0.2)',
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        <Typography 
                            variant='h4'
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            Income Tax Certificate
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            href="/pdf/TAN_Zerabiz.pdf"
                            download="TAN_Zerabiz.pdf"
                            sx={{
                                mt: 'auto',
                                background: 'linear-gradient(135deg, #efcb77 0%, #ddb45d 100%)',
                                color: '#000',
                                fontWeight: 600,
                                py: 1.5,
                                px: 3,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f5dc97 0%, #efcb77 100%)',
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 16px rgba(239, 203, 119, 0.3)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            bgcolor: 'rgba(239, 203, 119, 0.05)',
                            border: '1px solid rgba(239, 203, 119, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'rgba(239, 203, 119, 0.08)',
                                border: '1px solid rgba(239, 203, 119, 0.2)',
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        <Typography 
                            variant='h4'
                            sx={{
                                color: '#fff',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            PAN Card
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            href="/pdf/e-PAN_Zerabiz.pdf"
                            download="e-pan_Zerabiz.pdf"
                            sx={{
                                mt: 'auto',
                                background: 'linear-gradient(135deg, #efcb77 0%, #ddb45d 100%)',
                                color: '#000',
                                fontWeight: 600,
                                py: 1.5,
                                px: 3,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f5dc97 0%, #efcb77 100%)',
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 8px 16px rgba(239, 203, 119, 0.3)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Download PDF
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

// Made with Bob
