import React from 'react'
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'

const documents = [
    {
        title: 'SPICe+ Part B Approval Letter',
        subtitle: 'Company formation and approval record',
        file: 'SPICE + Part B_Approval Letter_AC3228168_05 May 2026.pdf.pdf',
        chip: 'Corporate',
        tone: 'primary'
    },
    {
        title: 'PAN Certificate',
        subtitle: 'Permanent Account Number document',
        file: 'Pass_05052026_882052107331146_signed PAN.pdf',
        chip: 'Tax',
        tone: 'success'
    },
    {
        title: 'TAN Certificate',
        subtitle: 'Tax Deduction and Collection Account Number',
        file: '88305930270854_signed TAN.pdf',
        chip: 'Tax',
        tone: 'warning'
    },
    {
        title: 'GST Registration Certificate',
        subtitle: 'Goods and Services Tax registration record',
        file: 'AA330526019068C_RC07052026.pdf',
        chip: 'Compliance',
        tone: 'info'
    },
    {
        title: 'Udyam Registration Certificate',
        subtitle: 'MSME registration certificate',
        file: 'Print _ Udyam Registration Certificate.pdf',
        chip: 'Business',
        tone: 'secondary'
    }
]

const docUrl = (file) => encodeURI(`/docs/${file}`)

const toneStyles = {
    primary: {
        chip: {
            color: '#1b1202',
            bgcolor: 'rgba(246, 210, 123, .95)'
        },
        accent: 'rgba(246, 210, 123, .22)'
    },
    success: {
        chip: {
            color: '#07120b',
            bgcolor: 'rgba(138, 220, 155, .95)'
        },
        accent: 'rgba(138, 220, 155, .18)'
    },
    warning: {
        chip: {
            color: '#211300',
            bgcolor: 'rgba(255, 200, 92, .95)'
        },
        accent: 'rgba(255, 200, 92, .18)'
    },
    info: {
        chip: {
            color: '#04111c',
            bgcolor: 'rgba(103, 197, 255, .95)'
        },
        accent: 'rgba(103, 197, 255, .18)'
    },
    secondary: {
        chip: {
            color: '#110814',
            bgcolor: 'rgba(209, 170, 255, .95)'
        },
        accent: 'rgba(209, 170, 255, .16)'
    }
}

