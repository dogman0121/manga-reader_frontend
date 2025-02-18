import FetchApi from "../../../../services/api/FetchApi";

const registerUser = async (login: string, email: string, password: string) => {
    const response = await FetchApi("http://kanwoo.ru/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                login,
                email,
                password
            }
        )
    });

    return response.json();
}

export default registerUser;