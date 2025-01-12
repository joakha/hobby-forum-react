import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, SyntheticEvent, useState } from "react"
import { hobbyAuth, hobbyDb } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {

  let navigate = useNavigate();

  type LoginInfo = {
    email: string,
    password: string
  }

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      signInWithEmailAndPassword(hobbyAuth, loginInfo.email, loginInfo.password)
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col items-center border-2 border-black h-96 pt-6">
      <h2 className="text-xl mb-3">Login</h2>
      <form onSubmit={loginUser} className="flex flex-col items-center mb-12">
        <input
          className="h-10 w-96 border-2 px-2 mb-5 mx-12"
          type="email" name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="h-10 w-96 border-2 px-2 mb-5"
          type="password" name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loginInfo.password === "" || loginInfo.email === ""}
          type="submit"
          className="border-2 text-white rounded-2xl bg-amber-500 px-3 py-3"
        >
          Login
        </button>
      </form>
      <div>
        <p>Not a user? <Link className="text-amber-500" to={"/register"}>Register here</Link></p>
      </div>
    </section>
  )
}

export default Login