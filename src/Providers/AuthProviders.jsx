

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


import { app } from "../Firebase/firebase.config";
import useAxiosPublicSecure from "../Hooks/useAxiosPublicSecure";




export const AuthContext = createContext(null)
const auth = getAuth(app)



const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] =useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublicSecure()



    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password )
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo
        })
    }
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                })
                
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)

            }
            
        } );
        return () =>{
            return unsubscribe()
        }
    }, [axiosPublic])
    
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProviders;