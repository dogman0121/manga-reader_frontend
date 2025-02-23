export interface User {
    id: number,
    login: string,
    email: string,
    avatar: string,
    role: number
}

export const EMPTY_USER: User = {
    id: 0,
    login: "",
    email: "",
    avatar: "",
    role: 0
} 