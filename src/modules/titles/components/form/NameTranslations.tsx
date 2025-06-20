import { Box, Typography, MenuItem } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormInput from "../../../../features/form/components/FormInput";
import FormSelect from "../../../../features/form/components/FormSelect";
import Button from "../../../../components/ui/Button";
import { useState } from "react";


const langOptions = [
    {id: "ru", name: "ru"},
    {id: "en", name: "en"},
    {id: "es", name: "es"},
    {id: "de", name: "de"},
    {id: "ua", name: "ua"},
    {id: "kz", name: "kz"},
    {id: "kr", name: "kr"},
    {id: "jp", name: "jp"},
]

export default function NameTranslations({value, onChange}: {value?: Map<string, string>, onChange: Function}) {
    const [name, setName] = useState("");
    const [lang, setLang] = useState("en");

    const handleAddNameTranslation = () => {
        const oldValue = new Map<string, string>(value || []);   
        
        oldValue.set(lang, name);
        onChange?.(oldValue);
    }   

    const handleEditTranslation = (lang: string) => {
        setName(value?.get(lang) || "")
        setLang(lang);
    }

    const handleDeleteTranslation = (lang: string) => {
        const oldValue = new Map<string, string>(value || []);   
        
        oldValue.delete(lang);
        onChange?.(oldValue);
    }

    return (
        <Box>
            <Typography>Дополнительные названия</Typography>
            <Box
                sx={{
                    mt: "5px",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "5px",
                    rowGap: "5px",
                }}
            >
                <FormInput
                    placeholder="Введите название"
                    onChange={(event) => {setName(event.target.value)}}
                    value={name}
                    sx={{
                        width: "100%"
                    }}
                />
                <FormSelect
                    value={lang}
                    onChange={(event) => {setLang(event.target.value as string)}}
                >
                    {langOptions.map((opt) => <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>)}
                </FormSelect>
                <Button variant="contained"
                    sx={{
                        padding: "0 15px",
                        textTransform: "lowercase"
                    }}
                    onClick={handleAddNameTranslation}
                >
                    Добавить
                </Button>
            </Box>
            { value?.size !== 0 && (
                <Box
                    sx={{
                        mt: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "5px",
                        columnGap: "5px"
                    }}
                >
                    {Array.from(value?.entries() || []).map(([key, value]: [string, string]) => (
                        <Box 
                            sx={{
                                p: "5px 10px",
                                bgcolor: "secondary.main",
                                borderRadius: "6px",
                                display: "inline-flex",
                                flexDirection: "row",
                                alignItems: "center",
                                fontSize: "14px"
                            }}
                            key={key}
                        >
                            {value}
                            <Box
                                sx={{
                                    m: "auto 15px auto 15px"
                                }}
                            >
                                {key}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    columnGap: "5px"
                                }}
                            >
                                <EditRoundedIcon 
                                    sx={{
                                        width: "15px",
                                        height: "15px"
                                    }}
                                    onClick={() => {handleEditTranslation(key)}}
                                />
                                <CloseRoundedIcon 
                                    sx={{width: "20px", height: "20px"}}    
                                    onClick={() => {handleDeleteTranslation(key)}}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}