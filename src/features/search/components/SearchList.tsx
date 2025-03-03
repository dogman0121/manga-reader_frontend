import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, CircularProgress, SxProps } from "@mui/material";


function SearchList({ sx, children }: {sx?: SxProps, children: React.ReactNode}) {
    const {query, isLoading, results} = useContext(SearchContext);

    if (isLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "50px 0",
                    ...sx
                }}
            >
                <CircularProgress />
            </Box>
        )

    if (results.length === 0)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "50px 0"
                }}
            >
                По запросу {query} ничего не найдено.
            </Box>
        )

    return (
        <>
            {children}
        </>
    )
}

export default SearchList;