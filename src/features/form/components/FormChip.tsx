import { Chip, ChipProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"


export default function FormChip({sx, ...props}: ChipProps) {
    return (
        <Chip
            sx={{
                height: "21px",
                fontSize: "12px",
                "& .MuiChip-label": {
                    paddingLeft: "8px",
                    paddingRight: "8px"
                },
                ...sx
            }}
            deleteIcon={
                <CancelIcon
                    sx={{
                        width: "16px",
                        height: "16px"
                    }}
                    onMouseDown={(event) => {event.stopPropagation(); event.preventDefault()}}
                />
            }
            {...props}
        />
    )
}