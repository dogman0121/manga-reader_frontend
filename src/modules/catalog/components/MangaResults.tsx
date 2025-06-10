import { useContext } from "react";
import SearchContext from "../../../features/search/context/SearchContext";
import { Box, styled, Typography, useTheme } from "@mui/material";
import Title from "../../../pages/title/types/Title";
import { generatePath, TitleRoutes } from "../../../routes";
import { Link } from "react-router-dom";
import Poster from "../../../components/ui/Poster";
import SearchList from "../../../features/search/components/SearchList";

const CatalogText = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontSize: "14px"
}))

function TitleItem({ item }: {item: Title}) {
    const theme = useTheme();

    return (
        <Link to={generatePath(TitleRoutes.INDEX, {titleId: item.id})}>
            <Box >
                <Poster src={item.main_poster?.small || ""} width="100%"/>
                <Box
                    sx={{
                        mt: theme.spacing(1)
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <CatalogText>{item.type?.name}</CatalogText>
                        <CatalogText ml={theme.spacing(1)}>{item.year}</CatalogText>
                    </Box>
                    <CatalogText
                        sx={{
                            mt: theme.spacing(1),
                            fontSize:"14px",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {item.name}</CatalogText>
                </Box>
            </Box>
        </Link>
    )
}

export default function TitleResults() {
    const { results } = useContext(SearchContext);

    const theme = useTheme();
    
    return (
        <SearchList
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                rowGap: theme.spacing(3),
                columnGap: theme.spacing(3),
            }}
        >
            {results.map((title) => <TitleItem item={title} key={title.id}/>)}
        </SearchList>
    )
}