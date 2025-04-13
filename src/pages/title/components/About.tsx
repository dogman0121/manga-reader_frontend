import { useContext, useState, useRef, useEffect } from "react";
import TitleContext from "../../../context/TitleContext";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Box } from "@mui/material";

function About() {
    const [open, setOpen] = useState(false);

    const { title } = useContext(TitleContext);

    const textRef = useRef<HTMLDivElement | null>(null);

    const [big, setBig] = useState(false);

    if (!title?.description)
        return <></>

    useEffect(() => {
        const lineHeight = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).lineHeight);
        const height = parseFloat(window.getComputedStyle(textRef.current as HTMLDivElement).height);

        if (lineHeight * 4 < height){
            setBig(true);
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
                    lineHeight: 1.75,
                    width: "100%",
                    overflowWrap: "break-word",
                    overflowY: "hidden"
                }}
                ref={textRef}
            >
                {title.description}
            </Box>
            { big && (
                <Box
                    sx={{
                        display: "inline-flex",
                        padding: "4px 8px",
                        borderRadius: "6px",

                        alignItems: "center",

                        backgroundColor: "var(--widget1-color)",

                        marginTop: "5px",
                        fontSize: "14px",
                        cursor: "pointer"
                    }} 
                    onClick={handleShow}
                >
                    {open ? "Скрыть" : "Показать"}
                    {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </Box>
            )}
        </Box>
    )
}

export default About;