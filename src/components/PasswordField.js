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
                endAdornment: (
                    <Tooltip
                        title={show ? "Hide Password" : "Show Password"}>
                        <IconButton
                            edge="end"
                            tabIndex={-1}
                            onClick={() => {
                                setShow(show => !show)
                            }}>
                            {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </Tooltip>
                )
            }}
        />
    )
}
export default PasswordField;