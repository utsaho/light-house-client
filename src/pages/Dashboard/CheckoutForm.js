import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import privateAxios from '../../api/privateAxios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const CheckoutForm = () => {
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [payButtonClicked, setPayButtonClicked] = useState(true);
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { data: product, isLoading, refetch } = useQuery(['singleProduct', id], async () => await privateAxios.get(`http://localhost:5000/order/${id}`).then(res => res.data));

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const updateStatus = async () => {
            await privateAxios.patch(`http://localhost:5000/paid/${id}`).then(res => {
                console.log(res);
            });
        }
        if (transactionId) {
            updateStatus().catch(console.dir);
            setTransactionId(null);
            return <Navigate to='/ldkfjldf' />;
        }
    }, [transactionId]);

    if (isLoading || loading) {
        return <Loading />
    }

    const { price } = product;
    const run = async () => {
        await privateAxios.post('http://localhost:5000/create-payment-intent', { price }).then(res => setClientSecret(res.data?.clientSecret));
    }
    run().catch(console.dir);

    // if (transactionId) {
    //     console.log(transactionId);
    //     const updateStatus = async () => {
    //         await privateAxios.patch(`http://localhost:5000/paid/${id}`).then(res => {
    //             setTransactionId(null);
    //             console.log(res);
    //         });
    //         // await fetch(`http://localhost:5000/paid/${id}`).then(res => res.json()).then(data => console.log(data));
    //     }
    //     if (transactionId) updateStatus();
    // }

    const handleSubmit = async event => {
        event.preventDefault();
        setPayButtonClicked(false);
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        setCardError(error?.message || '');

        //* Confirming payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: product.name,
                        email: product.email,
                    },
                },
            },
        );
        setLoading(true);
        //! disable button after subbmission
        if (intentError) {
            console.log(price);
            setCardError(intentError?.message);
            setCardSuccess('');
            setTransactionId('');
        }
        else {
            setTransactionId(paymentIntent?.id.split('_')[1]);
            setCardError('');
            setCardSuccess('Congratulations! Payment is Completed.')
        }
        setLoading(false);

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-success mt-2' type="submit" disabled={!stripe || !clientSecret || !payButtonClicked}>
                Pay now
            </button>
            {cardError && <span className='text-red-500'> <br /> {cardError}</span>}
            {cardSuccess && <span className='text-green-500'> <br /> {cardSuccess}</span>}
            {transactionId && <span className='text-green-500'> <br />Transaction ID: <span className='text-black font-thin'>{transactionId}</span></span>}
        </form>
    );
};

export default CheckoutForm;