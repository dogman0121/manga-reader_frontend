import { Children, useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, BoxProps, CircularProgress} from "@mui/material";
import ScrollableBox from "../../../components/ScrollableBox";


function SearchList({ sx, children, ...props }: BoxProps) {
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
        <ScrollableBox
            sx={{
                overflowY: "auto",
                ...sx
            }}
            {...props}
        >
            {Children.map(children, (child) => child)}
        </ScrollableBox>
    )
}

export default SearchList;