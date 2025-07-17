import { Box, MenuItem, SxProps, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormInput from "../../../../features/form/components/FormInput";
import { Controller, useForm } from "react-hook-form";
import FormMultipleFilesInput from "../../../../features/form/components/FormMultipleFilesInput";
import useFileInput from "../../../../features/form/hooks/useFileInput";
import { useContext, useEffect } from "react";
import FormSelect from "../../../../features/form/components/FormSelect";
import UserAuthContext from "../../../../context/UserAuthContext";
import { mockTeams } from "../../../../mocks/team.mock";
import { ListItem } from "../../../../components/ListItem";
import Chapter from "../../types/Chapter";
import FormFile from "../../../../features/form/types/FormFile";


interface ChapterFormProps {
    tome: number,
    chapter: number,
    name: string,
    new_pages: Array<File>,
    pages_order: Array<string>,
    author: string
}

export default function ChapterFormSingle({
    chapter, 
    onSend,
    sx
}: {
    chapter: Chapter | null, 
    onSend: Function,
    sx?: SxProps
}) {

    const theme = useTheme();

    const { user:currentUser } = useContext(UserAuthContext);

    const {handleChange, acceptedFiles} = useFileInput();

    const {control, handleSubmit, setValue} = useForm<ChapterFormProps>({
        defaultValues: {
            tome: chapter?.tome || 1,
            chapter:  chapter?.chapter || 1,
            name: chapter?.name || "",
        }
    });
    
    useEffect(() => {
        const newPages: Array<File | undefined> = acceptedFiles.map(file => file.file)

        setValue("new_pages", newPages.filter(page => page != undefined))
        setValue("pages_order", acceptedFiles.map(file => file.fileName))
    }, [acceptedFiles]);

    const onSubmit = async (d: ChapterFormProps) => {
        const formData = new FormData();

        formData.append("tome", d.tome.toString());
        formData.append("chapter", d.chapter.toString());

        if (d.name)
            formData.append("name", d.name);

        for (let page of d.new_pages)
            formData.append("new_page", page)

        formData.append("pages_order", JSON.stringify(d.pages_order))

        if (d.author.startsWith("user"))
            formData.append("user", d.author.split("/")[1])
        else if (d.author.startsWith("team"))
            formData.append("team", d.author.split("/")[1]);

        onSend(formData);
    }

    if (!currentUser)
        return null;

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="chapter-form">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: theme.spacing(3),
                    ...sx
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
                    defaultValue={`user/${currentUser.id}`}
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
                                        img={currentUser.avatar || ""}
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
                <FormMultipleFilesInput 
                    title="Страницы" 
                    onChange={handleChange}
                    showFilenames
                    unpackZip
                    defaultValue={chapter?.pages.map((page) => ({
                        uuid: page.uuid, 
                        fileName: page.filename, 
                        src: page.link
                    } as FormFile))}
                />
            </Box>
        </form>
    )
}