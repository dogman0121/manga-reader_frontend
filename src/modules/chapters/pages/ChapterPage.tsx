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
import Meta from "../../../components/Meta";

function HeaderInner({sx, onOpenOptions}: {sx?: SxProps, onOpenOptions: () => void}) {
    const theme = useTheme();

    const navigate = useNavigate();

    const {titleId} = useParams();

    const optionsAnchor = useRef(null);

    const {chapter} = useChapter();

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
                        onClick={(event) => {
                            event.stopPropagation();
                            onOpenOptions();
                        }}
                    />
                </Box>
            </Content>
        </Box>
    )
}

function Header({onOpenOptions}: {onOpenOptions: () => void}) {
    const [hiddenHeader, setHiddenHeader] = useState(false);

    useEffect(() => {
        const hideHeader = throttle(() => {
            if (window.scrollY == 0)
                return setHiddenHeader(false);
            if (document.body.scrollHeight <= (window.innerHeight + window.scrollY + 10)){
                return setHiddenHeader(false);
            }

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
            <HeaderInner 
                onOpenOptions={onOpenOptions}
                sx={{
                    position: "fixed",
                    top: 0,
                    transform: hiddenHeader ? "translateY(-100%)" : "translateY(0%)",
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

// function ChapterPagePC() {

// }

// function ChapterPageMobile() {

// }

export default function ChapterPage() {
    const [currChapter, setCurrChapter] = useState<Chapter | null>(null);
    const [startChapter, setStartChapter] = useState<Chapter | null>(null);

    const [title, setTitle] = useState<Title | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [commentsOpened, setCommentsOpened] = useState(false);

    const {chapterId, titleId} = useParams();

    const navigate = useNavigate();

    const theme = getTheme(getColorScheme());

    const [hidden, setHidden] = useState(false);

    const [isOptionsOpened, setOptionsOpened] = useState(false);

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
    
    useEffect(() => {
        const hideOptions = throttle(() => {
            if (document.body.scrollHeight <= (window.innerHeight + window.scrollY + 10))
                return setHidden(false);

            if (window.scrollY == 0)
                setHidden(false);
            else
                setHidden(true);
        }, 100)

        window.addEventListener("scroll", hideOptions)

        return () => {
            window.removeEventListener("scroll", hideOptions);
        }
    }, [])

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
                <Meta />
                <CssBaseline />
                <ReaderSettingsProvider>
                    <TitleProvider title={title} setTitle={setTitle}>
                        <ChapterProvider setChapter={setCurrChapter} chapter={currChapter}>
                            <Box component={"header"}>
                                <Header onOpenOptions={() => {setHidden(true);  setOptionsOpened(q => !q)}}/>
                            </Box>
                            <Box component={"main"}
                                sx={{
                                    bgcolor: theme.palette.customBackgrounds.footer
                                }}
                                onClick={() => {
                                    setHidden(q => !q)
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
                                    open={!hidden} 
                                    onPrevious={onPrevButton}
                                    onNext={onNextButton}
                                    onShowComments={onShowComments}
                                />
                            </Box>
                            <ReaderSettings 
                                onClose={() => {setOptionsOpened(false)}}
                                open={isOptionsOpened}
                            />
                            <Modal
                                open={commentsOpened}
                                onClose={() => {setCommentsOpened(false)}}
                                sx={{
                                    padding: 0,
                                    width: "100%",
                                    height: "100%"
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