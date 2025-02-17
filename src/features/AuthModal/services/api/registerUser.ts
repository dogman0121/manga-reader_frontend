const registerUser = async (login: string, email: string, password: string) => {
    const response = await fetch("http://kanwoo.ru/api/user/register", {
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