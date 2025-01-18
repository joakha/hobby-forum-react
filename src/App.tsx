import { Routes, Route, useNavigate } from "react-router";
import Navbar from "./components/Navbar"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ThreadList from "./components/ThreadList";
import UserProfile from "./components/UserProfile";

function App() {

  let navigate = useNavigate();

  return (
    <>
      <Navbar navigate={navigate} />
      <main className=" flex justify-center w-full">
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path="/register" element={<Register navigate={navigate} />} />
          <Route path="/login" element={<Login navigate={navigate} />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
