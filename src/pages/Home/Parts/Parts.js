import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading';
import Part from './Part';

const Parts = () => {
    const [parts, setParts] = useState([]);
    const searchRef = useRef();
    const { isLoading: serviceLoading } = useQuery('parts', async () => await privateAxios.get('http://localhost:5000/services').then(res => setParts(res.data)));

    const searchNow = async () => {
        const searchText = searchRef.current?.value;
        await privateAxios.get(`http://localhost:5000/product/${searchText}`).then(res => console.log(res));
    }

    if (serviceLoading) {
        return <Loading />
    }

    return (
        <div className='px-12 w-full'>
            <h2 className="text-5xl text-center divider my-12 font-bold">Tools</h2>

            <div className='w-full flex justify-center'>
                <div class="form-control mb-5">
                    <div class="input-group w-full">
                        <input ref={searchRef} type="text" placeholder="Search Here…" class="input input-bordered" />
                        <button class="btn btn-square" onClick={() => searchNow()} >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className='grid lg:grid-cols-3 gap-4  md:grid-cols-2 grid-cols-1'>
                {
                    parts.map(part => <Part key={part._id} part={part} />)
                }
            </div>
        </div>
    );
};

export default Parts;