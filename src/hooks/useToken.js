import { useEffect, useState } from "react";

const useToken = (user) => {
    const email = user?.email;
    const [token, setToken] = useState('');
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            }).then(res => res.json()).then(data => {
                setToken(data.token);
                localStorage.setItem('accessToken', data.token);
            });
        }
        else {
            setToken('');
        }
    }, [user, email]);
    return [token];
}

export default useToken;