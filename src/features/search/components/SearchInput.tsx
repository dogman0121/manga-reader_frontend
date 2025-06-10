import { FormControl, OutlinedInput, InputAdornment, styled } from "@mui/material"
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

function SearchInputPC() {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <SearchOutlinedInputPC
                id="search-input"
                value={query}
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

function SearchInputMobile( ) {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <SearchOutlinedInputMobile
                id="search-input"
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
        </FormControl>
    )
}

function SearchInput() {
    const {device} = useDeviceDetect();
    
    return (
        <>
            {device == DEVICE.MOBILE && <SearchInputMobile />}
            {device == DEVICE.PC && <SearchInputPC />}
            {device == DEVICE.PAD && <SearchInputPC />}
        </>
    )
}

export default SearchInput;