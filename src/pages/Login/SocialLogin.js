import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import googleSVG from '../../images/svg/google.svg';
import Loading from '../Shared/Loading';
const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const [token] = useToken(user?.user);
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { replace: true });
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