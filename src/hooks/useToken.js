import { useState } from "react";

const useToken = (email) => {
    const [token, setToken] = useState('');
    if (email) {
        fetch(`http://localhost:5000/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            setToken(data.token);
            localStorage.setItem('accessToken', data.token);
        });
        return token;
    }
}

export default useToken;