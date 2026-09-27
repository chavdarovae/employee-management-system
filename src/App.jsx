// @ts-ignore
import "./styles.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserSearch from "./components/UserSearch";
import UserEdit from "./components/UserEdit";

const baseUrl = "https://yukauijdnpyyejbrqlfh.supabase.co/rest/v1/users";
const apiKey = "sb_publishable_wALp7ccw7naKjMiuuoooUw_dje6rr5m";

export default function App() {
    const [users, setUsers] = useState([]);
    const [showEditUserModal, setShowEditUserModal] = useState(false);

    useEffect(() => {
        fetchUsers().then((userList) => setUsers(userList));
    }, []); // it would be only executed on mounting

    const addUserClickHandler = () => setShowEditUserModal(true);
    const addUserCloseHandler = () => setShowEditUserModal(false);
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
            setShowEditUserModal(false);
        }
    };

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} />
                    <button
                        className="btn-add btn"
                        onClick={addUserClickHandler}
                    >
                        Add new user
                    </button>
                    {showEditUserModal && (
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

async function fetchUsers() {
    const response = await fetch(baseUrl, {
        headers: {
            apiKey,
        },
    }).catch((err) => console.error("Error fetching users: " + err));

    // @ts-ignore
    const userList = await response.json();
    return userList;
}

async function saveUser(user) {
    return await fetch(baseUrl, {
        method: "POST",
        headers: {
            apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).catch((err) => console.error("Error saving user: " + user.lastName));
}
