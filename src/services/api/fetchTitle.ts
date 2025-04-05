import { apiClient } from "../../utils/apiClient";

const fetchTitle = async(titleId: number) => {
    const response = await apiClient.get(`/manga/${titleId}`);

    if (response.ok){
        return await response.json();
    }
    else { 
        return null;
    }
}

export default fetchTitle;