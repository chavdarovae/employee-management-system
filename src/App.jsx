// @ts-ignore
import "./styles.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserSearch from "./components/UserSearch";
import UserEdit from "./components/UserEdit";

export default function App() {
    const [users, setUsers] = useState([]);
    const [showEditUserModal, setShowEditUserModal] = useState(false);

    useEffect(() => {
        fetch("https://yukauijdnpyyejbrqlfh.supabase.co/rest/v1/users", {
            headers: {
                apiKey: "sb_publishable_wALp7ccw7naKjMiuuoooUw_dje6rr5m",
            },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching users: " + err));
    }, []); // it would be only executed on mounting

    const addUserClickHandler = () => setShowEditUserModal(true);
    const addUserCloseHandler = () => setShowEditUserModal(false);

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
                        <UserEdit onClose={addUserCloseHandler} />
                    )}

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>
    );
}
