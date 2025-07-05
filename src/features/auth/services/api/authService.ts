import { apiClient } from "../../../../utils/apiClient";
import { deleteAccessToken, deleteRefreshToken } from "../../utils/token";

class AuthService {
    async login(login: string, password: string) {
        const response = await apiClient.post("/users/login", {login, password});
        return await response.json();
    }
    
    async register(login: string, email: string, password: string) {
        const response = await apiClient.post("/users/register", {login, email, password})
        return await response.json();
    }

    async forgot(email: string) {
        const response = await apiClient.post("/users/forgot", {email})
        return await response.json();
    }

    async recovery(token: string, password: string) {
        const response = await apiClient.post("/users/recovery", {token, password})
        return await response.json();
    }

    async verify(token: string) {
        const response = await apiClient.post("/users/verify", {token})
        return await response.json();
    }

    async logout() {
        deleteAccessToken();
        deleteRefreshToken();
    }
}


export const authService = new AuthService();