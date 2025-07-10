import { Box, styled, Typography, useTheme } from "@mui/material";
import Title from "../../types/Title";
import { generatePath, Link } from "react-router-dom";
import Poster from "../../../../components/ui/Poster";

const TitleItemSquareText = styled(Typography)(() => ({
    lineHeight: "1.3",
    fontSize: "14px"
})) 

export interface TitleItemProps {
    title: Title,
    rightTopAdornment?: React.ReactElement
}

function TitleItemSquare({title, rightTopAdornment}: TitleItemProps) {
    const theme = useTheme();

    return (
        <Box 
            className="TitleItem"
            sx={{position: "relative"}}
        >
            <Link 
                draggable={false}
                to={generatePath("/manga/:slug", {slug: title.slug})}
                style={{
                    userSelect: "none"
                }}
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
                        <TitleItemSquareText>{title.type?.name}</TitleItemSquareText>
                        <TitleItemSquareText ml={theme.spacing(1)}>{title.year}</TitleItemSquareText>
                    </Box>
                    <TitleItemSquareText
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
                        {title.name}
                    </TitleItemSquareText>
                </Box>
                {rightTopAdornment && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: theme.spacing(1),
                            top: theme.spacing(1)
                        }}
                    >
                        {rightTopAdornment}
                    </Box>
                )}
            </Link>
        </Box>
    )
}

function TitleItemRect({title}: TitleItemProps) {
    return (
        <>{title.name}</>
    )
}

export default function TitleItem({
    title,
    rightTopAdornment, 
    form
}: {form: "square" | "rectangle"} & TitleItemProps) {
    return (
        <>
            {form == "square" ?
                <TitleItemSquare title={title} rightTopAdornment={rightTopAdornment}/>
                :
                <TitleItemRect title={title} rightTopAdornment={rightTopAdornment}/>
            }
        </>
    )
}