import { createContext, ReactNode } from "react"

type UserInfo = {
    username: string,
    email: string
}

type UserContextType = {
    user: UserInfo,
    loading: boolean
}

type UserProviderProps = {
    children: ReactNode
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  return (
    <div>todo</div>
  )
}

export default UserProvider