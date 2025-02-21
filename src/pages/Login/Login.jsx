import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


import { ToastContainer } from 'react-toastify';
import login from '../../assets/lottie/login.json'

import SocialLogin from '../Shared/SocialLogin/SocialLogin';

import Lottie from 'lottie-react';
import { AuthContext } from '../../Providers/AuthProvider';





const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()
    console.log('in signin page', location)
    const from = location.state || '/'
    const handleSignIn = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password)

        signIn(email, password)
            .then(result => {
                console.log('Sign In', result.user)
                navigate(from)
            })
            .catch(error => {
                toast.error('wrong Credentials');
                console.log(error)
            })



    }
    return (
        <div className="hero bg-base-200 min-h-screen p-8">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={login}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-8">
                    <h1 className=" ml-8 mt-2 text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-pink-800 text-yellow-500">Login</button>
                            <p>Don't have an account? <Link className='text-yellow-500' to='/register'>Register</Link></p>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;