// @ts-ignore
import "./styles.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserSearch from "./components/UserSearch";
import UserEdit from "./components/UserEdit";
import { fetchUsers, saveUser } from "./api/usersApi";

export default function App() {
    const [users, setUsers] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    useEffect(() => {
        fetchUsers().then((userList) => setUsers(userList));
    }, []); // it would be only executed on mounting

    const addUserClickHandler = () => setShowAddUserModal(true);
    const addUserCloseHandler = () => setShowAddUserModal(false);
    const submitUserHandler = async (user) => {
        // send user to API
        try {
            await saveUser(user);
            const refreshedList = await fetchUsers();
            setUsers(refreshedList);
        } catch (error) {
            alert(`Error saving user: ${user.firstName} ${user.lastName}`);
            console.error(error);
        } finally {
            alert(
                `User: ${user.firstName} ${user.lastName} has been successfully saved`,
            );
            setShowAddUserModal(false);
        }
    };

    const userUpdateHandler = async () => {
        try {
            const refreshedList = await fetchUsers();
            setUsers(refreshedList);
        } catch (error) {
            alert("Error refreshing user list");
            console.error(error);
        }
    };

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} onUserUpdate={userUpdateHandler} />
                    <button
                        className="btn-add btn"
                        onClick={addUserClickHandler}
                    >
                        Add new user
                    </button>
                    {showAddUserModal && (
                        <UserEdit
                            onClose={addUserCloseHandler}
                            onSubmit={submitUserHandler}
                        />
                    )}

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>
    );
}
