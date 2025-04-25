import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface DynamicScrollProps {
    hasMore: boolean,
    children: React.ReactElement,
    next: Function,
    dataLength: number,
    scrollableTarget?: string
}


export default function DynamicScroll({
    hasMore,
    children,
    next,
    dataLength,
    scrollableTarget
}: DynamicScrollProps) {
    return (
        <InfiniteScroll 
            dataLength={dataLength}
            hasMore={hasMore}
            next={() => {next()}}
            loader={<Box sx={{display: "flex", justifyContent: "center", p: "10px"}}><CircularProgress /></Box>}
            style={{overflow: "none"}}
            scrollableTarget={scrollableTarget}
        >
            {children}
        </InfiniteScroll>
    )
}