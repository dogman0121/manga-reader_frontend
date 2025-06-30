export default function formatTimedelta(timeDelta: number) {
    let yearsEnd = {1: "год", 2: "года", 3: "лет"}
    let monthsEnd = {1: "месяц", 2: "месяца", 3: "месяцев"}
    let weeksEnd = {1: "неделя", 2: "недели", 3: "недель"}
    let daysEnd = {1: "день", 2: "дня", 3: "дней"}
    let hoursEnd = {1: "час", 2: "часа", 3: "часов"}
    let minutesEnd = {1: "минута", 2: "минуты", 3: "минут"}
    let secondsEnd = {1: "секунда", 2: "секунды", 3: "секунд"}

    let findEnd = (n: number) => {
        if ((n % 10 > 4) || (10 < n && n < 20) || (n % 10 === 0))
            return 3;
        else if (1 < n % 10 && n % 10 < 5)
            return 2;
        else
            return 1;
    }

    if (timeDelta / 31536000000 >= 1){ // Проверяем если прошел хотя бы год после публикации
        let years = Math.floor(timeDelta / 31536000000);
        return years.toString() + " " + yearsEnd[findEnd(years)];
    }
    else if (timeDelta / 2692000000 >= 1) { // Проверяем если прошел хотя бы месяц после публикации
        let months = Math.floor(timeDelta / 2692000000);
        return months.toString() + " " + monthsEnd[findEnd(months)];
    }
    else if (timeDelta / 604800000 >= 1) { // Проверяем если прошел хотя бы неделя после публикации
        let weeks = Math.floor(timeDelta / 604800000);
        return weeks.toString() + " " + weeksEnd[findEnd(weeks)];
    }
    else if (timeDelta / 86400000 >= 1) { // Проверяем если прошел хотя бы день после публикации
        let days = Math.floor(timeDelta / 86400000);
        return days.toString() + " " + daysEnd[findEnd(days)];
    }
    else if (timeDelta / 3600000 >= 1) { // Проверяем если прошел хотя бы час после публикации
        let hours = Math.floor(timeDelta / 3600000);
        return hours.toString() + " " + hoursEnd[findEnd(hours)];
    }
    else if (timeDelta / 60000 >= 1) { // Проверяем если прошел хотя бы минута после публикации
        let minutes = Math.floor(timeDelta / 60000);
        return minutes.toString() + " " + minutesEnd[findEnd(minutes)];
    }
    else { // Обрабатываем секунды
        let seconds = Math.floor(timeDelta / 1000);
        return seconds.toString() + " " + secondsEnd[findEnd(seconds)];
    }
}