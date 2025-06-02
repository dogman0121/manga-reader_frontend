import { Box, Drawer, DrawerProps } from '@mui/material';
import MobileModalWrapper from './ModalWrapper';

export default function MobileDrawer({open, onClose, anchor, children, sx}: DrawerProps) {
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
                        ...sx
                    }}
                >
                    { children }
                </Box>
            </Drawer>
        </MobileModalWrapper>
    )
}

