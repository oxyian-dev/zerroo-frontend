import { createTheme } from "@mui/material"
import config from "../config"

let theme = createTheme({
    palette: {
        primary: {
            light: "rgba(255,255,255,.08)",
            main: "#efcb77",
            dark: "#ddb45d",
            200: "rgba(221,180,93,.2)",
            800: "rgba(221,180,93,.3)",
        },
        light: {
            main: "rgba(255,255,255,.82)"
        },
        secondary: {
            light: "rgba(255,255,255,.68)",
            main: "#0a0a0a",
            dark: "#020202",
            200: "rgba(255,255,255,.1)",
            800: "rgba(255,255,255,.15)",
        },
        background: {
            default: "#020202",
            paper: "#050505",
        },
        grey: {
            50: "rgba(255,255,255,.02)",
            100: "rgba(255,255,255,.04)",
            200: "rgba(255,255,255,.08)",
            300: "rgba(255,255,255,.1)",
            500: "rgba(255,255,255,.62)",
            600: "rgba(255,255,255,.68)",
            700: "rgba(255,255,255,.82)",
            900: "rgba(255,255,255,1)",
        },
        success: {
            light: "rgba(81,207,102,.15)",
            200: "rgba(81,207,102,.3)",
            main: "#51cf66",
            dark: "#3cb34f",
        },
        error: {
            light: "rgba(255,107,107,.15)",
            main: "#ff6b6b",
            dark: "#e05555",
        },
        warning: {
            light: "rgba(255,169,77,.15)",
            main: "#ffa94d",
            dark: "#f08c32",
        },
        info: {
            light: "rgba(77,171,247,.15)",
            main: "#4dabf7",
        },
        text: {
            primary: "rgba(255,255,255,1)",
            secondary: "rgba(255,255,255,.82)",
            disabled: "rgba(255,255,255,.4)",
        },
        divider: "rgba(255,255,255,.08)",
    },
    shape: {
        borderRadius: 4
    },
})

