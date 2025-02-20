import FetchApi from "../../../../services/api/FetchApi";

const recoveryPassword = async (token: string, password: string) => {
    const response = await FetchApi("https://kanwoo.ru/api/user/recovery", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
            password
        })
    })

    return await response.json();
}

export default recoveryPassword;