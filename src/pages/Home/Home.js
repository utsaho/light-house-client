import React from 'react';
import ScrollButton from '../../components/ScrollButton';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Navbar from './Navbar';
import Parts from './Parts/Parts';
import Summary from './Summary';

const Home = () => {
    return (
        <div >
            <ScrollButton />
            <Navbar></Navbar>
            <Banner></Banner>
            <Parts></Parts>
            <Summary></Summary>
            <Footer></Footer>
        </div>
    );
};

export default Home;