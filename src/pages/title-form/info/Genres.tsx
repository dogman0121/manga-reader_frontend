import { useFormContext } from "react-hook-form";
import { Autocomplete, Typography } from "@mui/material";
import { TextField, Box } from "@mui/material"


const genresOptions = [
    {id: 1, name: "драки"},
    {id: 2, name: "романтика"}
]

function Genres() {
    const {watch, setValue} = useFormContext();

    const handleGenres = (_event: React.SyntheticEvent, value: Array<{id: number, name: string}>) => {
        setValue("genres", value);
    }

    return (
        <Box>
            <Typography>Жанры</Typography>
            <Autocomplete
                multiple
                disableCloseOnSelect
                freeSolo
                options={genresOptions}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.id}
                onChange={handleGenres}
                value={watch("genres") || []}
                isOptionEqualToValue={(option, value) => {return option.id === value.id}}
                renderInput={(params) => 
                    <TextField 
                        {...params}
                        placeholder="Введите название"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                py: "7px"
                            },
                            "& input": {
                                py: "3px !important"
                            }
                        }}
                    /> 
                }
            />
        </Box>
    )
}

export default Genres;