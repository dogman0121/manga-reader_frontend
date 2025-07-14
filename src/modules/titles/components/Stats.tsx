import React, { useState } from "react";
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, SxProps, Typography, useTheme } from "@mui/material";
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import useTitle from "../hooks/useTitle";
import { RatingContext, RatingIndicator } from "./Rating";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";

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

function StatsText({children, sx}: {children: React.ReactNode, sx?: SxProps}){
    return (
        <Typography
            sx={{
                fontSize: "16px",

                margin: "auto 0 auto 5px",
                whiteSpace: "nowrap",
                ...sx
            }}
        >
            {children}
        </Typography>
    )
}

function Stats({sx}: {sx?: SxProps}) {
    const { title } = useTitle();

    const {device} = useDeviceDetect();

    const theme = useTheme()

    const [userRating, setUserRating] = useState(title?.user_rating || null);

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
            {device == DEVICE.MOBILE ?
                <RatingContext onSetRating={(newRating: number | null) => {setUserRating(newRating)}}>
                    <StatsItem>
                        <StarOutlineRoundedIcon
                            sx={{
                                width: "28px",
                                height: "28px"
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "end",
                                    gap: "2px"
                                }}
                            >
                                <StatsText>{title.rating}</StatsText>
                                <StatsText sx={{ml: 0}}>({title.rating_count})</StatsText>
                            </Box>
                            {userRating && (
                                <RatingIndicator 
                                    sx={{
                                        ml: theme.spacing(1),
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: "3px 8px 3px 4px"
                                    }}
                                    icon={
                                        <StarRoundedIcon 
                                            sx={{
                                                color: "#FFF",
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    }
                                    rating={userRating}
                                />
                            )}
                        </Box>
                    </StatsItem>
                </RatingContext>
                :
                <StatsItem>
                    <StarOutlineRoundedIcon
                            sx={{
                                width: "28px",
                                height: "28px"
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                                gap: "2px"
                            }}
                        >
                            <StatsText>{title.rating}</StatsText>
                            <StatsText sx={{ml: 0}}>({title.rating_count})</StatsText>
                        </Box>
                </StatsItem>
            }
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