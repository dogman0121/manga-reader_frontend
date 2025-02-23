import { Box, Drawer, DrawerProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef } from 'react';

export default function MobileDrawer({open, onClose, anchor, children}: DrawerProps) {
    const theme = useTheme();

    const level = useRef(0);

    useEffect(() => {
            const handlePopState = (event: PopStateEvent) => {
                if (event.state.level === level.current && !open){
                    window.history.back();
                    return ;
                }

                if (event.state.role === "band")
                    return;
                
                if (open && event.state.level === level.current){
                    onClose ? onClose({}, "escapeKeyDown") : null;
                    window.history.back();
                }
            }

            
            if (open) {
                level.current = (0 | window.history.state?.level) + 1;
                
                window.history.pushState({modal: true, level: level.current}, "");
                window.history.pushState({modal: true, level: level.current, role: "band"}, "");
            }

            window.addEventListener("popstate", handlePopState);

            return () => {
                window.removeEventListener("popstate", handlePopState);
            }
    
        }, [open]);

    
    const handleClose = () => {
        window.history.back();
        window.history.back();
        onClose ? onClose({}, "backdropClick") : null;
    }

    return (
        <Drawer
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

