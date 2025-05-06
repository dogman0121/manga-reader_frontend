import { Avatar, Box, Typography } from "@mui/material"

interface ListItemProps {
    img: string,
    title: string,
    subtitle?: string,
}

export function ListItem({img, title, subtitle}: ListItemProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center",
                borderRadius: "6px",
            }}
        >
            <Avatar 
                sx={{
                    width: "40px",
                    height: "40px"
                }}
                src={img}
            />
            <Box>
                <Typography fontSize={"16px"}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography 
                        variant="subtitle1" 
                        sx={{
                            lineHeight: "1.4",
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            wordBreak: "break-all",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}