import { Typography } from "@mui/material";

export default function PageHeader({children}: {children: React.ReactElement | string}) {
    return (<Typography fontSize={"24px"} lineHeight={"38px"}>{children}</Typography>)
}