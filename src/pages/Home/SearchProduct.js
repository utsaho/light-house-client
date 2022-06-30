import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import privateAxios from '../../api/privateAxios';
import Footer from '../Shared/Footer';
import PageTitle from '../Shared/PageTitle';
import Navbar from './Navbar';
import Part from './Parts/Part';

const SearchProduct = () => {
    const [parts, setParts] = useState([]);
    const searchRef = useRef();
    const search = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (search?.searchText) {
            searchRef.current.value = search.searchText;
            const run = async () => {
                await axios.get(`https://guarded-wave-32524.herokuapp.com/product/${search.searchText}`).then(res => setParts(res.data));
            }
            run();
        }
    }, [search?.searchText]);

    const searchNow = async (searchText) => {
        navigate(`/product/${searchText}`, { replace: false });
    }

    return (
        <div>
            <Navbar />
            <PageTitle title={search.searchText || 'All Products'} />
            <div className={`px-12 w-full`}>
                <div className='w-full flex justify-center'>
                    <div className="form-control mb-5">
                        <div className="input-group w-full">
                            <input ref={searchRef} type="text" placeholder="Search Here…" className="input input-bordered" />
                            <button className="btn btn-square" onClick={() => searchNow(searchRef.current?.value)} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`grid lg:grid-cols-3 gap-4  md:grid-cols-2 grid-cols-1 ${!parts.length && 'hidden'}`}>
                    {
                        parts.map(part => <Part key={part._id} part={part} />)
                    }
                </div>
            </div>
            <div className={`${parts.length && 'hidden h-screen w-screen'}`}>
                <h2 className="text-5xl text-center h-screen">No Product Found</h2>
            </div>
            <Footer />
        </div>
    );
};

export default SearchProduct;