const LegalDocuments = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                py: { md: 14, xs: 10 },
                px: { md: 10, xs: 2.5 }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: { md: 5, xs: 3 },
                    border: '1px solid rgba(246, 210, 123, .16)',
                    background: `
                        radial-gradient(circle at top left, rgba(246, 210, 123, .14), transparent 35%),
                        radial-gradient(circle at top right, rgba(103, 197, 255, .10), transparent 30%),
                        linear-gradient(180deg, rgba(10, 15, 22, .98), rgba(5, 7, 10, .96))
                    `,
                    boxShadow: '0 24px 60px rgba(0,0,0,.35)'
                }}
            >
                <Box
                    sx={{
                        px: { md: 5, xs: 3 },
                        pt: { md: 5, xs: 4 },
                        pb: { md: 4, xs: 3 }
                    }}
                >
                    <Stack spacing={2.2}>
                        <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                            <Chip
                                icon={<VerifiedOutlinedIcon sx={{ color: 'inherit !important' }} />}
                                label="Verified Corporate Documents"
                                sx={{
                                    bgcolor: 'rgba(246, 210, 123, .12)',
                                    color: '#f6d27b',
                                    border: '1px solid rgba(246, 210, 123, .24)',
                                    fontWeight: 700,
                                    letterSpacing: '.08em',
                                    textTransform: 'uppercase'
                                }}
                            />
                            <Chip
                                label="Direct Download"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,.05)',
                                    color: 'rgba(255,255,255,.78)',
                                    border: '1px solid rgba(255,255,255,.10)',
                                    fontWeight: 600,
                                    letterSpacing: '.06em',
                                    textTransform: 'uppercase'
                                }}
                            />
                        </Stack>

                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    color: '#fff',
                                    fontSize: { xs: '2.2rem', md: '3.5rem' },
                                    fontWeight: 800,
                                    lineHeight: 1.04,
                                    letterSpacing: '-0.03em',
                                    mb: 1.25
                                }}
                            >
                                Legal Documents
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: 820,
                                    color: 'rgba(255,255,255,.72)',
                                    fontSize: { xs: '0.98rem', md: '1.05rem' },
                                    lineHeight: 1.9
                                }}
                            >
                            </Typography>
                        </Box>

                        <Divider
                            sx={{
                                borderColor: 'rgba(255,255,255,.10)',
                                my: 1
                            }}
                        />

                        <Grid container spacing={2.5}>
                            {documents.map((doc) => {
                                const tone = toneStyles[doc.tone] || toneStyles.primary

                                return (
                                    <Grid item xs={12} md={6} key={doc.file}>
                                        <Box
                                            sx={{
                                                height: '100%',
                                                p: { xs: 2.5, md: 3 },
                                                borderRadius: 3,
                                                border: '1px solid rgba(255,255,255,.08)',
                                                background: `
                                                    linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015)),
                                                    radial-gradient(circle at top right, ${tone.accent}, transparent 45%)
                                                `,
                                                backdropFilter: 'blur(10px)',
                                                transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2,
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    borderColor: 'rgba(246, 210, 123, .24)',
                                                    boxShadow: '0 18px 35px rgba(0,0,0,.24)'
                                                }
                                            }}
                                        >
                                            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                                <Box
                                                    sx={{
                                                        flex: '0 0 auto',
                                                        width: 52,
                                                        height: 52,
                                                        borderRadius: 2,
                                                        display: 'grid',
                                                        placeItems: 'center',
                                                        background: 'linear-gradient(135deg, rgba(246, 210, 123, .18), rgba(255,255,255,.04))',
                                                        border: '1px solid rgba(246, 210, 123, .18)',
                                                        color: '#f6d27b'
                                                    }}
                                                >
                                                    <DescriptionOutlinedIcon />
                                                </Box>

                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                                        <Typography
                                                            variant="h3"
                                                            sx={{
                                                                color: '#fff',
                                                                fontSize: { xs: '1.1rem', md: '1.25rem' },
                                                                fontWeight: 700,
                                                                lineHeight: 1.25
                                                            }}
                                                        >
                                                            {doc.title}
                                                        </Typography>
                                                        <Chip
                                                            label={doc.chip}
                                                            size="small"
                                                            sx={{
                                                                ...tone.chip,
                                                                fontWeight: 700,
                                                                letterSpacing: '.06em',
                                                                textTransform: 'uppercase',
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                    </Stack>

                                                    <Typography
                                                        sx={{
                                                            mt: 1,
                                                            color: 'rgba(255,255,255,.68)',
                                                            fontSize: '0.95rem',
                                                            lineHeight: 1.7
                                                        }}
                                                    >
                                                        {doc.subtitle}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            <Box
                                                sx={{
                                                    mt: 0.5,
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    bgcolor: 'rgba(255,255,255,.03)',
                                                    border: '1px solid rgba(255,255,255,.06)'
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: 'block',
                                                        color: 'rgba(255,255,255,.52)',
                                                        letterSpacing: '.12em',
                                                        textTransform: 'uppercase',
                                                        mb: 0.75
                                                    }}
                                                >
                                                    File
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: '#f7e4b1',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 600,
                                                        wordBreak: 'break-word'
                                                    }}
                                                >
                                                    {doc.file}
                                                </Typography>
                                            </Box>

                                            <Stack
                                                direction={{ xs: 'column', sm: 'row' }}
                                                spacing={1.5}
                                                sx={{ mt: 'auto' }}
                                            >
                                                <Button
                                                    component="a"
                                                    href={docUrl(doc.file)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    startIcon={<OpenInNewIcon />}
                                                    variant="outlined"
                                                    sx={{
                                                        flex: 1,
                                                        borderColor: 'rgba(246, 210, 123, .28)',
                                                        color: '#f6d27b',
                                                        py: 1.2,
                                                        textTransform: 'none',
                                                        fontWeight: 700,
                                                        letterSpacing: '.02em',
                                                        '&:hover': {
                                                            borderColor: '#f6d27b',
                                                            bgcolor: 'rgba(246, 210, 123, .08)'
                                                        }
                                                    }}
                                                >
                                                    Open Document
                                                </Button>

                                                <Button
                                                    component="a"
                                                    href={docUrl(doc.file)}
                                                    download={doc.file}
                                                    startIcon={<DownloadIcon />}
                                                    variant="contained"
                                                    sx={{
                                                        flex: 1,
                                                        py: 1.2,
                                                        color: '#1a1304',
                                                        bgcolor: 'linear-gradient(135deg, #f6d27b 0%, #e0b85a 100%)',
                                                        background: 'linear-gradient(135deg, #f6d27b 0%, #e0b85a 100%)',
                                                        textTransform: 'none',
                                                        fontWeight: 800,
                                                        letterSpacing: '.02em',
                                                        boxShadow: '0 12px 24px rgba(246, 210, 123, .18)',
                                                        '&:hover': {
                                                            bgcolor: 'linear-gradient(135deg, #ffe39b 0%, #f6d27b 100%)',
                                                            background: 'linear-gradient(135deg, #ffe39b 0%, #f6d27b 100%)',
                                                            boxShadow: '0 16px 28px rgba(246, 210, 123, .28)'
                                                        }
                                                    }}
                                                >
                                                    Download PDF
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                )
                            })}
                        </Grid>

                        <Box
                            sx={{
                                mt: 1,
                                p: { xs: 2.5, md: 3 },
                                borderRadius: 3,
                                border: '1px solid rgba(255,255,255,.08)',
                                bgcolor: 'rgba(255,255,255,.03)'
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: '#f6d27b',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '.12em',
                                    mb: 1
                                }}
                            >
                                Note
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'rgba(255,255,255,.68)',
                                    lineHeight: 1.9,
                                    fontSize: { xs: '0.95rem', md: '1rem' }
                                }}
                            >
                                These files are served directly from the site&apos;s <Box component="span" sx={{ color: '#f6d27b', fontWeight: 700 }}>/docs</Box> folder.
                                If you add or replace a document there later, the legal documents page will continue to point to the same live file location.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}

export default LegalDocuments
