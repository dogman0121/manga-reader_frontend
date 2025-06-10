import { Box,  CssBaseline, SxProps, ThemeProvider,  Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Content } from "../../../layouts/app-layout/AppLayoutPC";
import { useState, useRef, useEffect } from "react";
import Chapter from "../types/Chapter";
import ChapterProvider from "../components/ChapterProvider";
import {  ChapterRoutes, generatePath, TitleRoutes } from "../../../routes";
import ReaderSettings from "../components/ReaderSettings";
import ReaderSettingsProvider from "../components/ReaderSettingsProvider";
import ChapterDisplay from "../components/Display";
import useChapter from "../hooks/useChapter";
import { chapterService } from "../service/api/chapterService";
import PageLoader from "../../../components/ui/PageLoader";
import NotFound from "../../../pages/not-found/NotFound";
import NavButtons from "../components/NavButtons";
import Modal from "../../../features/modal/Modal";
import ChapterCommentsModal from "../components/CommentsModal";
import { getTheme } from "../theme";
import { getColorScheme } from "../../../utils/colorScheme";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { throttle } from "lodash";
import OpenGraphMeta from "../../../components/OpenGraphMeta";
import { titleService } from "../../titles/service/api/titleService";
import Title from "../../../pages/title/types/Title";
import TitleProvider from "../../titles/components/TitleProvider";

function HeaderInner({sx}: {sx?: SxProps}) {
    const theme = useTheme();

    const navigate = useNavigate();

    const {titleId} = useParams();

    const optionsAnchor = useRef(null);

    const {chapter} = useChapter();
    
    const [isOptionsOpened, setOptionsOpened] = useState(false);

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.customBackgrounds.header,
                position: "sticky",
                transition: "top .3s ease",
                ...sx
            }}
        >
            <Content>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        py: theme.spacing(2)
                    }}
                >
                    <WestRoundedIcon 
                        sx={{width: "24px", height: "24px", cursor: "pointer"}} 
                        onClick={() => {
                            navigate(generatePath(TitleRoutes.INDEX, {titleId: titleId || ""}))
                        }}
                    />
                    <Typography>ТОМ {chapter?.tome || "-"} ГЛАВА {chapter?.chapter || "-"}</Typography>
                    <MoreVertRoundedIcon sx={{width: "24px", height: "24px"}}
                        ref={optionsAnchor}
                        onClick={() => {setOptionsOpened(true)}}
                    />
                </Box>
            </Content>
            <ReaderSettings 
                elevation={0}
                onClose={() => {setOptionsOpened(false)}}
                open={isOptionsOpened}
                anchor="right"
            />
        </Box>
    )
}

function Header() {
    const [hiddenHeader, setHiddenHeader] = useState(true);

    useEffect(() => {
        const hideHeader = throttle(() => {
            if (document.body.scrollHeight <= (window.innerHeight + window.scrollY))
                return setHiddenHeader(false);

            setHiddenHeader(true);
        }, 100)

        const showHeader = () => {
            setHiddenHeader((q) => !q);
        }

        window.addEventListener("click", showHeader);
        window.addEventListener("scroll", hideHeader);

        return () => {
            window.removeEventListener("click",showHeader);
            window.removeEventListener("scroll", hideHeader);
        }
    }, [])


    return (
        <>
            <HeaderInner />
            <HeaderInner 
                sx={{
                    position: "fixed",
                    top: 0,
                    opacity: hiddenHeader ? 0 : 100,
                    width: "100vw",
                    transition: ".2s"
                }}
            />
        </>
    )
}

