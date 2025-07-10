import List from "../modules/lists/types/List"

export const mockLists: List[] = [
    {
        id: 1, 
        name: "Хоррор аниме",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        created_at: "12-08-2005",
        creator: {id: 1,  login: "aboba", email: "aboba@mail.ru", role: 1, about: "aboba", subscribers_count: 0,
        avatar: "https://kanwoo.ru/uploads/user/1/a3fbd07e-ed83-4c4e-b1ca-bd56b26c4e57.jpg"},
        is_saved_by_user: false,
        saves_count: 0,
        manga: [{
            slug: "ataka-titanov",
            adult: {
                id: 4,
                name: "18+"
            },
            artists: [
                {
                    about: "\u0420\u0443\u0441\u044b, \u043f\u0435\u0439\u0442\u0435 \u0432\u043e\u0434\u0443 \u0438\u0437 \u0411\u0430\u0439\u043a\u0430\u043b\u0430",
                    avatar: "https://kanwoo.ru/uploads/user/4/e719bcfc-61a5-4f2a-a3b8-2fa800a6f8db.jpg",
                    created_at: "2025-04-27T16:39:59.970617Z",
                    email: "ujhjlyjd.ivan@yandex.ru",
                    id: 4,
                    login: "BednyGamer",
                    notifications_count: 0,
                    role: 1,
                    subscribers_count: 2
                },
                {
                    created_at: "2025-06-20T21:43:47.742188Z",
                    email: "halz1161@yandex.ru",
                    id: 6,
                    login: "halz3",
                    notifications_count: 2,
                    role: 1,
                    subscribed: null,
                    subscribers_count: 1
                }
            ],
            authors: [
                {
                    about: "\u0420\u0443\u0441\u044b, \u043f\u0435\u0439\u0442\u0435 \u0432\u043e\u0434\u0443 \u0438\u0437 \u0411\u0430\u0439\u043a\u0430\u043b\u0430",
                    avatar: "https://kanwoo.ru/uploads/user/4/e719bcfc-61a5-4f2a-a3b8-2fa800a6f8db.jpg",
                    created_at: "2025-04-27T16:39:59.970617Z",
                    email: "ujhjlyjd.ivan@yandex.ru",
                    id: 4,
                    login: "BednyGamer",
                    notifications_count: 0,
                    role: 1,
                    subscribed: null,
                    subscribers_count: 2
                }
            ],
            "background": "https://kanwoo.ru/uploads/manga/1/035991c8-9d0a-4a41-8724-b9808ff3c7d7.jpg",
            "description": "\u041c\u0438\u0440 \u043b\u044e\u0434\u0435\u0439 \u043f\u0430\u043b \u043f\u043e\u0434 \u0441\u043e\u043a\u0440\u0443\u0448\u0430\u044e\u0449\u0435\u0439 \u043c\u043e\u0449\u044c\u044e \u0422\u0438\u0442\u0430\u043d\u043e\u0432. \u041f\u0440\u0438\u043d\u0435\u0441\u044f \u0432 \u0436\u0435\u0440\u0442\u0432\u0443 \u0441\u0432\u043e\u044e \u0441\u0432\u043e\u0431\u043e\u0434\u0443, \u0447\u0435\u043b\u043e\u0432\u0435\u0447\u0435\u0441\u0442\u0432\u043e \u0443\u043a\u0440\u044b\u043b\u043e\u0441\u044c \u0432 \u043e\u0431\u043d\u0435\u0441\u0435\u043d\u043d\u044b\u0445 \u0432\u044b\u0441\u043e\u043a\u0438\u043c\u0438 \u0441\u0442\u0435\u043d\u0430\u043c\u0438 \u0433\u043e\u0440\u043e\u0434\u0430\u0445, \u0432 \u043d\u0430\u0434\u0435\u0436\u0434\u0435 \u043e\u0431\u0435\u0437\u043e\u043f\u0430\u0441\u0438\u0442\u044c \u0432\u044b\u0436\u0438\u0432\u0448\u0438\u0445. \u041d\u043e \u0432 \u043e\u0434\u0438\u043d \u0441\u0442\u0440\u0430\u0448\u043d\u044b\u0439 \u0434\u0435\u043d\u044c \u043f\u043e\u044f\u0432\u0438\u043b\u0441\u044f \u043a\u043e\u043b\u043e\u0441\u0441\u0430\u043b\u044c\u043d\u044b\u0439 \u0422\u0438\u0442\u0430\u043d, \u043f\u0440\u0435\u0432\u043e\u0441\u0445\u043e\u0434\u044f\u0449\u0438\u0439 \u0440\u0430\u0437\u043c\u0435\u0440\u0430\u043c\u0438 \u0434\u0430\u0436\u0435 \u0433\u043e\u0440\u043e\u0434\u0441\u043a\u0438\u0435 \u0441\u0442\u0435\u043d\u044b. \u0418 \u0445\u0440\u0443\u043f\u043a\u0430\u044f \u043d\u0430\u0434\u0435\u0436\u0434\u0430 \u0440\u0430\u0441\u0441\u044b\u043f\u0430\u043b\u0430\u0441\u044c \u0432 \u043f\u0440\u0430\u0445. \u0412\u043d\u043e\u0432\u044c \u043d\u0430\u0447\u0430\u043b\u0430\u0441\u044c \u043e\u0442\u0447\u0430\u044f\u043d\u043d\u0430\u044f \u0431\u0438\u0442\u0432\u0430 \u0437\u0430 \u0432\u044b\u0436\u0438\u0432\u0430\u043d\u0438\u0435.",
            "genres": [
                {
                    "id": 1,
                    "name": "\u0434\u0440\u0430\u043a\u0438"
                },
                {
                    "id": 2,
                    "name": "\u0440\u043e\u043c\u0430\u043d\u0442\u0438\u043a\u0430"
                }
            ],
            "id": 1,
            "main_poster": {
                "large": "https://kanwoo.ru/uploads/manga/1/2bd44990-fc0a-4207-95d9-83ebc29872b6.jpg",
                "medium": "https://kanwoo.ru/uploads/manga/1/9361da49-490c-4cb1-9253-09a8a0c83e16.jpg",
                "original": "https://kanwoo.ru/uploads/manga/1/cefc3700-b658-4b48-b479-6d0f1c015cc0.jpg",
                "small": "https://kanwoo.ru/uploads/manga/1/5fa2525d-bd2c-406a-88e4-880325ce29b4.jpg",
                "thumbnail": "https://kanwoo.ru/uploads/manga/1/c3a413e0-fe44-495e-8e57-70209ff881b9.jpg",
                "uuid": "4ee33a5c-411d-4662-9892-22315bff27a5"
            },
            "name": "\u0410\u0442\u0430\u043a\u0430 \u0442\u0438\u0442\u0430\u043d\u043e\u0432",
            "name_translations": [
                {
                    "lang": "en",
                    "name": "Attack on titan"
                },
                {
                    "lang": "jp",
                    "name": "\u9032\u6483\u306e\u5de8\u4eba"
                }
            ],
            "permissions": {},
            "posters": [
                {
                    "large": "https://kanwoo.ru/uploads/manga/1/2bd44990-fc0a-4207-95d9-83ebc29872b6.jpg",
                    "medium": "https://kanwoo.ru/uploads/manga/1/9361da49-490c-4cb1-9253-09a8a0c83e16.jpg",
                    "original": "https://kanwoo.ru/uploads/manga/1/cefc3700-b658-4b48-b479-6d0f1c015cc0.jpg",
                    "small": "https://kanwoo.ru/uploads/manga/1/5fa2525d-bd2c-406a-88e4-880325ce29b4.jpg",
                    "thumbnail": "https://kanwoo.ru/uploads/manga/1/c3a413e0-fe44-495e-8e57-70209ff881b9.jpg",
                    "uuid": "4ee33a5c-411d-4662-9892-22315bff27a5"
                }
            ],
            "publishers": [
                {
                    "created_at": "2025-06-20T18:42:50.993032Z",
                    "email": "ivanvasilev345@yandex.ru",
                    "id": 5,
                    "login": "dogman_0121",
                    "notifications_count": 0,
                    "role": 1,
                    "subscribed": null,
                    "subscribers_count": 0
                },
                {
                    "created_at": "2025-06-20T21:43:47.742188Z",
                    "email": "halz1161@yandex.ru",
                    "id": 6,
                    "login": "halz3",
                    "notifications_count": 2,
                    "role": 1,
                    "subscribed": null,
                    "subscribers_count": 1
                }
            ],
            "rating": 10.0,
            "rating_count": 2,
            "saves": 0,
            "status": {
                "id": 4,
                "name": "\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d"
            },
            "translations": [
                {
                    "chapters_count": 2,
                    "id": 2,
                    "permissions": {},
                    "translator": {
                        "about": "\u0423\u043c\u0431\u0430\u043c\u0431\u044d, \u0432\u043f\u0435\u0440\u0435\u0434 \u043a \u043f\u043e\u0431\u0435\u0434\u0435!!!",
                        "avatar": "https://kanwoo.ru/uploads/user/1/a3fbd07e-ed83-4c4e-b1ca-bd56b26c4e57.jpg",
                        "created_at": "2025-03-23T13:11:04.179593Z",
                        "email": "vasilevib@yandex.ru",
                        "id": 1,
                        "login": "ivanzolo2004",
                        "notifications_count": 0,
                        "role": 1,
                        "subscribed": null,
                        "subscribers_count": 2
                    },
                    "translator_type": "user"
                }
            ],
            "type": {
                "id": 2,
                "name": "\u043c\u0430\u043d\u0433\u0430"
            },
            "user_rating": null,
            "views": 1276,
            "year": 2009
        }]
    }
]

export const mockList = mockLists[0];