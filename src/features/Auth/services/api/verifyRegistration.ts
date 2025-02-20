import FetchApi from "../../../../services/api/FetchApi";

const verifyRegistration = async (token: string) => {
    const response = await FetchApi("https://kanwoo.ru/api/user/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
    });

    const json = await response.json();

    return json;
}

export default verifyRegistration;