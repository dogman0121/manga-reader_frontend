import { useContext, useEffect } from "react";
import MainBlurContext from "../../../layouts/app-layout/MainBlurContext";


function FormModal({open, children}: {open: boolean, children: React.ReactNode}) {
    const { setOpened, setContent } = useContext(MainBlurContext);

    useEffect(() => {
        if (open) {
            setOpened(open);
            setContent(children);
        }

        return () => {
            setOpened(false);
        }
    }, [open, children])

    return (
        <></>
    )
}

export default FormModal;