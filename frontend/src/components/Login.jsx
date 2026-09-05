import React, { useState } from 'react'

const Login = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    return (
        <div id="login-modal" aria-hidden={!isOpen} className={isOpen ? "open" : ""}>
            <div className="login-box">
                <button id="close-login" type="button" onClick={onClose}>
                    ×
                </button>

                <h2>Login</h2>

                <form id="login-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        console.log("Email:", email)
                        console.log("Password:", password)
                        setEmailError("")
                        setPasswordError("")

                        let valid = true
                        const emailPattern = /^[^\s@]+@(gmail\.com|icloud\.com)$/;
                        if (!emailPattern.test(email)) {
                            setEmailError("Enter valid email ")
                            valid = false
                        }

                        if (password.length<7) {
                            console.log("Password validation failed")
                            setPasswordError("Password should be at least 7 characters")
                            valid = false
                        }

                        if (!valid) {
                            return
                        }

                        console.log("Form is valid")
                        console.log("Email:", email)
                        console.log("Password:", password)
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

                    <p id="login-error-email" className={`login-error ${emailError ?"show":""}`}>{emailError}</p>

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

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>

        </div>

    )
}

export default Login
