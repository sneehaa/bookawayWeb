import React from "react";
import { Link } from "react-router-dom";
import '../../styles/sidebar.css'

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/bookings">Bookings</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
