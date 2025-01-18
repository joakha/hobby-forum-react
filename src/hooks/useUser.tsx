import { UserContext } from '../context/UserProvider'
import { useContext } from 'react'

const useUser = () => {

    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Use this hook within the UserProvider component!");
    }

    return context
}

export default useUser