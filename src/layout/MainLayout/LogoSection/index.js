import { Link } from 'react-router-dom';
import { Box, ButtonBase } from '@mui/material';
import config from '../../../config';
import Logo from '../../../components/Logo';


const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Box sx={{ maxWidth: '80px' }}><Logo /></Box>
    </ButtonBase>
);

export default LogoSection;
