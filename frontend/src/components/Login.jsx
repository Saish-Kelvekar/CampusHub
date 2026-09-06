import React, { useState } from 'react'
const API_URL = "https://campushub-maw4.onrender.com/api";
const Login = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    return (
        <div id="login-modal" aria-hidden={!isOpen} className={isOpen ? "open" : ""}>
            <div className="login-box">
                <button id="close-login" type="button" onClick={onClose}>
                    ×
                </button>

                <h2>Login</h2>

                <form id="login-form"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setApiError("")
                        setIsLoading(true)
                        
                        setEmailError("")
                        setPasswordError("")

                        let valid = true
                        const emailPattern = /^[^\s@]+@(gmail\.com|icloud\.com)$/;
                        if (!emailPattern.test(email)) {
                            setEmailError("Enter valid email ")
                            valid = false
                        }

                        if (password.length < 7) {
                            console.log("Password validation failed")
                            setPasswordError("Password should be at least 7 characters")
                            valid = false
                        }

                        if (!valid) {
                            setIsLoading(false)
                            return
                        }

                        try {
                            const respone = await fetch(`${API_URL}/auth/login`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email,
                                    password
                                }
                                )
                            })
                            const data = await respone.json();
                            if (!respone.ok) {
                                setApiError(data.message||"Login failed")
                                setIsLoading(false)
                                return

                            }
                            
                            localStorage.setItem("token", data.token)
                            const token = localStorage.getItem("token")
                            const meResponse = await fetch(`${API_URL}/auth/me`, {
                                method: "GET",
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            const meData = await meResponse.json()
                            console.log("current user:", meData)

                        } catch (error) {
                            console.error("Login failed: ", error)
                        }
                    }}
                >
                    <label htmlFor="login-email">Email</label>

                    <input
                        type="email"
                        id="login-email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p id="login-error-email" className={`login-error ${emailError ? "show" : ""}`}>{emailError}</p>

                    <label htmlFor="login-password">Password</label>

                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <p id="login-error-password" className={`login-error ${passwordError ? "show" : ""}`}>{passwordError}</p>
                    {apiError &&(
                        <p className='login-error show'>
                            {apiError}
                        </p>
                    )}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in ...":"Login"}
                    </button>
                </form>
            </div>

        </div>

    )
}

export default Login
