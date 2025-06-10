import React from "react";
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, SxProps, Typography } from "@mui/material";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import useTitle from "../hooks/useTitle";

function StatsItem({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems:"center"
            }}
        >
            {children}
        </Box>
    )
}

function StatsText({children}: {children: React.ReactNode}){
    return (
        <Typography
            sx={{
                fontSize: "16px",

                margin: "auto 0 auto 5px",
                whiteSpace: "nowrap"
            }}
        >
            {children}
        </Typography>
    )
}


function Stats({sx}: {sx?: SxProps}) {
    const { title } = useTitle();

    if (!title)
        return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "50px",
                ...sx
            }}
        >
            <StatsItem>
                <StarBorderRoundedIcon
                    sx={{
                        width: "28px",
                        height: "28px"
                    }}
                />
                <StatsText>{title.rating} ({title.rating_count})</StatsText>
            </StatsItem>
            <StatsItem>
                <BookmarksOutlinedIcon
                    sx={{
                        width: "20px",
                        height: "20px"
                    }}
                />
                <StatsText>{title?.saves}</StatsText>
            </StatsItem>
            <StatsItem>
                <VisibilityOutlinedIcon/>
                <StatsText>{title?.views}</StatsText>
            </StatsItem>
        </Box>
    )
}

export default Stats;