import { Children, useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, CircularProgress, SxProps } from "@mui/material";


function SearchList({ sx, children }: {sx?: SxProps, children: React.ReactNode}) {
    const {query, isLoading, results} = useContext(SearchContext);

    if (isLoading)
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "50px 0"
                }}
            >
                <CircularProgress />
            </Box>
        )

    if (results.length === 0)
        return (
            <Box
                sx={{
                    width: "100%",
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
        <Box
            sx={{...sx}}
        >
            {Children.map(children, (child) => child)}
        </Box>
    )
}

export default SearchList;