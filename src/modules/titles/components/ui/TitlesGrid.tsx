import { Box, SxProps, useTheme } from "@mui/material"
import Title from "../../types/Title"
import TitleItem from "./TitleItem"
import {v4 as uuidv4} from 'uuid'
import { Children } from "react"


export default function TitlesGrid({
    titles,
    form = "square",
    sx,
    children
}: {
    titles?: Title[],
    form?: "square" | "rectangle",
    sx?: SxProps,
    children?: React.ReactElement[]
}) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: theme.spacing(3),
                ...sx
            }}
        >
            {titles?.map(title => <TitleItem key={uuidv4()} form={form} title={title}/>)}
            {Children.map(children, child => child)}
        </Box>
    )
}