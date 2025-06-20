import { useEffect } from "react";
import { saveAccessToken, saveRefreshToken } from "../../../utils/token";
import { authService } from "../services/api/authService";

function Verify() {
    useEffect(() => {
        const urlParams = new URLSearchParams(document.location.search);
        
        const token = urlParams.get("t");

        if (token !== null){
            authService.verify(token)
                .then(({data, error}) => {
                    if (!error) {
                        saveAccessToken(data.access_token);
                        saveRefreshToken(data.refresh_token);
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
        <></>
    )
}

export default Verify;