import { createTheme } from "@mui/material"
import config from "../config"

let theme = createTheme({
    palette: {
        primary: {
            light: "#ffdce5",
            main: "#8D1838",
        },
        light: {
            main: "#FFF"
        },
        secondary: {
            light: "#ffb99d",
            main: "#E62977",
            dark: "#101010",
            200: "#b39ddb",
            800: "#4527a0",
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            900: "#212121",
        },
        success: {
            light: "#b9f6ca",
            200: "#69f0ae",
            main: "#00e676",
            dark: "#00c853",
        },
        error: {
            light: "#ef9a9a",
            main: "#ff6e64",
            dark: "#c62828",
        },
        warning: {
            light: "#fff8e1",
            main: "#ffe57f",
            dark: "#ffc107",
        },
    },
    shape: {
        borderRadius: config.borderRadius
    },
})
theme = createTheme({
    ...theme,
    typography: {
        fontFamily: config.fontFamily,
        h6: {
            fontWeight: 500,
            color: theme.palette.grey[900],
            fontSize: '0.75rem'
        },
        h5: {
            fontSize: '0.875rem',
            color: theme.palette.grey[900],
            fontWeight: 500
        },
        h4: {
            fontSize: '1rem',
            color: theme.palette.grey[900],
            fontWeight: 600
        },
        h3: {
            fontSize: '1.25rem',
            color: theme.palette.grey[900],
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5rem',
            color: theme.palette.grey[900],
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125rem',
            color: theme.palette.grey[900],
            fontWeight: 700
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.grey[900],
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: theme.palette.grey[500],
        },
        caption: {
            fontSize: '0.75rem',
            color: theme.palette.grey[500],
            fontWeight: 400
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.334em'
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: theme.palette.grey[700],
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: theme.palette.background.default,
                    borderRadius: config.borderRadius,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.grey[400]
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.palette.primary.light
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    background: theme.palette.background.default,
                    padding: '15.5px 14px',
                    borderRadius: config.borderRadius,
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: config.borderRadius
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: config.borderRadius
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.palette.grey[900],
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.palette.primary.dark,
                    background: theme.palette.primary[200],
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: '48px',
                    padding: '16px',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    whiteSpace: "nowrap"
                }
            },
        }
    }
})
export default theme