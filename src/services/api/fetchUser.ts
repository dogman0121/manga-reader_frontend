import { EMPTY_USER } from "../../types/User";
import { apiClient } from "../../utils/apiClient";

const fetchUser = async() => {
    const response = await apiClient.get("/user/me");

    if (response.ok)
        return await response.json();
    else 
        return EMPTY_USER;
}

export default fetchUser;