import { Box, MenuItem, Typography, useTheme } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../../../../features/form/components/FormInput";
import NameTranslations from "./NameTranslations";
import FormTextarea from "../../../../features/form/components/FormTextarea";
import FormSelect from "../../../../features/form/components/FormSelect";
import FormChip from "../../../../features/form/components/FormChip";
import UserInput from "./UserInput";


const typeOptions = [
    {id: 1, name: "нет"},
    {id: 2, name: "манга"},
    {id: 3, name: "манхва"},
    {id: 4, name: "маньхуа"},
    {id: 5, name: "рукомикс"}
]

const statusOptions = [
    {id: 1, name: "не начат"},
    {id: 2, name: "выпускается"},
    {id: 3, name: "заброшен"},
    {id: 4, name: "завершен"},
]

const adultOptions = [
    {id: 1, name: "нет"},
    {id: 2, name: "12+"},
    {id: 3, name: "16+"},
    {id: 4, name: "18+"},
]

const genresOptions = [
    {id: 1, name: "драки"},
    {id: 2, name: "романтика"}
]


function Info() {
    const {control} = useFormContext();

    const theme = useTheme();

    return (
        <>
            <Controller 
                name="name"
                control={control}
                render={({field}) => (
                    <FormInput 
                        {...field}
                        title="Название (на русском)"
                        placeholder="Введите название"
                    />
                )}
            />
            <Controller
                name="nameTranslations"
                control={control}
                render={({field: {onChange, value}}) => (
                    <NameTranslations 
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Controller 
                name="description"
                control={control}
                render={({field}) => (
                    <FormTextarea 
                        {...field}
                        title="Описание"
                        placeholder="Введите текст"  
                    />
                )}
            />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    columnGap: "8px",
                    rowGap: "10px"
                }}
            >
                <Controller 
                    name="type"
                    control={control}
                    render={({field}) => (
                        <FormSelect 
                            {...field}
                            title="Тип"  
                        >
                            {typeOptions.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>
                            ))}
                        </FormSelect>
                    )}
                />
                <Controller 
                    name="status"
                    control={control}
                    render={({field}) => (
                        <FormSelect 
                            {...field}
                            title="Статус"  
                        >
                            {statusOptions.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>
                            ))}
                        </FormSelect>
                    )}
                />
                <Controller 
                    name="year"
                    control={control}
                    render={({field}) => (
                        <FormInput 
                            {...field}
                            type="number"
                            title="Год выпуска"
                            placeholder="Введите год"
                        />
                    )}
                />
                <Controller 
                    name="adult"
                    control={control}
                    render={({field}) => (
                        <FormSelect 
                            {...field}
                            title="Возрастное ограничение"  
                        >
                            {adultOptions.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>
                            ))}
                        </FormSelect>
                    )}
                />
            </Box>
            <Controller 
                name="genres"
                control={control}
                render={({field: {value, onChange}}) => (
                    <FormSelect 
                        title="Жанры"
                        multiple
                        displayEmpty={true}
                        value={value}
                        onChange={onChange}
                        renderValue={(selected: any) => (
                            <Box
                                sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(1)}}
                            >
                                {selected.length !== 0 ?
                                    <>
                                        {selected.map((option: string) => (
                                            <FormChip 
                                                key={option} 
                                                label={genresOptions.find((item) => item.id == parseInt(option))?.name}
                                                onDelete={() => onChange(selected.filter((f: string) => f != option))}
                                            />
                                        ))}
                                    </>
                                    :
                                    <Typography color="darkgray">Выберите значение</Typography>
                                }
                            </Box>
                        )}
                    >
                        {genresOptions.map(genre => (<MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>))}
                    </FormSelect>
                )}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px"
                }}
            >
                <Controller 
                    name="authors"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <UserInput
                            title="Автор"
                            placeholder="Выберите пользователя" 
                            value={value}
                            onChange={onChange}  
                        />
                    )}
                />
                <Controller 
                    name="artists"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <UserInput
                            title="Художники"
                            placeholder="Выберите пользователя" 
                            value={value}
                            onChange={onChange}  
                        />
                    )}
                />
                <Controller 
                    name="publishers"
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <UserInput
                            title="Издатели"
                            placeholder="Выберите пользователя" 
                            value={value}
                            onChange={onChange}  
                        />
                    )}
                />
            </Box>
            
        </>
    )
}

export default Info;