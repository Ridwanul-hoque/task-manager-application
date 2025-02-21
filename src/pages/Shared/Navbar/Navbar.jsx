import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../../Providers/AuthProvider';
// import useAdmin from '../../../Hooks/useAdmin';

const Navbar = () => {
    // const { user, logOut } = useContext(AuthContext);
    // const [isAdmin] = useAdmin()
    // const handleLogout = () => {
    //     logOut()
    //         .then(() => { })
    //         .catch(error => console.log(error))
    // }
    const navOptions = <>

        <li> <Link to={'/'} className="text-red-400 hover:text-black">Home</Link></li>
        <li><Link className="text-red-400 hover:text-black">Add Task</Link></li>
        
        

        {/* {
            user && isAdmin && <>
            <li><Link to='/dashboard/adminDashboard' className="text-red-400 hover:text-black">Dashboard</Link> </li> <li><Link to={'/adminreview'} className='text-red-400 hover:text-black'>User Complain</Link></li></>
        }
        {
            user && !isAdmin && <><li><Link to='/dashboard/user' className="text-red-400 hover:text-black">Dashboard</Link></li><li><Link to={'/addreview'} className='text-red-400 hover:text-black'>Share Your Experience</Link></li></>
        } */}
    </>
    return (
        <>
            <div className="navbar py-4 px-8 max-w-screen-xl mx-auto">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-lg z-10 mt-3 w-52 p-4 shadow-lg">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="text-2xl text-red-400 font-bold">Task Manager</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                {/* eikhane jinish ase add kra lagbe  */}
                
            </div>
        </>
    );
};

export default Navbar;
