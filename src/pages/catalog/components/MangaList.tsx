import Title from "../../../types/Title";
import { useTheme } from "@mui/material";
import { Link } from 'react-router-dom'
import { Box, Typography, SxProps } from "@mui/material";
import { useContext } from "react";
import SearchContext from "../../../features/search/context/SearchContext";
import { VIEWS } from "..";
import Poster from "../../../components/ui/Poster";
import { generatePath, MangaRoutes } from "../../../routes";


function MangaItem({ type, item }: {type: string, item: Title}) {
    const theme = useTheme();

    return (
        <Link to={generatePath(MangaRoutes.INDEX, {mangaId: item.id})}>
            {type === "grid" ?
                <Box >
                    <Poster 
                        src={item.main_poster?.small || ""}
                    />
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontSize: "13px",
                                textTransform: "capitalize",
                                color: theme.typography.subtitle1.color
                            }}
                        >
                            <Typography fontSize={"13px"}>
                                {item.type?.name}
                            </Typography>
                            <Typography fontSize={"13px"} sx={{ml: "5px"}}>
                                {item.year}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontSize:"14px",
                                display: "-webkit-box",
                                "-webkit-line-clamp": "2",
                                "-webkit-box-orient": "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {item.name}</Typography>
                    </Box>
                </Box>
                :
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "15px",
                    }}
                >
                    <Poster 
                        src={item.main_poster?.medium || ""}
                        width="130px"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >   
                        <Typography sx={{color: theme.typography.subtitle1.color}}>
                            {item.status?.name}
                            
                        </Typography>
                        <Typography sx={{textTransform: "capitalize", display: "flex"}}>
                            <Box>{item.type?.name}</Box>
                            <Box sx={{ml: "10px"}}>{item.year}</Box>
                        </Typography>
                        <Typography>
                            {item.name}
                        </Typography>
                        <Typography sx={{textTransform: "capitalize", color: theme.typography.subtitle1.color}}>
                            {[item.genres?.map((genre) => genre.name.toLowerCase())].join(", ")}
                        </Typography>
                    </Box>
                </Box>
            }
        </Link>
    )
}

function MangaList({view, sx }: {view: string, sx?: SxProps}){
    const { results } = useContext(SearchContext);

    return (
        <>
            { view === VIEWS.GRID ?
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                        rowGap: "10px",
                        columnGap: "10px",
                        ...sx
                    }}
                >
                    {results.map((title) => <MangaItem type="grid" item={title} key={title.id}/>)}
                </Box>
                :
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                        columnGap: "10px",
                        rowGap: "15px",
                        ...sx
                    }}
                >
                    {results.map((title) => <MangaItem type="row" item={title} key={title.id}/>)}
                </Box>
            }
        </>
    )
}

export default MangaList;