import { Navigate } from "react-router";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import { Thread, ThreadForm } from "../types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { hobbyDb } from "../firebase/firebaseConfig";
import ThreadCard from "./ThreadCard";

const UserProfile = () => {

    const { appUser } = useUser();
    const [userThreads, setUserThreads] = useState<Thread[]>([]);
    const [loadingUserThreads, setLoadingUserThreads] = useState<boolean>(false);

    const getUserThreads = async () => {
        setLoadingUserThreads(true);
        const pendingThreads: Thread[] = [];
        const userThreadQuery = query(collection(hobbyDb, "Threads"), where("appUser", "==", appUser?.uid as string));
        const querySnapshot = await getDocs(userThreadQuery);

        querySnapshot.forEach((doc) => {
            //doc.data() gives all thread info and doc.id gives unique id for thread
            //type assertion because programmer knows which form the data is in
            pendingThreads.push({ ...doc.data() as ThreadForm, uid: doc.id })
        });
        setUserThreads(pendingThreads);
        setLoadingUserThreads(false);
    }

    useEffect(() => {
        if (appUser) {
            getUserThreads();
        }
    }, [appUser]);

    return (
        <>
            {!appUser && <Navigate to={"/login"} />}
            <section>
                <article className="flex flex-col items-center border-2 border-black h-96 pt-6 w-96">
                    <h2 className="text-xl mb-3">Your Profile</h2>
                    <p>{appUser?.username}</p>
                    <p>{appUser?.email}</p>
                </article>
            </section>
            <section>
                <h3 className="text-center mt-10 text-3xl text-amber-600">Your threads</h3>
                {loadingUserThreads ? (
                    <p className="mt-6">Loading user threads...</p>
                ) : userThreads.length === 0 ? (
                    <p className="mt-6">No user threads found</p>
                ) : (
                    userThreads.map((userThread, index) => <ThreadCard key={index} thread={userThread} />)
                )}
            </section>
        </>
    )
}

export default UserProfile