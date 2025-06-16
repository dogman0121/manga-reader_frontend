import {Box, useTheme} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import HeaderMobile from "./HeaderMobile";
import Button from "../../../components/ui/Button";

export default function AnonymusMenu() {
    const { openModal } = useContext(AuthContext);

    const theme = useTheme()

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <HeaderMobile />
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",

                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        Войдите в аккаунт
                    </Box>
                    <Button 
                        variant="contained"
                        sx={{
                            mt: "10px"
                        }}
                        onClick={() => {
                            openModal();
                        }}
                    >
                        Войти
                    </Button>
                </Box>
            </Box>
        </>
    )
} 