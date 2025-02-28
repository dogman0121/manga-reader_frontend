import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import Title from "../../../types/Title";
import styles from "./Search.module.css"
import { useTheme } from "@mui/material/styles";


function MangaItem({ item }: { item: Title }) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                p: "6px 10px",
                borderRadius: "6px",
                bgcolor: theme.palette.customBackgrounds?.widget2
            }}
        >
            <img src={item.poster} className={styles.Modal_Image}/>
            <Box
                sx={{
                    ml: "10px",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Box>{item.name}</Box>
            </Box>
        </Box>
    )
}

function SearchListModal({ sx }: BoxProps) {
    const { isLoading, query, results } = useContext(SearchContext);

    const theme = useTheme();

    if (isLoading)
        return (
            <Box
                sx={{
                    widows: "100%",
                    minHeight: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        )
    
    return (
        <>
            <Box
                sx={{
                    ...sx
                }}
            >
                {results.length === 0 ?
                    <Box
                        sx={{
                            widows: "100%",
                            minHeight: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: theme.typography.subtitle1.color
                        }}
                    >
                        {query === "" ?
                            <>Чтобы запустить поиск введите запрос</>
                            :
                            <>По вашему запросу ничего не найдено</>
                        }
                    </Box>
                    :
                    <> 
                        {results.map((result) => 
                            <MangaItem item={result} key={result.id}/>
                        )}
                    </>
                } 
            </Box>
        </>
    )
}

export default SearchListModal;