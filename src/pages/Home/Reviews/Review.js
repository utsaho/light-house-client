import React, { useState } from 'react';
import cardBackground from '../../../images/background/card-background.jpg';
import blankPicture from '../../../images/logos/blank-picture.jpg';
const Review = ({ oneReview }) => {
    const { name, designation, review, img, rating } = oneReview;
    // console.log(ratIng);
    const [restReview, setRestReview] = useState(null);
    return (
        <div className="rounded-2xl w-full shadow-xl" style={{ backgroundImage: `url(${cardBackground})`, backgroundSize: 'cover' }}>
            <div className="card-body">
                <div className="py-2 place-content-center flex items-center">
                    <div className="w-20 mask mask-hexagon py-0 my-0">
                        <img src={img || blankPicture} alt='' />
                    </div>
                    <div className='ml-2'>
                        <h2 className="text-md font-bold font-mono">{name}</h2>
                        <h2 className="text-sm text-slate-600 font-thin">{designation}</h2>
                        <h2 className='text-sm font-bold'>Rating: {rating} out-of 5</h2>

                    </div>
                </div>
                <p>
                    {review.slice(0, 220)} {review.length > 220 && <span className={`${!restReview && 'link'}`} onClick={() => setRestReview(review.slice(220, review.length))}>{!restReview && 'show more'}</span>}
                    {restReview}
                    {restReview && <span className={`${restReview && 'link'}`} onClick={() => setRestReview(null)}>{' show less'}</span>}
                </p>
            </div>
        </div>
    );
};

export default Review;