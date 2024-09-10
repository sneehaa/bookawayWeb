// AdminUsers.js
import React, { useState, useEffect } from 'react';
import { getAllusers } from '../../apis/Api';
import '../../styles/admin.css';
import AdminSidebar from './AdminSideBar';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllusers();
                if (response.data.success) {
                    setUsers(response.data.users);
                    setLoading(false);
                } else {
                    setError(response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                setError("Failed to fetch users.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="admin-container">
            <AdminSidebar className="admin-sidebar" />
            <div className="table-container">
                <h2>Users</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
