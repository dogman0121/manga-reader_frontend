import { Box, Typography, TextField, MenuItem } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormSelect from "../components/FormSelect";
import NameTranslations from "./NameTranslations";
import Genres from "./Genres";
import Authors from "./Authors";
import Artists from "./Artists";
import Publishers from "./Publishers";


function Name(){
    const {formState:{errors}, control} = useFormContext();

    console.log(errors);

    return (
        <Box>
            <Typography>Название (на русском)</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="name"
                    control={control}
                    rules={{required: true}}
                    defaultValue=""
                    render={({ field, fieldState:{error} }) => (
                        <TextField 
                            {...field}
                            fullWidth
                            error={error ? true : false}
                            sx={{
                                "& input": {
                                    p: "12px 15px"
                                }
                            }}
                            placeholder="Введите название"
                        />
                    )}
                />
                {errors.name && errors.name.type === "required" && <Typography color="error" fontSize={"0.80em"} mt={"4px"}>Поле не должно быть пустым!</Typography>}
            </Box>
        </Box>
    )
}



function Description() {
    const {control} = useFormContext();

    return (
        <Box>
            <Typography>Описание</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField 
                            {...field}
                            fullWidth
                            multiline
                            rows={5}
                            sx={{
                                "& input": {
                                    p: "12px 15px"
                                }
                            }}
                            placeholder="Введите описание"
                        />
                    )}
                />
            </Box>
        </Box>
    )
}

function Type() {
    const { control } = useFormContext();

    return (
        <Box>
            <Typography>Тип</Typography>
            <Controller
                control={control}
                name="type"
                defaultValue="1"
                render={({ field }) => (
                    <FormSelect
                        {...field}
                        fullWidth
                        sx={{
                            mt: "5px"
                        }}
                    >
                        <MenuItem value="1">нет</MenuItem>
                        <MenuItem value="2">манга</MenuItem>
                        <MenuItem value="3">манхва</MenuItem>
                        <MenuItem value="4">маньхуа</MenuItem>
                        <MenuItem value="5">рукомикс</MenuItem>
                    </FormSelect>
                )} 
            />
        </Box>
    )
}

function Status() {
    const { control } = useFormContext();

    return (
        <Box>
            <Typography>Статус</Typography>
            <Controller
                control={control}
                name="status"
                defaultValue="1"
                render={({ field }) => (
                    <FormSelect
                        sx={{
                            mt: " 5px"
                        }}
                        fullWidth
                        {...field}
                    >
                        <MenuItem value="1">не начат</MenuItem>
                        <MenuItem value="2">выпускается</MenuItem>
                        <MenuItem value="3">заброшен</MenuItem>
                        <MenuItem value="4">завершен</MenuItem>
                    </FormSelect>
                )} 
            />
        </Box>
    )
}

function Year() {
    const {control} = useFormContext();

    return (
        <Box>
            <Typography>Год выпуска</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="year"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField 
                            {...field}
                            fullWidth
                            sx={{
                                "& input": {
                                    p: "12px 15px"
                                }
                            }}
                            placeholder="Введите год"
                        />
                    )}
                />
            </Box>
        </Box>
    )
}

function Adult() {
    const { control } = useFormContext();

    return (
        <Box>
            <Typography>Возрастное ограниченние</Typography>
            <Controller
                control={control}
                name="adult"
                defaultValue="1"
                render={({ field }) => (
                    <FormSelect
                        sx={{
                            mt: " 5px"
                        }}
                        fullWidth
                        {...field}
                    >
                        <MenuItem value="1">Нет</MenuItem>
                        <MenuItem value="2">12+</MenuItem>
                        <MenuItem value="3">16+</MenuItem>
                        <MenuItem value="4">18+</MenuItem>
                    </FormSelect>
                )} 
            />
        </Box>
    )
}


function Info() {
    return (
        <>
            <Name />
            <NameTranslations />
            <Description />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    columnGap: "8px",
                    rowGap: "10px"
                }}
            >
                <Type/>
                <Status />
                <Year />
                <Adult />
            </Box>

            <Genres />
            <Authors />
            <Artists />
            <Publishers />
        </>
    )
}

export default Info;