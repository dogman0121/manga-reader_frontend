import { Typography, useTheme } from "@mui/material";
import TitlesGrid from "../../titles/components/ui/TitlesGrid";
import useList from "../hooks/useList";

export default function ListPageTitles() {
    const {list} = useList()

    const theme = useTheme();

    if (!list) return null;

    return (
        <>
            { list.manga.length == 0 ?
                <Typography
                    sx={{
                        fontSize: "24px",
                        py: "25px",
                        textAlign: "center"
                    }}
                >Список пуст!</Typography>
                :
                <TitlesGrid 
                    titles={list.manga || []}
                    form={"square"}
                    sx={{
                        mt: theme.spacing(3)
                    }}
                />
            }
        </>
    )
}