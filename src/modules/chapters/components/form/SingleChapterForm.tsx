import { Box, Button, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormInput from "../../../../features/form/FormInput";
import { Controller, useForm } from "react-hook-form";
import FormMultipleFilesInput from "../../../../features/form/FormMultipleFilesInput";
import useFileInput from "../../../../features/form/hooks/useFileInput";
import { useContext, useEffect } from "react";
import FormSelect from "../../../../features/form/FormSelect";
import UserAuthContext from "../../../../context/UserAuthContext";
import { mockTeams } from "../../../../mocks/team.mock";
import { ListItem } from "../../../../components/ListItem";
import { useParams } from "react-router-dom";
import Chapter from "../../../../types/Chapter";


interface ChapterFormProps {
    tome: number,
    chapter: number,
    name: string,
    new_pages: Array<File>,
    pages_order: Array<string>,
    author: string
}

export default function SingleChapterForm({chapter, onSend}: {chapter?: Chapter, onSend: Function}) {
    const {mangaId} = useParams();

    const { user:currentUser } = useContext(UserAuthContext);

    if (!currentUser)
        return null;

    const {control, handleSubmit, setValue} = useForm<ChapterFormProps>({
        defaultValues: {
            tome: chapter?.tome || 1,
            chapter:  chapter?.chapter || 1,
            name: chapter?.name || "",
            author: chapter?.team ? `team/${chapter.team.id}` : chapter?.creator ? `user/${chapter.creator.id}` : `user/${currentUser.id}`
        }
    });

    const {handleChange, acceptedFiles} = useFileInput();

    useEffect(() => {
        const newPages: Array<File | undefined> = acceptedFiles.map(file => file.file)

        setValue("new_pages", newPages.filter(page => page != undefined))
        setValue("pages_order", acceptedFiles.map(file => file.fileName))
    }, [acceptedFiles]);

    const onSubmit = (d: ChapterFormProps) => {
        const formData = new FormData();

        formData.append("manga", mangaId || "");

        formData.append("tome", d.tome.toString());
        formData.append("chapter", d.chapter.toString());

        if (d.name)
            formData.append("name", d.name);

        for (let page of d.new_pages)
            formData.append("new_page", page)

        if (d.new_pages.length > 0)
            formData.append("pages_order", JSON.stringify(d.pages_order))

        if (d.author.startsWith("user"))
            formData.append("user", d.author.split("/")[1])
        else if (d.author.startsWith("team"))
            formData.append("team", d.author.split("/")[1]);

        onSend(formData);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "20px"
                }}
            >
                <Grid container spacing={1.5} columns={{md: 12, xs: 1}}>
                    <Grid size={{md: 2, xs: 1}}>
                        <Controller 
                            name="tome"
                            control={control}
                            render={({field}) => (
                                <FormInput
                                    {...field} 
                                    title="Том"
                                    placeholder="Том"
                                />
                            )}
                        />
                        
                    </Grid>
                    <Grid size={{md: 2, xs: 1}}>
                        <Controller 
                            name="chapter"
                            control={control}
                            render={({field}) => (
                                <FormInput 
                                    {...field}
                                    title="Глава"
                                    placeholder="Глава"
                                />
                            )}
                        />    
                    </Grid>
                    <Grid size={{md: 8, xs: 1}}>
                        <Controller 
                            name="name"
                            control={control}
                            render={({field}) => (
                                <FormInput 
                                    {...field}
                                    title="Название"
                                    placeholder="Введите название"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Controller 
                    name="author"
                    control={control}
                    render={({field}) => (
                        <FormSelect 
                            {...field}
                            title="Автор"
                        >
                            <MenuItem value={`user/${currentUser?.id}`} sx={{display: "block"}}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <ListItem
                                        img={currentUser.avatar}
                                        title={currentUser.login}
                                        subtitle={currentUser.about}
                                    />
                                    <Typography>
                                        Я
                                    </Typography>
                                </Box>
                            </MenuItem>
                            {mockTeams.map(team => (
                                <MenuItem key={team.id} value={`team/${team.id}`} sx={{display: "block"}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <ListItem 
                                            title={team.name}
                                            img={team.poster}
                                        />
                                        <Typography>
                                            Команда
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </FormSelect>
                    )}
                />
                <FormMultipleFilesInput title="Страницы" onInput={handleChange}/>
            </Box>
            <Button sx={{mt: "15px"}} variant="contained" type="submit">Отправить</Button>
        </form>
    )
}