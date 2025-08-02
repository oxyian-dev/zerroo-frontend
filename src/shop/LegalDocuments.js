import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'


export default function LegalDocuments() {
    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h1" mb={4}>
                Legal Documents
            </Typography>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                    <Typography variant='h4'>Certification of Incorporation</Typography><br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/pdf/Incorporation_Certificate_Zerabiz.pdf"
                        download="Incorporation_Certificate_Zerabiz.pdf"
                    >
                        Download PDF
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h4'>Goods & Service Tax Certificate</Typography><br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/pdf/GST_CERTIFICATE_ZERABIZ.pdf"
                        download="GST_CERTIFICATE_ZERABIZ.pdf"
                    >
                        Download PDF
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h4'>Income Tax Certificate</Typography><br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/pdf/TAN_Zerabiz.pdf"
                        download="TAN_Zerabiz.pdf"
                    >
                        Download PDF
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h4'>PAN Card</Typography><br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/pdf/e-PAN_Zerabiz.pdf"
                        download="e-pan_Zerabiz.pdf"
                    >
                        Download PDF
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}