import { Box, Paper, BottomNavigation, BottomNavigationAction, Drawer, DrawerProps } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Outlet, Link } from 'react-router-dom'
import UserMenu from "../../features/search/components/UserMenu";

function UserMenuDrawer({open, onClose}: DrawerProps) {
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
    const [value, setValue] = useState(0);

    const { device } = useDeviceDetect();

    const [ menuOpened, setMenuOpened ] = useState(false);

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
                    value={value}
                    onChange={(_event, newValue) => {
                        setValue(newValue);
                    }}
                    >
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            label="Домой"
                            icon={
                                <Link to="/">
                                    <HomeRoundedIcon fontSize="medium"/>
                                </Link>
                            } 
                        />
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            label="Поиск"
                            icon={
                                <Link to="/search">
                                    <SearchRoundedIcon fontSize="medium"/>
                                </Link>
                            } 
                        />
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            label="Уведомления"
                            icon={<NotificationsRoundedIcon fontSize="medium"/>} 
                        />
                        <BottomNavigationAction 
                            sx={actionStyles} 
                            label="Меню"
                            icon={<MenuRoundedIcon fontSize="medium"/>} 
                            onClick={() => {setMenuOpened(true)}}
                        />
                    </BottomNavigation>
                </Paper>
            )}
            <UserMenuDrawer 
                open={menuOpened}
                onClose={() => {setMenuOpened(false)}}
            />
        </>
    )
}

export default AppLayoutMobile;