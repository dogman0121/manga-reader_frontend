import { useEffect } from "react";
import verifyUser from "../services/api/verifyUser";
import { saveAccessToken, saveRefreshToken } from "../../../utils/token";

function Verify() {
    useEffect(() => {
        const urlParams = new URLSearchParams(document.location.search);
        
        const token = urlParams.get("t");

        console.log(urlParams);

        if (token !== null){
            const sendVerificationToken = async(token: string) => {
                const json = await verifyUser(token);

                if (!json.msg) {
                    saveAccessToken(json.access_token);
                    saveRefreshToken(json.refresh_token);
                }
            }
            sendVerificationToken(token);
        }

        return () => {};
    }, []);

    return (
        <>zxczxc</>
    )
}

export default Verify;