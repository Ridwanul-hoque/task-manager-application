import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';

const Registration = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()


    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userInfo),
                        })
                            .then(res => {
                                if (res.data.insertedId) {
                                    // reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Succesfully Sign Up",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')

                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URl" className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password needed</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Passowrd must be 6 character</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Passowrd can't be more then 20 character</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase one lower one special character</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-pink-800 text-yellow-500 " type="submit" value="Sign Up" />

                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                        
                        <p>
                            <small>
                                Already have an Account? <Link to="/login" className='text-yellow-500'>Login</Link>
                            </small>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Registration;