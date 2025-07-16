import { Box, Popover, useTheme } from "@mui/material";
import { useContext, useRef, useState } from "react";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CreateListForm from "../../lists/components/CreateListForm";
import UserAuthContext from "../../../context/UserAuthContext";
import List from "../../lists/types/List";
import { User } from "../../../types/User";
import useTitle from "../hooks/useTitle";
import { listService } from "../../lists/service/api/listService";
import Title from "../types/Title";
import AppButton from "../../../components/ui/AppButton";


export default function SaveButton() {
    const theme = useTheme();

    const {user: currentUser, setUser} = useContext(UserAuthContext);

    const {title, setTitle} = useTitle();

    const [open, setOpen] = useState(false);

    const [creating, setCreating] = useState(false);

    const anchorEl = useRef(null);

    const handleSubmit = (lst: List) => {
        setUser((prev: User) => {
            const newUser: User = Object.assign(prev, {});
            newUser.lists?.push(lst);
            return newUser
        })
        setCreating(false);
    }

    const handleAddToList = async (list: List) => {
        if (title == null) return;

        if (title.user_lists?.find(lst => lst.id == list.id)) {
            const response = await listService.removeTitle(list, title);

            if (response.error) return;

            setTitle((prev: Title) => {
                const newTitle = Object.assign(prev, {});

                newTitle.user_lists?.filter(lst => lst.id != list.id);
                return newTitle;
            })
        }
        else {
            const response = await listService.addTitle(list, title);

            if (response.error) return;

            setTitle((prev: Title) => {
                const newTitle = Object.assign(prev, {});

                newTitle.user_lists?.push(list);
                return newTitle;
            })
        }
    }

    const optionStyle = {
        display: "flex",
        justifyContent: "space-between",
        p: `${theme.spacing(1)} ${theme.spacing(2)}`,
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
            bgcolor: theme.palette.customBackgrounds.widget1
        }
    }

    return (
        <>
            <AppButton variant="contained" onClick={() => setOpen(true)} ref={anchorEl}>
                Сохранить
            </AppButton>
            <Popover
                open={open}
                anchorEl={anchorEl.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                elevation={1}
                sx={{
                    "& .MuiPaper-root": {
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacing(1),
                        mt: theme.spacing(1),
                        borderRadius: "12px",
                        p: theme.spacing(1),
                        width: anchorEl.current ? getComputedStyle(anchorEl.current).width : undefined
                    }
                }}
            >

                {currentUser?.lists?.map(list => (
                    <Box
                        key={list.id}
                        sx={optionStyle}
                        onClick={() => {handleAddToList(list)}}
                    >
                        {list.name}
                        {title?.user_lists?.find((value: List) => value.id == list.id) && (
                            <CheckRoundedIcon />
                        )}
                    </Box>
                ))}
                <Box
                    sx={{
                        ...optionStyle,
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "transparent"
                        }
                    }}
                    onClick={() => setCreating(true)}
                >
                    Добавить список
                    <AddRoundedIcon sx={{ml: theme.spacing(1)}} />
                </Box>
            </Popover>
            <CreateListForm 
                open={creating}
                onClose={() => setCreating(false)}
                onSubmit={handleSubmit}
            />
        </>
    )
}