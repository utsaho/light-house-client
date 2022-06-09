import React, { useEffect, useRef, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import privateAxios from '../../api/privateAxios';
import auth from '../../firebase.init';
import editButton from '../../images/svg/edit.svg';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    //* Getting user data from cloud : mongodb

    const {data: cloudUser,isLoading, refetch}  = useQuery(['tempp'], async() => await privateAxios.get(`http://localhost:5000/getProfile/${user?.email}`).then(res => res.data?.user));

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
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
    const [change, setChange] = useState(true);
    

    const toDay = `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()}-${new Date().getDay() < 10 ? '0' + new Date().getDay() : new Date().getDay()}`;

    if (loading || updating || isLoading) {
        return <Loading />
    }

    const handleUpdate = async (data) => {
        const values = getValues();
        values.name = values.name || cloudUser?.name || user?.displayName;
        values.address = values.address || cloudUser?.address;
        values.school = values.school || cloudUser?.school;
        values.college = values.college || cloudUser?.college;
        values.phone = values.phone || cloudUser?.phone;
        values.github = values.github || cloudUser?.github;
        values.facebook = values.facebook || cloudUser?.facebook;
        values.linkdin = values.linkdin || cloudUser?.linkdin;
        values.birthDate = values.birthDate || cloudUser?.birthDate;

        await privateAxios.post(`http://localhost:5000/updateProfile/${user?.email}`, values).then(res=>{
            if(res.data?.modifiedCount){
                toast.success('Congratulations ,Your profile has been updated!');
            }
            else{
                toast.error('Something went worng while updating :(');
            }
        });
        await updateProfile({displayName:values.name});
        refetch();
    }
    
    return (
        <div className='h-full w-full grid place-items-center' style={{ background: 'linear-gradient(to right, red, black)' }}>
            <PageTitle title='Profile' />
            <form className='rounded-lg bg-white px-12 py-10' onSubmit={handleSubmit(handleUpdate)} onChange={()=>setChange(false)}>
                <h2 className="text-2xl text-center font-bold pb-5">Update Profile</h2>

                <div className='w-full lg:flex md:flex-none sm:flex-none'>
                    {/* //* First section */}
                    <div className='w-full'>
                        {/*//* Name */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className='mr-2'>Name: </span>
                            <input type="text" className='input input-bordered' {...register('name')} disabled={nameChange} contentEditable={!nameChange}  defaultValue={user?.displayName}/>
                            <label className='btn btn-ghost hover:bg-white mr-3 ml-3 p-0' onClick={() => setNameChange(!nameChange)}><img src={editButton} width='25px' height='25px' alt="" /></label>
                        </div>

                        {/*//* Email */}
                        <div className="form-control flex flex-row mx-auto items-center mt-2">
                            <span className='mr-2'>Email:&#10240;</span>
                            <input type="email" className='input input-bordered' {...register('email')} disabled={true} defaultValue={user?.email} />
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
                    <button className={`btn text-white font-bold ${change && 'btn-disabled'}`} style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }} >Update</button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;