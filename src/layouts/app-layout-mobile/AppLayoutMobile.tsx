import { Box, Paper, BottomNavigation, BottomNavigationAction, Drawer, DrawerProps } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useEffect, useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Outlet, Link } from 'react-router-dom'
import UserMenu from "../../features/search/components/UserMenu";

function UserMenuDrawer({open, onClose}: DrawerProps) {

    useEffect(() => {
        if (open)
            window.history.pushState({drawerOpened: true}, "");

        const handlePopState = (_event: PopStateEvent) => {
            if (open){
                onClose ? onClose({}, "escapeKeyDown") : null;
            }
        }

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        }

    }, [open, onClose]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
        >
            <Box
                sx={{
                    width: "70vw",
                    padding: "25px 15px"
                }}
            >
                <UserMenu />
            </Box>
        </Drawer>
    )
}

function AppLayoutMobile() {
    const [navSection, setNavSection] = useState(0);

    const { device } = useDeviceDetect();

    const [ menuOpened, setMenuOpened ] = useState(false);

    const [prevPage, setPrevPage] = useState(0);

    useEffect(() => {
        if (menuOpened)
            window.history.pushState({drawerOpened: true}, "");

        const handlePopState = (event: PopStateEvent) => {
            if (menuOpened)
                return setMenuOpened(menuOpened => false);

            const href = (event.target as Window).location.pathname;

            if (href === "/")
                setNavSection(0);
            if (href.startsWith("/search"))
                setNavSection(1);
        }
        
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handleGoBack);
        }
    }, [menuOpened, setMenuOpened])

    const handleGoBack = () => {
        setNavSection(prevPage);
    }

    const actionStyles = {
        fontSize: "12px",
    }

    return (   
        <>
            <Outlet />
            {device === "mobile" && (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                    showLabels
                    value={navSection}
                    onChange={(_event, newValue) => {
                        setPrevPage(navSection);
                        setNavSection(newValue);
                    }}
                    >
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            icon={
                                <Link to="/">
                                    <HomeRoundedIcon fontSize="medium"/>
                                </Link>
                            } 
                        />
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            icon={
                                <Link to="/search">
                                    <SearchRoundedIcon fontSize="medium"/>
                                </Link>
                            } 
                        />
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            icon={<NotificationsRoundedIcon fontSize="medium"/>} 
                        />
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            icon={<MenuRoundedIcon fontSize="medium"/>} 
                            onClick={() => {setMenuOpened(true)}}
                        />
                    </BottomNavigation>
                </Paper>
            )}
            <UserMenuDrawer 
                open={menuOpened}
                onClose={() => {
                    setMenuOpened(false)
                    handleGoBack();
                }}
            />
        </>
    )
}

export default AppLayoutMobile;