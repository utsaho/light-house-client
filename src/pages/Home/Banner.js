/**
 * @author utsho
*/

import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://guarded-wave-32524.herokuapp.com/services').then(res => res.json()).then(data => setServices(data));
    }, []);
    return (
        <div className="px-12">
            <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box h-60">
                {
                    services.map(service => <div key={service._id} className="carousel-item">
                        <img width='250px' src={service.img} className="rounded-box h-full object-cover" alt='' />
                    </div>)
                }
            </div>
        </div>
    );
};

export default Banner;