export function Footer() {
    const theme = useTheme()

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.customBackgrounds.footer,
                width: "100%",
                height: "100%",
                padding: `${theme.spacing(3)} ${theme.spacing(3)}`
            }}
        >
            <Box
                sx={{
                    maxWidth: "640px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto"
                }}
            >
                <Box 
                    sx={{
                        py: theme.spacing(3),
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <FavoriteBorderIcon sx={{width: "50px", height: "50px"}}/>
                    <Typography 
                        fontSize={"20px"} 
                        fontWeight={"800"}
                        textAlign={"center"}
                    >
                            Поблагодарить!<br/>14,345
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default function ChapterPage() {
    const [currChapter, setCurrChapter] = useState<Chapter | null>(null);
    const [startChapter, setStartChapter] = useState<Chapter | null>(null);

    const [title, setTitle] = useState<Title | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [commentsOpened, setCommentsOpened] = useState(false);

    const {chapterId, titleId} = useParams();

    const navigate = useNavigate();

    const theme = getTheme(getColorScheme());

    const getChapter = async(chapterId: number) => {
        const {data} = await chapterService.getChapter(chapterId);

        return data;
    }

    const generateChapterPath = (chapter: Chapter) => {
        return generatePath(ChapterRoutes.INDEX, {
            titleId: parseInt(titleId || ""), 
            chapterId: chapter.id
        })
    }

    useEffect(() => {
        if (!isNaN(parseInt(chapterId || "")))
            setIsLoading(true);
            getChapter(parseInt(chapterId || ""))
                .then((chapter) => {
                    if (chapter){
                        setStartChapter(chapter);
                        setCurrChapter(chapter);
                    }

                    setIsLoading(false);
                })
    }, [])

    useEffect(() => {
        if (isNaN(parseInt(titleId || "")))
            return;

        titleService.fetchTitle(parseInt(titleId || ""))
            .then(({data}) => {
                setTitle(data);
            })
    }, [])

    const onPrevButton = async () => {
        if (currChapter?.previous_chapter){
            setStartChapter(currChapter.previous_chapter)
            setCurrChapter(currChapter.previous_chapter);  
            window.scrollTo(0, 0);
            navigate(generateChapterPath(currChapter.previous_chapter)) 
            const newChapter = await getChapter(currChapter.previous_chapter.id)
            setStartChapter(newChapter);  
            setCurrChapter(newChapter);      
        }
    }
    const onShowComments = () => {
        setCommentsOpened(true);
    }
    const onNextButton = async () => {
        if (currChapter?.next_chapter){
            setStartChapter(currChapter.next_chapter)
            setCurrChapter(currChapter.next_chapter);  
            window.scrollTo(0, 0);
            navigate(generateChapterPath(currChapter.next_chapter)) 
            const newChapter = await getChapter(currChapter.next_chapter.id)
            setStartChapter(newChapter)
            setCurrChapter(newChapter);   
        }
    }

    if (currChapter == null || title == null)
        return null;
    
    return (
        <>
            <OpenGraphMeta 
                title={`Глава ${currChapter.chapter} ${title.type?.name} ${title.name} читать онлайн | kanwoo`}
                description={""}
                url={generateChapterPath(currChapter)}
            />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ReaderSettingsProvider>
                    <TitleProvider title={title} setTitle={setTitle}>
                        <ChapterProvider setChapter={setCurrChapter} chapter={currChapter}>
                            <Box component={"header"}>
                                <Header />
                            </Box>
                            <Box component={"main"}
                                sx={{
                                    bgcolor: theme.palette.customBackgrounds.footer
                                }}
                            >
                                {isLoading ?
                                    <PageLoader />
                                    :
                                    <>
                                        {startChapter == null ?
                                            <NotFound />
                                            :
                                            <ChapterDisplay chapter={startChapter}/>
                                        }
                                    </>
                                }
                                <NavButtons 
                                    onPrevious={onPrevButton}
                                    onNext={onNextButton}
                                    onShowComments={onShowComments}
                                />
                            </Box>
                            <Modal
                                open={commentsOpened}
                                onClose={() => {setCommentsOpened(false)}}
                                sx={{
                                    padding: "0"
                                }}
                            >
                                <ChapterCommentsModal />
                            </Modal>
                        </ChapterProvider>
                    </TitleProvider>
                </ReaderSettingsProvider>
            </ThemeProvider>
        </>
    )

}