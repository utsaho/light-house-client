import React from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useQuery } from 'react-query';
import privateAxios from '../../api/privateAxios';

const stripePromise = loadStripe('pk_test_51L29GTBwPwunktj52EEDURapShMmOAI5BD71BBNyPn3GhpAQVuRRCkphQNL8VHhKeC02u5iCHOrbisjJDzsOkaBo00dpsVrCps');

const Payment = () => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;