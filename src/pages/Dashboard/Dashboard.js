import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import privateAxios from '../../api/privateAxios';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Navbar from '../Home/Navbar';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const admin = useAdmin();

    // const {data: admin, isLoading} = useQuery(['isAdmin', user], async()=> await privateAxios.get(`http://localhost:5000/isAdmin/${user?.email}`).then(res=>res?.data?.status));

    const [active, setActive] = useState('dashboard');
    const dashboardMenu = <div className='tabs tabs-boxed bg-white'>
        {!admin && <li className={`tab w-full mx-0 px-0 ${active === 'dashboard' && 'tab-active'}`}><Link to='/dashboard' onClick={() => setActive('dashboard')} className='w-full h-full'>My Profile</Link> </li>}

        {!admin && <li className={`tab w-full mx-0 px-0 my-2 ${active === 'review' && 'tab-active'}`}><Link to='review' onClick={() => setActive('review')} className='w-full h-full'>Add A Review</Link> </li>}

        <li className={`tab w-full mx-0 px-0 ${active === 'orders' && 'tab-active'}`}><Link to='orders' onClick={() => setActive('orders')} className='w-full h-full'>My Orders</Link> </li>

        {admin && <li className={`tab w-full mx-0 px-0 my-2 ${active === 'manageAllOrders' && 'tab-active'}`}><Link to='manageAllOrders' onClick={() => setActive('manageAllOrders')} className='w-full h-full'>Manage All Orders</Link> </li>}
    </div>;

    if( loading){
        return <Loading/>
    }
    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-white">
                    <h2 className="text-4xl mb-5 text-purple-600 font-bold">Welcome to you dashboard, <span className='text-orange-500'>{user?.displayName}</span></h2>
                    <Outlet />
                </div>
                <div className="drawer-side pt-5">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 lg:bg-white text-base-content">
                        {dashboardMenu}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;