export interface User {
    id: number,
    login: string,
    email: string,
    avatar: string,
    role: number,
    about: string,
    subscribed?: boolean
}

export const EMPTY_USER: User = {
    id: 0,
    login: "",
    email: "",
    avatar: "",
    about: "",
    role: 0
} 