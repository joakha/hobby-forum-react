import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ThreadList from "./components/ThreadList";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Navbar />
      <main className=" flex justify-center w-full">
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
