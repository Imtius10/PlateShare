import React, { useContext } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Commet } from 'react-loading-indicators';

const RootLayout = () => {
    
    
    return (
        <div className=' flex flex-col min-h-screen max-w-8xl mx-auto'>
            
            <Navbar></Navbar>
            <div className='flex-grow'>
                <Outlet>
                   
                </Outlet>
                
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;