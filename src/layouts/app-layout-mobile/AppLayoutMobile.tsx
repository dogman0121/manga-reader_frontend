import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useEffect, useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Outlet, Link } from 'react-router-dom'
import { UserMenuDrawer } from "../../components/UserMenu";


function AppLayoutMobile() {
    const [navSection, setNavSection] = useState(0);

    const { device } = useDeviceDetect();

    const [ menuOpened, setMenuOpened ] = useState(false);

    const [prevPage, setPrevPage] = useState(0);

    useEffect(() => {
        if (menuOpened)
            window.history.pushState({drawerOpened: true}, "");

        const handlePopState = (event: PopStateEvent) => {
            if (event.state?.modal)
                return;

            const href = (event.currentTarget as Window).location.pathname;

            if (href === "/")
                setNavSection(0);
            if (href.startsWith("/search"))
                setNavSection(1);
        }
        
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handleGoBack);
        }
    }, [])

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