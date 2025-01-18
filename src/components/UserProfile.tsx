import useUser from "../hooks/useUser";

const UserProfile = () => {

    const { appUser } = useUser();

    return (
        <section className="flex flex-col items-center border-2 border-black h-96 pt-6 w-96">
            <h2 className="text-xl mb-3">Your Profile</h2>
            <p>{appUser?.username}</p>
            <p>{appUser?.email}</p>
        </section>
    )
}

export default UserProfile