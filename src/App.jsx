// @ts-ignore
import "./styles.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import { fetchUsers } from "./api/usersApi";
import UserAdd from "./components/UserAdd";
import Pagination from "./components/Pagination";

export default function App() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    useEffect(() => {
        fetchUsers(page, pageSize).then((userList) => {
            setUsers(userList.data);
            setCount(userList.totalCount);
        });
    }, [page, pageSize]); // it would be only executed on mounting and on pageSize change

    const addUserClickHandler = () => setShowAddUserModal(true);
    const addUserCloseHandler = () => setShowAddUserModal(false);

    const refreshListHandler = async () => {
        try {
            const refreshedList = await fetchUsers();
            setUsers(refreshedList);
        } catch (error) {
            alert("Error refreshing user list");
            console.error(error);
        }
    };

    const pageSizeChangeHandler = (newPageSize) => setPageSize(newPageSize);
    const pageChangeHandler = (newPage) => setPage(newPage);

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <UserSearch />

                    <UserList users={users} onUserUpdate={refreshListHandler} />
                    <button
                        className="btn-add btn"
                        onClick={addUserClickHandler}
                    >
                        Add new user {count}
                    </button>

                    {showAddUserModal && (
                        <UserAdd
                            onClose={addUserCloseHandler}
                            onSuccess={refreshListHandler}
                        />
                    )}

                    <Pagination
                        page={page}
                        pageSize={pageSize}
                        totalCount={count}
                        onPageSizeChange={pageSizeChangeHandler}
                        onPageChange={pageChangeHandler}
                    />
                </section>
            </main>

            <Footer />
        </>
    );
}
