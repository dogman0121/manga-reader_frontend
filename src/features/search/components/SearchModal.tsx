import { Modal, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, OutlinedInputProps } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import { useState } from 'react'

function SearchInput({ onInput }: OutlinedInputProps) {
    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <InputLabel 
                htmlFor="search-input"
            >
            </InputLabel>
            <OutlinedInput
                id="search-input"
                onInput={onInput}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon fontSize="large"/>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <CloseIcon />
                    </InputAdornment>
                }
                sx={{
                    borderRadius: "16px",
                    padding: "0 10px", 
                    "& input": {
                        padding: "10px 0"
                    }
                }}
                placeholder="Введите запрос"
            >

            </OutlinedInput>
        </FormControl>
    )
}

function SearchModal({open, onClose}: {open: boolean, onClose: Function}) {
    
    const { device } = useDeviceDetect();

    const [query, setQuery] = useState("");

    console.log(query);
    
    const handleClose = () => {
        onClose();
    }

    const mobileStyles = {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        bgcolor: 'background.paper',
        pt: 2,
        px: 2,
        pb: 1,
    }

    const pcStyles = {
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: 'translateX(-50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        border: "none",
        borderRadius: "20px",
        padding: "12px 12px",
        width: "500px",
        "&:focus": {
          outline: "none"
        }
    }
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={ device === "mobile" ? mobileStyles : pcStyles }
            >
                <SearchInput 
                    onInput={(event: React.FormEvent) => {setQuery((event.target as HTMLInputElement).value)}}
                />
            </Box>
        </Modal>
    )
}

export default SearchModal;