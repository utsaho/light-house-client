import React from 'react';
import { useQuery } from 'react-query';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Navbar from './Navbar';

const Blogs = () => {

    const { data: qna, isLoading } = useQuery('qna', async () => await fetch('http://localhost:5000/qna').then(res => res.json()));

    if (isLoading) return <Loading />

    return (
        <div className='w-100'>
            <Navbar />
            <PageTitle title='My Blogs' />
            <div className='py-10 relative' style={{ background: 'linear-gradient(to right, rgb(58,117,183), rgb(118,80,175))' }}>
                <div className='mx-60'>
                    {
                        qna.map((q, index) => <div key={index} tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-1 px-3">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title text-2xl font-medium">
                                {index + 1}. {q.question}
                            </div>
                            <div className="collapse-content">
                                <p className='text-xl'>{q.ans}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blogs;