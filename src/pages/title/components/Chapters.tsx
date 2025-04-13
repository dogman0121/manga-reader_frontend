import { useContext } from "react";
import Chapter from "../../../types/Chapter";
import { User } from "../../../types/User";
import TitleContext from "../../../context/TitleContext";
import { Link } from "react-router-dom"
import Team from "../../../types/Team";
import { Box, Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import Poster from "../../../components/ui/Poster";


function ChapterItem({ chapter}: { chapter: Chapter}) {
    return (
        <Link to={`/chapters/${chapter.id}`}>
            <Box
                sx={{
                    mt: "5px",

                    padding: "12px 14px",
                    backgroundColor: "var(--widget1-color)",
                    borderRadius: "12px"
                }}
            >
                Том {chapter.tome} Глава {chapter.chapter}
            </Box>
        </Link>
    )
}


function ChaptersList() {
    const chapters: Array<Chapter> = [
        {
            id: 1,
            tome: 1,
            chapter: 1,
            title: 1,
            team: 1,
            date: "123",
            creator: {
                id: 1,
                login: "asds",
                email: "dfsdf",
            } as User
        }
    ]

    return (
        <Box mt={"10px"}>
            { chapters.map((chapter) => <ChapterItem key={chapter.id} chapter={chapter}/>) }
        </Box>
    )
}

function TeamItem({ team }: { team: Team }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",

                padding: "6px 8px",
                backgroundColor: "var(--dropdown-background)",

                borderRadius: "6px"
            }}
        >
            <Poster width="30px" src={team.poster} />
            <Box
                sx={{
                    margin: "auto 0",
                    padding: "0 20px"
                }}
            >
                Team
            </Box>
        </Box>
    )
}

function TeamList({ teams }: {teams: Array<Team>}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",

                columnGap: "15px"
            }}
        >
            {teams.map((team) => <TeamItem team={team}/>)}
        </Box>
    )
}

function Chapters() {
    const { title } = useContext(TitleContext);

    if (!title || !title.teams)
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    p: "30px 0"
                }}
            >
                <Typography fontSize={"24px"}>Глав нет!</Typography>
            </Box>
        );

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Typography>Список глав</Typography>
                <Box>
                    <AddRoundedIcon/>
                    <SwapVertRoundedIcon/>
                </Box>
            </Box>
            <TeamList teams = {title.teams}/>
            <ChaptersList/>
        </>
    )
}

export default Chapters;