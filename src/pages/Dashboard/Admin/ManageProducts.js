import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import privateAxios from '../../../api/privateAxios';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';
const ManageProducts = () => {
    const [user, loading] = useAuthState(auth);
    const nameRef = useRef();
    const [searchByName, setSearchByName] = useState('');
    const [products, setProducts] = useState([]);
    const [refetching, setRefetching] = useState(true);
    const [selectedForDelete, setSelectedForDelete] = useState({});
    const { isLoading, refetch } = useQuery('products', async () => await privateAxios.get(`https://guarded-wave-32524.herokuapp.com/services`).then(res => setProducts(res.data)), { enabled: refetching });

    if (loading || isLoading) {
        return <Loading />
    }

    const search = async () => {
        setRefetching(false);
        await privateAxios.get(`https://guarded-wave-32524.herokuapp.com/service/${searchByName}-name`).then(res => setProducts([res.data]));
    }

    const deleteProduct = async (id) => {
        await privateAxios.post(`https://guarded-wave-32524.herokuapp.com/product/${id}`, selectedForDelete).then(res => {
            if (res.data?.deletedCount) {
                toast.success('Product deleted Successfully');
                refetch();
            }
            else {
                toast.error('This this cannot be deleted');
            }
        });
    }

    return (
        <div className="overflow-x-auto w-full">
            {/* Search by name */}
            <input ref={nameRef} onChange={() => setSearchByName(nameRef.current?.value)} type="email" id='search' placeholder="Search by Email" className="input input-bordered input-accent w-full max-w-xs my-3 ml-2" />
            <label htmlFor="search" className={`btn btn-primary ml-2 ${!searchByName && 'btn-disabled'}`} onClick={() => search()} >search</label>

            <label className='btn bg-black text-white ml-10' onClick={() => {
                setRefetching(true); nameRef.current.value
                    = ''
            }} >Show all</label>

            <PageTitle title='All products' />
            <div className={`${!products.length && 'hidden'}`}>

                {/* Confirmation for delete */}
                <input type="checkbox" id="deleteConfirmation" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <label htmlFor="deleteConfirmation" onClick={() => setSelectedForDelete([])} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Are you sure to cancel this product?</h3>
                        <div className="modal-action">
                            <label htmlFor="deleteConfirmation" onClick={() => deleteProduct(selectedForDelete.productId)} className="btn">Confirm</label>
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
                            <th>Available</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <tr key={index}>
                                <th>
                                    <label>{index + 1}</label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.img} alt={product.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold whitespace-pre-wrap">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className='font-bold text-slate-600'>{product.available}</span>
                                </td>
                                <td>
                                    ${product.price}/count
                                </td>
                                <th>
                                    <label htmlFor="deleteConfirmation" className="btn btn-primary btn-sm mt-2 " onClick={() => setSelectedForDelete(product)} > Delete</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={`${products.length && 'hidden'}`}>
                <h2 className="text-5xl text-center">No product Found</h2>
            </div>
        </div >
    );
};

export default ManageProducts;