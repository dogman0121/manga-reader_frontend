import { Modal, Box, useTheme } from "@mui/material";
import SearchInput from "./SearchInput";
import SearchProvider from "./SearchProvider";
import SearchSectionSelector from "./SearchSectionSelector";
import SearchListModal from "./SearchListModal";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import MobileModal from "../../../components/ui/MobileModal";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function SearchModalMobile({open, onClose}: {open: boolean, onClose: () => void}) {
    const theme = useTheme();

    return (
        <MobileModal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    bgcolor: theme.palette.background.default
                }}
            >
                <AppContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: theme.spacing(2),
                            height: "34px"
                        }}
                    >
                        <ArrowBackRoundedIcon 
                            onClick={onClose}
                        />
                        <SearchInput/>
                    </Box>
                    <SearchListModal sx={{mt: theme.spacing(3)}}/>
                </AppContent>
            </Box>
        </MobileModal>
    )
    
}

function SearchModalPC({open, onClose}: {open: boolean, onClose: () => void}) {
    const handleClose = () => {
        onClose();
    }

    const styles = {
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: 'translateX(-50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        border: "none",
        borderRadius: "12px",
        padding: "12px 12px",
        width: "600px",
        "&:focus": {
          outline: "none"
        }
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <SearchProvider emptyQuery={false}>
                <Box
                    sx={{ ...styles }}
                >
                    <SearchInput/>
                    <SearchSectionSelector 
                        sx={{
                            mt: "5px"
                        }}
                    />
                    <SearchListModal 
                        sx={{
                            mt: "15px"
                        }}
                    />
                </Box>
            </SearchProvider>
        </Modal>
    )
}

function SearchModal({...props}: {open: boolean, onClose: () => void}) {
    const {device} = useDeviceDetect();
    
    return (
        <>
            {device == DEVICE.PC && <SearchModalPC {...props} />}
            {device == DEVICE.PAD && <SearchModalPC {...props} />}
            {device == DEVICE.MOBILE && <SearchModalMobile {...props} />}
        </>
    )
}

export default SearchModal;