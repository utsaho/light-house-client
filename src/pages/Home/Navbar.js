import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import webLogo from '../../images/logos/website_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import SendToTop from '../../components/SendToTop';
import Loading from '../Shared/Loading';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    const admin = useAdmin();

    const dashboardMenu = <div className='tabs tabs-boxed bg-transparent'>
        <li className={`tab w-full mx-0 px-0 `}><Link to='/dashboard' className='w-full h-full text-black'>My Profile</Link> </li>

        {
            //* For User
            !admin && <>
                <li className={`tab w-full mx-0 px-0 my-2 `}><Link to='dashboard/review' className='w-full h-full text-black'>Add A Review</Link> </li>
                <li className={`tab w-full mx-0 px-0 `}><Link to='dashboard/orders' className='w-full h-full text-black'>My Orders</Link> </li>
            </>
        }

        {
            //* For Admin
            admin && <>
                <li className={`tab w-full mx-0 px-0 my-2 `}><Link to='dashboard/manageAllOrders' className='w-full h-full text-black'>Manage All Orders</Link> </li>
                <li className={`tab w-full mx-0 px-0 my-2 `}><Link to='dashboard/addNewProduct' className='w-full h-full text-black'>Add New Product</Link> </li>
                <li className={`tab w-full mx-0 px-0 my-2 `}><Link to='dashboard/makeAdmin' className='w-full h-full text-black'>Make Admin</Link> </li>
                <li className={`tab w-full mx-0 px-0 my-2 `}><Link to='dashboard/manageProducts' className='w-full h-full text-black'>Manage Products</Link> </li>
            </>
        }
    </div>;

    const menu = <>
        <li> <Link to='/'> <FontAwesomeIcon icon={faHome} />Home </Link> </li>
        <li> <Link to='/blogs'>Blogs</Link> </li>
        <li> <Link to='/myPortfolio'>My Portfolio</Link> </li>
        {!user && <>
            <li> <Link to='/login'>Login</Link> </li>
            <li className='mx-auto'> <Link to='/register'>Register</Link> </li>
        </>
        }
        {user && <>
            <li class="dropdown dropdown-hover">
                <label tabIndex="0" ><Link className='flex items-center' to='/dashboard'>Dashboard<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </Link></label>
                <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {dashboardMenu}
                </ul>
            </li>


            <button onClick={() => { signOut(auth); localStorage.removeItem('accessToken'); }} className='btn btn-ghost font-bold'>Logout ({user?.displayName.split(' ')[0]})</button>
        </>}
    </>

    if (loading) return <Loading />;

    return (
        <div className="navbar bg-base-100 sticky top-0 px-12" onClick={SendToTop}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <div className='navbar-center lg:navbar-center'><Link to='/'><img src={webLogo} alt="" /></Link></div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
            {location?.pathname?.split('/')[1] === 'dashboard' && <div className="navbar-end lg:hidden">
                <label htmlFor="dashboard-drawer" tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor"><path fill="none" d="M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z"></path></svg>
                </label>
            </div>}
        </div>
    );
};

export default Navbar;