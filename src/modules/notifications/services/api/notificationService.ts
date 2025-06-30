import { apiClient } from "../../../../utils/apiClient";

class NotificationService {
    async getNotifications(category: string = "all") {
        const urlParams = new URLSearchParams([["category", category]])
        const response = await apiClient.get(`/notifications?${urlParams.toString()}`);
        return await response.json();
    }

    async readNotifications() {
        const response = await apiClient.patch("/notifications")
        return await response.json();
    }

    async deleteNotification() {

    }
}

export const notificationService = new NotificationService();