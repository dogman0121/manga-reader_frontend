import { FormControl, OutlinedInput, InputAdornment, styled, BoxProps, Box } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";


const SearchOutlinedInputPC = styled(OutlinedInput)(({theme}) => ({
    borderRadius: "16px",
    padding: `0 ${theme.spacing(3)}`, 
    backgroundColor: theme.palette.background.paper,
    "& input": {
        padding: "10px 0",
        lineHeight: "20px",
        height: "auto",
        fontSize: "16px"
    }
}));

function SearchInputPC({...props}: BoxProps) {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <Box {...props}>
                <SearchOutlinedInputPC
                    id="search-input"
                    value={query}
                    fullWidth
                    onInput={(event: React.FormEvent) => {
                        setQuery((event.target as HTMLInputElement).value)
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon fontSize="large" />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <CloseIcon 
                                sx={{
                                    cursor: "pointer"
                                }}
                                onClick={() => {setQuery("")}}
                            />
                        </InputAdornment>
                    }
                    sx={{
                        
                    }}
                    placeholder="Введите запрос"
                >

                </SearchOutlinedInputPC>
            </Box>
        </FormControl>
    )
}

const SearchOutlinedInputMobile = styled(OutlinedInput)(({theme}) => ({
    borderRadius: "16px",
    padding: `0 ${theme.spacing(2)}`, 
    backgroundColor: theme.palette.background.paper,
    "& input": {
        padding: "5px 0",
        lineHeight: "20px",
        height: "auto",
        fontSize: "14px"
    }
}));

function SearchInputMobile({sx, ...props}: BoxProps) {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <Box 
                sx={{
                    width: "100%",
                    ...sx
                }}
                {...props}>
                <SearchOutlinedInputMobile
                    id="search-input"
                    fullWidth
                    value={query}
                    onInput={(event: React.FormEvent) => {
                        setQuery((event.target as HTMLInputElement).value)
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <CloseIcon 
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer"
                                }}
                                onClick={() => {setQuery("")}}
                            />
                        </InputAdornment>
                    }
                    sx={{
                        
                    }}
                    placeholder="Поиск"
                >

                </SearchOutlinedInputMobile>
            </Box>
        </FormControl>
    )
}

function SearchInput({...props}: BoxProps) {
    const {device} = useDeviceDetect();
    
    return (
        <>
            {device == DEVICE.MOBILE && <SearchInputMobile {...props}/>}
            {device == DEVICE.PC && <SearchInputPC {...props}/>}
            {device == DEVICE.PAD && <SearchInputPC {...props}/>}
        </>
    )
}

export default SearchInput;