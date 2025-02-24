import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import OpenGraphMeta from "../../features/search/components/OpenGraphMeta";

export default function Home() {
    const theme = useTheme();

    return (
        <>
            <OpenGraphMeta 
                title="Лучший каталог манги в России. Читать мангу бесплатно! | kanwoo"
                description="Лучший сайт по чтению манги, манхвы, маньхуа и других произведений. Здесь не просто большой выбор манги, но и лучшее коммьюнити. Читай только на kanwoo!"
                url="https://kanwoo.ru/"
                image=""
                siteName="kanwoo"
            />
            Home
            <Button variant="contained" sx={{bgcolor: theme.palette.primary.main}}>Contained</Button>
        </>
    )
};