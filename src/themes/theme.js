import { createTheme } from "@mui/material"
import config from "../config"

let theme = createTheme({
    palette: {
        primary: {
            light: "rgba(255,244,208,.12)",
            main: "#f6d27b",
            dark: "#d8a94a",
            200: "rgba(246,210,123,.2)",
            800: "rgba(246,210,123,.3)",
        },
        light: {
            main: "rgba(255,255,255,.9)"
        },
        secondary: {
            light: "rgba(205,222,255,.7)",
            main: "#0b1120",
            dark: "#04070d",
            200: "rgba(89,116,170,.16)",
            800: "rgba(89,116,170,.24)",
        },
        background: {
            default: "#05070a",
            paper: "#0a0f16",
        },
        grey: {
            50: "rgba(255,255,255,.03)",
            100: "rgba(255,255,255,.05)",
            200: "rgba(255,255,255,.09)",
            300: "rgba(255,255,255,.14)",
            500: "rgba(255,255,255,.76)",
            600: "rgba(255,255,255,.76)",
            700: "rgba(255,255,255,.9)",
            900: "rgba(255,255,255,1)",
        },
        success: {
            light: "rgba(60,200,120,.16)",
            200: "rgba(60,200,120,.28)",
            main: "#3ddc97",
            dark: "#2aa46f",
        },
        error: {
            light: "rgba(255,92,92,.16)",
            main: "#ff6b6b",
            dark: "#e24f4f",
        },
        warning: {
            light: "rgba(255,180,80,.16)",
            main: "#ffb84d",
            dark: "#ea8f1f",
        },
        info: {
            light: "rgba(85,187,255,.16)",
            main: "#55bbff",
        },
        text: {
            primary: "rgba(255,255,255,1)",
            secondary: "rgba(255,255,255,.86)",
            disabled: "rgba(255,255,255,.42)",
        },
        divider: "rgba(255,255,255,.12)",
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
                    background: 'linear-gradient(180deg, rgba(246,210,123,.08), rgba(255,255,255,.03))',
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,.14)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(246,210,123,.38)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f6d27b'
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
                    color: 'rgba(255,255,255,.74)',
                    '&.Mui-focused': {
                        color: '#f6d27b'
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
                    backgroundColor: '#0a0f16',
                },
                rounded: {
                    borderRadius: '4px'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.015))',
                    border: '1px solid rgba(255,255,255,.12)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '4px',
                    boxShadow: '0 16px 38px rgba(0,0,0,.26)',
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
                    color: '#f6d27b',
                    background: 'rgba(246,210,123,.18)',
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
                    background: 'linear-gradient(135deg, #fff7dc 0%, #fbe9bb 14%, #f6d27b 28%, #d59b3d 48%, #a96d1e 62%, #f4d891 80%, #fff6d8 100%)',
                    color: '#000',
                    boxShadow: '0 18px 38px rgba(246,210,123,.18)',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 24px 56px rgba(246,210,123,.24)',
                        background: 'linear-gradient(135deg, #fff7dc 0%, #fbe9bb 14%, #f6d27b 28%, #d59b3d 48%, #a96d1e 62%, #f4d891 80%, #fff6d8 100%)',
                    }
                },
                outlinedPrimary: {
                    border: '1px solid rgba(246,210,123,.3)',
                    color: '#f6d27b',
                    '&:hover': {
                        borderColor: 'rgba(246,210,123,.5)',
                        background: 'rgba(246,210,123,.08)',
                    }
                },
                textPrimary: {
                    color: '#f6d27b',
                    '&:hover': {
                        background: 'rgba(246,210,123,.1)',
                    }
                }
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.86)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        color: '#f6d27b',
                        background: 'rgba(246,210,123,.1)',
                    }
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255,255,255,.12)',
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
                    background: 'rgba(255,255,255,.12)',
                    color: 'rgba(255,255,255,.9)',
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
                        color: 'rgba(255,255,255,.9)',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(255,255,255,.12)',
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255,255,255,.12)',
                    color: 'rgba(255,255,255,.9)',
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: 'rgba(255,255,255,.4)',
                    '&.Mui-checked': {
                        color: '#f6d27b',
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'rgba(246,210,123,.3)',
                    }
                },
                track: {
                    backgroundColor: 'rgba(255,255,255,.16)',
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    background: '#0b1120',
                    border: '1px solid rgba(255,255,255,.12)',
                    color: 'rgba(255,255,255,.9)',
                    fontSize: '0.78rem',
                    borderRadius: '4px',
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: '#0b1120',
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: '4px',
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.9)',
                    '&:hover': {
                        background: 'rgba(246,210,123,.08)',
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: '#0b1120',
                    border: '1px solid rgba(255,255,255,.12)',
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
                    color: 'rgba(255,255,255,.76)',
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: 'rgba(255,255,255,.76)',
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,.12)',
                    borderRadius: '4px',
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: '#f6d27b',
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,.12)',
                },
                bar: {
                    backgroundColor: '#f6d27b',
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,.12)',
                },
                standardSuccess: {
                    background: 'rgba(81,207,102,.1)',
                    color: '#3ddc97',
                },
                standardError: {
                    background: 'rgba(255,107,107,.1)',
                    color: '#ff6b6b',
                },
                standardWarning: {
                    background: 'rgba(255,169,77,.1)',
                    color: '#ffb84d',
                },
                standardInfo: {
                    background: 'rgba(77,171,247,.1)',
                    color: '#55bbff',
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
                    color: 'rgba(255,255,255,.72)',
                    '&.Mui-selected': {
                        color: '#f6d27b',
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#f6d27b',
                }
            }
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                li: {
                    color: 'rgba(255,255,255,.72)',
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
                        background: 'rgba(246,210,123,.14) !important',
                        '& .MuiListItemIcon-root': {
                            color: '#f6d27b',
                        },
                        '& .MuiListItemText-primary': {
                            color: '#f6d27b',
                            fontWeight: 700,
                        }
                    },
                    '&:hover': {
                        background: 'rgba(246,210,123,.08)',
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,.72)',
                    minWidth: '36px',
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: 'rgba(255,255,255,.9)',
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
                    borderBottom: '1px solid rgba(255,255,255,.12)',
                    background: 'rgba(8,12,18,.88)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: '1px solid rgba(255,255,255,.12)',
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: '4px',
                    color: 'rgba(255,255,255,.9)',
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255,255,255,.06)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        background: 'rgba(255,255,255,.03)',
                        borderBottom: '1px solid rgba(255,255,255,.12)',
                        '& .MuiDataGrid-columnHeader': {
                            color: 'rgba(255,255,255,.76)',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }
                    },
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            background: 'rgba(255,255,255,.03)',
                        },
                        '&.Mui-selected': {
                            background: 'rgba(246,210,123,.08)',
                            '&:hover': {
                                background: 'rgba(246,210,123,.12)',
                            }
                        }
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(255,255,255,.12)',
                    },
                    '& .MuiTablePagination-root': {
                        color: 'rgba(255,255,255,.72)',
                    },
                    '& .MuiTablePagination-selectIcon': {
                        color: 'rgba(255,255,255,.72)',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        color: 'rgba(255,255,255,.12)',
                    },
                    '& .MuiDataGrid-menuIcon button': {
                        color: 'rgba(255,255,255,.72)',
                    },
                    '& .MuiDataGrid-sortIcon': {
                        color: 'rgba(255,255,255,.72)',
                    },
                    '& .MuiDataGrid-iconButtonContainer button': {
                        color: 'rgba(255,255,255,.72)',
                    },
                    '& .MuiDataGrid-detailPanel': {
                        background: 'rgba(255,255,255,.01)',
                    },
                    '& .MuiDataGrid-cellEditing': {
                        background: 'rgba(246,210,123,.08)',
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
                    color: 'rgba(255,255,255,.72)',
                },
                selectIcon: {
                    color: 'rgba(255,255,255,.72)',
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    background: 'rgba(2,6,12,.72)',
                    backdropFilter: 'blur(4px)',
                }
            }
        },
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    background: '#0b1120',
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: '4px',
                    color: 'rgba(255,255,255,.9)',
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    background: '#0b1120',
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: '4px',
                },
                option: {
                    color: 'rgba(255,255,255,.9)',
                    '&:hover': {
                        background: 'rgba(246,210,123,.08)',
                    },
                    '&[aria-selected="true"]': {
                        background: 'rgba(246,210,123,.14)',
                    }
                },
                listbox: {
                    '& .MuiAutocomplete-option': {
                        color: 'rgba(255,255,255,.9)',
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
                    color: 'rgba(255,255,255,.9)',
                    '&.Mui-selected': {
                        background: '#f6d27b',
                        color: '#000',
                    }
                }
            }
        }
    }
})
export default theme
