import React, { useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import editButton from '../../images/svg/edit.svg';
import Loading from '../Shared/Loading';

const MyProfile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user, loading] = useAuthState(auth);
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const [nameChange, setNameChange] = useState(false);
    const [facebookChange, setFacebookChange] = useState(false);
    const [githubChange, setGithubChange] = useState(false);
    const [linkdinChange, setLinkdinChange] = useState(false);
    const [schoolChange, setSchoolChange] = useState(false);
    const [phoneChange, setPhoneChange] = useState(false);
    const [collegeChange, setCollegeChange] = useState(false);
    const [locationChange, setLocationChange] = useState(false);
    const [birthDateChange, setBirthDateChange] = useState(false);

    const toDay = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()}-${new Date().getDay() < 10 ? '0' + new Date().getDay() : new Date().getDay()}`;

    if (loading || updating) {
        return <Loading />
    }

    const handleUpdate = (data) => {
        console.log(toDay);
    }

    return (
        <div className='h-full w-full grid place-items-center' style={{ background: 'linear-gradient(to right, red, black)' }}>
            <form className='rounded-lg bg-white px-12 py-10' onSubmit={handleSubmit(handleUpdate)}>
                <h2 className="text-2xl text-center font-bold pb-5">Update Profile</h2>

                <div className='w-full lg:flex md:flex-none sm:flex-none'>
                    {/* //* First section */}
                    <div className='w-full'>
                        {/*//* Name */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Name: </span>
                            <input type="text" defaultValue={user.displayName} className='input input-bordered' {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Name can\'t be empty',
                                }
                            })} disabled={nameChange} contentEditable={!nameChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setNameChange(!nameChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/*//* Email */}
                        <div className="form-control flex flex-row mx-auto items-center mt-2">
                            <span className='mr-2'>Email: </span>
                            <input type="email" defaultValue={user.email} className='input input-bordered' {...register('email')} disabled={true} />
                            {/* <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setNameChange(!nameChange)}><img src={editButton} width='25px' height='25px' alt="" /></label> */}
                        </div>

                        {/*//* Address */}
                        <div className="form-control flex flex-row mx-auto items-center mt-2">
                            <span className='mr-2'>Address: </span>
                            <input type="text" className='input input-bordered' {...register('address')} disabled={locationChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setLocationChange(!locationChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* School */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>School: </span>
                            <input type="text" className='input input-bordered' {...register('school')} disabled={schoolChange} contentEditable={!schoolChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setSchoolChange(!schoolChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* College */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>College: </span>
                            <input type="text" className='input input-bordered' {...register('school')} disabled={collegeChange} contentEditable={!collegeChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setCollegeChange(!collegeChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                    </div>


                    <div className='w-full divider lg:divider-horizontal md:divider-vertical divider-vertical'></div>

                    {/* //* Second section */}
                    <div className="w-full">
                        {/* //* Phone */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Phone: </span>
                            <input type="text" className='input input-bordered' {...register('phone')} disabled={phoneChange} contentEditable={!phoneChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setPhoneChange(!phoneChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* Github */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>github: </span>
                            <input type="text" className='input input-bordered' {...register('github')} disabled={githubChange} contentEditable={!githubChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setGithubChange(!githubChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* facebook */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Facebook: </span>
                            <input type="text" className='input input-bordered' {...register('facebook')} disabled={facebookChange} contentEditable={!facebookChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setFacebookChange(!facebookChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* Linkdin */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Linkdin: </span>
                            <input type="text" className='input input-bordered' {...register('linkdin')} disabled={linkdinChange} contentEditable={!linkdinChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setLinkdinChange(!linkdinChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* Date of Birth */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Birth Date: </span>
                            <input type="date" className='input input-bordered' {...register('birthDate')} disabled={birthDateChange} contentEditable={!birthDateChange} defaultValue="2018-07-22" min='1971-12-17' max={toDay} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setBirthDateChange(!birthDateChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>
                    </div>


                </div>

                {/* //* Update label */}
                <div className='w-full flex justify-end'>
                    <button className='btn text-white font-bold' style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;