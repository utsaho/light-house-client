import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Navbar from './Navbar';
import myImage from '../../images/MyPortfolio/image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMailBulk, faLocation, faMapLocation, faLocationPin, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Shared/Footer';
const MyPortfolio = () => {
    return (
        <div>
            <PageTitle title='My Portfolio' />
            <Navbar />
            <div className='px-12 mt-5'>
                <div className='lg:flex lg:flex-row sm:flex-col'>
                    <div class="lg:w-fit sm:w-full flex justify-center">
                        <div class="w-44 overflow-hidden h-fit rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={myImage} alt='owner profile' />
                        </div>
                    </div>
                    <div className='bg-yellow-700 lg:ml-10 text-white grow rounded-lg pl-3 mr-10 pb-10'>
                        <h2 className="text-3xl mt-3">Pipul boddyo (Utsho)</h2>
                        <p className='text-lg'>Junior web developer</p>
                        <div className="divider divider-vertical w-48 mt-[-2px] bg-black h-[0.1rem]"></div>
                        <div className='px-10'>
                            <p className=''>Proficient in developing database, creating user interface, writing the testing codes, troubleshooting simple/complex issues and implementing new features based on users feedback. </p>
                            <p> <FontAwesomeIcon icon={faPhone} /> +880 1304245824 </p>
                            <p> <FontAwesomeIcon icon={faMailBulk} /> <a href="mailto:pipul.boddyo@gmcil.com">pipul.boddyo@gmail.com</a> </p>
                            <p> <FontAwesomeIcon icon={faLocationArrow} /> Tilaghar, Sylhet, Bangladesh </p>
                        </div>
                        <h2 className="text-2xl mt-2">List of technologies of Skills:</h2>
                        <div className="divider divider-vertical w-48 mt-[-0.5px] bg-black h-[0.1rem]"></div>
                        <div className='px-10'>
                            <ul className='list-disc'>
                                <li>HTML5</li>
                                <li>CSS3</li>
                                <li>JavaScript</li>
                                <li>Java</li>
                                <li>SQL</li>
                                <li>Basic c++ with STL</li>
                                <li>Competitive with c++</li>
                                <li>React JS</li>
                                <li>Mongodb</li>
                            </ul>
                        </div>
                        <h2 className="text-2xl mt-2">Education Background:</h2>
                        <div className="divider divider-vertical w-48 mt-[-0.5px] bg-black h-[0.1rem]"></div>
                        <div className='px-10'>
                            <h2 className="text-xl">B.Sc in Computer Science & Engineering <small>. 3rd Year</small> </h2>
                            <p>Leading University, Sylhet, Bangladesh</p>
                        </div>
                        <h2 className="text-2xl mt-2">Profile and projects list:</h2>
                        <div className="divider divider-vertical w-48 mt-[-0.5px] bg-black h-[0.1rem]"></div>
                        <div className='px-10'>
                            <ul className='list-disc'>
                                <li>Linkdin Profile: <a target='_blank' rel='noreferrer' className='text-black' href="https://www.linkedin.com/in/pipul-boddyo-76755a206/">Click Here</a> </li>
                                <li>Github Profile: <a target='_blank' rel='noreferrer' className='text-black' href="https://github.com/utsaho">Click Here</a></li>
                                <li>Codeforces Profile: <a target='_blank' rel='noreferrer' className='text-black' href="https://codeforces.com/profile/utsho_">Click Here</a></li>
                                <li>Codechef Profile: <a target='_blank' rel='noreferrer' className='text-black' href="https://www.codechef.com/users/utsho_10">Click Here</a></li>
                                <br />
                                <li>FaceBook Live site: <a target='_blank' rel='noreferrer' className='text-black' href="https://utsho-book-house.web.app/">Click Here</a></li>
                                <li>Photo Studio Live site: <a target='_blank' rel='noreferrer' className='text-black' href="https://utsho-photo-studio.web.app/">Click Here</a></li>
                                <li>Cinemovies Live site: <a target='_blank' rel='noreferrer' className='text-black' href="https://utsaho.netlify.app/home">Click Here</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyPortfolio;