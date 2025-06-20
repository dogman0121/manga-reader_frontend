import { Autocomplete, AutocompleteProps, AutocompleteRenderInputParams, CircularProgress } from "@mui/material";
import FormInput from "./FormInput";

interface FormAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends Omit<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  placeholder?: string;
  title?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}


export default function FormAutocomplete<
    Value,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
>({loading, renderInput, placeholder, title, sx, ...props}: FormAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>) {
    return (
        <Autocomplete
            sx={{
                "& .MuiOutlinedInput-root": {
                    padding: "8px 5px",
                    "& .MuiOutlinedInput-input": {
                        padding: "0 10px"
                    }
                },
                ...sx
            }}  
            renderInput={renderInput || ((params) => (
                <FormInput 
                    {...params}
                    title={title}
                    placeholder={placeholder}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                            ),
                        }
                    }}
                />
            ))}
            loading={loading}
            {...props}
        />
    )
}