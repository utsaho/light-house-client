import React, { useEffect, useRef, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Navbar from '../Home/Navbar';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const token = useToken(user?.user?.email);
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    // const emailRef = useRef();
    // const [emailChange, setEmailChange] = useState('');

    const formSubmit = async (data) => {
        await signInWithEmailAndPassword(data.email, data.password);
        reset();
    }
    useEffect(() => {
        if (user?.user) {
            toast.success(`Welcome Back! ${user?.user?.displayName}`)
        }
    }, [user]);

    if (loading || sending) {
        return <Loading></Loading>
    }
    if (token) {
        return <Navigate to={from} state={{ from: location }} />
    }

    return (
        <div>
            <Navbar></Navbar>
            <PageTitle title='Login' />
            <div className="" style={{ background: 'linear-gradient(to right, rgb(58,117,183), rgb(118,80,175))' }}>
                <div className="hero min-h-screen flex justify-center items-center">
                    <div className="rounded-lg flex-shrink-0 lg:max-w-lg w-96 shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(formSubmit)}>
                            <h2 className="text-2xl text-center uppercase text-purple-700 font-bold">Login here</h2>
                            <div className="form-control my-0 py-0">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className={`input input-bordered ${errors.email ? 'input-error' : ''}`} {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    }
                                })} />
                                <label className="label my-0 py-0">
                                    {errors?.email?.type === 'required' && <span className="label">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className={`input input-bordered ${errors.password ? 'input-error' : ''}`} {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    }
                                })} />
                                <label className="label my-0 py-0">
                                    {errors?.password?.type === 'required' && <span className="label">{errors.password.message}</span>}
                                </label>
                                <label className="label font-bold mb-0 pb-0">
                                    <span onClick={() => {
                                        sendPasswordResetEmail(getValues()?.email);
                                        toast.info(`Please Check you email: ${getValues()?.email}`)
                                    }} className="label-text-alt cursor-pointer link-hover">Forgot password?</span>
                                </label>
                            </div>
                            <div className="form-control">
                                {error?.message.split('/')[1].split(')')[0] && <span className='text-red-700 mt-0'>{error?.message.split('/')[1].split(')')[0]}</span>}
                                <button className="btn btn-primary text-white" style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }}>Login</button>
                            </div>
                            <span>Don't have an account? <Link to='/register' className='text-green-600 font-bold'>Sign up</Link> </span>
                            <SocialLogin />
                            {/* <div className="divider font-bold">OR</div>
                            <div className='mx-auto'>
                                <button className='btn bg-slate-200 hover:bg-slate-300 border-none  text-black'><img width='30px' src={googleSVG} alt="" /><span className='ml-2'>Continue with google</span></button>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;