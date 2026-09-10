import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
const API_URL = "https://campushub-maw4.onrender.com/api"

const Account = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setError("You are not logged in.")
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Failed to load account")
                }

                const data = await response.json()
                setUser(data.user || data)
            } catch (error) {
                console.error("Error loading account:", error)
                setError("Could not load your account. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const initial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"

    return (
        <>
            <DashboardNavbar />
            <main className="account-page">
                <section className="account-header">
                    <p className="account-eyebrow">Profile</p>
                    <h1>My Account</h1>
                    <p>Manage your CampusHub profile and session.</p>
                </section>

                <section className="account-card">
                    {loading ? (
                        <div className="account-state">
                            <div className="account-skeleton-avatar" aria-hidden="true" />
                            <div className="account-skeleton-lines" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </div>
                            <p>Loading your account…</p>
                        </div>
                    ) : error && !user ? (
                        <div className="account-state">
                            <span className="account-avatar" aria-hidden="true">!</span>
                            <h2>Something went wrong</h2>
                            <p>{error}</p>
                            <div className="account-actions">
                                <button type="button" className="btn-account-primary" onClick={() => navigate("/login")}>
                                    Go to Login
                                </button>
                                <button type="button" className="btn-account-ghost" onClick={() => navigate("/dashboard")}>
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    ) : user ? (
                        <>
                            <div className="account-profile">
                                <span className="account-avatar" aria-hidden="true">{initial}</span>
                                <div>
                                    <h2>{user.name || "CampusHub User"}</h2>
                                    <p className="account-email">{user.email}</p>
                                    {user.role && (
                                        <span className="account-role">{user.role}</span>
                                    )}
                                </div>
                            </div>

                            <dl className="account-details">
                                <div>
                                    <dt>Name</dt>
                                    <dd>{user.name || "—"}</dd>
                                </div>
                                <div>
                                    <dt>Email</dt>
                                    <dd>{user.email || "—"}</dd>
                                </div>
                                <div>
                                    <dt>Role</dt>
                                    <dd className="account-role-text">{user.role || "Member"}</dd>
                                </div>
                            </dl>

                            <div className="account-actions">
                                <button type="button" className="btn-account-ghost" onClick={() => navigate("/dashboard")}>
                                    ← Back to Dashboard
                                </button>
                                <button type="button" className="btn-logout" onClick={handleLogout}>
                                    <span className="btn-icon" aria-hidden="true">⎋</span>
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : null}
                </section>
            </main>
        </>
    )
}

export default Account
