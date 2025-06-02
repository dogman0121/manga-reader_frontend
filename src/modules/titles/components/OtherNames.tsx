import { Box, Breadcrumbs, Typography, useTheme } from "@mui/material";
import useTitle from "../hooks/useTitle";

function OtherNames() {
    const title = useTitle();

    const theme = useTheme();
    
    if (!title || title.name_translations?.length == 0)
        return null;

    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography lineHeight={"16px"}>Другие названия</Typography>
            <Breadcrumbs sx={{mt: theme.spacing(1)}}>
                {title.name_translations?.map(name => <Typography lineHeight={"16px"} variant="subtitle1" fontSize={"14px"} key={name.lang}>{name.name}</Typography>)}
            </Breadcrumbs>
        </Box>
    )
}

export default OtherNames;