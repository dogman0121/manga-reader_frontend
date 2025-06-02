import { styled } from "@mui/material/styles";
import { Box, Select, SelectProps, SxProps, Typography } from "@mui/material"
import { Children } from "react";


const MySelect = styled(Select)({
    borderRadius: "12px",
    "& .MuiSelect-select": {
        padding: "8px 15px",
    }
})

export type FormSelectProps = {
    title?: string,
    children: React.ReactNode,
    sx?: SxProps
} & Omit<SelectProps, "sx">

export default function FormSelect({title, name, children, sx, className, ...rest}: FormSelectProps) {

    return (
        <Box
            className={className}
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: title ? "5px" : undefined,
                ...sx
            }}
        >
            {title && (
                <Typography className="InputTitle">{title}</Typography>
            )}
            <MySelect
                {...rest}
            >
                {Children.map(children, (child) => child)}
            </MySelect>
            
        </Box>
    )
}