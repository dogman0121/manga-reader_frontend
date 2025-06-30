import Comment from "../../../types/Comment";
import { User } from "../../../types/User";
import Chapter from "../../chapters/types/Chapter";

interface Notification {
    id: number,
    action: string,
    type: string,
    user: User,
    is_read: boolean,
    created_at: string,
    payload: {
        user?: User,
        coment?: Comment,
        chapter?: Chapter
    }
}

export default Notification;