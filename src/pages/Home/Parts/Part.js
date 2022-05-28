import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import buy from '../../../images/svg/buy.svg';

const Part = ({ part }) => {
    // const navigate = useNavigate();
    const { _id, name, img, description, minOrder, available, price } = part;
    return (
        <div class="card-compact w-full bg-base-100 shadow-xl rounded-2xl">
            <figure className='h-60 flex justify-center'><img className='rounded-t-2xl h-full object-cover' src={img} alt={name} /></figure>
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <div className='flex'>
                    <div class="flex w-full lg:flex-row">
                        <div className='w-60'><p>{description}</p></div>
                        <div class="divider divider-horizontal mx-0 px-0"></div>
                        <div className='w-40'>
                            <p><span className='text-black font-bold'>Minimum Order: </span>{minOrder}</p>
                            <p><span className='text-black font-bold'>Available: </span>{available}</p>
                            <p><span className='text-black font-bold'>Price: </span>${price}/p</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-actions justify-end m-2">
                <Link to={`service/${_id}`} class="btn btn-primary hover:bg-white hover:text-black text-white font-bold">Place Order <img width='25px' className='mb-1 ml-1' src={buy} alt="" /></Link>
                {/* <button class="btn btn-primary hover:bg-white hover:text-black text-white font-bold">Place Order */}
                {/* <img width='25px' className='mb-1 ml-1' src={buy} alt="" /> */}
                {/* </button> */}
            </div>
        </div >
    );
};

export default Part;