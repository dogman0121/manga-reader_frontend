import { Box, Typography, useTheme } from "@mui/material"
import { useContext } from "react";
import SearchContext from "../../../features/search/context/SearchContext";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import FilterInput from "./FilterInput";
import FilterSelect from "./FilterSelect";

export default function Filters() {
    const { setFilters } = useContext(SearchContext);

    const theme = useTheme();

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Typography fontSize={"16px"}>Фильтры</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                    onClick={() => {setFilters(new Map<string, string[]>())}}
                >
                    <Typography>очистить</Typography>  
                    <ClearRoundedIcon fontSize="small" sx={{ml: theme.spacing(1)}}/>
                </Box>
            </Box>
            <Box 
                sx={{
                    mt: theme.spacing(4),
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(3)
                }}
            >
                <FilterSelect
                    name="genres"
                    title="Жанры"
                    multiple={true}
                    options={[
                        {id: 1, name: "Драки"},
                        {id: 2, name: "Романтика"}
                    ]}
                />
                <FilterSelect 
                    name="status"
                    title="Статус"
                    multiple
                    options={[
                        {id: 1, name: "Не начат"},
                        {id: 2, name: "Выпускается"},
                        {id: 3, name: "Заброшен"},
                        {id: 4, name: "Завершен"}
                    ]}
                />
                <FilterSelect 
                    name="type"
                    title="Тип"
                    multiple
                    options={[
                        {id: 1, name: "Нет"},
                        {id: 2, name: "Манга"},
                        {id: 3, name: "Манхва"},
                        {id: 4, name: "Маньхуа"},
                        {id: 5, name: "Рукомикс"}
                    ]}
                />
                <FilterSelect 
                    name="adult"
                    title="Возрастное ограничение"
                    multiple
                    options={[
                        {id: 1, name: "Нет"},
                        {id: 2, name: "12+"},
                        {id: 3, name: "16+"},
                        {id: 4, name: "18+"}
                    ]}
                />
                <Box>
                    <Typography lineHeight={"16px"}>Год выпуска</Typography>
                    <Box
                        sx={{
                            mt: theme.spacing(1),
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(1)
                        }}
                    >
                        <FilterInput 
                            name="year_by"
                            placeholder="от"
                        />   
                        <FilterInput 
                            name="year_to"
                            placeholder="до"
                        />  
                    </Box>
                </Box>  
                <Box>
                    <Typography lineHeight={"16px"}>Рейтинг</Typography>
                    <Box
                        sx={{
                            mt: theme.spacing(1),
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(1)
                        }}
                    >
                        <FilterInput 
                            name="rating_by"
                            placeholder="от"
                        />   
                        <FilterInput 
                            name="rating_to"
                            placeholder="до"
                        />  
                    </Box>
                </Box>  
            </Box>
        </Box>
    )
}