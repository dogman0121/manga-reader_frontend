import { Backdrop, Box, Divider, OutlinedInput, Paper, SvgIcon, Typography, useTheme } from "@mui/material";
import Modal from "../features/modal/Modal";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {VKShareButton} from "react-share";
import Button from "./ui/Button";
import { DEVICE, useDeviceDetect } from "../hooks/useDeviceDetect";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

interface ShareProps {
    open: boolean,
    link: string,
    onClose: () => void
}

function ShareIcon({children, title}: {children: React.ReactElement, title: string}) {
    const theme = useTheme()
    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(1),
                alignItems: "center"
            }}
        >
            <SvgIcon
                sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px"
                }}
            >
                {children}
            </SvgIcon>
            <Typography fontSize={"13px"}>{title}</Typography>
        </Box>
        
    )
}

function ShareIconsCarousel({link}: {link: string}) {
    return (
        <Box>
            <VKShareButton url={link}>
                <ShareIcon title="Вконтакте">
                    <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2_40)">
                    <path d="M0.5 48C0.5 25.3726 0.5 14.0589 7.52944 7.02944C14.5589 0 25.8726 0 48.5 0H52.5C75.1274 0 86.4411 0 93.4706 7.02944C100.5 14.0589 100.5 25.3726 100.5 48V52C100.5 74.6274 100.5 85.9411 93.4706 92.9706C86.4411 100 75.1274 100 52.5 100H48.5C25.8726 100 14.5589 100 7.52944 92.9706C0.5 85.9411 0.5 74.6274 0.5 52V48Z" fill="#0077FF"/>
                    <path d="M53.7085 72.042C30.9168 72.042 17.9169 56.417 17.3752 30.417H28.7919C29.1669 49.5003 37.5834 57.5836 44.25 59.2503V30.417H55.0004V46.8752C61.5837 46.1669 68.4995 38.667 70.8329 30.417H81.5832C79.7915 40.5837 72.2915 48.0836 66.9582 51.1669C72.2915 53.6669 80.8336 60.2086 84.0836 72.042H72.2499C69.7082 64.1253 63.3754 58.0003 55.0004 57.1669V72.042H53.7085Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2_40">
                    <rect width="100" height="100" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                    </svg>
                </ShareIcon>
            </VKShareButton>  
        </Box>
    )
}

function ShareMobile({open, onClose, link}: ShareProps) {
    const theme = useTheme();

    return (
        <Backdrop
            open={open}
            onClick={onClose}
            sx={{
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: theme.spacing(3),
                    px: theme.spacing(3),
                    width: "100%"
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        borderRadius: "12px",
                        padding: theme.spacing(3)
                    }}
                >
                    <Typography fontSize={"16px"}>Поделиться</Typography>
                    <Box
                        sx={{
                            mt: theme.spacing(2)
                        }}
                    >
                        <ShareIconsCarousel link={link}/>
                    </Box>
                    <Divider 
                        sx={{
                            mt: theme.spacing(3)
                        }}
                    />
                    <Box
                        onClick={() => {navigator.clipboard.writeText(link); onClose?.()}}
                        sx={{
                            mt: theme.spacing(2),
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(3),
                            alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: theme.palette.customBackgrounds.widget1
                            }}
                        >
                            <ContentCopyRoundedIcon />
                        </Box>
                        <Typography>
                            Скопировать ссылку
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Backdrop>
    )
}

function SharePC({open, onClose, link}: ShareProps) {
    const theme = useTheme();
    
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: "12px",
                    p: theme.spacing(3),
                    width: "min(400px, 100vw)"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography fontSize={"16px"}>Поделиться</Typography>
                    <CloseRoundedIcon 
                        onClick={() => {onClose()}}
                    />
                </Box>
                <Box
                    sx={{
                        mt: theme.spacing(2)
                    }}
                >
                    <ShareCopyLinkInput link={link}/>
                </Box>
                <Box
                    sx={{
                        mt: theme.spacing(5)
                    }}
                >
                    <VKShareButton url={link}>
                        <ShareIcon title="Вконтакте">
                            <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2_40)">
                            <path d="M0.5 48C0.5 25.3726 0.5 14.0589 7.52944 7.02944C14.5589 0 25.8726 0 48.5 0H52.5C75.1274 0 86.4411 0 93.4706 7.02944C100.5 14.0589 100.5 25.3726 100.5 48V52C100.5 74.6274 100.5 85.9411 93.4706 92.9706C86.4411 100 75.1274 100 52.5 100H48.5C25.8726 100 14.5589 100 7.52944 92.9706C0.5 85.9411 0.5 74.6274 0.5 52V48Z" fill="#0077FF"/>
                            <path d="M53.7085 72.042C30.9168 72.042 17.9169 56.417 17.3752 30.417H28.7919C29.1669 49.5003 37.5834 57.5836 44.25 59.2503V30.417H55.0004V46.8752C61.5837 46.1669 68.4995 38.667 70.8329 30.417H81.5832C79.7915 40.5837 72.2915 48.0836 66.9582 51.1669C72.2915 53.6669 80.8336 60.2086 84.0836 72.042H72.2499C69.7082 64.1253 63.3754 58.0003 55.0004 57.1669V72.042H53.7085Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2_40">
                            <rect width="100" height="100" fill="white" transform="translate(0.5)"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </ShareIcon>
                    </VKShareButton>
                </Box>
            </Box>
        </Modal>
    )
}

function ShareCopyLinkInput({link}: {link: string}){
    const theme = useTheme();

    return (
        <OutlinedInput 
            disabled
            value={link}
            fullWidth
            endAdornment={
                <Button 
                    variant="contained"
                    onClick={() => {
                        navigator.clipboard.writeText(link)
                    }}
                    sx={{
                        textTransform: "lowercase",
                        px: theme.spacing(1),
                        minWidth: "auto"
                    }}
                >
                    Скопировать
                </Button>
            }
            sx={{
                borderRadius: "30px",
                padding: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(3)}`, 
                backgroundColor: theme.palette.background.paper,
                "& input": {
                    padding: "10px 0",
                    lineHeight: "20px",
                    height: "auto",
                    fontSize: "16px"
                }
            }}
        />
    )
}

export default function Share({...props}: ShareProps) {
    const {device} = useDeviceDetect()
    return (
        <>
            {device == DEVICE.MOBILE && <ShareMobile {...props}/>}
            {device == DEVICE.PC && <SharePC {...props}/>}
        </>
    )
}