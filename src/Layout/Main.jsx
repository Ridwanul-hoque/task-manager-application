import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <div className='bg-green-800'>
                <Navbar></Navbar>
            </div>

            <Outlet></Outlet>
            <div className='bg-green-800'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;