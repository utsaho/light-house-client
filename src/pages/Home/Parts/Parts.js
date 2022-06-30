import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading';
import Part from './Part';

const Parts = () => {
    const [parts, setParts] = useState([]);
    const [searchLength, setSearchLength] = useState('');
    const searchRef = useRef();
    const { isLoading: serviceLoading } = useQuery('parts', async () => await privateAxios.get('http://localhost:5000/services').then(res => setParts(res.data)));
    const navigate = useNavigate();

    const searchNow = async () => {

        const searchText = searchRef.current?.value;
        if (searchText) navigate(`/product/${searchText}`, { replace: false });
        else navigate('/product', { replace: false });
    }

    if (serviceLoading) {
        return <Loading />
    }

    return (
        <div className='px-12 w-full'>
            <h2 className="text-5xl text-center divider my-12 font-bold">Tools</h2>

            <div className='w-full flex justify-center'>
                <div className="form-control mb-5">
                    <div className="input-group w-full">
                        <input ref={searchRef} type="text" placeholder="Search Here…" className="input input-bordered" onChange={() => setSearchLength(searchRef.current?.value)} />
                        <button className="btn btn-square" onClick={() => searchNow()} disabled={!searchLength}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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