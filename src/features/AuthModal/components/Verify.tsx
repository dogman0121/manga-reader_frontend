import { useEffect } from "react";
import verifyRegistration from "../services/api/verifyRegistration";
import { saveAccessToken, saveRefreshToken } from "../../../utils/token";

function Verify() {
    useEffect(() => {
        const urlParams = new URLSearchParams(document.location.search);
        
        const token = urlParams.get("t");

        if (token !== null){
            verifyRegistration(token)
                .then((json) => {
                    if (!json.msg) {
                        saveAccessToken(json.access_token);
                        saveRefreshToken(json.refresh_token);
                    }
                    else
                        document.location.href = "https://kanwoo.ru/";
                })
                .then(() => {
                    document.location.href = "https://kanwoo.ru/";
                })
        }

        return () => {};
    }, []);

    return (
        <>zxczxc</>
    )
}

export default Verify;