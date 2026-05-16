import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledButton = styled(Button)(({ hex }) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    minHeight: '44px',
    minWidth: '44px',
    backgroundColor: `#${hex}`,
    padding: 0,
    '&:hover': {
        backgroundColor: `#${hex}`,
        transform: 'scale(1.05)',
    },
    transition: 'all 0.3s ease',
}))

const ColorButton = ({ selected, hex, color, ...props }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box
                sx={{
                    mb: 1,
                    p: '3px',
                    borderRadius: '50%',
                    border: selected ? '2px solid #efcb77' : '2px solid transparent',
                    background: selected ? 'linear-gradient(135deg, rgba(255,247,220,.2), rgba(239,203,119,.2))' : 'transparent',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                }}
            >
                <Box
                    sx={{
                        p: '2px',
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <StyledButton hex={hex} {...props} />
                </Box>
            </Box>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: selected ? '#efcb77' : 'rgba(255,255,255,.68)',
                    fontWeight: selected ? 600 : 400,
                    textTransform: 'capitalize',
                    transition: 'color 0.3s ease',
                }}
            >
                {color}
            </Typography>
        </Box>
    )
}
export default ColorButton;