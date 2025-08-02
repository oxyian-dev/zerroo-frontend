import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledButton = styled(Button)(({ hex }) => ({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    minHeight: '50px',
    minWidth: '50px',
    backgroundColor: `#${hex}`,
    '&:hover': {
        backgroundColor: `#${hex}`,
    }
}))

const ColorButton = ({ selected, hex, color }) => {
    return (
        <Box>
            <Box mb={.5} p={0.5} borderRadius={50} bgcolor={selected ? 'primary.main' : 'white'}>
                <Box p={0.5} borderRadius={50} bgcolor="white">
                    <StyledButton hex={hex} />
                </Box>
            </Box>
            <Typography textAlign="center">{color}</Typography>
        </Box>

    )
}
export default ColorButton;