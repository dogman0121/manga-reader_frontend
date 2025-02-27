import { tokenService } from "../features/auth/services/tokenService";

class ApiClient {
    baseUrl = "https://kanwoo.ru/api"

    async _sendRequest(url: string, method: string, body?: Object) {
        const response = await this._fetch(url, method, body);

        if (response.status === 401 && tokenService.getRefreshToken()){
            await this._refreshToken();
            
            return this._fetch(url, method, body);
        }

        return response;
    }

    async _refreshToken() {
        const response = await fetch(this.baseUrl + "/user/refresh", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${tokenService.getRefreshToken()}`
            }
        });
    
        if (!response.ok) 
            throw new Error("Failed to refresh token");
    
        const json = await response.json()

        tokenService.saveAccessToken(json.access_token);
        tokenService.saveRefreshToken(json.refresh_token);
    }

    async _fetch(url: string, method: string, body?: Object) {
        const headers: HeadersInit = new Headers({
            "Content-Type": "application/json"
        })

        if (tokenService.getAccessToken())
            headers.append("Authorization", `Bearer ${tokenService.getAccessToken()}`);

        return await fetch(this.baseUrl + url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
    }

    async get(url: string) {
        return this._sendRequest(url, "GET");
    }

    async post(url: string, body: Object) {
        return this._sendRequest(url, "POST", body);
    }

    async put(url: string, body: Object) {
        return this._sendRequest(url, "PUT", body);
    }
}

export const apiClient = new ApiClient();