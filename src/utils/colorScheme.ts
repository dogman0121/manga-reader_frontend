export const getColorScheme = () => {
    if (localStorage.getItem("color-scheme"))
        return localStorage.getItem("color-scheme");
    return "light";
}

export const setColorScheme = (theme: string) => {
    localStorage.setItem("color-scheme", theme);
    document.documentElement.dataset.colorScheme = theme;
}