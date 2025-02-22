import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Outlet } from 'react-router-dom'

function AppLayoutMobile() {
    const [value, setValue] = useState(0);

    const { device } = useDeviceDetect();

    return (   
        <>
            <Outlet />
            {device === "mobile" && (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        console.log(event);
                        setValue(newValue);
                    }}
                    >
                        <BottomNavigationAction icon={<HomeRoundedIcon fontSize="medium"/>} />
                        <BottomNavigationAction icon={<SearchRoundedIcon fontSize="medium"/>} />
                        <BottomNavigationAction icon={<NotificationsRoundedIcon fontSize="medium"/>} />
                        <BottomNavigationAction icon={<MenuRoundedIcon fontSize="medium"/>} />
                    </BottomNavigation>
                </Paper>
            )}
        </>
    )
}

export default AppLayoutMobile;