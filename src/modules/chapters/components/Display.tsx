import { Box, useTheme } from "@mui/material"
import { Children, MouseEvent, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Page from "../types/Page";
import useSettings from "../hooks/useSettings";
import Chapter from "../types/Chapter";
import { chapterService } from "../service/api/chapterService";
import useChapter from "../hooks/useChapter";

import { ChapterRoutes, generatePath } from "../../../routes";
import { Footer } from "../pages/ChapterPage";
import DynamicScroll from "../../../components/DynamicScroll";
import { throttle } from "lodash";


function PagesContainer({children}: {children?: any}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.paper,
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {Children.map(children, child => child)}
        </Box>
    )
}

function PageItem({page}: {page: Page}) {
    return (
        <Box
            sx={{
                maxWidth: "640px",
                marginX: "auto",
            }}
        >
            <img 
                src={page.link}
                style={{
                    width: "100%",
                    display: "block"
                }}
            />
        </Box>
    )
}

function HorizontalDisplay({
    chaptersList,
    onNext,
}: {
    chaptersList: Chapter[],
    onNext?: Function,
}) {


    enum SECTOR{
        LEFT,
        MIDDLE,
        RIGHT
    }

    const [pageIndex, setPageIndex] = useState(0);
    
    const [currentChapter, setCurrChapter] = useState(0);

    const {settings} = useSettings();

    const {setChapter} = useChapter();

    useEffect(() => {
        setPageIndex(0);
        setCurrChapter(chaptersList.length-1);
    }, [chaptersList])

    const computeSector = (cordX: number) => {
        const padding = window.innerWidth / 2 * 0.8
        if (cordX < padding){
            return SECTOR.LEFT
        }
        else if (cordX < window.innerWidth - padding) {
            return SECTOR.MIDDLE
        }
        else {
            return SECTOR.RIGHT;
        }
    }

    const handlePress = async (event: MouseEvent) => {
        const clientX = event.clientX;
        
        const sector: SECTOR = computeSector(clientX);

        if (sector == SECTOR.RIGHT){
            if (pageIndex + 1 == chaptersList[currentChapter].pages.length) {
                if (settings.infinityChapter && onNext){
                    await onNext();
                    if (settings.infinityChapter && currentChapter < chaptersList.length - 1){
                        setChapter(chaptersList[currentChapter + 1]);
                        setCurrChapter((curr) => curr+1)
                        setPageIndex(0);
                        window.scrollTo(0, 0);
                    }
                }
            }
            else  {
                setPageIndex((ind) => ind+1)
                window.scrollTo(0, 0);
            }
            event.stopPropagation();
        }
        else if (sector == SECTOR.LEFT) {
            if (pageIndex - 1 < 0){
                if (settings.infinityChapter && currentChapter > 0){
                    setChapter(chaptersList[currentChapter - 1]);
                    setPageIndex(chaptersList[currentChapter-1].pages.length-1);
                    setCurrChapter((currentChapter) => currentChapter-1)
                    window.scrollTo(0, 0);
                }
            }
            else{
                setPageIndex((ind) => ind-1);
                window.scrollTo(0, 0);
            }
            event.stopPropagation();
        }
    }

    const validateChapter = () => {
        return currentChapter <= chaptersList.length && pageIndex < chaptersList[currentChapter].pages.length
    }

    return (
        <Box
            onClick={handlePress}
        >
            <PagesContainer>
                {validateChapter() && (
                    <PageItem page={chaptersList[currentChapter].pages[pageIndex]} />
                )}
            </PagesContainer>
            <Footer />
        </Box>
    )

}

function VerticalDisplay({
    chaptersList,
    onNext,
}: {
    chaptersList: Chapter[],
    onNext?: Function,
}){
    const [chaptersCords, setChapterCords] = useState<number[]>([]);
    
    const { settings } = useSettings();

    const [hasNext, _setHasNext] = useState(settings.infinityChapter); 

    const {setChapter} = useChapter();

    const chaptersRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const onScroll = throttle(() => {
            let idx = chaptersCords.length - 1;
            while (idx > 0) {
                if (window.scrollY > chaptersCords[idx])
                    return setChapter(chaptersList[idx]);
                idx-=1;
            }

            return setChapter(chaptersList[idx])
        }, 250)

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [chaptersCords]);

    useEffect(() => {
        const cords = chaptersRefs.current.map(ref =>
            ref ? ref.getBoundingClientRect().top + window.scrollY : 0
        );
        setChapterCords(cords);

    }, [chaptersList])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >   
            <DynamicScroll
                hasMore={hasNext && chaptersList[chaptersList.length-1].next_chapter != null}
                dataLength={chaptersList.length}
                next={() => {onNext?.()}}
            >
                <>
                    {chaptersList.map((chapter, idx) => (
                        <Box 
                            ref={(el:HTMLDivElement) => {chaptersRefs.current[idx] = el}}
                            className={"chapterWrapper"}
                            key={chapter.id}
                        >
                            <PagesContainer>
                                {chapter.pages.map(page => <PageItem key={page.uuid} page={page}/>)}
                            </PagesContainer>
                            <Footer/>
                        </Box>
                    ))}
                </>
            </DynamicScroll>
        </Box>
    )
}

export default function Display({chapter}: {chapter: Chapter}) {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [currChapter, setCurrChapter] = useState<number>(-1);

    const {settings} = useSettings();

    const {setChapter} = useChapter();

    const {titleId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        setChapters([chapter]);
        setCurrChapter(0);
    }, [chapter])

    if (chapters.length == 0)
        return null;

    const generateChapterPath = (chapter: Chapter) => {
        return generatePath(ChapterRoutes.INDEX, {
            titleId: parseInt(titleId || ""), 
            chapterId: chapter.id
        })
    }

    const getChapter = async(chapterId: number) => {
        const {data} = await chapterService.getChapter(chapterId);

        return data;
    }

    const onLoadChapter = async () => {
        if (chapters[currChapter].next_chapter){
            const newChapter = await getChapter(chapters[currChapter].next_chapter.id);
            navigate(generateChapterPath(newChapter))
            setChapter(newChapter)
            setChapters((chapters) => chapters.concat(newChapter));
        }
    }

    return(
        <>
            {settings.readingMode == "horizontal" && (
                <HorizontalDisplay
                    chaptersList={chapters}
                    onNext={onLoadChapter}
                />
            )}
            {settings.readingMode == "vertical" && (
                <VerticalDisplay
                    chaptersList={chapters}
                    onNext={onLoadChapter}
                />
            )}
        </>
    )
}