import { useEffect, useState } from "react";
import { saveAccessToken, saveRefreshToken } from "../../../utils/token";
import { authService } from "../services/api/authService";
import Message from "./Message";

function Verify() {
    enum ERROR {
        OK,
        TOKEN_USED,
        TOKEN_EXPIRED
    }
    const [error, setError] = useState<ERROR>(ERROR.OK);

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
                    else {
                        if (error.token == "Token already user")
                            setError(ERROR.TOKEN_USED)
                    }
                })
                .then(() => {
                    document.location.href = "https://kanwoo.ru/";
                })
        }

        return () => {};
    }, []);

    return (
        <>
            {error == ERROR.TOKEN_USED && (
                <Message 
                    title="Подтверждение почты"
                    information="Данная ссылка уже была использована"
                />
            )}
        </>
    )
}

export default Verify;