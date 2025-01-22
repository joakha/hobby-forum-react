import { useNavigate } from 'react-router'
import { Thread } from '../types/types'

type ThreadCardProps = {
    thread: Thread
}

const ThreadCard = ({ thread }: ThreadCardProps) => {

    let navigate = useNavigate();

    return (
        <article className='w-96 mx-5 my-10 px-2 py-2 bg-amber-500 text-white rounded-lg'>
            <div className='text-2xl'>
                <p>{thread.title}</p>
            </div>
            <div className='mt-4'>
                {thread.content.length > 500 ? (
                    <pre className="whitespace-pre-wrap break-words font-sans">{thread.content.slice(0, 499)}...</pre>
                ) : (
                    <pre className="whitespace-pre-wrap break-words font-sans">{thread.content}</pre>
                )}
            </div>
            <div className='flex justify-end mt-4 mb-2'>
                <button
                    className='bg-amber-400 p-2 rounded-lg'
                    onClick={() => navigate(`/thread/${thread.uid}`)}
                >
                    Show full thread
                </button>
            </div>
        </article>
    )
}

export default ThreadCard