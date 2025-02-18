import FetchApi from "../../../../services/api/FetchApi";

const loginUser = async (login: string, password: string) => {
    const response = await FetchApi("http://kanwoo.ru/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                login,
                password
            }
        )
    });

    return await response.json();
}

export default loginUser;