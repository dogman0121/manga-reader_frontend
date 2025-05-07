import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import Chapter from "../../../types/Chapter"
import PageLoader from "../../../components/ui/PageLoader";
import { chapterService } from "../service/api/chapterService";
import { useParams } from "react-router-dom";
import NotFound from "../../../pages/not-found/NotFound";
import Page from "../../../types/Page";

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
                maxWidth: "1024px",
                marginX: "auto"
            }}
        >
            {chapter?.pages.map(page => <PageItem key={page.uuid} page={page}/>)}
        </Box>
    )
}