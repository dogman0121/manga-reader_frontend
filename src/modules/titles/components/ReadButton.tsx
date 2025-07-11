import AppButton from "../../../components/ui/AppButton";


export default function ReadButton() {
    return (
        <AppButton 
            sx={{
                width: "140px",
                borderRadius: "12px",
                height: "40px"
            }}
            variant="contained"
            disableElevation
            disableFocusRipple
        >
            Читать
        </AppButton>
    )
}