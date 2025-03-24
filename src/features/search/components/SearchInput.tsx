import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import SearchContext from "../context/SearchContext";


function SearchInput() {
    const { query, setQuery } = useContext(SearchContext);

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
                value={query}
                onInput={(event: React.FormEvent) => {
                    setQuery((event.target as HTMLInputElement).value)
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon fontSize="large"/>
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

export default SearchInput;