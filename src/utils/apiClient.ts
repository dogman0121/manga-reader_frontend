import { tokenService } from "../features/auth/services/tokenService";

class ApiClient {
    //baseUrl = "https://kanwoo.ru/api"
    baseUrl = "http://127.0.0.1:5000/api"

    async _sendJsonRequest(url: string, method: string, body?: Object) {
        const requestParams = {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        const response = await this._fetch(url, method, requestParams);

        if (response.status === 401 && tokenService.getRefreshToken()){
            await this._refreshToken();
            
            return this._fetch(url, method, requestParams);
        }

        return response;
    }

    async _sendFormRequest(url: string, method: string, form: FormData){
        const requestParams = {
            body: form
        }

        const response = await this._fetch(url, method, requestParams);

        if (response.status === 401 && tokenService.getRefreshToken()){
            await this._refreshToken();
            
            return this._fetch(url, method, requestParams);
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

    async _fetch(url: string, method: string, body?: RequestInit) {
        const headers: HeadersInit = new Headers({ ...body?.headers });

        if (tokenService.getAccessToken())
            headers.set("Authorization", `Bearer ${tokenService.getAccessToken()}`);

        return await fetch(this.baseUrl + url, {
            method: method,
            headers: headers,
            body: body?.body
        })
    }

    async get(url: string) {
        return this._sendJsonRequest(url, "GET");
    }

    async post(url: string, body: Object) {
        return this._sendJsonRequest(url, "POST", body);
    }

    async put(url: string, body: Object) {
        return this._sendJsonRequest(url, "PUT", body);
    }

    async sendForm(url: string, method: "POST" | "PUT", form: FormData){
        return this._sendFormRequest(url, method, form);
    }
}

export const apiClient = new ApiClient();