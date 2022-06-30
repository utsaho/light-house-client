import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import reviews from '../../images/svg/reviews.svg';
import tools from '../../images/svg/tools.svg';
import revenue from '../../images/svg/revenue.svg';
import customers from '../../images/svg/happyClients.svg';

const Summary = () => {
    const [summery, setSummery] = useState({});
    const { isLoading: summeryLoading } = useQuery('summery', async () => await fetch('http://localhost:5000/summery').then(res => res.json()).then(data => setSummery(data)));
    if (summeryLoading) return <Loading />
    const temp = [
        {
            img: customers,
            value: summery.customers < 100 ? summery.customers : `${Math.floor(summery.customers / 1000)}k`,
            message: 'Happy Clients'
        },
        {
            img: tools,
            value: summery.tools < 100 ? summery.tools : `${Math.floor(summery.tools / 1000)}k`,
            message: 'Tools'
        },
        {
            img: revenue,
            value: summery.revenue < 100 ? summery.revenue : `${Math.floor(summery.revenue / 1000)}k`,
            message: 'Annual Revenue'
        },
        {
            img: reviews,
            value: summery.reviews < 100 ? summery.reviews : `${Math.floor(summery.reviews / 1000)}k`,
            message: 'Customer reviews'
        }
    ]
    return (
        <div className="w-full mt-10">
            <div className='text-center'>
                <h2 className="text-5xl text-orange-600 font-extrabold uppercase">Million business trust us</h2>
                <h2 className="text-xl uppercase mt-2">Happy Client makes the business great</h2>
                <progress className="progress w-40 h-1"></progress>
            </div>
            <div className='lg:flex lg:flex-row md:flex-row sm:flex-col w-full'>
                {
                    temp.map((ttt, index) => <div key={index} className='w-full flex flex-col justify-center items-center mb-10'>
                        <img src={ttt.img} width='30%' alt="" />
                        <h2 className="text-6xl font-bold text-center">{ttt.value}+</h2>
                        <h2 className="text-xl text-orange-600 text-center">{ttt.message}</h2>
                    </div>)
                }
            </div>
        </div >
    );
};

export default Summary;