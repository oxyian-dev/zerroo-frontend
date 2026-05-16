import { createTheme } from "@mui/material/styles";

/**
 * Victory World Shop - Comprehensive Theme Configuration
 * Based on DESIGN_SYSTEM.md specifications
 * Version: 1.0.0
 */

const ShopTheme = createTheme({
    // ================================================
    // COLOR PALETTE
    // ================================================
    palette: {
        mode: 'dark',
        primary: {
            main: '#efcb77',
            light: '#f5dc97',
            dark: '#ddb45d',
            contrastText: '#000',
        },
        background: {
            default: '#020202',
            paper: '#050505',
        },
        text: {
            primary: 'rgba(255,255,255,1)',
            secondary: 'rgba(255,255,255,.82)',
            disabled: 'rgba(255,255,255,.4)',
        },
        divider: 'rgba(255,255,255,.08)',
        error: {
            main: '#ff6b6b',
        },
        success: {
            main: '#51cf66',
        },
        warning: {
            main: '#ffa94d',
        },
        info: {
            main: '#4dabf7',
        },
    },

    // ================================================
    // TYPOGRAPHY SYSTEM
    // ================================================
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        
        // Desktop Typography (md and up)
        h1: {
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            '@media (max-width:900px)': {
                fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
            },
        },
        h2: {
            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            '@media (max-width:900px)': {
                fontSize: 'clamp(2rem, 8vw, 2.8rem)',
            },
        },
        h3: {
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            '@media (max-width:900px)': {
                fontSize: 'clamp(1.5rem, 6vw, 2rem)',
            },
        },
        h4: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            '@media (max-width:900px)': {
                fontSize: '1.8rem',
            },
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.3,
            '@media (max-width:900px)': {
                fontSize: '1.2rem',
            },
        },
        subtitle1: {
            fontSize: '1.05rem',
            fontWeight: 400,
            lineHeight: 1.8,
            '@media (max-width:900px)': {
                fontSize: '1rem',
            },
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 2.1,
            color: 'rgba(255,255,255,.68)',
            '@media (max-width:900px)': {
                fontSize: '0.95rem',
            },
        },
        body2: {
            fontSize: '0.95rem',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,.62)',
        },
        caption: {
            fontSize: '0.78rem',
            fontWeight: 400,
            lineHeight: 1.5,
            '@media (max-width:900px)': {
                fontSize: '0.7rem',
            },
        },
        button: {
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            '@media (max-width:900px)': {
                fontSize: '0.72rem',
            },
        },
    },

    // ================================================
    // SPACING SYSTEM (8px base)
    // ================================================
    spacing: 8,

    // ================================================
    // BREAKPOINTS (MUI Default)
    // ================================================
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },

    // ================================================
    // COMPONENT OVERRIDES
    // ================================================
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#020202',
                    color: 'rgba(255,255,255,1)',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '1440px !important',
                    paddingLeft: '80px',
                    paddingRight: '80px',
                    '@media (max-width:900px)': {
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: '18px 42px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    transition: 'all 0.4s ease',
                    '@media (max-width:900px)': {
                        padding: '16px 36px',
                        fontSize: '0.72rem',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                    color: '#000',
                    boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                    },
                },
                outlined: {
                    border: '1px solid rgba(255,255,255,.15)',
                    color: 'white',
                    letterSpacing: '0.2em',
                    fontWeight: 600,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                        borderColor: '#ddb45d',
                        color: '#ddb45d',
                        background: 'transparent',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                    border: '1px solid rgba(255,255,255,.08)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '4px',
                    transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-12px)',
                        borderColor: 'rgba(221,180,93,.3)',
                        boxShadow: '0 30px 70px rgba(0,0,0,.5)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                            borderColor: 'rgba(255,255,255,.15)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255,255,255,.3)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#efcb77',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,.68)',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255,255,255,.08)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0,0,0,.7)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: '1px solid rgba(255,255,255,.08)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#0a0a0a',
                    borderRight: '1px solid rgba(255,255,255,.08)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.82)',
                    '&:hover': {
                        backgroundColor: 'rgba(221,180,93,.06)',
                        color: '#f5dc97',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(221,180,93,.1)',
                        color: '#f5dc97',
                        '&:hover': {
                            backgroundColor: 'rgba(221,180,93,.15)',
                        },
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.3)',
                    '&.Mui-checked': {
                        color: '#efcb77',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,.15)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,.3)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#efcb77',
                    },
                },
                icon: {
                    color: 'rgba(255,255,255,.68)',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,.08)',
                    boxShadow: '0 2px 8px rgba(0,0,0,.32)',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.82)',
                    '&:hover': {
                        backgroundColor: 'rgba(221,180,93,.06)',
                        color: '#f5dc97',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(221,180,93,.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(221,180,93,.15)',
                        },
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    background: 'linear-gradient(135deg, #fff7dc 0%, #efcb77 50%, #d69d45 100%)',
                    color: '#000',
                    fontWeight: 700,
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderRadius: '4px',
                },
            },
        },
    },
});

export default ShopTheme;

// Made with Bob
