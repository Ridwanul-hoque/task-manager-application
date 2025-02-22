import React from 'react';
import { FaGoogle } from 'react-icons/fa';


import { useNavigate } from 'react-router-dom';

import useAxiosPublicSecure from '../../../Hooks/useAxiosPublicSecure';
import useAuth from '../../../Hooks/useAuth';


const SocialLogin = () => {
    const {googleSignIn} = useAuth()
    const axiosPublic = useAxiosPublicSecure()
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result =>{
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName

            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            
        })

    }
    return (
        <div>
            <div className='divider px-6'></div>
            <div className=" ">
                
                <button onClick={handleGoogleSignIn} className="btn px-[66px] text-yellow-600 bg-green-800">
                    <FaGoogle></FaGoogle>
                    Sign In With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;