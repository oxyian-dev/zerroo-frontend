import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ selected }) => ({
    height: '44px',
    minHeight: '44px',
    minWidth: '44px',
    borderRadius: '4px',
    padding: '0 16px',
    fontSize: '0.875rem',
    fontWeight: selected ? 700 : 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: selected ? '#000' : 'rgba(255,255,255,.82)',
    backgroundColor: selected ? '#efcb77' : 'transparent',
    border: selected ? '1px solid #efcb77' : '1px solid rgba(255,255,255,.15)',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: selected ? '#f5dc97' : 'rgba(255,255,255,.05)',
        borderColor: selected ? '#f5dc97' : '#efcb77',
        color: selected ? '#000' : '#efcb77',
        transform: 'translateY(-2px)',
    }
}))

const SizeButton = (props) => {
    return (
        <StyledButton {...props} />
    )
}

export default SizeButton