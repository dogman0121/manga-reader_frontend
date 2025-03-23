import { Button, useTheme } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import Media from "./media/Media";
import Info from "./info/Info";
import AddTitleForm from "./types/AddTitleForm";
import Title from "../../types/Title";
import Poster from "./types/Poster";
import { storageService } from "../../services/api/storageService";

export function parseTitleData<AddTitleForm>(title: Title) {
    return {
        name: title.name,
        nameTranslation: "",
        nameTranslationLang: "ru",
        nameTranslations: new Map(
            title.name_translations?.length ? 
            title.name_translations.map((translation) => ([translation.lang, translation.name])) :
            []
        ),
        description: title.description || "",
        type: title.type?.id || 1,
        status: title.status?.id || 1,
        year: title.year || new Date().getFullYear(),
        adult: title.adult?.id || 1,
        genres: title.genres?.map(({ id }) => id) || [],
        authors: title.authors || [],
        artists: title.artists || [],
        publishers: title.publishers || [],
        mainPoster: title.main_poster ? { fileName: title.main_poster, fileUrl: storageService.getUrl(`manga/${title.main_poster}`) } as Poster : undefined,
        background: title.background ? { fileName: title.background, fileUrl: storageService.getUrl(`manga/${title.background}`) } as Poster : undefined,
        new_posters: [],
        posters: title.posters?.map(poster => ({ fileName: poster, fileUrl: storageService.getUrl(`manga/${poster}`) } as Poster)) || []
    } as AddTitleForm;
}

export function compileFormData(data: AddTitleForm) {
    const form = new FormData()

    form.append("name", data.name);
    form.append("name-translations", JSON.stringify(Object.fromEntries(data.nameTranslations || new Map())))
    form.append("description", data.description);
    form.append("type", data.type.toString());
    form.append("status", data.status.toString());
    form.append("adult", data.adult.toString());
    form.append("year", data.year.toString());


    if (data.mainPoster)
        form.append("main_poster", data.mainPoster.fileName);

    if (data.background?.file)
        form.append("background", data.background.file);

    data.genres?.forEach((genre) => {
        form.append("posters", genre.id.toString());
    })

    let postersOrder: Array<string> = [];
    data.posters?.forEach((poster, _ind) => {
        if (poster.file)
            form.append("new_posters", poster.file);

        postersOrder.push(poster.fileName);
    })
    form.append("posters_order", JSON.stringify(postersOrder));

    data.authors?.forEach((author) => {
        form.append("authors", author.id.toString());
    })

    data.artists?.forEach((artist) => {
        form.append("artists", artist.id.toString());
    })

    data.publishers?.forEach((publisher) => {
        form.append("publishers", publisher.id.toString());
    })

    return form;
}


function TitleForm({ onSubmit, initialValue }: { onSubmit: SubmitHandler<AddTitleForm>, initialValue?: AddTitleForm }) {
    const methods = useForm<AddTitleForm>({});
    
    const theme = useTheme();

    const [tab, setTab] = useState("1");

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (initialValue)
            methods.reset(initialValue);

    }, [initialValue])

    return (
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
    )
}

export default TitleForm;