import { useEffect, useState } from "react";
import Title from "../../types/Title"
import TitleContext from "../../context/TitleContext";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { Box, CircularProgress } from "@mui/material";
import fetchTitle from "../../services/api/fetchTitle";
import { useParams } from "react-router-dom";

// setTitle({
//     id: 1,
//     name: "Aboba",
//     name_translations: [{lang: "ru", name: "Абоба"}],
//     main_poster: {
//         uuid: "1231sdf",
//         thumbnail: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp",
//         small: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp",
//         medium: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp",
//         large: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp"
//     },
//     views: 123,
//     rating: 4.23,
//     rating_count: 101,
//     saves: 123,
//     description: `«Ваши "проклятия" для меня — не что иное, как "благословения". В современном мире, где по всему земному шару появились башни-подземелья, известные как "Небесные Башни". Главный герой, Ёшито Такамичи, работает в магазине у дороги. Каждый день он сталкивается с криками менеджера и чувствует себя униженным. Мечтая о быстром обогащении, вскоре после появления Небесных Башен, Ёшито становится "покорителем" башни, но из-за отсутствия сбережений для инвестиций в оружие и экипировку, он сильно отстает от других покорителей. Целясь в резкий переворот судьбы, Ёшито продает все свои сбережения и несколько предметов, полученных в башне, чтобы купить у сомнительного торговца способность "Бесконечное Возрождение", позволяющую ему воскрешаться внутри подземелья. Однако у "Бесконечного Возрождения" был скрытый недостаток: при возрождении на Ёшито налагался случайный "штраф смерти", представляющий собой постоянное ухудшение характеристик, делающее его непригодным для дальнейших приключений. Отчаявшись из-за кажущегося проклятия способности, Ёшито находит в скрытой комнате башни редкий навык "Инверсия", который кардинально меняет его ситуацию. Благодаря "Инверсии", все тяжелые отрицательные эффекты "штрафа смерти" от "Бесконечного Возрождения" превращаются в положительные, полностью изменяя его судьбу...`,
//     genres: [{id: 1, name:"дурак"}, {id: 2, name:"дурак"}, {id: 3, name:"дурак"}, {id:4, name:"дурак"}, {id: 5, name:"дурак"}],
//     similar: [{
//         id: 2,
//         name: "23123",
//         main_poster: {
//             uuid: "1231sdf",
//             thumbnail: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp",
//             small: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp",
//             medium: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp",
//             large: "https://remanga.org/media/titles/mythica-weapon-creation-by-a-returned-genius-player/cover_8fa21442.webp"
//         },
//         name_translations: [],
//         views: 321,
//         rating: 7.81,
//         rating_count: 101,
//         saves: 0,
//         description: "sewrwsfdv",
//         genres: [{id: 1, name:"дурак"}]
//     }],
//     teams: [
//         {
//             id: 1,
//             poster: "https://remanga.org/media/titles/the-serena/70f0bfec7c801f5245058e26f80dde90.jpg",
//             name: "124"
//         },
//         {
//             id: 1,
//             poster: "https://remanga.org/media/titles/the-serena/70f0bfec7c801f5245058e26f80dde90.jpg",
//             name: "124"
//         },
//         {
//             id: 1,
//             poster: "https://remanga.org/media/titles/the-serena/70f0bfec7c801f5245058e26f80dde90.jpg",
//             name: "124"
//         }
//     ]
// })

function TitlePage() {
    const {id} = useParams();

    const [title, setTitle] = useState<Title | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchTitle(parseInt(id || ""))
        .then((t) => {
            setTitle(t);
            setIsLoading(false);
        })
        

        return () => {}
    }, [])

    if (isLoading)
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CircularProgress />
            </Box>
        )

    if (title === null) 
        return (<>Null</>) 

    return (
        <TitleContext.Provider value={ title }>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: "30px"
                }}
            >
                <LeftSide />
                <RightSide />
            </Box>
        </TitleContext.Provider>
    )
}

export default TitlePage;