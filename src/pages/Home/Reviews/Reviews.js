import React, { useState } from 'react';
import Divider from '../../Shared/Divider';
import Review from './Review';
import { useQuery } from 'react-query';
import privateAxios from '../../../api/privateAxios';
import Loading from '../../Shared/Loading';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { isLoading } = useQuery('reviews', async () => await privateAxios.get('https://guarded-wave-32524.herokuapp.com/reviews/6').then(res => setReviews(res?.data)));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Divider title='Top Reviews (Newest 6)' />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gird-cols-1 place-items-center gap-4 px-12 py-12' style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }}>
                {
                    reviews.map(review => <Review key={review._id} oneReview={review} />)
                }
            </div>
        </div >
    );
};

export default Reviews;