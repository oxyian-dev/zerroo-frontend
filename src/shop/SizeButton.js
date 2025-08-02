import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ selected }) => ({
    height: '50px',
    borderRadius: '10%',
    borderColor: grey[900],
    minHeight: '50px',
    minWidth: '50px',
    color: selected ? 'white' : grey[900],
    backgroundColor: selected ? grey[900] : 'white',
    '&:hover': {
        backgroundColor: selected ? grey[900] : 'white',
        borderColor: grey[900]
    }
}))
const SizeButton = (props) => {
    return (
        <StyledButton {...props} />
    )
}
export default SizeButton