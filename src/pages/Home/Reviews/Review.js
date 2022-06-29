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
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden py-0 my-0">
                        <img src={img || blankPicture} alt='' />
                    </div>
                    <div className='ml-4'>
                        <h2 className="text-md font-bold font-mono">{name}</h2>
                        <h2 className="text-sm text-slate-600 font-thin">{designation}</h2>
                        <div className="rating bg-transparent rating-sm rating-half">
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-1" checked={oneReview.rating === '0.5'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-2" checked={oneReview.rating === '1.0'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-1" checked={oneReview.rating === '1.5'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-2" checked={oneReview.rating === '2.0'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-1" checked={oneReview.rating === '2.5'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-2" checked={oneReview.rating === '3.0'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-1" checked={oneReview.rating === '3.5'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-2" checked={oneReview.rating === '4.0'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-1" checked={oneReview.rating === '4.5'} readOnly disabled />
                            <input type="radio" name={oneReview._id} className="bg-yellow-600 mask mask-star-2 mask-half-2" checked={oneReview.rating === '5.0'} readOnly disabled />
                        </div>
                        <span className='text-sm ml-2'>{rating} star</span>
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