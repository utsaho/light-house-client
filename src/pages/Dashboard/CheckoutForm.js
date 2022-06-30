import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import privateAxios from '../../api/privateAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import { toast } from 'react-toastify';

const CheckoutForm = (props) => {
    const { id, product } = props;
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [payButtonClicked, setPayButtonClicked] = useState(true);
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const updateStatus = async () => {
            product.transactionId = transactionId;
            setTransactionId('');
            setLoading(true);
            await privateAxios.patch(`https://guarded-wave-32524.herokuapp.com/paid/${id}`, product).then(res => {
                setLoading(false);
                if (res.data.modifiedCount) {
                    toast.success('Congratulations! You payment was successful');
                }
                else {
                    toast.error('Sorry, Something went wrong.');
                }
            });
            navigate('/dashboard/orders', { replace: true });
        }
        if (transactionId) updateStatus();
    }, [transactionId, id, product, navigate]);

    const { price } = product;
    const run = async () => {
        await privateAxios.post('https://guarded-wave-32524.herokuapp.com/create-payment-intent', { price }).then(res => setClientSecret(res.data?.clientSecret));
    }
    run().catch(console.dir);

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

        const { error } = await stripe.createPaymentMethod({
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
        if (intentError) {
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
        <div className='w-full h-full'>
            <PageTitle title='Payment' />
            {(loading) && <Loading />}
            <form onSubmit={handleSubmit} className='h-fit' >
                <h2 className="text-xl mb-2 font-bold text-green-500">Enter payment details</h2>
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
                <button className='btn btn-sm btn-success mt-3' type="submit" disabled={!stripe || !clientSecret || !payButtonClicked}>
                    Pay now
                </button>
                {cardError && <span className='text-red-500'> <br /> {cardError}</span>}
                {cardSuccess && <span className='text-green-500'> <br /> {cardSuccess}</span>}
                {transactionId && <span className='text-green-500'> <br />Transaction ID: <span className='text-black font-thin'>{transactionId}</span></span>}
            </form>
        </div>
    );
};

export default CheckoutForm;