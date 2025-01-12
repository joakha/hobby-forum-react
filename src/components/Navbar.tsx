import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className=' flex justify-between items-center w-full h-24 bg-amber-500 mb-32 text-white'>
        <h1 className="px-10 text-3xl"><Link to={"/"}>Hobby Forum Project</Link></h1>
        <div className="px-10 flex gap-6">
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </div>
    </nav>
  )
}

export default Navbar