import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import Navbar from '../Home/Navbar';
import Footer from '../Shared/Footer';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const [active, setActive] = useState('dashboard');
    const dashboardMenu = <div className='tabs tabs-boxed bg-white'>
        <li className={`tab w-full mx-0 px-0 ${active === 'dashboard' && 'tab-active'}`}><Link to='/dashboard' onClick={() => setActive('dashboard')} className='w-full h-full'>My Orders</Link> </li>

        <li className={`tab w-full mx-0 px-0 my-2 ${active === 'review' && 'tab-active'}`}><Link to='review' onClick={() => setActive('review')} className='w-full h-full'>Add A Review</Link> </li>

        <li className={`tab w-full mx-0 px-0 ${active === 'myProfile' && 'tab-active'}`}><Link to='myProfile' onClick={() => setActive('myProfile')} className='w-full h-full'>My Profile</Link> </li>
    </div>
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