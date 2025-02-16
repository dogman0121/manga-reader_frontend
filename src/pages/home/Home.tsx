import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"

export default function Home() {
    const theme = useTheme();

    return (
        <>
            Home
            <Button variant="contained" sx={{bgcolor: theme.palette.primary.main}}>Contained</Button>
        </>
    )
};