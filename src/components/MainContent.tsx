import ThreadModal from "./ThreadModal";
import useUser from "../hooks/useUser";
import ThreadCard from "./ThreadCard";
import { collection, getDocs } from "firebase/firestore";
import { hobbyDb } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { Thread, ThreadForm } from "../types/types";

const MainContent = () => {

  const { appUser } = useUser();

  const [threads, setThreads] = useState<Thread[]>([]);

  const getThreads = async () => {
    const pendingThreads: Thread[] = [];
    const querySnapshot = await getDocs(collection(hobbyDb, "Threads"));
    querySnapshot.forEach((doc) => {
      //doc.data() gives all thread info and doc.id gives unique id for thread
      //type assertion because programmer knows which form the data is in
      pendingThreads.push({ ...doc.data() as ThreadForm, uid: doc.id })
    });
    setThreads(pendingThreads);
  }

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <>
      <section>
        {/* Render button and modal only if user is logged in */}
        {appUser && <ThreadModal />}
      </section>
      <section>
        {threads ? (
          threads.map((thread, index) => <ThreadCard thread={thread} key={index} />)
        ) : (
          <p>No threads to show!</p>
        )}
      </section>
    </>
  )
}

export default MainContent