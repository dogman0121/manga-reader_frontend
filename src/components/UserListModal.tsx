import { Box, Typography, useTheme } from "@mui/material";
import Modal, {ModalProps} from "../features/modal/Modal";
import { User } from "../types/User";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DynamicScroll from "./DynamicScroll";
import UserList from "./UserList";

interface UserListModalProps extends ModalProps {
    title?: string
    users: Array<User>,
    onScrollEnd: Function,
    length: number
}

export default function UserListModal({
    open,
    title,
    users,
    length,
    onClose,
    onScrollEnd
}: UserListModalProps) {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    borderRadius: "16px",
                    width: "min(400px, 100vw)",
                    bgcolor: theme.vars.palette.background.paper,
                    p: "20px",

                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    {title && (
                        <Typography textTransform={"uppercase"}>{title}</Typography>
                    )}
                    <CloseRoundedIcon 
                        sx={{
                            width: "30px", 
                            height: "30px",
                            cursor: "pointer"
                        }}
                        onClick={() => {if (onClose) onClose({}, "escapeKeyDown")}}
                    />
                    
                </Box>
                <Box
                    id="scrollable-list"
                    sx={{
                        maxHeight: "300px",
                        overflowY: "auto"
                    }}
                >
                    {users.length > 0 ?
                        <DynamicScroll
                            dataLength={users.length}
                            hasMore={users.length < length}
                            next={onScrollEnd}
                            scrollableTarget={"scrollable-list"}
                        >
                            <UserList users={users}/>
                        </DynamicScroll>
                        :
                        <Typography p="10px 5px" textAlign ="center">Тут ничего нет</Typography>
                    }
                    
                </Box>

            </Box>
        </Modal>
    )
}