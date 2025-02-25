import { Box, Drawer, DrawerProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileModalWrapper from './ModalWrapper';

export default function MobileDrawer({open, onClose, anchor, children}: DrawerProps) {
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
        </MobileModalWrapper>
    )
}

