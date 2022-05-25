import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import webLogo from '../../images/logos/website_logo.png';
const Navbar = () => {
    const [user] = useAuthState(auth);
    const menu = <>
        {!user && <><li> <Link to='/login'>Login</Link> </li>
            <li className='mx-auto'> <Link to='/register'>Register</Link> </li></>
        }
        {user && <>
            <button onClick={() => { signOut(auth); localStorage.removeItem('accessToken'); }} className='btn btn-ghost font-bold'>Logout</button>
        </>}

    </>

    return (
        <div className="navbar bg-base-100 sticky top-0 px-12">
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
        </div>
    );
};

export default Navbar;