import { apiClient } from "../../../../utils/apiClient";

class UserService {
    async fetchUser(userId: number) {
        const response = await apiClient.get(`/users/${userId}`);
        return await response.json();
    }

    async subscribeUser(userId: number){
        const response = await apiClient.post(`/users/${userId}/subscribe`, {});
        return await response.json();
    }

    async unsubscribeUser(userId: number){
        const response = await apiClient.delete(`/users/${userId}/subscribe`, {});
        return await response.json();
    }

    async updateUser(userId: number, data: FormData){
        const response = await apiClient.sendForm(`/users/${userId}`, "PUT", data);

        return await response.json();
    }

    async getSubscribers(userId: number, page: number = 1){
        const response = await apiClient.get(`/users/${userId}/subscribers?page=${page}`);

        return await response.json();
    }
}

const userService = new UserService();

export default userService;