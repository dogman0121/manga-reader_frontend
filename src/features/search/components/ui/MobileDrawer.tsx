import { Box, Drawer, DrawerProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';

export default function MobileDrawer({open, onClose, anchor, children}: DrawerProps) {
    const theme = useTheme();

    const drawerRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
            let level: number;

            const handlePopState = (event: PopStateEvent) => {
                if (event.state.role === "band")
                    return;

                if (open && event.state?.level === level){
                    onClose ? onClose({}, "escapeKeyDown") : null;
                    window.history.back();
                }
            }

            
            if (open) {
                level = (0 | window.history.state?.level) + 1;
                
                window.history.pushState({modal: true, level: level}, "");
                window.history.pushState({modal: true, level: level, role: "band"}, "");
                
                window.addEventListener("popstate", handlePopState);
            }

            return () => {
                window.removeEventListener("popstate", handlePopState);
            }
    
        }, [open, onClose]);

    
    const handleClose = () => {
        window.history.back();
        onClose ? onClose({}, "backdropClick") : null;
    }

    return (
        <Drawer
            ref={drawerRef}
            open={open}
            onClose={handleClose}
            anchor={anchor}
        >
            <Box
                sx={{
                    width: "75vw",
                    height: "100%",
                    padding: "15px 10px",
                    bgcolor: theme.palette.customBackgrounds?.paper
                }}
            >
                { children }
            </Box>
        </Drawer>
    )
}

