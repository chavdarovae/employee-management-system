import { useState } from "react";
import Spinner from "./Spinner";
import UserListItem from "./UserListItem";
import UserDetail from "./UserDetail";
import ConfirmationDialog from "./ConfirmationDialog";
import UserAdd from "./UserAdd";
import { deleteUser, fetchUsers, updateUser } from "../api/usersApi";

export default function UserList({ users, onUserUpdate }) {
    const [selectedUserId, setSelectedUserId] = useState(false);
    const [showDetailUserModal, setShowDetailUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    const showUserDetailsHandler = (userId) => {
        setSelectedUserId(userId);
        setShowDetailUserModal(true);
    };

    const closeModalHandler = () => {
        setShowDetailUserModal(false);
        setShowEditUserModal(false);
        setShowDeleteUserModal(false);
        setSelectedUserId(null);
    };

    const showEditUserHandler = (userId) => {
        setSelectedUserId(userId);
        setShowEditUserModal(true);
    };

    const showDeleteUserHandler = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteUserModal(true);
    };

    const deleteUserHandler = async () => {
        try {
            await deleteUser(selectedUserId);
            onUserUpdate();
        } catch (error) {
            console.log(error);
        } finally {
            setShowDeleteUserModal(false);
        }
    };

    return (
        <>
            <div className="table-wrapper">
                {/* <Spinner /> */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>
                                First name
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Last name
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Email
                                <svg
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Phone
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {users.length === 0 && <Spinner />} */}
                        {users.map((user) => (
                            <UserListItem
                                key={user.id}
                                {...user}
                                onEditClick={showEditUserHandler}
                                onDeleteClick={showDeleteUserHandler}
                                onInfoClick={showUserDetailsHandler}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {showDetailUserModal && (
                <UserDetail
                    userId={selectedUserId}
                    onClose={closeModalHandler}
                />
            )}

            {showDeleteUserModal && (
                <ConfirmationDialog
                    actionType="Delete"
                    itemName={selectedUserId}
                    itemType="user account with id:"
                    onClose={closeModalHandler}
                    onConfirm={deleteUserHandler}
                />
            )}

            {showEditUserModal && (
                <UserAdd
                    userId={selectedUserId}
                    onClose={closeModalHandler}
                    onSuccess={onUserUpdate}
                />
            )}
        </>
    );
}
