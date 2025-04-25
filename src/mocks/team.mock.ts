import Team from "../types/Team";
import { mockUsers } from "./user.mock";

export const mockTeams: Team[] = [
    {id: 1, name: "Dead Inside", 
        poster: "https://cover.imglib.info/uploads/team/5064/cover/37fc380c-c540-49e5-a6b1-6e341b2830c2.jpg", members: mockUsers},
    {id: 2, name: "Booba team", 
        poster: "https://cover.imglib.info/uploads/team/1516/cover/34854be2-a78d-4bb4-9d67-2ac12a32afb5.jpg", members: mockUsers},
    {id: 3, name: "Lil peep team", 
        poster: "https://cover.imglib.info/uploads/team/assley-team/cover/5T8bxtsG645F_250x350.jpg", members: mockUsers}
]

export const mockTeam = mockTeams[0];