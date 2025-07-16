import { Button, ButtonProps, useTheme} from "@mui/material";

const AppButton = ({sx, color, variant, ...props}: ButtonProps) => {
    const theme = useTheme();

    return (
        <Button 
            disableElevation={true}
            disableRipple
            sx={{
                boxShadow: "none",
                borderRadius: "24px",
                textTransform: "capitalize",


                "&:hover": variant == "contained" || !variant ? {
                    bgcolor: color == "inherit" ? "inherit" : theme.palette[color || "primary"].main,
                    boxShadow: "none"
                }: {
                    boxShadow: "none"
                },
                ...sx
            }}
            color={color}
            {...props}
        />
    )
}

export default AppButton;