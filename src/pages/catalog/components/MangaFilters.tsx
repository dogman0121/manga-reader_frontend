import { Box, Typography } from "@mui/material";
import Filters, {MultipleSelectFilter, InputFilter} from "./Filters";


function MangaFilters() {
    return (
        <Filters>
            <MultipleSelectFilter 
                name="genre"
                placeholder="Жанры"
                options={[{id: 1, name: "драки"}, {id: 2, name: "приключения"}]}
            />
            <MultipleSelectFilter 
                name="type"
                placeholder="Тип"
                options={[{id: 1, name: "манга"}, {id: 2, name: "манхва"}, {id: 3, name: "маньхуа"}, {id: 4, name: "комикс"}]}
            />

            <MultipleSelectFilter 
                name="status"
                placeholder="Статус"
                options={[{id: 1, name: "выпускается"}, {id: 2, name: "заброшен"}, {id: 3, name: "завершен"}]}
            />
            <MultipleSelectFilter 
                name="adult"
                placeholder="Возрастной рейтинг"
                options={[{id: 1, name: "0+"}, {id: 2, name: "6+"}, {id: 3, name: "12+"}, {id: 4, name: "16+"}, {id: 5, name: "18+"}]}
            />
            <Box>
                <Typography>Год выпуска</Typography>
                <Box
                    sx={{
                        mt: "5px",
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px"
                    }}
                >
                    <InputFilter 
                        name="year_by"
                        placeholder="от"
                    />
                    <InputFilter 
                        name="year_to"
                        placeholder="до"
                    />
                </Box>
            </Box>
            <Box>
                <Typography>Рейтинг</Typography>
                <Box
                    sx={{
                        mt: "5px",
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px"
                    }}
                >
                    <InputFilter 
                        name="rating_by"
                        placeholder="от"
                    />
                    <InputFilter 
                        name="rating_to"
                        placeholder="до"
                    />
                </Box>
            </Box>
        </Filters>
    )
}


export default MangaFilters;