theme = createTheme({
    ...theme,
    typography: {
        fontFamily: config.fontFamily,
        h6: {
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: '0.78rem',
            letterSpacing: '0.16em',
        },
        h5: {
            fontSize: '1.05rem',
            color: theme.palette.text.primary,
            fontWeight: 600,
            letterSpacing: '0.02em',
        },
        h4: {
            fontSize: '1.25rem',
            color: theme.palette.text.primary,
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.5rem',
            color: theme.palette.text.primary,
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.8rem',
            color: theme.palette.text.primary,
            fontWeight: 800,
        },
        h1: {
            fontSize: '2.5rem',
            color: theme.palette.text.primary,
            fontWeight: 800,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            color: theme.palette.text.secondary,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: theme.palette.grey[600],
        },
        caption: {
            fontSize: '0.78rem',
            color: theme.palette.grey[500],
            fontWeight: 400,
        },
        body1: {
            fontSize: '0.95rem',
            fontWeight: 400,
            lineHeight: '1.6em',
            color: theme.palette.text.secondary,
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: theme.palette.grey[600],
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,.02)',
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,.15)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,.3)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#efcb77'
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    color: '#fff',
                    padding: '15.5px 14px',
                    borderRadius: '4px',
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
                    borderRadius: '4px'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.68)',
                    '&.Mui-focused': {
                        color: '#efcb77'
                    }
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#050505',
                },
                rounded: {
                    borderRadius: '4px'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
                    border: '1px solid rgba(255,255,255,.08)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '4px',
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem',
                    fontWeight: 700,
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
                    color: '#efcb77',
                    background: 'rgba(221,180,93,.2)',
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
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    letterSpacing: '0.22em',
                    fontWeight: 700,
                    borderRadius: '4px',
                    padding: '12px 28px',
                    fontSize: '0.78rem',
                    transition: 'all 0.4s ease',
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                    color: '#000',
                    boxShadow: '0 15px 35px rgba(221,180,93,.15)',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 50px rgba(221,180,93,.22)',
                        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
                    }
                },
                outlinedPrimary: {
                    border: '1px solid rgba(221,180,93,.2)',
                    color: '#efcb77',
                    '&:hover': {
                        borderColor: 'rgba(221,180,93,.3)',
                        background: 'transparent',
                    }
                },
                textPrimary: {
                    color: '#efcb77',
                    '&:hover': {
                        background: 'rgba(221,180,93,.1)',
                    }
                }
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.82)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        color: '#efcb77',
                        background: 'rgba(221,180,93,.1)',
                    }
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255,255,255,.08)',
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                },
                filled: {
                    background: 'rgba(255,255,255,.08)',
                    color: 'rgba(255,255,255,.82)',
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-head': {
                        color: 'rgba(255,255,255,.82)',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(255,255,255,.08)',
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255,255,255,.08)',
                    color: 'rgba(255,255,255,.82)',
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: 'rgba(255,255,255,.4)',
                    '&.Mui-checked': {
                        color: '#efcb77',
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(221,180,93,.3)',
                    }
                },
                track: {
                    backgroundColor: 'rgba(255,255,255,.15)',
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,.08)',
                    color: 'rgba(255,255,255,.82)',
                    fontSize: '0.78rem',
                    borderRadius: '4px',
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: '#050505',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '4px',
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.82)',
                    '&:hover': {
                        background: 'rgba(255,255,255,.04)',
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: '#050505',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '4px',
                    boxShadow: '0 30px 70px rgba(0,0,0,.5)',
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    fontWeight: 700,
                }
            }
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.68)',
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: 'rgba(255,255,255,.68)',
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderRadius: '4px',
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: '#efcb77',
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,.08)',
                },
                bar: {
                    backgroundColor: '#efcb77',
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,.08)',
                },
                standardSuccess: {
                    background: 'rgba(81,207,102,.1)',
                    color: '#51cf66',
                },
                standardError: {
                    background: 'rgba(255,107,107,.1)',
                    color: '#ff6b6b',
                },
                standardWarning: {
                    background: 'rgba(255,169,77,.1)',
                    color: '#ffa94d',
                },
                standardInfo: {
                    background: 'rgba(77,171,247,.1)',
                    color: '#4dabf7',
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    color: 'rgba(255,255,255,.62)',
                    '&.Mui-selected': {
                        color: '#efcb77',
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#efcb77',
                }
            }
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                li: {
                    color: 'rgba(255,255,255,.62)',
                },
                separator: {
                    color: 'rgba(255,255,255,.3)',
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    '&.Mui-selected': {
                        background: 'rgba(221,180,93,.12) !important',
                        '& .MuiListItemIcon-root': {
                            color: '#efcb77',
                        },
                        '& .MuiListItemText-primary': {
                            color: '#efcb77',
                            fontWeight: 700,
                        }
                    },
                    '&:hover': {
                        background: 'rgba(255,255,255,.04)',
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.62)',
                    minWidth: '36px',
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: 'rgba(255,255,255,.82)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                },
                secondary: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '0.75rem',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255,255,255,.08)',
                    background: 'rgba(0,0,0,.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: '1px solid rgba(255,255,255,.08)',
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '4px',
                    color: 'rgba(255,255,255,.82)',
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255,255,255,.06)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        background: 'rgba(255,255,255,.02)',
                        borderBottom: '1px solid rgba(255,255,255,.08)',
                        '& .MuiDataGrid-columnHeader': {
                            color: 'rgba(255,255,255,.68)',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }
                    },
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            background: 'rgba(255,255,255,.02)',
                        },
                        '&.Mui-selected': {
                            background: 'rgba(221,180,93,.08)',
                            '&:hover': {
                                background: 'rgba(221,180,93,.1)',
                            }
                        }
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(255,255,255,.08)',
                    },
                    '& .MuiTablePagination-root': {
                        color: 'rgba(255,255,255,.62)',
                    },
                    '& .MuiTablePagination-selectIcon': {
                        color: 'rgba(255,255,255,.62)',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        color: 'rgba(255,255,255,.08)',
                    },
                    '& .MuiDataGrid-menuIcon button': {
                        color: 'rgba(255,255,255,.62)',
                    },
                    '& .MuiDataGrid-sortIcon': {
                        color: 'rgba(255,255,255,.62)',
                    },
                    '& .MuiDataGrid-iconButtonContainer button': {
                        color: 'rgba(255,255,255,.62)',
                    },
                    '& .MuiDataGrid-detailPanel': {
                        background: 'rgba(255,255,255,.01)',
                    },
                    '& .MuiDataGrid-cellEditing': {
                        background: 'rgba(221,180,93,.08)',
                    },
                    '& .MuiDataGrid-editInputCell': {
                        color: '#fff',
                    }
                }
            }
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.62)',
                },
                selectIcon: {
                    color: 'rgba(255,255,255,.62)',
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    background: 'rgba(0,0,0,.6)',
                    backdropFilter: 'blur(4px)',
                }
            }
        },
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '4px',
                    color: 'rgba(255,255,255,.82)',
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    background: '#050505',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: '4px',
                },
                option: {
                    color: 'rgba(255,255,255,.82)',
                    '&:hover': {
                        background: 'rgba(255,255,255,.04)',
                    },
                    '&[aria-selected="true"]': {
                        background: 'rgba(221,180,93,.12)',
                    }
                },
                listbox: {
                    '& .MuiAutocomplete-option': {
                        color: 'rgba(255,255,255,.82)',
                    }
                },
                noOptions: {
                    color: 'rgba(255,255,255,.5)',
                },
                loading: {
                    color: 'rgba(255,255,255,.5)',
                }
            }
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.82)',
                    '&.Mui-selected': {
                        background: '#efcb77',
                        color: '#000',
                    }
                }
            }
        }
    }
})
export default theme
