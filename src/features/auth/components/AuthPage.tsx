import { Box } from "@mui/material";
import Auth from "./Auth"

export default function AuthPage({ section }: {section: string}) {
    const onAuth = () => {
        document.location.href="https://kanwoo.ru";
    }
    
    return (
        <Box
            sx={{
                height: "100vh"
            }}
        >
            <Auth 
                section={section}
                onAuth={onAuth}
            />
        </Box>
        
    )
}