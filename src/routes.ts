// src/constants/routes.ts
export enum AppRoutes {
    HOME = '/',
    CATALOG = '/catalog',
    TITLE = '/manga',
    COMMENT = '/comments',
    USER = '/users',
    POST = '/posts',
    SETTINGS = '/settings',
    TEAM = '/teams',
    AUTH = '/auth',
    NOTIFICATIONS = '/notifications/*',
    NOT_FOUND = '*'
}

export enum AuthRoutes {
    LOGIN = `${AppRoutes.AUTH}/login`,
    REGISTER = `${AppRoutes.AUTH}/register`,
    RECOVERY = `${AppRoutes.AUTH}/recovery`,
    VERIFY = `${AppRoutes.AUTH}/verify`,
    FORGOT = `${AppRoutes.AUTH}/forgot`
}

export enum TitleRoutes {
    ADD = `${AppRoutes.TITLE}/add`,
    INDEX = `${AppRoutes.TITLE}/:titleId`,
    EDIT = `${AppRoutes.TITLE}/:titleId/edit`,
}

export enum ChapterRoutes {
    INDEX = `${TitleRoutes.INDEX}/chapters/:chapterId`,
    ADD = `${TitleRoutes.INDEX}/chapters/add`,
    EDIT = `${TitleRoutes.INDEX}/chapters/:chapterId/edit`
}

export enum UserRoutes {
    INDEX = `${AppRoutes.USER}/:userId`,
    SETTINGS = `${AppRoutes.USER}/:userId/settings`
}

export enum CommentRoutes {
    INDEX = `${AppRoutes.COMMENT}/:commentId`,
}

export enum TeamRoutes {
    INDEX = `${AppRoutes.TEAM}/:teamId`,
    ADD = `${AppRoutes.TEAM}/add`,
    EDIT = `${AppRoutes.TEAM}/:teamId/edit`
}
  
/**
 * Заменяет параметры в пути на реальные значения
 * @param route Путь из AppRoutes
 * @param params Объект с параметрами { [key]: value }
 * @example
 * // Возвращает "/profile/123"
 * replaceRouteParams(AppRoutes.PROFILE, { userId: '123' })
 */
export function replaceRouteParams(
    route: AppRoutes,
    params: Record<string, string | number>
    ): string {
    let result = route.toString();

    for (const [key, value] of Object.entries(params)) {
        result = result.replace(`:${key}`, encodeURIComponent(value.toString()));
    }

    return result;
}

/**
 * Генерирует путь с query-параметрами
 * @param basePath Базовый путь (может содержать :параметры)
 * @param params Параметры пути
 * @param query Query-параметры
 * @example
 * // Возвращает "/post/456?from=home&sort=new"
 * generatePath(AppRoutes.POST, { postId: 456 }, { from: 'home', sort: 'new' })
 */
export function generatePath(
    basePath: AppRoutes | string,
    params?: Record<string, string | number>,
    query?: Record<string, string | number>
    ): string {
    // Заменяем path-параметры
    let path = params ? replaceRouteParams(basePath as AppRoutes, params) : basePath.toString();

    // Добавляем query-параметры
    if (query) {
        const queryString = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== null) {
                queryString.append(key, value.toString());
            }
        }
        path += `?${queryString.toString()}`;
    }

    return path;
}