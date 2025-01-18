import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react"
import { hobbyAuth, hobbyDb } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"
import { RegisterProps } from "../../types/types";
import useUser from "../../hooks/useUser";
import { Navigate } from "react-router";

const Register = ({ navigate }: RegisterProps) => {

  const { appUser } = useUser();

  type RegisterInfo = {
    username: string,
    email: string,
    password: string
  }

  const [registerInfo, setRegisterinfo] = useState<RegisterInfo>({ username: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterinfo({ ...registerInfo, [e.target.name]: e.target.value });
  }

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(hobbyAuth, registerInfo.email, registerInfo.password)
      const user = hobbyAuth.currentUser;
      if (user) {
        await setDoc(doc(hobbyDb, "Users", user.uid), {
          email: registerInfo.email,
          username: registerInfo.username,
          uid: user.uid
        })
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col items-center border-2 border-black h-96 pt-6">
      {appUser && <Navigate to={"/profile"} />}
      <h2 className="text-xl mb-3">Register</h2>
      <form onSubmit={registerUser} className="flex flex-col items-center">
        <input
          className="h-10 w-96 border-2 px-2 mb-5 mx-12"
          type="text" name="username"
          placeholder="Username"
          onChange={handleChange}
        />
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
          disabled={registerInfo.password === "" || registerInfo.username === ""}
          type="submit"
          className="border-2 text-white rounded-2xl bg-amber-500 px-3 py-3"
        >
          Register
        </button>
      </form>
    </section>
  )
}

export default Register