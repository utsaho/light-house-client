import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import privateAxios from '../../api/privateAxios';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const ManageAllOrders = () => {
    const [user, loading] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [selectedForDelete, setSelectedForDelete] = useState({});

    const { isLoading, refetch } = useQuery('orders', async () => await privateAxios.get(`http://localhost:5000/allOrders`).then(res => setOrders(res.data)));
    if (loading || isLoading) {
        return <Loading />
    }

    const CancelOrder = async (id) => {
        await privateAxios.post(`http://localhost:5000/cancelOrder/${id}`, selectedForDelete).then(res => {
            if (res.data?.deletedCount) {
                toast.success('Order canceled Successfully');
                refetch();
            }
            else {
                toast.error('This order cannot be deleted');
            }
        });
    }

    //* Changing status to shipped
    const shipped = async (id) => {
        await privateAxios.put(`http://localhost:5000/shipped/${id}`).then(res => {
            if (res.data?.modifiedCount) {
                toast.success('Order shipped Successfully.!');
                refetch();
            }
            else {
                toast.error('Something went wrong');
            }
        });
    }


    return (
        <div className="overflow-x-auto w-full">
            <PageTitle title='All Orders' />
            <div className={`${!orders.length && 'hidden'}`}>

                {/* Confirmation for delete */}
                <input type="checkbox" id="deleteConfirmation" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <label htmlFor="deleteConfirmation" onClick={() => setSelectedForDelete([])} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Are you sure to cancel this order?</h3>
                        {/* <p className="py-4">{selectedForDelete}</p> */}
                        <div className="modal-action">
                            <label htmlFor="deleteConfirmation" onClick={() => CancelOrder(selectedForDelete.productId)} className="btn">Confirm</label>
                            <label htmlFor="deleteConfirmation" onClick={() => setSelectedForDelete([])} className="btn">Cancel</label>
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
                                    <span className="badge badge-ghost badge-sm">Phone: {order.phone}</span> <span className="badge badge-ghost badge-sm">Email: {order?.email}</span>
                                </td>
                                <td>{order.price} <br />
                                    <span className="badge badge-ghost badge-sm">Date: {order?.date}</span> <br />
                                    <span className="badge badge-ghost badge-sm">Time: {order?.time}</span>
                                </td>
                                <th>
                                    {order.status === 'unpaid' && <><button className="btn text-black btn-disabled btn-sm">Unpaid</button> <br /> <label htmlFor="deleteConfirmation" className="btn btn-ghost btn-sm mt-2 " onClick={() => setSelectedForDelete(order)} > Delete</label></>}
                                    {order.status === 'paid' && <><button className="btn btn-disabled text-black btn-sm">Pending</button> <br />  <label className="btn btn-primary btn-sm mt-2" onClick={() => shipped(order._id)}>Update</label></>}
                                    {order.status === 'shipped' && <button className='btn btn-ghost text-black btn-disabled'>Shipped</button>}
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

export default ManageAllOrders;