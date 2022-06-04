import React from 'react';
import ScrollButton from '../../components/ScrollButton';
import Footer from '../Shared/Footer';
import PageTitle from '../Shared/PageTitle';
import Banner from './Banner';
import Navbar from './Navbar';
import Parts from './Parts/Parts';
import Reviews from './Reviews/Reviews';
import Summary from './Summary';

const Home = () => {
    return (
        <div >
            <PageTitle title='Home' />
            <ScrollButton />
            <Navbar></Navbar>
            <Banner></Banner>
            <Parts></Parts>
            <Reviews />
            <Summary></Summary>
            <Footer></Footer>
        </div>
    );
};

export default Home;