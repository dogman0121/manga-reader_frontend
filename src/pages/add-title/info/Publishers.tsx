import { Box, Typography } from "@mui/material";
import PersonInput from "../components/PersonInput";

function Publishers() {
    return (
        <Box>
            <Typography>Издатели</Typography>
            <Box
                sx={{mt: "5px"}}
            >
                <PersonInput name="publishers" />
            </Box>
        </Box>
    )
}

export default Publishers;