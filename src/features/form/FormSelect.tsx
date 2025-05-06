import { styled } from "@mui/material/styles";
import { Box, Select, SelectProps, Typography } from "@mui/material"
import { Children } from "react";


const MySelect = styled(Select)({
    borderRadius: "12px",
    "& .MuiSelect-select": {
        padding: "8px 15px",
    }
})

type FormSelectProps = {
    title?: string,
    children: Array<React.ReactNode> | React.ReactNode,
} & SelectProps

export default function FormSelect({title, name, children, sx, ...rest}: FormSelectProps) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: title ? "5px" : undefined,
                ...sx
            }}
        >
            {title && (
                <Typography>{title}</Typography>
            )}
            <MySelect
                {...rest}
            >
                {Children.map(children, (child) => child)}
            </MySelect>
            
        </Box>
    )
}