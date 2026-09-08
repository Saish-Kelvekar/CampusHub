import React from 'react'

const DashboardNavbar = () => {
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
                </div>
            </nav>
        </header>
  )
}

export default DashboardNavbar
