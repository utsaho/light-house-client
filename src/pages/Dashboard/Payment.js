import React from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useQuery } from 'react-query';
import privateAxios from '../../api/privateAxios';
import Loading from '../Shared/Loading';
import paymentBackground from '../../images/background/paymentBackground.jpg';

const stripePromise = loadStripe('pk_test_51L29GTBwPwunktj52EEDURapShMmOAI5BD71BBNyPn3GhpAQVuRRCkphQNL8VHhKeC02u5iCHOrbisjJDzsOkaBo00dpsVrCps');

const Payment = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useQuery(['singleProduct', id], async () => await privateAxios.get(`http://localhost:5000/order/${id}`).then(res => res.data));
    // const { productName, quantity, price, img, address } = product;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col lg:flex-row md:flex-row sm:flex-col justify-center items-center h-full' style={{ backgroundImage: `url(${paymentBackground})` }} >
            <div className="card w-96 bg-base-100 shadow-xl h-fit">
                <div className="card-body">
                    <h2 className="card-title">{product.productName}</h2>
                    <div className="flex">
                        <div className=''>
                            <p><span className='font-bold'>Address:</span> {product.address}</p>
                            <p className='my-1'><span className='font-bold'>Quantity:</span> {product.quantity}</p>
                            <p><span className='font-bold'>Price:</span> {product.price}</p>
                        </div>
                        <div className='divider divider-horizontal'></div>

                        <div className="avatar">
                            <div className="w-24 rounded-xl h-fit">
                                <img src={product.img} alt='Product' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="rounded-2xl w-96 bg-base-100 shadow-xl h-fit ml-0 lg:ml-10 md:ml-10 mt-10 lg:mt-0 md:mt-0">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm id={id} product={product} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;