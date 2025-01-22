import { useNavigate, useParams } from 'react-router'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { hobbyDb } from '../firebase/firebaseConfig';
import { Thread, ThreadForm } from '../types/types';
import useUser from '../hooks/useUser';

const ThreadPage = () => {

    const { uid } = useParams();
    const [thread, setThread] = useState<Thread | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<boolean>(false);

    const { appUser } = useUser();

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const getThread = async () => {
            const docRef = doc(hobbyDb, "Threads", `${uid}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setThread({ ...docSnap.data() as ThreadForm, uid: docSnap.id })
            } else {
                setLoadingError(true);
            }
        }
        setLoading(false);

        getThread();
    }, [])

    return (
        <>
            <button
                className='bg-amber-400 p-2 rounded-lg text-white mt-14'
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
            {loadingError ? (
                <p className='text-red-600 mt-12'>Error getting thread data!</p>
            ) : loading ? (
                <p>Loading thread...</p>
            ) : (
                <article className='w-5/12 my-10 px-2 py-2 bg-amber-500 text-white rounded-lg'>
                    <div className='text-2xl'>
                        <p>{thread?.title}</p>
                    </div>
                    <div className='mt-4'>
                        <pre className="whitespace-pre-wrap break-words font-sans">{thread?.content}</pre>
                    </div>
                    {/* Thread can be replied to only if you're logged in */}
                    {appUser &&
                        <div className='flex justify-end mt-4 mb-2'>
                            <button
                                className='bg-amber-400 p-2 rounded-lg'
                            >
                                Reply
                            </button>
                        </div>}
                </article>
            )}
        </>
    )
}

export default ThreadPage