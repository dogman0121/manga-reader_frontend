import { getAccessToken, saveAccessToken, saveRefreshToken, getRefreshToken } from "../../utils/token";

const refreshToken = async () => {
    const response = await fetch("https://kanwoo.ru/api/user/refresh", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getRefreshToken()}`
        }
    });

    if (!response.ok) 
        throw new Error("Failed to refresh token");

    const json = await response.json()

    saveAccessToken(json.access_token);
    saveRefreshToken(json.refresh_token);
}

const sendRequest = async (url: string, body: RequestInit) => {
    try {
        if (localStorage.getItem("access_token")) {
            body.headers = {...body.headers, "Authorization": `Bearer ${getAccessToken()}`};
        }

        return await fetch(url, body);
    }
    catch (e) {
        throw new Error("Unable to send request");
    }
}

const FetchApi = async (url: string, body: RequestInit = {}) => {
    try {
        const response = await sendRequest(url, body);

        if (response.status === 401 && getRefreshToken()) {
            await refreshToken() ;

            const newResponse = await sendRequest(url, body);

            return newResponse;
        }
        
        return response;

    }
    catch (e) {
        throw new Error("Failed to fetch data")
    }
}

export default FetchApi;