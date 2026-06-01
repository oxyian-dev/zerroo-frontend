import { Box, IconButton } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import PropTypes from 'prop-types';
import React from 'react';
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

const Header = ({ handleLeftDrawerToggle }) => {
    return (
        <React.Fragment>
            <Box
                display='flex'
                width={{ md: 228, xs: "auto" }}
            >
                <Box display={{ xs: 'none', md: 'block' }} flexGrow={1}>
                    <Box sx={{
                        fontSize: '20px',
                        marginTop: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.24em',
                        background: 'linear-gradient(135deg, #fff7dc 0%, #f6d27b 35%, #d59b3d 68%, #fff0bf 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Victory World
                    </Box>
                </Box>
                <Box alignSelf="center">
                    <IconButton onClick={handleLeftDrawerToggle} sx={{ color: 'rgba(255,255,255,.82)' }}>
                        <IconMenu2 size={28} />
                    </IconButton>
                </Box>
            </Box>
            <Box flexGrow={1} textAlign="center">
                <Box display={{ md: 'none' }}>
                    <LogoSection />
                </Box>
            </Box>
            <ProfileSection />
        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
