import { Box } from "@mui/material";
import { getColorScheme } from "../utils/colorScheme";

function Blur({open, children}: {open: boolean, children: React.ReactNode}) {
    return (
        <>
            {open && (
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",

                        left: "0",
                        top: "0",
                        zIndex: "100",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        bgcolor: getColorScheme() === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(16, 16, 16, 0.8)",
                        backdropFilter: "blur(0.5px)"
                    }}
                >
                    {children}
                </Box>
            )}
        </>
        
    )
}

export default Blur;