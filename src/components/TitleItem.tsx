import { Box, BoxProps, styled, Typography, useTheme } from "@mui/material";
import Title from "../modules/titles/types/Title";
import { generatePath, Link } from "react-router-dom";
import Poster from "./ui/Poster";


const CatalogText = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontSize: "14px"
}))

export default function TitleItem({ title, sx, ...props }: {title: Title} & Omit<BoxProps, "title">) {
    const theme = useTheme();

    return (
        <Link 
            draggable={false}
            to={generatePath("/manga/:slug", {slug: title.slug})}
            style={{
                userSelect: "none"
            }}
        >
            <Box 
                className="TitleItem"
                sx={{
                    ...sx
                }}
                {...props}
            >
                <Poster 
                    src={title.main_poster?.small || ""} 
                    width="100%"
                />
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
                        <CatalogText>{title.type?.name}</CatalogText>
                        <CatalogText ml={theme.spacing(1)}>{title.year}</CatalogText>
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
                        {title.name}</CatalogText>
                </Box>
            </Box>
        </Link>
    )
}