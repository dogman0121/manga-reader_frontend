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
}

const userService = new UserService();

export default userService;