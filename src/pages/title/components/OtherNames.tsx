import { Box, Breadcrumbs, Typography } from "@mui/material";
import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";

function OtherNames() {
    const { title } = useContext(TitleContext);
    
    if (title.name_translations?.length == 0)
        return <></>

    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography>Другие названия</Typography>
            <Breadcrumbs>
                {title.name_translations?.map(name => <Typography variant="subtitle1" fontSize={"16px"} key={name.lang}>{name.name}</Typography>)}
            </Breadcrumbs>
        </Box>
    )
}

export default OtherNames;