import { Box, Button, useTheme } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import Media from "./media/Media";
import { addTitleService } from "./services/addTitleService";
import Info from "./info/Info";
import Person from "../../types/Person";

interface AddTitleForm {
    name: string,
    nameTranslation: string,
    nameTranslationLang: string,
    nameTranslations: Map<string, string>,
    description: string,
    type: number,
    status: number,
    year: number,
    adult: number,
    genres: Array<{id: string, name:string}>,
    authors: Array<Person>,
    artists: Array<Person>
    publishers: Array<Person>,
    mainPoster: File,
    wrapper: File,
    posters: Array<File>
}

function AddTitle() {
    const methods = useForm<AddTitleForm>({});

    const theme = useTheme();

    const [tab, setTab] = useState("1");

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const onSubmit: SubmitHandler<AddTitleForm> = (data) => {
        const form = new FormData()

        form.append("name", data.name);
        form.append("name-translations", JSON.stringify(Object.fromEntries(data.nameTranslations || new Map())))
        form.append("description", data.description);
        form.append("type", data.type.toString());
        form.append("status", data.status.toString());
        form.append("adult", data.adult.toString());
        form.append("year", data.year.toString());

        if (data.posters?.indexOf(data.mainPoster) !== -1)
            form.append("main-poster", data.posters?.indexOf(data.mainPoster).toString());

        if (data.wrapper)
            form.append("background", data.wrapper);

        data.genres?.forEach((genre) => {
            form.append("posters", genre.id.toString());
        })

        data.posters?.forEach((poster, _ind) => {
            const newFile = new File([poster], `${_ind}.jpg`, {type: "image/jpg"});
            form.append("posters", newFile);
        })

        data.authors?.forEach((author) => {
            form.append("authors", author.id.toString());
        })

        data.artists?.forEach((artist) => {
            form.append("artists", artist.id.toString());
        })

        data.publishers?.forEach((publisher) => {
            form.append("publishers", publisher.id.toString());
        })

        addTitleService.addTitle(form);
    }

    return (
        <Box
            sx={{
                maxWidth: "960px",
                m: "0 auto"
            }}
        >
            <Box
                sx={{
                    fontSize: "36px",
                    mt: "50px",
                }}
            >
                Добавление манги
            </Box>
            <Box
                sx={{
                    mt: "28px",
                }}
            >
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TabContext
                            value={tab}
                        >
                            <TabList 
                                onChange={handleChangeTab}
                                sx={{
                                    "& button": {
                                        color: theme.typography.body1.color,
                                    }
                                }}
                            >
                                <Tab label="Информация" value="1" />
                                <Tab label="Медиа" value="2" />
                            </TabList>
                            <TabPanel 
                                value="1"
                                sx={{
                                    p: 0,
                                    mt: "25px",
                                    display: "flex",
                                    flexDirection: "column",
                                    rowGap: "25px"
                                }}
                            >
                                <Info />
                            </TabPanel>
                            <TabPanel
                                value="2"
                                sx={{
                                    p: 0,
                                }}
                            >
                                <Media />
                            </TabPanel>
                        </TabContext>
                        <Button 
                            type="submit" 
                            variant="contained"
                            sx={{
                                mt: "20px"
                            }}
                        >
                            Отправить
                        </Button> 
                    </form>
                </FormProvider>
            </Box>
        </Box>
    )
}

export default AddTitle;