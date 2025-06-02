import { FormControl, OutlinedInput, InputAdornment, styled } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import SearchContext from "../context/SearchContext";


const SearchOutlinedInput = styled(OutlinedInput)(({theme}) => ({
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

function SearchInput() {
    const { query, setQuery } = useContext(SearchContext);

    return (
        <FormControl
            variant="outlined"
            sx={{
                width: "100%",
            }}
        >
            <SearchOutlinedInput
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

            </SearchOutlinedInput>
        </FormControl>
    )
}

export default SearchInput;