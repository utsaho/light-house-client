import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import privateAxios from '../../api/privateAxios';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import Navbar from '../Home/Navbar';
import order_now from '../../images/svg/order_now.svg';
import { useForm } from 'react-hook-form';
import Part from '../Home/Parts/Part';
import ScrollButton from '../../components/ScrollButton';
import Footer from '../Shared/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import PageTitle from '../Shared/PageTitle';

/**
 * TODO:
 * ! 1. Dynamic rating
 * 
 * 
*/


const Purchase = () => {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const [service, setService] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [services, setServices] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { isLoading, refetch } = useQuery(['purchaseProduct', submit, id], async () => await privateAxios.get(`http://localhost:5000/service/${id}`).then(res => setService(res?.data)));

    //* Also fetch
    useEffect(() => {
        fetch(`http://localhost:5000/services/${id}`).then(res => res.json()).then(data => {
            const temp = data.filter(d => d._id !== id);
            setServices(temp);
        });
    }, [id]);

    const { displayName, email } = user;
    const { name, img, description, minOrder, available, price } = service;
    const toDay = `${new Date().toLocaleDateString().split('/')[2]}-${parseInt(new Date().toLocaleDateString().split('/')[0]) < 10 ? ('0' + new Date().toLocaleDateString().split('/')[0]) : new Date().toLocaleDateString().split('/')[0]}-${parseInt(new Date().toLocaleDateString().split('/')[1]) < 10 ? ('0' + new Date().toLocaleDateString().split('/')[1]) : new Date().toLocaleDateString().split('/')[1]}`;

    const formSubmit = async (data) => {
        data.name = displayName;
        data.email = email;
        data.productId = id;
        data.productName = name;
        data.img = img;
        data.price = data.quantity * price;
        data.date = toDay;
        data.time = new Date().toLocaleTimeString();
        data.status = 'unpaid';
        // console.log(data);

        await privateAxios.post('http://localhost:5000/postOrder', data).then(res => {
            console.log(res);
            if (res.data.insertedId) {
                toast.success('Order placed successfully. Please check you orders');
            }
            else {
                toast.error('Order Unavailable :(');
            }
        });
        reset();
        refetch();
        setSubmit(!submit);
    }

    if (loading || isLoading) {
        return <Loading />;
    }
    return (
        <div className='relative'>
            <PageTitle title='Purchase' />
            <ScrollButton />
            <Navbar />
            <div /* Selected Product */ className='px-12 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
                <div /* Product Picture */ className='w-60 h-fit sm:mx-auto shadow-2xl shadow-purple-300'>
                    <img src={img} alt="" />
                </div>

                <div /* Product Details */ className='w-auto mt-5 pr-5'>
                    <h2 className="text-3xl">{name}</h2>
                    <div className='flex items-center'>
                        <div /* Rating */ className="w-32 rating rating-lg rating-half">
                            <input type="radio" name="rating-10" className="rating-hidden" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                            <input type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />




                        </div>

                        <div /* is-Available? */ className=' ml-3 font-bold' >
                            {available ? <span className='text-green-600'>In Stock</span> : <span className='text-red-500'>Out of stock</span>}
                        </div>
                    </div>
                    <div /* Details */ className=''>
                        <h2 className="text-xl font-bold">About This Item: </h2>
                        <p>{description}</p> <br />
                        <p><span className='font-bold text-slate-500'>Minimum Order: </span> {minOrder}</p>
                        <p><span className='font-bold text-slate-500'>Available: </span>{available}</p>
                        <p><span className='font-bold text-slate-500'>Price: </span>${price}/count</p>
                    </div>

                </div>

                <div /* Buy corner */ className="flex-shrink-0 w-full max-w-sm shadow-2xl shadow-purple-100 border border-orange-500 bg-base-100 rounded-2xl mt-5">
                    {/* Name */}
                    <form className="card-body" onSubmit={handleSubmit(formSubmit)}>
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className="label-text mr-2">Name: </span>
                            <input type="text" value={displayName} className="input input-bordered" readOnly disabled {...register('name')} />
                        </div>
                        {/* Email */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className="label-text mr-2">Email: </span>
                            <input type="text" value={email} className="input input-bordered" readOnly disabled {...register('email')} />
                        </div>
                        {/* Address */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className="label-text mr-2">Address: </span>
                            <input type="text" placeholder="Enter you address" className={`input input-bordered ${errors.address ? 'input-error' : ''}`} {...register('address', { required: { value: true, message: 'Address is required' } })} />
                        </div>
                        {/* Phone number */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className="label-text mr-2">Phone: </span>
                            <input type="number" placeholder="Enter phone number" className={`input input-bordered ${errors.phone ? 'input-error' : ''}`} {...register('phone', { required: { value: true, message: 'Phone is required' } })} />
                        </div>
                        {/* Quantity */}
                        <div className="form-control flex flex-row mx-auto items-center">
                            <span className="label-text mr-2">Qty: </span>
                            <input type="number" className={`input input-bordered ${errors.quantity ? 'input-error' : ''}`} {...register('quantity', { required: { value: true, message: 'Quantity is required' } })} min={minOrder} max={available} defaultValue={minOrder} />
                        </div>
                        <div className="form-control mt-6">
                            <button className={`btn btn-primary text-white ${available < minOrder && 'btn-disabled'} `} style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }}>Place order <img width='25px' className='mb-1 ml-2' src={order_now} alt="" /></button>

                            {(errors?.address?.type === 'required' && <span className='text-red-700 ml-5'>{errors.address.message}</span>) || (errors?.phone?.type === 'required' && <span className='text-red-700 ml-5'>{errors.phone.message}</span>) || (errors?.quantity?.type === 'required' && <span className='text-red-700 ml-5'>{errors.quantity.message}</span>) || (available < minOrder && <span className='font-bold text-red-700'>Please wait until we add more qty</span>)}
                        </div>
                    </form>
                </div>

            </div>

            <div /* See also */ className='px-12 mt-10'>
                <div /* divider */ className='divider'><span className='text-3xl font-bold'>See also</span></div>

                <div>
                    <div className='grid lg:grid-cols-3 gap-4  md:grid-cols-2 grid-cols-1'>
                        {
                            services.map(part => <Part key={part._id} part={part} />)
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Purchase;