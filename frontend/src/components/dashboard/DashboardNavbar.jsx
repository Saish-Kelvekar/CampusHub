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
                    <button
                        type="button"
                        className="btn-account"
                        onClick={() => navigate("/account")}
                    >
                        <span className="btn-icon" aria-hidden="true">👤</span>
                        Account
                    </button>
                    <button
                        type="button"
                        className="btn-logout"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        <span className="btn-icon" aria-hidden="true">⎋</span>
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default DashboardNavbar
