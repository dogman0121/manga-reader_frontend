export interface User {
    id: number,
    login: string,
    email: string,
    avatar: string,
    role: number,
    about: string,
    subscribed?: boolean
    subscribers_count: number,
    notifications_count?: number
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