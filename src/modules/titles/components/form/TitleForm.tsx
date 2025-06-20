import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import Media from "./Media";
import Info from "./Info";
import AddTitleForm from "../../types/AddTitleForm";
import Title from "../../types/Title"
import Button from "../../../../components/ui/Button";
import FormFile from '../../../../features/form/types/FormFile';
import { v4 as uuid4 } from 'uuid';

export function compileFormData(data: AddTitleForm) {
    const form = new FormData()

    form.append("name", data.name);

    form.append("name-translations", JSON.stringify(Object.fromEntries(data.nameTranslations || new Map())))

    form.append("description", data.description || "");

    form.append("type", data.type.toString());

    form.append("status", data.status.toString());

    form.append("adult", data.adult.toString());

    form.append("year", data.year.toString());


    if (data.mainPoster)
        form.append("main_poster", data.mainPoster.fileName);

    if (data.background?.file)
        form.append("background", data.background.file);

    let postersOrder: Array<string> = [];
    data.posters?.forEach((poster, _ind) => {
        if (poster.file)
            form.append("new_posters", poster.file);

        postersOrder.push(poster.fileName);
    })
    
    form.append("posters_order", JSON.stringify(postersOrder));

    data.genres?.forEach(genre => form.append("genres", genre.toString()))

    data.authors?.forEach(author => form.append("authors", author.id.toString()))

    data.artists?.forEach(artist => form.append("artists", artist.id.toString()))

    data.publishers?.forEach(publisher => form.append("publishers", publisher.id.toString()))

    return form;
}


function TitleForm({ onSubmit, title }: { onSubmit: SubmitHandler<AddTitleForm>, title?: Title }) {
    const methods = useForm<AddTitleForm>({
        defaultValues: {
            name: title?.name || "",
            nameTranslation: "",
            nameTranslationLang: "ru",
            nameTranslations: new Map(
                title?.name_translations?.map((translation) => ([translation.lang, translation.name])) || []
            ),
            description: title?.description || "",
            type: title?.type?.id || 1,
            status: title?.status?.id || 1,
            year: title?.year || new Date().getFullYear(),
            adult: title?.adult?.id || 1,
            genres: title?.genres?.map(({ id }) => id) || [],
            authors: title?.authors || [],
            artists: title?.artists || [],
            publishers: title?.publishers || [],
            mainPoster: title?.main_poster ? {uuid: uuid4().toString(), fileName: title.main_poster.uuid, src: title.main_poster.small } as FormFile : undefined,
            background: title?.background ? {uuid: uuid4().toString(), fileName: title.background, src: title.background } as FormFile : undefined,
            newPosters: [],
            posters: title?.posters?.map(poster => ({uuid: uuid4().toString(), fileName: poster.uuid, src: poster.small } as FormFile)) || []
        }
    });

    const [tab, setTab] = useState("1");

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <TabContext
                    value={tab}
                >
                    <TabList 
                        onChange={handleChangeTab}
                        sx={{
                            mt: "5px"
                        }}
                    >
                        <Tab label="Информация" value="1" sx={{textTransform: "capitalize"}}/>
                        <Tab label="Медиа" value="2" sx={{textTransform: "capitalize"}}/>
                    </TabList>
                    <TabPanel 
                        value="1"
                        sx={{
                            p: 0,
                            mt: "15px",
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
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "25px"
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