import { createContext, ReactNode, useEffect, useState } from "react"
import { hobbyAuth, hobbyDb } from "../firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { User } from "firebase/auth"
import { UserInfo } from "../types/types"

type UserContextType = {
  appUser: UserInfo | null,
  loggedIn: boolean,
  loadingUserInfo: boolean
}

type UserProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {

  const [appUser, setAppUser] = useState<UserInfo | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(false);

  useEffect(() => {
    const getUserInfo = async (user: User | null) => {
      setLoadingUserInfo(true)
      if (user) {
        const docRef = doc(hobbyDb, "Users", user.uid)
        const docSnap = await getDoc(docRef);
        //docSnap includes all needed user info
        setAppUser(docSnap.data() as UserInfo);
        setLoggedIn(true);
      } else {
        setAppUser(null);
        setLoggedIn(false);
      }
      setLoadingUserInfo(false);
    }

    const subToAuthChanges = onAuthStateChanged(hobbyAuth, getUserInfo);
    return subToAuthChanges
  }, [])

  const userProviderValue: UserContextType = {
    appUser,
    loggedIn,
    loadingUserInfo
  }

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider