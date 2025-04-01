import React, { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Typography } from "@mui/material";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

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
                fontSize: "18px",

                margin: "auto 0 auto 5px",
                whiteSpace: "nowrap"
            }}
        >
            {children}
        </Typography>
    )
}


function Stats() {
    const manga = useContext(TitleContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "50px",
                m: "20px 0"
            }}
        >
            <StatsItem>
                <StarBorderRoundedIcon
                    sx={{
                        width: "28px",
                        height: "28px"
                    }}
                />
                <StatsText>{manga?.rating}</StatsText>
            </StatsItem>
            <StatsItem>
                <BookmarksOutlinedIcon
                    sx={{
                        width: "20px",
                        height: "20px"
                    }}
                />
                <StatsText>{manga?.saves}</StatsText>
            </StatsItem>
            <StatsItem>
                <VisibilityOutlinedIcon/>
                <StatsText>{manga?.views}</StatsText>
            </StatsItem>
        </Box>
    )
}

export default Stats;