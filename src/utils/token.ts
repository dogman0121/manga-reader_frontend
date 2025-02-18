export const getAccessToken = () => {
    return localStorage.getItem("access_token");
}

export const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
}

export const saveAccessToken = (token: string) => {
    localStorage.setItem("access_token", token);
}

export const saveRefreshToken = (token: string) => {
    localStorage.setItem("refresh_token", token);
}