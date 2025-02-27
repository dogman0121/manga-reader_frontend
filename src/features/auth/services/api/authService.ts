import { apiClient } from "../../../../utils/apiClient";

class AuthService {
    async login(login: string, password: string) {
        const response = await apiClient.post("/user/login", {login, password});
        return await response.json();
    }
    
    async register(login: string, email: string, password: string) {
        const response = await apiClient.post("/user.register", {login, email, password})
        return await response.json();
    }

    async forgot(email: string) {
        const response = await apiClient.post("/user/forgot", {email})
        return await response.json();
    }

    async recovery(token: string, password: string) {
        const response = await apiClient.post("/user/forgot", {token, password})
        return await response.json();
    }

    async verify(token: string) {
        const response = await apiClient.post("/user/forgot", {token})
        return await response.json();
    }
}


export const authService = new AuthService();