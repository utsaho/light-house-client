import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading';
import Part from './Part';

const Parts = () => {
    const [parts, setParts] = useState([]);
    const { isLoading: serviceLoading } = useQuery('parts', async () => await privateAxios.get('http://localhost:5000/services').then(res => setParts(res.data)));


    if (serviceLoading) {
        return <Loading />
    }

    return (
        <div className='px-12'>
            <h2 className="text-5xl text-center divider my-12 font-bold">Tools</h2>
            <div className='grid lg:grid-cols-3 gap-4  md:grid-cols-2 grid-cols-1'>
                {
                    parts.map(part => <Part key={part._id} part={part} />)
                }
            </div>
        </div>
    );
};

export default Parts;