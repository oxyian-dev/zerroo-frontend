import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, TextField, Tooltip } from "@mui/material";
import { useState } from "react";

const PasswordField = props => {
    const [show, setShow] = useState(false)

    return (
        <TextField
            {...props}
            type={show ? 'text' : 'password'}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <Tooltip
                        title={show ? "Hide Password" : "Show Password"}>
                        <IconButton
                            edge="end"
                            tabIndex={-1}
                            onClick={() => {
                                setShow(show => !show)
                            }}
                            aria-label={show ? "Hide password" : "Show password"}
                            sx={{
                                color: 'rgba(255,255,255,.68)',
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: '#efcb77'
                                },
                                '&:focus-visible': {
                                    outline: '2px solid #efcb77',
                                    outlineOffset: '2px'
                                }
                            }}
                        >
                            {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </Tooltip>
                )
            }}
            sx={{
                ...props.sx,
                '& .MuiOutlinedInput-root': {
                    color: 'white !important',
                    backgroundColor: 'rgba(255,255,255,.02)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                        borderColor: 'rgba(255,255,255,.15)',
                        transition: 'border-color 0.3s ease'
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,.3)'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#efcb77'
                    },
                    '&.Mui-error fieldset': {
                        borderColor: '#ff6b6b'
                    },
                    '& input': {
                        color: 'white !important',
                        WebkitTextFillColor: 'white !important',
                        '&:-webkit-autofill': {
                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                            WebkitTextFillColor: 'white !important',
                            caretColor: 'white !important',
                            transition: 'background-color 5000s ease-in-out 0s'
                        },
                        '&:-webkit-autofill:hover': {
                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                            WebkitTextFillColor: 'white !important'
                        },
                        '&:-webkit-autofill:focus': {
                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                            WebkitTextFillColor: 'white !important'
                        },
                        '&:-webkit-autofill:active': {
                            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.02) inset !important',
                            WebkitTextFillColor: 'white !important'
                        }
                    }
                },
                '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,.68)',
                    '&.Mui-focused': {
                        color: '#efcb77'
                    },
                    '&.Mui-error': {
                        color: '#ff6b6b'
                    }
                },
                '& .MuiFormHelperText-root': {
                    color: 'rgba(255,255,255,.62)',
                    '&.Mui-error': {
                        color: '#ff6b6b'
                    }
                }
            }}
        />
    )
}
export default PasswordField;