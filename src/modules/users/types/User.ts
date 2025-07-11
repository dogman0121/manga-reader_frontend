import List from "../../lists/types/List"

export interface User {
    id: number,
    login: string,
    email: string,
    avatar?: string,
    role: number | null,
    about?: string,
    subscribed?: boolean | null,
    subscribers_count: number | null,
    notifications_count?: number | null,
    created_at?: string | null,
    lists?: List[]
}

export const EMPTY_USER: User = {
    id: 0,
    login: "",
    email: "",
    avatar: "",
    about: "",
    role: 0,
    subscribers_count: 0
} 