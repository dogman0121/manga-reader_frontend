import { Box, BottomNavigation, BottomNavigationAction, useTheme, Divider, SxProps } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Children, useEffect, useState } from "react";
import { Outlet, Link, generatePath, useNavigate } from 'react-router-dom'
import { UserMenuDrawer } from "../../modules/users/components/UserMenu"
import Blur from "../../components/Blur";
import MainBlurContext from "./MainBlurContext";
import { AppRoutes } from "../../routes";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export function ContentMobile({children}: {children: React.ReactNode}) {
    return (
        <Box sx={{
            p: "10px",
        }}>
            {children}
        </Box>
    )
}

export function Content({children}: {children: React.ReactNode}) {
    return (
        <Box sx={{
            pb: "56px",
        }}>
            {children}
        </Box>
    )
}

export function AppHeaderMobileWrapper({children}: {children?: React.ReactNode}) {
    
    return (
        <Box
            sx={{
                p: "10px",
            }}
        >
            {Children.map(children, child => child)}
        </Box>
    )
}

export function AppHeaderMobile({
    backArrow,
    firstLine,
    secondLine,
    sx
}: {
    backArrow?: boolean,
    firstLine?: string | React.ReactElement,
    secondLine?: string | React.ReactElement,
    sx?: SxProps
}) {
    const navigate = useNavigate();

    const theme = useTheme()

    return (
        <Box
            sx={{
                position: "sticky",
                bgcolor: theme.palette.background.default,
                top: 0,
                zIndex: 1001,
                ...sx
            }}
        >
            <AppHeaderMobileWrapper>
                <Box
                    sx={{
                        maxHeight: "34px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    {backArrow == true ? (<ArrowBackRoundedIcon onClick={() => {navigate(-1)}}/>) : <></>}
                    <Box
                        sx={{
                            ml: backArrow ? theme.spacing(2) : undefined,
                            fontSize: "18px",
                            fontWeight: 600,
                            width: "100%"
                        }}
                    >
                        {firstLine}
                    </Box>
                </Box>
                {secondLine && (
                    <Box
                        sx={{mt: theme.spacing(2)}}
                    >
                        {secondLine}
                    </Box>
                )}
            </AppHeaderMobileWrapper>
            <Divider />
        </Box>
    )
}

function AppLayoutMobile() {
    const theme = useTheme();

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

            if (href === AppRoutes.HOME)
                setNavSection(0);
            if (href.startsWith(AppRoutes.CATALOG))
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
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)" }} >
                <BottomNavigation
                    value={navSection}
                    onChange={(_event, newValue) => {
                        setPrevPage(navSection);
                        setNavSection(newValue);
                    }}
                    sx={{
                        bgcolor: theme.palette.background.paper
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
                            <Link to={AppRoutes.CATALOG}>
                                <SearchRoundedIcon fontSize="medium"/>
                            </Link>
                        } 
                    />
                    <BottomNavigationAction 
                        sx={actionStyles} 
                        icon={
                            <Link to={generatePath(AppRoutes.NOTIFICATIONS)}>
                                <NotificationsRoundedIcon fontSize="medium"/>
                            </Link>
                        } 
                    />
                    <BottomNavigationAction 
                        sx={actionStyles} 
                        icon={<MenuRoundedIcon fontSize="medium"/>} 
                        onClick={() => {setMenuOpened(true)}}
                    />
                </BottomNavigation>
            </Box>
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