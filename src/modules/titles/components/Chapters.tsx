import { useContext, useEffect, useState } from "react";
import Chapter from "../../chapters/types/Chapter";
import { generatePath, Link, useParams } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import { ListItem } from "../../../components/ListItem";
import { chapterService } from "../../../modules/chapters/service/api/chapterService";
import useTitle from "../hooks/useTitle";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Notification from "../../../components/ui/Notification";
import TitleContext from "../context/TitleContext";
import Translation from "../types/Translation";
import { User } from "../../../types/User";
import Team from "../../../types/Team";


function ChapterItem({ 
    chapter, 
    editable,
    onDelete,
}: { 
    chapter: Chapter, 
    editable?: boolean,
    onDelete?: Function
}) {
    const {slug} = useParams();

    const theme = useTheme();

    return (
        <Box
            sx={{
                mt: "5px",

                padding: "12px 14px",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "12px",

                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Link to={generatePath("/manga/:slug/chapters/:chapterId", {slug: slug || "", chapterId: chapter.id.toString()})}>
                <Typography>
                    Том {chapter.tome} Глава {chapter.chapter}
                </Typography> 
            </Link>
            {editable && (
                <Box
                    sx={{
                        display: "flex",
                        columnGap: theme.spacing(2),
                        alignItems: "center"
                    }}
                >
                    <Link 
                        style={{display: "flex"}}
                        to={generatePath("/manga/:slug/chapters/:chapterId/edit", {slug: slug || "", chapterId: chapter.id.toString()})}
                    >
                        <EditRoundedIcon sx={{width: "18px", height: "18px"}}/>
                    </Link>
                    <DeleteRoundedIcon 
                        sx={{width: "18px", height: "18px", cursor: "pointer"}}
                        onClick={() => {onDelete ? onDelete(chapter.id) : null}}    
                    />
                </Box>
            )}
            
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
                    img={(translation.translator as User).avatar || ""}
                    title={(translation.translator as User).login || ""}
                    subtitle={`Кол-во глав: ${translation.chapters_count}`}
                />
            )}
            {translation.translator_type == "team" && (
                <ListItem 
                    img={(translation.translator as Team).poster}
                    title={(translation.translator as Team).name}
                    subtitle={`Кол-во глав: ${translation.chapters_count}`}
                />
            )}
        </Box>
    )
}

function ChaptersHeader() {
    const { title } = useTitle();

    if (!title)
        return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <Typography>Список глав</Typography>
            <Box>
                <Link to={generatePath("/manga/:slug/chapters/add", {slug: title.slug || ""})}>
                    <AddRoundedIcon/>
                </Link>
                <SwapVertRoundedIcon/>
            </Box>
        </Box>

    )
}

function Chapters() {
    const { title } = useContext(TitleContext);

    if (!title)
        return null;

    const theme = useTheme()

    if (!title.translations?.length) {
        return (
            <>
                <ChaptersHeader />
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        p: `${theme.spacing(6)} 0`
                    }}
                >
                    <Typography fontSize={"20px"}>Глав нет!</Typography>
                </Box>
            </>
        )
    }

    const [errorDeleting, setErrorDeleting] = useState(false);

    const [translation, setTranslation] = useState<Translation>(title.translations[0]);
    const [chapters, setChapters] = useState<Array<Chapter>>([]);

    useEffect(() => {
        chapterService.getTranslationChapters(translation.id)
            .then(({data}) => {
                setChapters(data);
            })
    }, [translation])

    const handleDelete = async (chapterId: number) => {
        const response = await chapterService.deleteChapter(chapterId);

        if (response){
            setErrorDeleting(true);
        }
        else {
            const newChapters = chapters.filter((chapter) => chapter.id != chapterId)
            setChapters(newChapters)
        }
    }   

    return (
        <>
            <ChaptersHeader /> 
            <Box
                sx={{
                    display: "flex",

                    columnGap: theme.spacing(2),
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
            <Box mt={"10px"}>
                { chapters.map((chapter) => (
                    <ChapterItem 
                        key={chapter.id} 
                        chapter={chapter} 
                        editable={translation.permissions?.add_chapters == true}
                        onDelete={handleDelete}
                        />
                    ) 
                )}
            </Box>
            <Notification 
                open={errorDeleting}
                onClose={() => {setErrorDeleting(false)}}
                variant="error" 
                message="Произошла ошибка"
            />
        </>
    )
}

export default Chapters;