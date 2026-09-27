// @ts-ignore
import "./styles.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import UserSearch from "./components/UserSearch";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList />

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>
    );
}
