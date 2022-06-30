import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import privateAxios from '../../api/privateAxios';
import PageTitle from '../Shared/PageTitle';
import { Link, Navigate, useLocation } from 'react-router-dom';

const MyOrders = () => {
    const [user, loading] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [selectedForCancel, setSelectedForCancel] = useState({});
    const location = useLocation();
    const { isLoading, refetch } = useQuery(['orders', location], async () => await privateAxios.get(`http://localhost:5000/orders/${user?.email}`).then(res => {
        if (res.data.length) setOrders(res.data)
        else setOrders([]);
    }));
    if (loading || isLoading) return <Loading />;

    //* Cancel the order
    const CancelOrder = async (id) => {
        await privateAxios.post(`http://localhost:5000/cancelOrder/${id}`, selectedForCancel).then(res => {
            if (res.data?.deletedCount) {
                toast.success('Order canceled Successfully');
                refetch();
            }
            else {
                toast.error('This order cannot be deleted');
            }
        });
    }

    return (
        <div className="overflow-x-auto w-full">
            <PageTitle title='MyOrder' />
            <div className={`${!orders.length && 'hidden'}`}>

                {/* Confirmation for delete */}
                <input type="checkbox" id="deleteConfirmation" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <label htmlFor="deleteConfirmation" onClick={() => setSelectedForCancel([])} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Are you sure to delete this order?</h3>
                        {/* <p className="py-4">{selectedForDelete}</p> */}
                        <div className="modal-action">
                            <label htmlFor="deleteConfirmation" onClick={() => CancelOrder(selectedForCancel.productId)} className="btn">Confirm</label>
                            <label htmlFor="deleteConfirmation" onClick={() => setSelectedForCancel([])} className="btn">Cancel</label>
                        </div>
                    </div>
                </div>


                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                Sl.
                            </th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Payment & Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <tr key={index}>
                                <th>
                                    <label>{index + 1}</label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={order.img} alt={order.productName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold whitespace-pre-wrap	">{order.productName}</div>
                                            <div className="text-sm opacity-50"><span className='font-bold text-slate-600'>Quantity: </span>{order.quantity}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className='whitespace-pre-wrap'>{order.address}</span>
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Phone: {order.phone}</span>
                                </td>
                                <td>${order.price} <br />
                                    <span className="badge badge-ghost badge-sm">Date: {order?.date}</span> <br />
                                    <span className="badge badge-ghost badge-sm">Time: {order?.time}</span>
                                </td>
                                <th>
                                    {!order?.transactionId ? <Link to={`/dashboard/payment/${order._id}`} className="btn btn-success btn-sm w-full">Pay Now</Link> : (order.status === 'shipped' ? <Link to={`/dashboard/payment/${order._id}`} className="btn btn-disabled btn-sm w-full text-black mb-1">Shipped</Link> : <Link to={`/dashboard/payment/${order._id}`} className="btn btn-disabled btn-sm w-full text-black mb-1">Paid</Link>)}

                                    {/* Delete a order */}
                                    {(!order?.transactionId) && <> <br /> <label htmlFor="deleteConfirmation" className="btn text-white btn-sm mt-2 w-full" onClick={() => setSelectedForCancel(order)} > cancel</label></>}

                                    {/* Cancel button */}
                                    {(order.status === 'shipped') && <> <br /> <label htmlFor="deleteConfirmation" className="btn text-white btn-sm mt-2 w-full" onClick={() => { order.quantity = 0; setSelectedForCancel(order) }} > Delete</label></>}

                                    {order?.transactionId && <span className='font-normal' > <br /> <span className='font-bold'>Txn: </span> {order.transactionId}</span>}
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={`${orders.length && 'hidden'}`}>
                <h2 className="text-5xl text-center">No Order Found</h2>
            </div>
        </div >
    );
};

export default MyOrders;