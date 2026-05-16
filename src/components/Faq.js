import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Accordion = styled(props => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
    border: '1px solid rgba(255,255,255,.08)',
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'all 0.35s ease',
    '&:not(:last-child)': {
        borderBottom: '1px solid rgba(255,255,255,.08)',
    },
    '&:before': {
        display: 'none',
    },
    '&:hover': {
        borderColor: 'rgba(221,180,93,.2)',
    },
    '&.Mui-expanded': {
        borderColor: 'rgba(221,180,93,.3)',
        boxShadow: '0 8px 24px rgba(0,0,0,.3)',
    }
}));

const AccordionSummary = styled(props => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosRoundedIcon sx={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,.68)',
                transition: 'all 0.3s ease'
            }} />
        }
        {...props}
    />
))(({ theme }) => ({
    padding: theme.spacing(3),
    minHeight: '72px',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    transition: 'all 0.3s ease',
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: 'rgba(255,255,255,.68)',
        transition: 'all 0.3s ease',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
        color: '#efcb77',
    },
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,.02)',
    },
    '&:focus-visible': {
        outline: '2px solid #efcb77',
        outlineOffset: '2px',
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
    paddingTop: 0,
    borderTop: '1px solid rgba(255,255,255,.05)',
    '& span': {
        color: '#efcb77',
    },
    '& b': {
        color: 'rgba(255,255,255,.9)',
        fontWeight: 600,
    }
}));

export default function Faq({ faqs }) {
    const [expanded, setExpanded] = useState(0);

    const handleChange = panel => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        faqs.map(({ question, answer }, index) => (
            <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
            >
                <AccordionSummary
                    aria-controls={`faq-${index}-content`}
                    id={`faq-${index}-header`}
                    aria-label={question}
                >
                    <Typography
                        sx={{
                            fontSize: { md: '1.05rem', xs: '1rem' },
                            fontWeight: 600,
                            color: expanded === index ? '#efcb77' : 'white',
                            transition: 'color 0.3s ease',
                            letterSpacing: '0.01em',
                            lineHeight: 1.4,
                        }}
                    >
                        {question}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        sx={{
                            color: 'rgba(255,255,255,.68)',
                            lineHeight: 1.9,
                            fontSize: { md: '0.95rem', xs: '0.9rem' },
                            '& br': {
                                display: 'block',
                                content: '""',
                                marginTop: '8px',
                            }
                        }}
                        dangerouslySetInnerHTML={{
                            __html: answer
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        ))
    )
}

// Made with Bob
