import { Box, BoxProps, Breadcrumbs, styled, Typography } from "@mui/material";
import useTitle from "../hooks/useTitle";

const MyBreadcrumbs = styled(Breadcrumbs)(({theme}) => ({
    color: theme.typography.body1.color,
    "& .MuiTypography-root": {
        lineHeight: "16px"
    }
}))

function Names({sx, className, ...props}: BoxProps) {
    const { title } = useTitle();

    if (!title)
        return null;

    return (
        <Box
            className={className}
            sx={{
                display: "flex",
                flexDirection: "column",
                ...sx
            }}
            {...props}
        >
            <MyBreadcrumbs>
                <Typography>{title.type?.name || "нет"}</Typography>
                <Typography>{title.year || "2025"}</Typography>
                <Typography>{title.status?.name || "нет"}</Typography>
            </MyBreadcrumbs>
            <Typography
                sx={{
                    fontSize: "24px",
                    lineHeight: "26px",
                    fontWeight: 600
                }}
            > {title?.name} </Typography>
            
        </Box>        
    )
}

export default Names;