import { EmptyUser } from "../../types/User";
import FetchApi from "./FetchApi";

const fetchUser = async() => {
    const response = await FetchApi("http://kanwoo.ru/api/user/me");

    if (response.ok)
        return await response.json();
    else 
        return EmptyUser;
}

export default fetchUser;