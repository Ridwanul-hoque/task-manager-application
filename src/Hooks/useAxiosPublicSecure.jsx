import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://task-manager-application-server.vercel.app'
})



const useAxiosPublicSecure = () => {
    return axiosPublic
};

export default useAxiosPublicSecure;