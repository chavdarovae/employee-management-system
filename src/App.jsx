// @ts-ignore
import "./styles.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserSearch from "./components/UserSearch";

export default function App() {
    const [users, setUsers] = useState([]);

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

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} />
                    <button className="btn-add btn">Add new user</button>

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>
    );
}
