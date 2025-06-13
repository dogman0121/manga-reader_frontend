import { Drawer as MuiDrawer, DrawerProps, Box, useTheme } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";
import MobileDrawer from "./MobileDrawer";
import { Children } from "react";

export default function Drawer({children, ...props}: DrawerProps) {
    const theme = useTheme()
    
    const {device} = useDeviceDetect();

    return (
        <>
            {device == DEVICE.PC ?
                <MuiDrawer {...props}>
                    <Box
                        sx={{
                            p: `${theme.spacing(5)} ${theme.spacing(3)}`
                        }}
                    >
                        {Children.map(children, child => child)}
                    </Box>
                </MuiDrawer>
                :
                <MobileDrawer {...props}>
                    {Children.map(children, child => child)}
                </MobileDrawer>
            }
        </>
    )
}