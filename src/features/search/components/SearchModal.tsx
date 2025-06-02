import { Modal, Box } from "@mui/material";
import SearchInput from "./SearchInput";
import SearchProvider from "./SearchProvider";
import SearchSectionSelector from "./SearchSectionSelector";
import SearchListModal from "./SearchListModal";

function SearchModal({open, onClose}: {open: boolean, onClose: Function}) {
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

export default SearchModal;