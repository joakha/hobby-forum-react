import { Routes, Route, useNavigate } from "react-router";
import Navbar from "./components/Navbar"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import ThreadPage from "./components/ThreadPage";
import Sidebar from "./components/Sidebar";

function App() {

  let navigate = useNavigate();

  return (
    <>
      <Navbar navigate={navigate} />
      <Sidebar />
      <main className="flex flex-col items-center ml-48">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register navigate={navigate} />} />
          <Route path="/login" element={<Login navigate={navigate} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="thread/:uid" element={<ThreadPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
