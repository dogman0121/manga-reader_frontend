import { Modal, Box, useTheme } from "@mui/material";
import SearchInput from "./SearchInput";
import SearchProvider from "./SearchProvider";
import SearchSectionSelector from "./SearchSectionSelector";
import SearchListModal from "./SearchListModal";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import MobileModal from "../../../components/ui/MobileModal";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ScrollableBox from "../../../components/ScrollableBox";

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
                    overflow: "hidden",
                    bgcolor: theme.palette.background.default
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "static",
                    }}
                >
                    <Box
                        sx={{
                            p: `${theme.spacing(2)}`,
                            position: "sticky",
                            top: 0,
                            bgcolor: theme.palette.background.default
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                columnGap: theme.spacing(2),
                                height: "34px",
                            }}
                        >
                            <ArrowBackRoundedIcon 
                                onClick={onClose}
                            />
                            <SearchInput/>
                        </Box>
                    </Box>
                    
                    <ScrollableBox
                        sx={{
                            flexGrow: 1,
                            overflowY: "auto"
                        }}
                    >
                        <AppContent>
                            <SearchListModal/>
                        </AppContent>
                    </ScrollableBox>
                </Box>
            </Box>
        </MobileModal>
    )
    
}

function SearchModalPC({open, onClose}: {open: boolean, onClose: () => void}) {
    const handleClose = () => {
        onClose();
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <SearchProvider emptyQuery={false}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        height: "90vh",
                        overflow: "hidden",
                        transform: 'translateX(-50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        border: "none",
                        borderRadius: "20px",
                        width: "650px",
                        "&:focus": {
                            outline: "none"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            position: "static",
                            maxHeight: "100%",

                        }}
                    >
                        <Box
                            sx={{
                                padding: "10px",
                            }}
                        >
                            <SearchInput/>
                            <SearchSectionSelector 
                                sx={{
                                    mt: "5px"
                                }}
                            />
                        </Box>
                        <ScrollableBox
                            sx={{
                                p: "5px 10px",
                                flexGrow: 1,
                                overflowY: "auto"
                            }}
                        >
                            <SearchListModal 
                                sx={{
                                
                                }}
                            />
                        </ScrollableBox>
                    </Box>
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