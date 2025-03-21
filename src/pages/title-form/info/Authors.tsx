import { Box, Typography } from "@mui/material";
import PersonInput from "../components/PersonInput";

function Authors() {
    return (
        <Box>
            <Typography>Авторы</Typography>
            <Box
                sx={{mt: "5px"}}
            >
                <PersonInput name="authors" /> 
            </Box>
            
        </Box>
    )
}

export default Authors;