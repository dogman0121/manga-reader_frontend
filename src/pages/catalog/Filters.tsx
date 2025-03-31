import { FormEvent, useContext } from "react";
import SearchContext from "../../features/search/context/SearchContext";
import { Autocomplete, Box, Typography, TextField } from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';


export function MultipleSelectFilter({name, placeholder, options}: {name: string, placeholder: string, options: Array<{id: number, name: string}>}) {
    const { filters, setFilters } = useContext(SearchContext);

    const handleGenres = (_event: React.SyntheticEvent, value: Array<{id: number, name: string}>) => {
        setFilters((prevFilters: Map<string, Array<{id: number, name: string}>>) => {
            const newFilters = new Map(prevFilters);
            newFilters.set(name, value);
            return newFilters;
        });
    }

    return (
        <Autocomplete
            sx={{
                "& .MuiOutlinedInput-root": {
                    p: "6px 9px"
                }
            }}
            multiple={true}
            options={options}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            onChange={handleGenres}
            value={filters.get(name) || []}
            isOptionEqualToValue={(option, value) => {return option.id === value.id}}
            renderInput={(params) => <TextField {...params} label={placeholder} />}
        />
    )
}

export function InputFilter({ name, placeholder }: {name: string, placeholder: string}) { // for numbers
    const { filters, setFilters } = useContext(SearchContext);

    const handleInput = (e: FormEvent) => {
        const val = (e.target as HTMLInputElement).value;

        if (val != "" && !parseInt(val.charAt(val.length-1)))
            return;
        
        setFilters((prevFilters: Map<string, Array<{id: number, name: string}>>) => {
            const newFilters = new Map(prevFilters);
            newFilters.set(name, [{id: parseInt(val), name: ""}])
            return newFilters;
        })
    }

    return (
        <TextField 
            sx={{
                "& .MuiOutlinedInput-root": {
                    padding: "6px 9px"
                },
                "& input": {
                    p: "7.5px 4px 7.5px 5px"
                }
            }}
            variant="outlined" 
            type="number"
            value={filters.get(name)?.[0]?.id.toString() || ""}
            label={placeholder} 
            onInput={handleInput}
        />
    )
}

function Filters({ children }: {children: React.ReactNode}) {
    const { setFilters } = useContext(SearchContext);

    const handleClear = () => {
        setFilters(new Map<string, Array<{id: number, name: string}>>());
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Typography>Фильтры</Typography>
                <Typography
                    onClick={handleClear}
                    sx= {{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                >
                    очистить
                    <ClearRoundedIcon />
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                    mt: "25px"
                }}
            >
                {children}
            </Box>
        </>
    )
}

export default Filters;