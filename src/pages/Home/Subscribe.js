import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import subBackground from '../../images/background/sub-background.jpg';

const Subscribe = () => {
    const [emailSubscribe, setEmailSubscribe] = useState('');


    const handleSubscribe = async () => {
        // console.log(emailSubscribe);
        await axios.post(`https://guarded-wave-32524.herokuapp.com/subscribe/${emailSubscribe}`).then(res => {
            if (res.data?.upsertedCount || res.data?.matchedCount) {
                toast.success('Thank you for your subscription! Check your email.');
            }
            else {
                toast.error('Something went wrong :(');
            }
        });

    }

    return (
        <div className='w-full pb-10 pt-5 backdrop-blur-3xl ' style={{ backgroundImage: `url(${subBackground})` }}>
            <h2 className="text-4xl w-full text-center text-green-600 font-bold">Subscribe for our new products</h2>
            <div className="form-control w-full mx-auto mt-3">
                <div className='mx-52'>
                    <div className="input-group w-full mx-auto">
                        <input type="email" placeholder="Search…" className="input input-bordered w-full" onChange={(e) => setEmailSubscribe(e.target.value)} />
                        <button className="btn btn-primary" onClick={() => handleSubscribe()} disabled={!emailSubscribe}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Subscribe;