export const getColorScheme = (): "dark" | "light" => {
    const colorScheme = localStorage.getItem("color-scheme")
    if (colorScheme === "dark" || colorScheme == "light")
        return colorScheme;
    return "light";
}

export const setColorScheme = (theme: string) => {
    localStorage.setItem("color-scheme", theme);
    document.documentElement.dataset.colorScheme = theme;
}