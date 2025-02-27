class Token {
    getAccessToken() {
        return localStorage.getItem("access_token");
    }

    getRefreshToken() {
        return localStorage.getItem("refresh_token");
    }

    saveAccessToken(token: string) {
        localStorage.setItem("access_token", token);
    }

    saveRefreshToken(token: string) {
        localStorage.setItem("refresh_token", token);
    }

    deleteAccessToken() {
        localStorage.removeItem("access_token");
    }

    deleteRefreshToken() {
        localStorage.removeItem("refresh_token");
    }
}

export const tokenService = new Token();