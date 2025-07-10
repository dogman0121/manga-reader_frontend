import { Box, useTheme } from "@mui/material";
import AppButton from "../../../components/ui/AppButton";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import useList from "../hooks/useList";
import { useContext, useState } from "react";
import UserAuthContext from "../../../context/UserAuthContext";
import { listService } from "../service/api/listService";
import List from "../types/List";
import Share from "../../../components/Share";
import EditListForm from "./EditListForm";

export default function ListPageNavButtons() {
    const theme = useTheme();

    const {list, setList} = useList();

    const {user: currentUser} = useContext(UserAuthContext);

    const [shareOpen, setShareOpen] = useState(false);
    
    const [editOpen, setEditOpen] = useState(false);

    const handleAddSave = async() => {
        if (!list) return;

        const response = await listService.addSave(list);

        if (response.error) return;

        setList((prev: List) => {
            const newList = Object.assign(prev, {});

            newList.is_saved_by_user = true;

            return newList;
        })
    }
    
    const handleDeleteSave = async() => {
        if (!list) return;

        const response = await listService.removeSave(list)

        if (response.error) return;

        setList((prev: List) => {
            const newList = Object.assign(prev, {});

            newList.is_saved_by_user = false;

            return newList;
        })
    }

    const handleEditList = async (lst: List) => {
        setList(lst);
        setEditOpen(false);
    }

    if (!list)
        return null;

    return (
        <>
            <Box
                sx={{
                    mt: theme.spacing(2),
                    display: "flex",
                    flexDirection: "row",
                    gap: theme.spacing(1)
                }}
            >
                {list.creator.id != currentUser?.id && (
                    <>
                        {list.is_saved_by_user ? 
                            <AppButton variant="contained" onClick={handleAddSave}>Сохранить</AppButton>
                            :
                            <AppButton variant="outlined" onClick={handleDeleteSave}>Удалить</AppButton>    
                        }
                    </>
                )}
                <AppButton 
                    variant="contained" 
                    color="secondary"
                    onClick={() => {setShareOpen(true)}}
                >
                    <ShareRoundedIcon 
                        sx={{
                            color: theme.typography.body1.color
                        }}
                    />
                </AppButton>
                {list.creator.id == currentUser?.id && (
                    <AppButton
                        variant="contained" 
                        color="secondary"
                        onClick={() => {setEditOpen(true)}}
                    >
                        <EditRoundedIcon 
                            sx={{
                                color: theme.typography.body1.color
                            }}
                        />
                    </AppButton>
                )}
            </Box>
            <Share 
                open={shareOpen}
                onClose={() => {setShareOpen(false)}}
                link={window.location.href}
            />
            <EditListForm
                open={editOpen}
                list={list}
                onClose={() => setEditOpen(false)}
                onSubmit={handleEditList}
            />
        </>
    )
}