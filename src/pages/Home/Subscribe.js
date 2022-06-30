import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const Subscribe = () => {
    const [emailSubscribe, setEmailSubscribe] = useState('');


    const handleSubscribe = async () => {
        // console.log(emailSubscribe);
        await axios.post(`http://localhost:5000/subscribe/${emailSubscribe}`).then(res => {
            if (res.data?.upsertedCount || res.data?.matchedCount) {
                toast.success('Thank you for your subscription! Check your email.');
            }
            else {
                toast.error('Something went wrong :(');
            }
        });

    }

    return (
        <div className='w-full pb-10 pt-5'>
            <h2 className="text-4xl w-full text-center">Subscribe for our new products</h2>
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