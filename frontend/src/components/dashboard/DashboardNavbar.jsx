import React from 'react'
import { useNavigate } from 'react-router-dom'
const DashboardNavbar = () => {
    const navigate = useNavigate()
    return (
        <header>
            <nav className="dashboard-navbar">
                <div className="logo">
                    <h2>CampusHub</h2>
                </div>

                <div className="dashboard-nav-links">
                    <a href="#dashboard">Dashboard</a>
                    <a href="#announcements">Announcements</a>
                    <a href="#events">Events</a>
                    <a href="#notes">Notes</a>
                    <button type="button" onClick={() => navigate("/account")}>
                        Account
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default DashboardNavbar
