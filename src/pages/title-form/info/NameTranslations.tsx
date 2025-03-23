import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import FormSelect from "../components/FormSelect";
import { useFormContext, Controller } from "react-hook-form";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";


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

function NameTranslationsForm() {
    const {watch, control, setValue} = useFormContext();

    const device = useDeviceDetect();

    const handleAddNameTranslation = () => {
        const name = watch("nameTranslation")
        const lang = watch("nameTranslationLang");

        if (!name)
            return;

        setValue("nameTranslations", ((prevTranslations: Map<string, string>) => {
            const newTranslations = new Map(prevTranslations);
            newTranslations.set(lang, name);
            return newTranslations;
        })(watch("nameTranslations")));

        setValue("nameTranslation", "");
        setValue("nameTranslationLang", "ru");
    }

    return (
        <Box>
            <Typography>Дополнительные названия</Typography>
            <Box
                sx={{
                    mt: "5px",
                    display: "flex",
                    flexWrap: device === DEVICE.MOBILE ? "wrap" : undefined,
                    flexDirection: "row",
                    columnGap: "5px",
                    rowGap: "5px"
                }}
            >
                <Controller 
                    name="nameTranslation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField 
                            {...field}
                            fullWidth
                            sx={{
                                "& input": {
                                    p: "10px 15px"
                                }
                            }}
                            placeholder="Введите название"
                        />
                    )}
                />
                <Controller 
                    name="nameTranslationLang"
                    control={control}
                    defaultValue="ru"
                    render={({field}) => (
                        <FormSelect
                            {...field}
                        > 
                            {langOptions.map((opt) => <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>)}  

                        </FormSelect>
                    )}
                />
                <Button variant="contained"
                    sx={{
                        height: "43px",
                        padding: "0 20px"
                    }}
                    onClick={handleAddNameTranslation}
                >
                    Добавить
                </Button>
            </Box>
        </Box>
    )
}

function NameTranslationsList() {
    const {watch, setValue} = useFormContext();

    const handleDeleteTranslation = (lang: string) => {
        setValue("nameTranslations", ((prevTranslations: Map<string, string>) => {
            const newTranslations = new Map(prevTranslations);
            newTranslations.delete(lang);
            return newTranslations;
        })(watch("nameTranslations")))
    }

    const handleEditTranslation = (val: string, lang: string) => {
        setValue("nameTranslation", val);
        setValue("nameTranslationLang", lang)
    }

    return (
        <Box>
            
            <Box
                sx={{
                    mt: "8px",
                    display: "flex",
                    flexWrap: "wrap",
                    rowGap: "5px",
                    columnGap: "5px"
                }}
            >
                {watch("nameTranslations") && Array.from(watch("nameTranslations")).map(([key, val]: any) => (
                    <Box 
                        sx={{
                            p: "5px 10px",
                            bgcolor: "secondary.main",
                            borderRadius: "6px",
                            display: "inline-flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                        key={key}
                    >
                        {val}
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
                                onClick={() => {handleEditTranslation(val, key)}}
                            />
                            <CloseRoundedIcon 
                                sx={{width: "20px", height: "20px"}}    
                                onClick={() => {handleDeleteTranslation(key)}}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

function NameTranslations() {
    return (
        <Box>
            <NameTranslationsForm />
            <NameTranslationsList />
        </Box>
    )
}

export default NameTranslations;