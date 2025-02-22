import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState(null);
    const [name, setName] = useState(user?.displayName || '');
    const [image, setImage] = useState(user?.photoURL || '');

    useEffect(() => {
        const fetchUser = async () => {
            if (!user?.email) return;
    
            try {
                const response = await fetch(`https://task-manager-application-server.vercel.app/users?email=${user.email}`); // Fetch user by email
                const data = await response.json();
    
                if (data.length > 0) {
                    setDbUser(data[0]);  // Set MongoDB user (should contain _id)
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        fetchUser();
    }, [user]);
    
    const handleUpdate = async () => {
        
    
        try {
            const response = await fetch(`https://task-manager-application-server.vercel.app/users/${dbUser._id}`, {  
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, photoURL: image })  
            });
    
            const data = await response.json();
            if (data.modifiedCount) {
                Swal.fire('Updated!', 'Your profile has been updated.', 'success');
            } else {
                Swal.fire('No Changes', 'No updates were made.', 'info');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    

    return (
        <div className="max-w-lg mx-auto bg-yellow-600 p-6 rounded-lg shadow-md my-12">
            <h2 className="text-2xl font-bold text-green-800 text-center">Profile</h2>
            <div className="flex flex-col items-center gap-4 mt-4">
                <img className="w-32 h-32 rounded-full border-4 border-green-800" src={image || '/default-avatar.png'} alt="Profile" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your name" />
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded" placeholder="Image URL" />
                <button onClick={handleUpdate} className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
                
            </div>
        </div>
    );
};

export default Profile;
