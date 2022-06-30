import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import cardBackground from '../../images/background/card-background.jpg';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import privateAxios from '../../api/privateAxios';
import { toast } from 'react-toastify';
import PageTitle from '../Shared/PageTitle';
import { useNavigate } from 'react-router-dom'

const AddAReview = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user, loading] = useAuthState(auth);
    const reviewLength = 350;
    const defaultRating = '3.5';
    const [starRating, setStarRating] = useState(defaultRating);
    const navigate = useNavigate();

    if (loading) {
        return <Loading />
    }

    // console.log((new Date().toLocaleString()))

    const reviewSubmit = async (review) => {
        review.name = user.displayName;
        review.rating = starRating;
        review.img = user?.photoURL;
        review.date = new Date().toLocaleString();
        await privateAxios.post('https://guarded-wave-32524.herokuapp.com/postReview', review).then(res => {
            if (res?.data?.insertedId) {
                toast.success('Thanks for your feedback. Your feedback is valuable to us');
                navigate('/', { repace: true })
            }
            else {
                toast.error('You cann\'t send feedback');
            }
            reset();
        });
    }

    const ratingValue = (event) => {
        setStarRating(event.target.value);
    }

    return (
        <div className="" style={{ backgroundImage: `url(${cardBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <PageTitle title='Review' />
            <div className="hero min-h-screen flex justify-center items-center">
                <div className="rounded-lg flex-shrink-0 lg:max-w-lg w-96 shadow-2xl bg-base-700">
                    <form className="card-body" onSubmit={handleSubmit(reviewSubmit)}>
                        <h2 className="text-2xl text-center uppercase text-purple-700 font-bold">Send your feedback</h2>
                        <div className="form-control my-0 py-0">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={user.displayName} placeholder={user.displayName} className={`input input-bordered ${errors.email ? 'input-error' : ''}`} {...register('name')} readOnly disabled />
                        </div>
                        <div className="form-control">
                            <label className="label mt-0 pt-0">
                                <span className="label-text">rating</span>
                            </label>

                            <div className="rating bg-white rating-lg rating-half input input-bordered">
                                <input type="radio" name="rating-10" className="rating-hidden" />
                                <input type="radio" onChange={ratingValue} value='0.5' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-1" />
                                <input type="radio" onChange={ratingValue} value='1.0' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-2" />
                                <input type="radio" onChange={ratingValue} value='1.5' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-1" />
                                <input type="radio" onChange={ratingValue} value='2.0' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-2" />
                                <input type="radio" onChange={ratingValue} value='2.5' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-1" />
                                <input type="radio" onChange={ratingValue} value='3.0' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-2" />
                                <input type="radio" onChange={ratingValue} value='3.5' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-1" defaultChecked />
                                <input type="radio" onChange={ratingValue} value='4.0' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-2" />
                                <input type="radio" onChange={ratingValue} value='4.5' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-1" />
                                <input type="radio" onChange={ratingValue} value='5.0' name="rating-10" className="bg-yellow-600 mask mask-star-2 mask-half-2" />
                            </div>

                            <label className="label my-0 py-0">
                                {errors?.rating?.type === 'required' && <span className="label text-red-500">{errors.rating.message}</span>}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Designation</span>
                            </label>
                            <input type="designation" placeholder="designation" className={`input input-bordered ${errors.password ? 'input-error' : ''}`} {...register('designation', {
                                required: {
                                    value: true,
                                    message: 'designation is required'
                                }
                            })} />
                            <label className="label my-0 py-0">
                                {errors?.designation?.type === 'required' && <span className="label text-red-500">{errors.designation.message}</span>}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label mt-0 pt-0">
                                <span className="label-text">Review</span>
                            </label>
                            <textarea maxLength={reviewLength} type="text" placeholder={`write your feedback here in ${reviewLength} character!`} className={`input input-bordered ${errors.password ? 'input-error' : ''}`} {...register('review', {
                                required: {
                                    value: true,
                                    message: 'review is required'
                                }
                            })} />
                            <label className="label my-0 py-0">
                                {errors?.review?.type === 'required' && <span className="label text-red-500">{errors.review.message}</span>}
                            </label>
                        </div>
                        <div className="form-control">
                            <button className="btn btn-primary text-white" style={{ background: 'linear-gradient(to left, rgb(58,117,183), rgb(118,80,175))' }}>Sent</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAReview;