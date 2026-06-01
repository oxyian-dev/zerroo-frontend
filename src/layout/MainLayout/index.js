import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AuthPage from '../../components/AuthPage';
import config from '../../config';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
    backgroundColor: '#05070a',
    backgroundImage: 'radial-gradient(circle at top, rgba(246,210,123,.05), transparent 26%), radial-gradient(circle at right, rgba(85,187,255,.04), transparent 22%), linear-gradient(180deg, #070b10 0%, #05070a 55%, #030406 100%)',
    width: '100%',
    minHeight: 'calc(100vh - 101px)',
    flexGrow: 1,
    padding: '24px',
    marginTop: '101px',
    marginRight: '24px',
    borderRadius: '4px',
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(config.drawerWidth - 24),
            width: `calc(100% - ${config.drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '24px',
            width: `calc(100% - ${config.drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '12px',
            width: `calc(100% - ${config.drawerWidth}px)`,
            padding: '12px',
            marginRight: '12px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${config.drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '24px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '12px'
        }
    })
}));

const MainLayout = ({ menuItems }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
    const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);
    const handleLeftDrawerToggle = () => {
        setLeftDrawerOpened(leftDrawerOpened => !leftDrawerOpened)
    };

    useEffect(() => {
        setLeftDrawerOpened(!matchDownMd)
    }, [matchDownMd]);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>
            <Sidebar setLeftDrawerOpened={setLeftDrawerOpened} menuItems={menuItems} drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
            <Main theme={theme} open={leftDrawerOpened}>
                <AuthPage>
                    <Outlet />
                </AuthPage>
            </Main>
        </Box>
    );
};

export default MainLayout;
