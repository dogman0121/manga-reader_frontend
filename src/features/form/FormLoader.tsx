import { useContext, useEffect } from "react";
import MainBlurContext from "../../layouts/app-layout/MainBlurContext";
import { CircularProgress } from "@mui/material";

export default function FormLoader({open}: {open: boolean}) {
    const {setOpened, setContent} = useContext(MainBlurContext);

    useEffect(() => {
        setContent(<CircularProgress/>)
        setOpened(open)
    }, [open])

    return <></>
}