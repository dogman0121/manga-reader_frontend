import { useContext, useEffect, useState } from "react";
import Chapter from "../../../types/Chapter";
import TitleContext from "../../../context/TitleContext";
import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import Translation from "../../../types/Translation";
import { ListItem } from "../../../components/ListItem";
import { chapterService } from "../../../modules/chapters/service/api/chapterService";


function ChapterItem({ chapter}: { chapter: Chapter}) {
    return (
        <Link to={`/chapters/${chapter.id}`}>
            <Box
                sx={{
                    mt: "5px",

                    padding: "12px 14px",
                    backgroundColor: "var(--widget1-color)",
                    borderRadius: "12px"
                }}
            >
                Том {chapter.tome} Глава {chapter.chapter}
            </Box>
        </Link>
    )
}


function ChaptersList({chapters}: {chapters: Array<Chapter>}) {
    return (
        <Box mt={"10px"}>
            { chapters.map((chapter) => <ChapterItem key={chapter.id} chapter={chapter}/>) }
        </Box>
    )
}

function Translator({translation, onChoose}: {translation: Translation, onChoose: Function}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",

                padding: "6px 8px",

                borderRadius: "6px",
                border: "1px solid #D9D9D9"
            }}

            onClick={() => {onChoose()}}
        >
            {translation.translator_type == "user" && (
                <ListItem 
                    img={translation.translator.avatar}
                    title={translation.translator.login}
                    subtitle={`Кол-во глав: ${translation.chapters_count}`}
                />
            )}
            {translation.translator_type == "team" && (
                <ListItem 
                    img={translation.translator.poster}
                    title={translation.translator.name}
                    subtitle={`Кол-во глав: ${translation.chapters_count}`}
                />
            )}
        </Box>
    )
}

function Chapters() {
    const { title } = useContext(TitleContext);

    if (!title || !title.translations?.length)
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    p: "30px 0"
                }}
            >
                <Typography fontSize={"24px"}>Глав нет!</Typography>
            </Box>
        );

    const [translation, setTranslation] = useState<Translation>(title.translations[0]);
    const [chapters, setChapters] = useState<Array<Chapter>>([]);

    useEffect(() => {
        chapterService.getTranslationChapters(translation.id)
            .then(({data}) => {
                setChapters(data);
            })
    }, [translation])

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Typography>Список глав</Typography>
                <Box>
                    <AddRoundedIcon/>
                    <SwapVertRoundedIcon/>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",

                    columnGap: "10px",
                    flexDirection: "row",
                }}
            >
                {title.translations.map(translation => (
                    <Translator 
                        key={translation.translator.id} 
                        translation={translation} 
                        onChoose={() => {setTranslation(translation)}}
                    />
                ))}
            </Box>
            <ChaptersList chapters={chapters}/>
        </>
    )
}

export default Chapters;