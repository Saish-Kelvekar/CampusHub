import React, { useEffect, useState } from 'react'
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
const API_URL = "https://campushub-maw4.onrender.com/api"

const Account = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token")

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
                console.log("AUTH ME DATA:", data)
                console.log("KEYS:", Object.keys(data))
                setUser(data)
            } catch (error) {
                console.error("Error loading account:", error)
            }
        }

        loadUser()
    }, [])

    return (
        <>
            <DashboardNavbar />
            <main>
                <h1>Account</h1>

                {user && (
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                    </div>
                )}
            </main></>
    )
}

export default Account