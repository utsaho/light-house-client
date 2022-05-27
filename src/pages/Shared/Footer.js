import React from 'react';
import instagram from '../../images/svg/instagram.wine.svg';
import twitter from '../../images/svg/twitter.wine.svg';
import facebook from '../../images/svg/facebook.wine.svg';
import background from '../../images/background/Footer-Background.png';
const Footer = () => {


    return (
        <footer className="footer footer-center p-10 bg-base-100 text-base-content rounded" style={{ background: `url(${background})` }}>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4">
                        <a className='mx-0' href="https://twitter.com/utsaho_utsho" target='_blank' rel='noreferrer'><img width='50px' src={twitter} alt="" /></a>

                        <a className='mx-0' href='https://instagram.com/utsaho_utsho' rel='noreferrer' target='_blank'><img width='50px' src={instagram} alt="" /></a>

                        <a className='mx-0' href='https://facebook.com/utsaho.utsho' rel='noreferrer' target='_blank'><img width='50px' src={facebook} alt="" /></a>
                    </div>
                </div>
            </div>
            <div>
                <p>Copyright &copy; {new Date().getFullYear()} - All right reserved by <span className=' font-bold text-sm'>Light House Ltd</span> .</p>
            </div>
        </footer >
    );
};

export default Footer;