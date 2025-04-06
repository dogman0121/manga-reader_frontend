import { Box, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useEffect, useState } from "react";
import { Outlet, Link } from 'react-router-dom'
import { UserMenuDrawer } from "../../components/UserMenu";
import Blur from "../../components/Blur";
import MainBlurContext from "./MainBlurContext";

export function ContentMobile({children}: {children: React.ReactNode}) {
    return (
        <Box sx={{
            p: "10px 5px 66px"
        }}>
            {children}
        </Box>
    )
}

export function Content({children}: {children: React.ReactNode}) {
    return (
        <Box sx={{
            pb: "61px"
        }}>
            {children}
        </Box>
    )
}

function AppLayoutMobile() {
    const [navSection, setNavSection] = useState(0);

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
            if (href.startsWith("/catalog"))
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

    const [blurOpened, setBlurOpened] = useState<boolean>(false);

    const [blurContent, setBlurContent] = useState<React.ReactNode>(<></>);

    return (   
        <>
            <Content>
                <MainBlurContext.Provider
                    value={{
                        opened: blurOpened,
                        content: blurContent,
                        setOpened: setBlurOpened,
                        setContent: setBlurContent
                    }}
                >
                    <Outlet />
                </MainBlurContext.Provider>
                <Blur open={blurOpened}>
                    {blurContent}
                </Blur>
            </Content>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
                <BottomNavigation
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
                            <Link to="/catalog">
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