import { useContext, useEffect } from "react";
import MainBlurContext from "../app-layout/MainBlurContext";


function FormModal({open, children}: {open: boolean, children: React.ReactNode}) {
    const { setOpened, setContent } = useContext(MainBlurContext);


    useEffect(() => {
        setOpened(open);
        setContent(children);
    }, [open, children])

    return (
        <></>
    )
}

export default FormModal;