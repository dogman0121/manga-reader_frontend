import { ModalProps } from "@mui/material";
import { useEffect, useRef } from "react";

function MobileModalWrapper({ open, onClose, children }: ModalProps) {
    const prevState = useRef(false);

    const level = useRef(0);

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state.level === level.current && !open){
                window.history.back();
                return ;
            }

            if (event.state.role === "band")
                return;
            
            if (open && event.state.level === level.current){
                onClose ? onClose({}, "escapeKeyDown") : null;
                window.history.back();
            }
        }

        if (!open && prevState.current && window.history.state.role === "band" && window.history.state?.level === level.current){
            window.history.back();
            window.history.back();
            prevState.current = false;
            return ;
        }
        
        if (open) {
            level.current = (0 | window.history.state?.level) + 1;
            
            window.history.pushState({modal: true, level: level.current}, "");
            window.history.pushState({modal: true, level: level.current, role: "band"}, "");
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            prevState.current = open;
            window.removeEventListener("popstate", handlePopState);
        }

    }, [open]);

    return (
        <>
            {children}
        </>
    )
}

export default MobileModalWrapper;