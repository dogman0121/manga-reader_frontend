import { Box, Drawer, DrawerProps, useTheme } from '@mui/material';
import MobileModalWrapper from './ModalWrapper';

export default function MobileDrawer({open, onClose, anchor, children, sx}: DrawerProps) {
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
                elevation={0}
            >
                <Box
                    sx={{
                        width: "75vw",
                        height: "100%",
                        p: theme.spacing(3),
                        ...sx
                    }}
                >
                    { children }
                </Box>
            </Drawer>
        </MobileModalWrapper>
    )
}

