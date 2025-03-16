import { User } from "./User"

interface Person {
    id: number,
    name: string,
    creator: User,
    createdAt: Date
}

export default Person;