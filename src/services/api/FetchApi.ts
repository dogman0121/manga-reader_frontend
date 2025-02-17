const getAccessToken = () => {
    return localStorage.getItem("access_token");
}

const saveAccessToken = (token: string) => {
    localStorage.setItem("access_token", token);
}

const saveRefreshToken = (token: string) => {
    localStorage.setItem("refresh_token", token);
}

const refreshToken = async () => {
    const response = await fetch("http://127.0.0.1:5000/user/refresh", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`
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

        if (response.status === 401) {
            await refreshToken();

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