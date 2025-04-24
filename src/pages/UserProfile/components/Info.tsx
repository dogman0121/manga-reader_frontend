import { Avatar, Box, Button, Typography } from "@mui/material"
import { useContext } from "react"
import UserProfileContext from "../context/UserProfileContext"
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import ActionButtons from "./ActionButtons";

function InfoMobile() {
    const { user } = useContext(UserProfileContext);

    return (
        <Box
            sx={{
                p: "10px 5px",
                mx: "auto",

                display: "flex",
                flexDirection: "column",
                rowGap: "10px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "15px"
                }}
            >
                <Avatar
                    src="https://cover.imglib.info/uploads/users/8753756/9dff5cc7-aef8-4b9e-9d3e-6b5efc23a4f5.jpg"
                    sx={{width: "70px", height: "70px"}}
                />
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <Typography fontSize={"18px"}>{user?.login}</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "20px"
                            }}
                        >
                            <Box
                                
                            >
                                <Typography fontSize="12px" textTransform="uppercase" variant="subtitle1">Подписчики</Typography>
                                <Typography>0</Typography>
                            </Box>
                            <Box>
                                <Typography fontSize="12px" textTransform="uppercase" variant="subtitle1">Посты</Typography>
                                <Typography>0</Typography>
                            </Box>
                            <Box>
                                <Typography fontSize="12px" textTransform="uppercase" variant="subtitle1">Подписки</Typography>
                                <Typography>0</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Button variant="text">Подписаться</Button>
            </Box>
        </Box>
    )
}

function InfoPC() {
    const { user } = useContext(UserProfileContext);

    return (
        <Box
            sx={{
                maxWidth: "1060px",
                p: "30px 30px",
                mx: "auto",

                display: "flex",
                flexDirection: "row",
                columnGap: "40px"
            }}
        >
            <Avatar
                src={user?.avatar}
                sx={{width: "100px", height: "100px"}}
            />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Box>
                    <Typography fontSize={"18px"}>{user?.login}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "20px"
                        }}
                    >
                        <Box
                            
                        >
                            <Typography fontSize="14px" textTransform="uppercase" variant="subtitle1">Подписчики</Typography>
                            <Typography>0</Typography>
                        </Box>
                        <Box>
                            <Typography fontSize="14px" textTransform="uppercase" variant="subtitle1">Посты</Typography>
                            <Typography>0</Typography>
                        </Box>
                        <Box>
                            <Typography fontSize="14px" textTransform="uppercase" variant="subtitle1">Подписки</Typography>
                            <Typography>0</Typography>
                        </Box>
                    </Box>
                </Box>
                <ActionButtons />
            </Box>
        </Box>
    )
}

export default function Info() {
    const device = useDeviceDetect();

    return (
        <>
            {device != DEVICE.MOBILE ?
                <InfoPC />
                :
                <InfoMobile />
            }
        </>
    )
}