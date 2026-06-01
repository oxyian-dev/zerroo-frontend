import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import config from '../../../config';
import LogoSection from '../LogoSection';
import MenuList from './MenuList';

const Sidebar = ({ drawerOpen, drawerToggle, window, menuItems, setLeftDrawerOpened }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [isOpen, setIsOpen] = useState([]);

    const drawer = (
        <React.Fragment>
            <Box sx={{ bgcolor: '#05070a', backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                <Box display={{ xs: 'block', md: 'none' }}>
                    <Box textAlign="center" p={2}>
                        <LogoSection />
                    </Box>
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 101px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <MenuList setLeftDrawerOpened={setLeftDrawerOpened} isOpen={isOpen} setIsOpen={setIsOpen} menuItems={menuItems} />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList setLeftDrawerOpened={setLeftDrawerOpened} isOpen={isOpen} setIsOpen={setIsOpen} menuItems={menuItems} />
                </Box>
            </MobileView>
        </React.Fragment>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { md: 0 },
                width: matchUpMd ? config.drawerWidth : 'auto'
            }}
            aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: config.drawerWidth,
                        backgroundColor: '#05070a',
                        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))',
                        color: theme.palette.text.primary,
                        borderRight: '1px solid rgba(255,255,255,.1)',
                        [theme.breakpoints.up('md')]: {
                            top: '101px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
