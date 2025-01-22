import { Link } from 'react-router'

const Sidebar = () => {

    const categories: string[] = ["Games", "Movies", "Tv", "Gym"];

    return (
        <nav className='bg-amber-500 fixed flex-col h-full w-28 flex items-center text-white'>
            <section className='mt-14 flex-col flex'>
            <Link className="my-4" to={"/"}>All</Link>
            {categories.map((category, index) => <Link key={index} className="my-4" to={`/threads/${category.toLowerCase()}`}>{category}</Link>)}
            </section>
        </nav>
    )
}

export default Sidebar