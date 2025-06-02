import { Box, useTheme } from "@mui/material"
import { Children, useEffect, useState } from "react"
import Chapter from "../../../types/Chapter"
import PageLoader from "../../../components/ui/PageLoader";
import { chapterService } from "../service/api/chapterService";
import { useParams } from "react-router-dom";
import NotFound from "../../../pages/not-found/NotFound";
import Page from "../../../types/Page";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

function PageItem({page}: {page: Page}) {
    return (
        <img 
            src={page.link}
            style={{
                width: "100%"
            }}
        />
    )
}

function NavButton({children}: {children?: React.ReactElement}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: "10px",
                borderRadius: "50%",
                background: theme.palette.secondary.main,
                display: "flex",
                alignItems: "center",
                boxShadow: "0.5px 0.5px 4px rgba(0, 0, 0, 0.4)"
            }}
        >
            {Children.map(children, (child) => child)}
        </Box>
    )
}

function NavButtons() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "15px",
            }}
        >
            <NavButton>
                <ArrowBackIosRoundedIcon />
            </NavButton>
            <NavButton>
                <ChatBubbleOutlineRoundedIcon />
            </NavButton>
            <NavButton>
                <ArrowForwardIosRoundedIcon />
            </NavButton>
        </Box>
    )
}

export default function ChapterPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [chapter, setChapter] = useState<Chapter | undefined>(undefined);
    const [error, setError] = useState("");
    
    const {chapterId} = useParams();

    useEffect(() => {
        chapterService.getChapter(parseInt(chapterId || ""))
            .then(({data, error}) => {
                if (data)
                    setChapter(data);

                if (error)
                    setError(error.code);

                setIsLoading(false);
            })
    }, [])

    if (isLoading)
        return <PageLoader />

    if (error == "not_found")
        return <NotFound />

    return(
        <Box
            sx={{
                maxWidth: "800px",
                marginX: "auto"
            }}
        >
            {chapter?.pages.map(page => <PageItem key={page.uuid} page={page}/>)}
            <Box
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <NavButtons />
            </Box>
        </Box>
    )
}