import { Link } from 'react-router-dom';
import { Box, ButtonBase } from '@mui/material';
import config from '../../../config';
import Logo from '../../../components/Logo';


const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath} sx={{ display: 'inline-flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '180px', width: '100%' }}><Logo /></Box>
    </ButtonBase>
);

export default LogoSection;
