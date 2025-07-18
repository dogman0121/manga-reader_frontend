import { Box, Drawer, DrawerProps, useTheme } from '@mui/material';
import MobileModalWrapper from './ModalWrapper';

export default function MobileDrawer({open, onClose, anchor, children, sx, ...props}: DrawerProps) {
    const theme = useTheme();
    
    return (
        <MobileModalWrapper
            open={open || false}
            onClose={onClose}
        >
            <Drawer
                open={open}
                onClose={onClose}
                anchor={anchor}
                {...props}
            >
                <Box
                    sx={{
                        width: "75vw",
                        height: "100%",
                        py: theme.spacing(3),
                        px: theme.spacing(2),
                        ...sx
                    }}
                >
                    { children }
                </Box>
            </Drawer>
        </MobileModalWrapper>
    )
}

