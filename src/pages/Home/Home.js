import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Navbar from './Navbar';
import Parts from './Parts/Parts';

const Home = () => {
    return (
        <div >
            <Navbar></Navbar>
            <Banner></Banner>
            <Parts></Parts>
            <Footer></Footer>
        </div>
    );
};

export default Home;