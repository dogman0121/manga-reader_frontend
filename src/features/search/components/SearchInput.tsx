import { FormControl, OutlinedInput, InputAdornment, styled, BoxProps, Box, useTheme, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { getColorScheme } from "../../../utils/colorScheme";


const SearchOutlinedInputPC = styled(OutlinedInput)(({theme}) => ({
    borderRadius: "30px",
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
    borderRadius: "20px",
    height: "34.6px",
    padding: `0 ${theme.spacing(2)} 0 ${theme.spacing(3)}`, 
    backgroundColor: theme.palette.background.paper,
    "& input": {
        padding: "6px 0",
        fontSize: "14px"
    }
}));


function SearchInputDisabledMobile({
    sx, 
    onClick,
    value = "",
    placeholder = "Поиск", 
    ...props
}: BoxProps & {value?: string, placeholder?: string}) {
    const theme = useTheme();

    const color = getColorScheme() == "light" ? "0, 0, 0" : "255, 255, 255"; 

    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",

                border: `1px solid rgba(${color}, 0.23)`,

                p: "6px 10px 6px 14px",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "20px",
                ...sx
            }}
            {...props}
        >
            <Box
                sx={{width: "100%"}}
                onClick={onClick}
            >
                {value != "" ?
                    <Typography>{value}</Typography>
                    :
                    <Typography
                        color={`rgba(${color}, 0.42)`}
                    >{placeholder}</Typography>
                }
            </Box>
            <CloseIcon 
                sx={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer"
                }}
            />
        </Box>
    )
}


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
                    type="text"
                    fullWidth
                    slotProps={{
                        input: {
                            autoCapitalize:"off",
                            autoComplete:"off",
                            autoCorrect:"off"
                        }
                    }}
                    value={query}
                    autoFocus
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

export function SearchInputDisabled({...props}: BoxProps & {value?: string, placeholder?: string}) {
    const {device} = useDeviceDetect();
    
    return (
        <>
            {device == DEVICE.MOBILE && <SearchInputDisabledMobile {...props}/>}
        </>
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