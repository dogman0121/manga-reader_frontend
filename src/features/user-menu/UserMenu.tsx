import { useContext } from "react";
import { EMPTY_USER } from "../../types/User";
import UserContext from "../../context/UserAuthContext";
import { 
    Avatar, 
    Box, 
    Typography, 
    DrawerProps,
    Popover, 
    PopoverProps, 
    Paper, 
} from "@mui/material";

import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from "../../components/ui/MobileDrawer";
import UserMenuContext from "../../context/UserMenuContext";
import Widget from "../../components/ui/Widget";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { generatePath, UserRoutes } from "../../routes";
import HeaderMobile from "./components/HeaderMobile";
import AnonymusMenu from "./components/AnonymusMenu";
import SettingsPC from "./components/SettingsPC";
import ExitButton from "./components/widgets/ExitButton";


const buttonWidgetStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
}

function UserWidgetMobile() {
    const { user } = useContext(UserContext);

    const {onClose} = useContext(UserMenuContext);

    const theme = useTheme();

    if (user == null)
        return <></>

    return (
        <>
            <Link to={generatePath(UserRoutes.INDEX, {userId: user.id})}>
                <Widget
                    sx={{
                        p: "15px 12px"
                    }}
                >
                    <Avatar 
                        src={user.avatar} 
                        variant="square"
                        sx={{
                            width: "46px",
                            height: "46px",
                            borderRadius: "8px"
                        }}
                    />
                    <Box
                        sx={{
                            ml: "15px"
                        }}
                    >
                        <Typography>{user.login}</Typography>
                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: theme.typography.subtitle1.color,
                                textDecoration: "underline"
                            }}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            в профиль
                        </Typography>
                    </Box>
                </Widget>
            </Link>
        </>
    )
}

function UserWidgetPC() {
    const { user } = useContext(UserContext);

    const {onClose} = useContext(UserMenuContext);

    const theme = useTheme();

    if (user == null)
        return (<></>)

    return (
        <>
            <Link to={generatePath(UserRoutes.INDEX, {userId: user.id})}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: "4px 6px",
                        bgcolor: theme.palette.customBackgrounds?.widget1,
                        alignItems: "center",
                        borderRadius: "6px"
                    }}
                >
                    <Avatar 
                        src={user.avatar} 
                        variant="square"
                        sx={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px"
                        }}
                    />
                    <Box
                        sx={{
                            ml: "15px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: theme.typography.subtitle1.color,
                                textDecoration: "underline"
                            }}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Мой профиль
                        </Typography>
                        <Typography>{user.login}</Typography>
                    </Box>
                </Box>
            </Link>
        </>
    )
}


function AddMangaButton() {
    const { onClose } = useContext(UserMenuContext);

    return (
        <Link to="/manga/add">
            <Widget
                onClick={() => {
                    onClose();
                }}
            >
                <Box
                    sx={{
                        ...buttonWidgetStyle
                    }}
                >
                    Добавить тайтл
                    <AddRoundedIcon />
                </Box>
            </Widget>
        </Link>
    )
}

function UserMenuMobile() {
    return (
        <Box
            sx={{
                padding: "10px 5px",
                height: "100%",
            }}
        >
            <HeaderMobile />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "7px",
                    mt: 2,
                }}
            >
                <UserWidgetMobile />
                <AddMangaButton />
                <ExitButton />
            </Box>
        </Box>
    )
}

function UserMenuPC() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "7px",
            }}
        >
            <UserWidgetPC />
            <SettingsPC />
            <ExitButton />
        </Box>
    )
}

function UserMenu(){
    const { user } = useContext(UserContext);

    const { device } = useDeviceDetect();

    return (
        <>
            {device === DEVICE.MOBILE ?
                <>
                    {user !== EMPTY_USER ?
                        <UserMenuMobile />
                        :
                        <AnonymusMenu />
                    }
                </>
                :
                <UserMenuPC />
            }
        </>
    )
}


export function UserMenuDrawer({open, onClose}: DrawerProps) {
    return (
        <>
            <MobileDrawer
                open={open}
                onClose={onClose}
                anchor="right"
            >
                <UserMenuContext.Provider
                    value={{
                        onClose: () => {
                            onClose ? onClose({}, "backdropClick") : null;
                        }
                    }}
                >
                    <UserMenu />
                </UserMenuContext.Provider>
                
            </MobileDrawer>
        </>
    )
}

export function UserMenuPopover({open, onClose, anchorEl}: PopoverProps) {
    return (
        <>
            <Popover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                sx={{
                    mt:"10px",
                    ".MuiPaper-root": {
                        borderRadius: "12px",
                    }
                }}
            >   
                <Paper elevation={0}
                    sx={{
                        width: "250px",
                        padding: "10px",
                    }}
                >
                    <UserMenuContext.Provider
                        value={{
                            onClose: () => {
                                onClose ? onClose({}, "backdropClick") : null;
                            }
                        }}
                    >
                        <UserMenu />
                    </UserMenuContext.Provider>
                </Paper>
            </Popover>
        </>
    )
}