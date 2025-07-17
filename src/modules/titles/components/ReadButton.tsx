import { useTheme } from "@mui/material";
import AppButton from "../../../components/ui/AppButton";


export default function ReadButton() {
    const theme = useTheme()

    return (
        <AppButton 
            sx={{
                width: "140px",
                height: "40px",
                "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    transform: "scale(1.05)",
                }
            }}
            variant="contained"
            color="primary"
        >
            Читать
        </AppButton>
    )
}