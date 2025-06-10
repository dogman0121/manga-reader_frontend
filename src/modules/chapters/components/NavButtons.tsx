import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { getColorScheme } from "../../../utils/colorScheme";
import { Box, IconButton, styled, useTheme } from "@mui/material"
import { MouseEventHandler, useEffect, useState } from "react"
import useChapter from '../hooks/useChapter';
import { throttle } from "lodash";

const NavButton = styled(IconButton)((_theme) => ({
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: getColorScheme() == "dark" ? "#000000" : "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: getColorScheme() == "light" ? "0.5px 0.5px 4px rgba(0, 0, 0, 0.1)" : "0.5px 0.5px 4px rgba(255, 255, 255, 0.1)",
    "&:hover": {
        backgroundColor: getColorScheme() == "dark" ? "#000000" : "#FFFFFF",
    },
    "&.Mui-disabled": {
        backgroundColor: getColorScheme() == "dark" ? "#000000" : "#FFFFFF",
        color: getColorScheme() == "dark" ? "#333333" : "#E6E6E6"
    }
}))

export default function NavButtons({
    onPrevious, 
    onNext, 
    onShowComments
}: {
    onPrevious: MouseEventHandler<HTMLButtonElement>,
    onNext: MouseEventHandler<HTMLButtonElement>,
    onShowComments: MouseEventHandler<HTMLButtonElement>
}) {
    const theme = useTheme();

    const { chapter } = useChapter();

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const hideOptions = throttle(() => {
            if (document.body.scrollHeight <= (window.innerHeight + window.scrollY))
                return setHidden(false);

            if (window.scrollY == 0)
                setHidden(false);
            else
                setHidden(true);
        }, 100)

        const showOptions = () => {
            setHidden((q) => !q);
        }

        window.addEventListener("click", showOptions);
        window.addEventListener("scroll", hideOptions)

        return () => {
            window.removeEventListener("click", showOptions);
            window.removeEventListener("scroll", hideOptions);
        }
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "sticky",
                pb: theme.spacing(4),
                bottom: 0
            }}
        >
            <Box
                sx={{
                    opacity: hidden ? 0 : 100,
                    transition: ".2s",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: theme.spacing(3),
                }}
            >
                <NavButton disabled={chapter?.previous_chapter == null}
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
                <NavButton disabled={chapter?.next_chapter == null}
                    onClick={onNext}
                >
                    <ArrowForwardIosRoundedIcon 
                    />
                </NavButton>
            </Box>
        </Box>
    )
}