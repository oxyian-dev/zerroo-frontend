import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from "@mui/material";
import { useState } from 'react';

const Counter = ({
    value,
    min = 1,
    max = 10,
    onChange,
    name,
    size = 'small',
    disabled = false,
}) => {
    const [textValue, setTextValue] = useState(value)

    return (
        <ButtonGroup
            color="inherit"
            size={size}
            sx={{
                '& .MuiButton-root': {
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(255,255,255,.08)',
                    color: 'white',
                    minWidth: '44px',
                    minHeight: '44px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        background: 'rgba(255,255,255,.08)',
                        borderColor: 'rgba(221,180,93,.3)',
                    },
                    '&:focus-visible': {
                        outline: '2px solid #efcb77',
                        outlineOffset: '2px',
                        zIndex: 1
                    },
                    '&.Mui-disabled': {
                        background: 'rgba(255,255,255,.02)',
                        color: 'rgba(255,255,255,.3)',
                        borderColor: 'rgba(255,255,255,.05)'
                    }
                }
            }}
        >
            <Button
                disabled={disabled || value <= min}
                onClick={() => {
                    if (!disabled && value > min) {
                        setTextValue(value => value - 1)
                        onChange && onChange({ target: { name, value: value - 1 } }, value - 1)
                    }
                }}
                aria-label="Decrease quantity"
            >
                <RemoveIcon sx={{ fontSize: '1.2rem' }} />
            </Button>
            <Button
                disableRipple
                sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'default',
                    '&:hover': {
                        background: 'rgba(255,255,255,.05)',
                    }
                }}
            >
                {textValue}
            </Button>
            <Button
                disabled={disabled || value >= max}
                onClick={() => {
                    if (!disabled && value < max) {
                        setTextValue(value => value + 1)
                        onChange && onChange({ target: { name, value: value + 1 } }, value + 1)
                    }
                }}
                aria-label="Increase quantity"
            >
                <AddIcon sx={{ fontSize: '1.2rem' }} />
            </Button>
        </ButtonGroup >
    )
}
export default Counter