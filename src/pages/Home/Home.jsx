import React, { useContext } from "react";
import Banner from "./Banner/Banner";
import Tasks from "./Tasks/Tasks";
import { AuthContext } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa"; 

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-green-800 text-yellow-600 flex flex-col items-center justify-center">
            <Banner />

            {user ? (
                <Tasks />
            ) : (
                <div className="flex flex-col items-center justify-center mt-10 p-8 bg-yellow-600 text-green-800 rounded-2xl shadow-lg w-96 text-center">
                    <FaLock className="text-5xl mb-4" /> 
                    <h2 className="text-2xl font-bold">Access Restricted</h2>
                    <p className="text-sm mt-2 mb-4">
                        Login to unlock and manage your tasks efficiently.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-green-800 text-yellow-600 font-bold px-6 py-2 rounded-full text-lg transition duration-300 hover:bg-green-700 shadow-md"
                    >
                        Login Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
