// import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import privateAxios from '../../api/privateAxios';
import auth from '../../firebase.init';
import editButton from '../../images/svg/edit.svg';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const MyProfile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user, loading] = useAuthState(auth);
    const [cloudUser, setCloudUser] = useState({});
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const [nameChange, setNameChange] = useState(true);
    const [facebookChange, setFacebookChange] = useState(true);
    const [githubChange, setGithubChange] = useState(true);
    const [linkdinChange, setLinkdinChange] = useState(true);
    const [schoolChange, setSchoolChange] = useState(true);
    const [phoneChange, setPhoneChange] = useState(true);
    const [collegeChange, setCollegeChange] = useState(true);
    const [locationChange, setLocationChange] = useState(true);
    const [birthDateChange, setBirthDateChange] = useState(true);

    const toDay = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()}-${new Date().getDay() < 10 ? '0' + new Date().getDay() : new Date().getDay()}`;

    //* Getting user data from cloud : mongodb
    useEffect(() => {
        const run = async () => {
            const email = user?.email;
            await privateAxios.get(`http://localhost:5000/getProfile/${email}`).then(res => setCloudUser(res?.data?.user));
        }
        run().catch(console.dir);
    }, [user]);

    if (loading || updating) {
        return <Loading />
    }


    const handleUpdate = async (data) => {
        console.log(data);
        data.email = user.email;
        updateProfile({ displayName: data?.name });
        await privateAxios.post('http://localhost:5000/updateProfile', data).then(res => console.log(res));
    }

    return (
        <div className='h-full w-full grid place-items-center' style={{ background: 'linear-gradient(to right, red, black)' }}>
            <PageTitle title='Profile' />
            <form className='rounded-lg bg-white px-12 py-10' onSubmit={handleSubmit(handleUpdate)}>
                <h2 className="text-2xl text-center font-bold pb-5">Update Profile</h2>

                <div className='w-full lg:flex md:flex-none sm:flex-none'>
                    {/* //* First section */}
                    <div className='w-full'>
                        {/*//* Name */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Name: </span>
                            <input type="text" className='input input-bordered' {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Name can\'t be empty',
                                }
                            })} disabled={nameChange} contentEditable={!nameChange} defaultValue={cloudUser?.name} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setNameChange(!nameChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/*//* Email */}
                        <div className="form-control flex flex-row mx-auto items-center mt-2">
                            <span className='mr-2'>Email:&#10240;</span>
                            <input type="email" defaultValue={user.email} className='input input-bordered' {...register('email')} disabled={true} />
                        </div>

                        {/*//* Address */}
                        <div className="form-control flex flex-row mx-auto items-center mt-2">
                            <span className='mr-2'>Address: </span>
                            <input type="text" defaultValue={cloudUser?.address} className='input input-bordered' {...register('address')} disabled={locationChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setLocationChange(!locationChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* School */}
                        <div className="form-control flex flex-row mx-auto items-center my-2">
                            <span className='mr-2'>School: </span>
                            <input type="text" defaultValue={cloudUser?.school} className='input input-bordered' {...register('school')} disabled={schoolChange} contentEditable={!schoolChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setSchoolChange(!schoolChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* College */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>College: </span>
                            <input type="text" defaultValue={cloudUser?.college} className='input input-bordered' {...register('college')} disabled={collegeChange} contentEditable={!collegeChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setCollegeChange(!collegeChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                    </div>


                    <div className='w-full divider lg:divider-horizontal md:divider-vertical divider-vertical'></div>

                    {/* //* Second section */}
                    <div className="w-full">
                        {/* //* Phone */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Phone: </span>
                            <input type="text" defaultValue={cloudUser?.phone} className='input input-bordered' {...register('phone')} disabled={phoneChange} contentEditable={!phoneChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setPhoneChange(!phoneChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* Github */}
                        <div className="form-control flex flex-row mx-auto items-center my-2">
                            <span className='mr-2'>github: </span>
                            <input type="text" defaultValue={cloudUser?.github} className='input input-bordered' {...register('github')} disabled={githubChange} contentEditable={!githubChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setGithubChange(!githubChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* facebook */}
                        <div className="form-control flex flex-row mx-auto items-center my-2">
                            <span className='mr-2'>Facebook: </span>
                            <input type="text" defaultValue={cloudUser?.facebook} className='input input-bordered' {...register('facebook')} disabled={facebookChange} contentEditable={!facebookChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setFacebookChange(!facebookChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* Linkdin */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Linkdin: </span>
                            <input type="text" defaultValue={cloudUser?.linkdin} className='input input-bordered' {...register('linkdin')} disabled={linkdinChange} contentEditable={!linkdinChange} />
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setLinkdinChange(!linkdinChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/* //* Date of Birth */}
                        <div className="form-control flex flex-row mx-auto items-center mt-2">
                            <span className='mr-2'>Birth Date: </span>
                            <input type="date" defaultValue={cloudUser?.birthDate} className='input input-bordered' {...register('birthDate')} disabled={birthDateChange} contentEditable={!birthDateChange} min='1971-12-17' max={toDay} />
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