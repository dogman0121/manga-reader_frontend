import FetchApi from "../../../../services/api/FetchApi";

const verifyUser = async (token: string) => {
    const response = await FetchApi("https://kanwoo.ru/api/user/verify?t=" + token, {
        method: "POST",
    });

    const json = await response.json();

    return json;
}

export default verifyUser;