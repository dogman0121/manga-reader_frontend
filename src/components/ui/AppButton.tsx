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


                "&:hover": variant == "contained" ? {
                    bgcolor: color == "inherit" ? "inherit" : theme.palette[color || "primary"].main,
                    transform: "scale(1.02)",
                }: {
                    boxShadow: "none"
                },
                ...sx
            }}
            variant={variant}
            color={color}
            {...props}
        />
    )
}

export default AppButton;