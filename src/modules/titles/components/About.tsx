import { useState, useRef, useEffect } from "react";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Box, useTheme } from "@mui/material";
import useTitle from "../hooks/useTitle";

function About() {
    const [open, setOpen] = useState(false);

    const { title } = useTitle();

    const theme = useTheme();

    const textRef = useRef<HTMLDivElement | null>(null);

    const [isFullText, setFullText] = useState(false);

    if (!title || title.description == "")
        return null;

    useEffect(() => {
        const lineHeight = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).lineHeight);
        const height = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).height);

        if (lineHeight * 4 < height){
            setFullText(true);
            (textRef.current as HTMLDivElement).style.maxHeight = lineHeight * 4 + "px";
        }

        return () => {};
    }, [])

    const handleShow = () => {
        if (open){
            const lineHeight = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).lineHeight);
            (textRef.current as HTMLDivElement).style.maxHeight = lineHeight * 4 + "px";
            setOpen(false);
        } else {
            (textRef.current as HTMLDivElement).style.maxHeight = "";
            setOpen(true);
        }
    }

    return (
        <Box>
            <Box 
                sx={{
                    lineHeight: 1.5,
                    width: "100%",
                    overflowWrap: "break-word",
                    overflowY: "hidden",
                    fontSize: "16px" 
                }}
                ref={textRef}
            >
                {title.description}
            </Box>
            { isFullText && (
                <Box
                    sx={{
                        display: "inline-flex",
                        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                        borderRadius: "6px",

                        alignItems: "center",

                        backgroundColor: theme.palette.secondary.main,

                        marginTop: theme.spacing(1),
                        fontSize: "14px",
                        cursor: "pointer"
                    }} 
                    onClick={handleShow}
                >
                    {open ?
                        <>
                            Скрыть
                            <ExpandLessRoundedIcon />
                        </>
                        :
                        <>
                            Показать
                            <ExpandMoreRoundedIcon />
                        </>
                    }
                </Box>
            )}
        </Box>
    )
}

export default About;