import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import privateAxios from '../../../api/privateAxios';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';

const MakeAdmin = () => {
    const [user, loading] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [imageStorageKey, setImageStorageKey] = useState('');
    const storageKey = useRef();
    const [selectedUser, setSelectedUser] = useState({});
    const { isLoading } = useQuery('users', async () => await privateAxios.get(`http://localhost:5000/allUsers/${user?.email}`).then(res => {
        setUsers(res.data.filter(temp => temp.email !== user.email));
    }));

    const removeAdmin = () => {
        console.log('Removing from admin');
    }

    const makeAdmin = async () => {
        selectedUser.imageStorageKey = imageStorageKey;
        await privateAxios.put(`http://localhost:5000/adminSetting/${user?.email}`, selectedUser).then(res => console.log(res));
    }

    const setKey = () => {
        setImageStorageKey(storageKey.current.value);
    }

    if (isLoading || loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto w-full">
            <PageTitle title='Make Admin' />
            <div className={`${!users.length && 'hidden'}`}>

                {/* Confirmation for action */}
                <input type="checkbox" id="userAction" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm <code className='text-orange-500'>{selectedUser?.email}</code> {selectedUser?.admin ? 'remove' : 'make'} as admin</h3>
                        {
                            !selectedUser?.admin &&
                            <>
                                <span className='mt-2 ml-3'>Enter image storing key:</span> <br />
                                <input type="text" onChange={() => setKey()} ref={storageKey} className='input input-bordered mt-1 ml-3' />
                            </>
                        }
                        <div className="modal-action">
                            <label htmlFor="userAction" onClick={() => {
                                selectedUser.admin && removeAdmin();
                                !selectedUser.admin && makeAdmin();
                            }} className={`btn ${(!selectedUser?.admin && !imageStorageKey) && 'btn-disabled'}`}>Confirm</label>
                            <label htmlFor="userAction" className="btn">Cancel</label>
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
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((singleUser, index) => <tr key={index}>
                                <th>
                                    <label>{index + 1}</label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photoURL} alt={singleUser?.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold whitespace-pre-wrap	">{singleUser?.user?.name || user?.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className='whitespace-pre-wrap'>{singleUser?.email}</span>
                                </td>
                                <th>
                                    <input onClick={() => { setSelectedUser({ email: singleUser?.email, admin: singleUser?.role === 'admin' }); document.getElementById('userAction').click() }} type="checkbox" className={`toggle toggle-dark tooltip ${singleUser?.role === 'admin' && 'checked:bg-primary'}`} data-tip={`${singleUser?.role === 'admin' ? 'Remove admin' : 'Make Admin'}`} checked={singleUser?.role === 'admin'} readOnly />
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={`${users.length && 'hidden'}`}>
                <h2 className="text-5xl text-center">No user Found</h2>
            </div>
        </div >
    );
};

export default MakeAdmin;