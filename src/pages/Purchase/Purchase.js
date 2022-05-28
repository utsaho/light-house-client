import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import privateAxios from '../../api/privateAxios';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
const Purchase = () => {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const [service, setService] = useState([]);
    useEffect(() => {
        const run = async () => {
            const { data } = await privateAxios.get(`http://localhost:5000/service/${id}`);
            setService(data);
        }
        run();
    }, [id]);
    if (loading) {
        return <Loading />;
    }
    const { displayName, email } = user;
    const { name, img, description, minOrder, available, price } = service;
    return (
        <div>
            <h2 className="text-3xl">{name} </h2>
        </div>
    );
};

export default Purchase;