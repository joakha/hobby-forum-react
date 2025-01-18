import { Link, Navigate } from "react-router"
import useUser from "../hooks/useUser"
import { hobbyAuth } from "../firebase/firebaseConfig";
import { NavbarProps } from "../types/types";

const Navbar = ({ navigate }: NavbarProps) => {

  const { appUser } = useUser();

  const logout = async () => {
    try {
      await hobbyAuth.signOut();
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className=' flex justify-between items-center w-full h-24 bg-amber-500 mb-32 text-white'>
      {!appUser && <Navigate to={"/login"} />}
      <h1 className="px-10 text-3xl"><Link to={"/"}>Hobby Forum Project</Link></h1>
      <div className="px-10 flex gap-6">
        {appUser ? (
          <>
            <Link to={"/profile"}>Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar