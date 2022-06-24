import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import privateAxios from '../../../api/privateAxios';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';
import { toast } from 'react-toastify';

const AddNewProduct = () => {
    const [user, loading] = useAuthState(auth);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
    const { data: admin, isLoading } = useQuery(['imageStorageKey', user], async () => await privateAxios.get(`http://localhost:5000/imageStorageKey/${user.email}`));
    const submittedProduct = async (data) => {
        const formData = new FormData();
        formData.append('image', data?.img[0]);
        await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${admin.data?.imageStorageKey}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            if (result.success) {
                data.img = result?.data?.display_url;
            }
            else {
                data.img = '';
            }
        });
        await privateAxios.post(`http://localhost:5000/newProduct/${user?.email}`, data).then(res => {
            if (res.data?.insertedId) {
                toast.success('Product added successfully!');
                reset();
            }
            else {
                toast.error('Something went wrong :(');
            }
        });
    }
    if (loading || isLoading) {
        return <Loading />;
    }
    return (
        <div className='h-full w-full grid place-items-center' style={{ background: 'linear-gradient(to right, red, black)' }}>
            <PageTitle title='Profile' />
            <form className='rounded-lg bg-white px-12 py-10' onSubmit={handleSubmit(submittedProduct)}>
                <h2 className="text-2xl text-center font-bold pb-5">Add New Product</h2>
                <div className='w-full lg:flex md:flex-none sm:flex-none'>
                    {/* //* First section */}
                    <div className='w-full'>
                        {/*//* Name */}
                        <div className="form-control text-left mx-auto">
                            <h2 className='ml-2 mb-1'>Name </h2>
                            <input type="text" placeholder='Product Name' className='input input-bordered' {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Product must have a name'
                                }
                            })} />
                            {errors?.name?.type === 'required' && <span className='text-red-600 ml-2'>{errors.name?.message}</span>}
                        </div>

                        {/*//* image */}
                        <div className="form-control mx-auto mt-2">
                            <h2 className='ml-2 mb-1'>Upload Photo</h2>
                            <input type="file" className='input' {...register('img', {
                                required: {
                                    value: true,
                                    message: 'Enter product photo'
                                }
                            })} />
                            {errors?.img?.type === 'required' && <span className='text-red-600 ml-2'>{errors.img?.message}</span>}
                        </div>

                        {/*//* description */}
                        <div className="form-control mx-auto mt-2">
                            <h2 className='ml-2 mb-1'>Description</h2>
                            <textarea placeholder='Enter short description' className='input input-bordered' name="" id="" cols="30" rows="10" {...register('description', {
                                required: {
                                    value: true,
                                    message: 'Enter short description'
                                }
                            })} />
                            {errors?.description?.type === 'required' && <span className='text-red-600 ml-2'>{errors.description?.message}</span>}
                        </div>

                    </div>


                    <div className='w-full divider lg:divider-horizontal md:divider-vertical divider-vertical'></div>

                    {/* //* Second section */}
                    <div className="w-full">
                        {/* //* Minimum Order */}
                        <div className="form-control mx-auto">
                            <h2 className='ml-2 mb-1'>Minimum Order</h2>
                            <input type="number" placeholder='Minimum order' min={1} className='input input-bordered' {...register('minOrder', {
                                required: {
                                    value: true,
                                    message: 'Minimum order is required'
                                }
                            })} />
                            {errors?.minOrder?.type === 'required' && <span className='text-red-600 ml-2'>{errors.minOrder?.message}</span>}
                        </div>

                        {/* //* Quantity */}
                        <div className="form-control mx-auto my-2">
                            <h2 className='ml-2 mb-1'>Quantity</h2>
                            <input type="number" placeholder='Available products' min={1} className='input input-bordered' {...register('available', {
                                required: {
                                    value: true,
                                    message: 'Add at leat 1 product'
                                }
                            })} />
                            {errors?.available?.type === 'required' && <span className='text-red-600 ml-2'>{errors.available?.message}</span>}
                        </div>

                        {/* //* price */}
                        <div className="form-control mx-auto my-2">
                            <h2 className='ml-2'>Price</h2>
                            <input type="number" placeholder='Enter price' min={1} className='input input-bordered' {...register('price', {
                                required: {
                                    value: true,
                                    message: 'A product must have a price'
                                }
                            })} />
                            {errors?.price?.type === 'required' && <span className='text-red-600 ml-2'>{errors.price?.message}</span>}
                        </div>
                    </div>


                </div>

                {/* //* Update label */}
                <div className='w-full flex justify-end mt-3'>
                    <button className={`btn text-white font-bold ${!admin.data?.imageStorageKey && 'btn-disabled'}`} style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }} >Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewProduct;