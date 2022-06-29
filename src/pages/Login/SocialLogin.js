import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import googleSVG from '../../images/svg/google.svg';
import Loading from '../Shared/Loading';
const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const token = useToken(user?.user?.email);
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    useEffect(() => {
        if (user?.user) {
            toast.success(`Hello ${user?.user?.displayName ? user?.user?.displayName : user?.user?.email}, You are welcomed`);
        }
    }, [user]);

    if (token) {
        return <Navigate to={from} state={{ from: location }} />
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="divider font-bold">OR</div>
            <div className='flex justify-center items-center'>
                <button onClick={async () => await signInWithGoogle()} className='btn bg-slate-200 hover:bg-slate-300 border-none  text-black'><img width='30px' src={googleSVG} alt="" /><span className='ml-2'>Continue with google</span></button>
            </div>
        </div>
    );
};

export default SocialLogin;