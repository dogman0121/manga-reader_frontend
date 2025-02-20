import FetchApi from "../../../../services/api/FetchApi";


const getRecoveryMessage = async (email: string) => {
    const response = await FetchApi("https://kanwoo.ru/api/user/forgot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email
        })
    });

    return await response.json();
}

export default getRecoveryMessage;