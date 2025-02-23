import { EMPTY_USER } from "../../types/User";
import FetchApi from "./FetchApi";

const fetchUser = async() => {
    const response = await FetchApi("https://kanwoo.ru/api/user/me");

    if (response.ok)
        return await response.json();
    else 
        return EMPTY_USER;
}

export default fetchUser;