import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div >
            <Navbar></Navbar>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    );
};

export default Home;