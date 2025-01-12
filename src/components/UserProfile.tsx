import React, { useState } from 'react'
import { hobbyAuth, hobbyDb } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const UserProfile = () => {

    let navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            hobbyAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    const docRef = doc(hobbyDb, "Users", user?.uid)
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                    } else {
                        console.log("no user data")
                    }
                } else {
                    console.log("no user data")
                }
            })
        }
        getUserInfo();
    }, [])

    const logout = async () => {
        try {
           await hobbyAuth.signOut();
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="flex flex-col items-center border-2 border-black h-96 pt-6 w-96">
            <h2 className="text-xl mb-3">Your Profile</h2>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <button onClick={logout}>logout</button>
        </section>
    )
}

export default UserProfile