import { Box, Typography } from "@mui/material";
import PersonInput from "../components/PersonInput";

function Artists() {
    return (
        <Box>
            <Typography>Художники</Typography>
            <Box
                sx={{mt: "5px"}}
            >
                <PersonInput name="artists" />
            </Box>
            
        </Box>
    )
}

export default Artists;