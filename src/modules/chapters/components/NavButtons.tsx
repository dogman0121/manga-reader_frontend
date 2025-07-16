import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { getColorScheme } from "../../../utils/colorScheme";
import { Box, IconButton, styled, useTheme } from "@mui/material"
import { MouseEventHandler } from "react"
import useChapter from '../hooks/useChapter';

const NavButton = styled(IconButton)((_theme) => ({
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: getColorScheme() == "dark" ? "#000000" : "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    //boxShadow: getColorScheme() == "light" ? "0.5px 0.5px 4px rgba(0, 0, 0, 0.1)" : "0.5px 0.5px 4px rgba(255, 255, 255, 0.1)",
    "&:hover": {
        backgroundColor: getColorScheme() == "dark" ? "#000000" : "#FFFFFF",
    },
    "&.Mui-disabled": {
        backgroundColor: getColorScheme() == "dark" ? "#000000" : "#FFFFFF",
        color: getColorScheme() == "dark" ? "#333333" : "#E6E6E6"
    },
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)"
}))

export default function NavButtons({
    open,
    onPrevious, 
    onNext, 
    onShowComments
}: {
    open: boolean
    onPrevious: MouseEventHandler<HTMLButtonElement>,
    onNext: MouseEventHandler<HTMLButtonElement>,
    onShowComments: MouseEventHandler<HTMLButtonElement>
}) {
    const theme = useTheme();

    const { chapter } = useChapter();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "sticky",
                opacity: open ? 1 : 0,
                pb: theme.spacing(4),
                bottom: 0
            }}
        >
            <Box
                sx={{
                    transition: ".2s",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: theme.spacing(3),
                }}
            >
                <NavButton 
                    disabled={chapter?.previous_chapter == null || !open}
                    onClick={onPrevious}
                >
                    <ArrowBackIosRoundedIcon />
                </NavButton>
                <NavButton
                    onClick={onShowComments}
                >
                    <ChatBubbleOutlineRoundedIcon 
                        sx={{
                            width: "22px",
                            height: "22px"
                        }}
                    />
                </NavButton>
                <NavButton 
                    disabled={chapter?.next_chapter == null || !open}
                    onClick={onNext}
                >
                    <ArrowForwardIosRoundedIcon 
                    />
                </NavButton>
            </Box>
        </Box>
    )
}