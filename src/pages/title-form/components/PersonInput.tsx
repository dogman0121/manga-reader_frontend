import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { searchService } from "../../../features/search/services/api/searchService";
import { useFormContext } from "react-hook-form";

function PersonInput({name}: {name: string}) {
    const {setValue, watch} = useFormContext();

    const [search, setSearch] = useState("");

    const [authors, setAuthors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const timerId = useRef<number>(0);

    useEffect(() => {
        if (search === ""){
            setIsLoading(false);
            setAuthors([]);
            return () => {}
        }

        setIsLoading(true);

        timerId.current = setTimeout(async () => {
            try {
                const response = await searchService.search(search, "person");

                setAuthors(await response.json());
            }
            catch {}

            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(timerId.current);
        }
    }, [search])

    const handleChange = (_event: React.SyntheticEvent, value: Array<{id: number, name: string}>) => {
        setValue(name, value);
    }
    
    return (
        <Autocomplete
            multiple
            freeSolo
            disableCloseOnSelect
            options={authors}
            filterOptions={x => x}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            loading={isLoading}
            onChange={handleChange}
            onInputChange={(_, newInputValue) => {
                setSearch(newInputValue);
            }}
            value={watch(name) || []}
            isOptionEqualToValue={(option, value) => {return option.id === value.id}}
            renderInput={(params) => 
                <TextField 
                    {...params}
                    placeholder="Введите название"
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                            ),
                        }
                    }}
                /> 
            }
        />
    )
}

export default PersonInput;