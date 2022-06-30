import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useToken = (email) => {
    const [token, setToken] = useState('');
    const [user, loading] = useAuthState(auth);
    if (email) {
        fetch(`https://guarded-wave-32524.herokuapp.com/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ photoURL: user?.photoURL })
        }).then(res => res.json()).then(data => {
            setToken(data.token);
            localStorage.setItem('accessToken', data.token);
        });
        return token;
    }
}

export default useToken;