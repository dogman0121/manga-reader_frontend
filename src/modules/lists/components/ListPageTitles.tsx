import { Box, Typography, useTheme } from "@mui/material";
import TitlesGrid from "../../titles/components/ui/TitlesGrid";
import useList from "../hooks/useList";
import TitleItem from "../../titles/components/ui/TitleItem";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Title from "../../titles/types/Title";
import List from "../types/List";
import { useState } from "react";
import { listService } from "../service/api/listService";

export default function ListPageTitles() {
    const {list, setList} = useList()

    const [mangaList, setMangaList] = useState(list?.manga || []); 

    const theme = useTheme();

    const handleDelete = async (title: Title) => {
        if (!list) return;

        const response = await listService.removeTitle(list, title)
        if (response.error) return;


        setList((prev: List) => {
            const newList = Object.assign(prev, {})

            newList.manga = newList.manga.filter((t: Title) => t.id != title.id)
            return newList;
        })
        setMangaList((prev) => prev.filter((t: Title) => t.id != title.id))
    }

    if (!list) return null;

    return (
        <>
            { list.manga.length == 0 ?
                <Typography
                    sx={{
                        fontSize: "24px",
                        mt: theme.spacing(4),
                        py: "25px",
                        textAlign: "center"
                    }}
                >Список пуст!</Typography>
                :
                <TitlesGrid
                    sx={{
                        mt: theme.spacing(5)
                    }}
                >
                    {mangaList.map(title => (
                        <TitleItem 
                            key={title.id}
                            form="square" 
                            title={title}
                            rightTopAdornment={
                                <Box
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(title)
                                    }}
                                    sx={{
                                        borderRadius: "50%",
                                        bgcolor: theme.palette.customBackgrounds.widget1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        p: "2px"
                                    }}
                                >
                                    <CloseRoundedIcon 
                                        sx={{
                                            width: "20px",
                                            height: "20px"
                                        }}
                                    />
                                </Box>
                            } 
                        />
                    ))}
                </TitlesGrid>
            }
        </>
    )
}