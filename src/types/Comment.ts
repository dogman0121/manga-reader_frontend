import { EMPTY_USER, User } from "./User";

export const EMPTY_COMMENT: Comment = {
    id: 0,
    text: "",
    user: EMPTY_USER,
    created_at: new Date(0),
    answers_count: 0,
    up_votes: 0,
    down_votes: 0,
}

interface Comment {
    id: number,
    text: string,
    user: User
    created_at: Date | string,
    answers_count: number,
    up_votes: number,
    down_votes: number,
    user_vote ?: number
}

export default Comment;