import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const [token] = useToken(user);
    const check = useRef();
    useToken(user);
    const from = '/';


    if (token) {
        navigate(from, { replace: true })

    }

    const checked = () => {
        setAgree(check.current.checked);
    }

    const formSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({
            displayName: data.name
        })
        setAgree(false);
        reset();
    }
    useEffect(() => {
        if (user) {
            console.log(user);
            toast.success(`Hello ${user?.user?.displayName ? user?.user?.displayName : user?.user?.email}, You are profile has been created`);
        }
    }, [user]);
    if (loading || updating) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="" style={{ background: 'linear-gradient(to right, rgb(58,117,183), rgb(118,80,175))' }}>
                <div className="hero min-h-screen flex justify-center items-center">
                    <div className="rounded-lg flex-shrink-0 lg:max-w-lg w-96 shadow-2xl bg-base-100 my-0 py-0">
                        <form className="card-body" onSubmit={handleSubmit(formSubmit)}>
                            <h2 className="text-2xl text-center uppercase text-purple-700 font-bold">Register</h2>

                            <div className="form-control">
                                <label className="label my-0 py-0">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your name" className="input input-bordered" {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'You must provide your name!',
                                    }
                                })} />
                                {errors?.name?.type === 'required' && <span className='text-red-500'>{errors.name?.message}</span>}
                            </div>


                            <div className="form-control">
                                <label className="label my-0 py-0">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Your email" className={`input input-bordered ${errors.email ? 'input-error' : ''}`} {...register('email', { required: true })} />
                                {errors.email && <span className='text-red-500'>email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label my-0 py-0">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Password" className={`input input-bordered ${errors.password ? 'input-error' : ''}`} {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                        message: 'Atleast 6 character 1 number and 1 character'
                                    }
                                })} />
                                <label className='label my-0 py-0'>
                                    {errors?.password?.type === 'required' && <span className='text-red-500'>{errors.password?.message}</span>}
                                    {errors?.password?.type === 'pattern' && <span className='text-red-500'>{errors.password?.message}</span>}
                                </label>
                            </div>


                            <div className="form-control">
                                <div className="flex">
                                    <div className='mt-0.5'>
                                        <input type="checkbox" className="checkbox checkbox-accent checkbox-sm" ref={check} id='policy' onClick={() => checked()} />
                                    </div>
                                    <div className=''>
                                        <span className='ml-2'>Accept <span className='text-blue-500'>terms and conditions</span></span>
                                    </div>
                                </div>
                                {error?.message.split('/')[1].split(')')[0] && <span className='text-red-700 mt-0'>{error?.message.split('/')[1].split(')')[0]}</span>}
                                <button className={`btn btn-primary text-white mt-1 ${!agree ? 'btn-disabled' : ''}`} style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }}>Register</button>
                            </div>
                            <span>Already have an account? <Link to='/login' className='text-green-600 font-bold'>Login here</Link> </span>

                            {/* Social Login */}
                            <SocialLogin></SocialLogin>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;