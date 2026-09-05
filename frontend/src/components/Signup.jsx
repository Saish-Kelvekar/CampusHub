import React, { useState } from 'react'

const Signup = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmError, setConfirmError] = useState("")
    return (
        <div id="signup-modal" aria-hidden={!isOpen} className={isOpen ? "open" : ""}>
            <div className="login-box">
                <button id="close-signup" type="button" onClick={onClose}>
                    ×
                </button>

                <h2>Sign Up</h2>

                <form id="signup-form"
                    onSubmit={(e) => {
                        e.preventDefault()

                        setEmailError("")
                        setPasswordError("")
                        setConfirmError("")

                        let valid = true
                        const emailPattern = /^[^\s@]+@(gmail\.com|icloud\.com)$/;
                        if (!emailPattern.test(email)) {
                            setEmailError("Enter valid email ")
                            valid = false
                        }
                        if (password.length < 7) {
                            setPasswordError("Password should be at least 7 characters")
                            valid = false
                        }

                        if (confirmPassword !== password) {
                            setConfirmError("Passwords do not match")
                            valid = false
                        }

                        if (!valid) {
                            return
                        }

                        console.log("Signup form is valid")
                        console.log(name, email, password)
                    }}
                >
                    <label htmlFor="signup-name">Name</label>

                    <input
                        type="text"
                        id="signup-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="signup-email">Email</label>

                    <input
                        type="email"
                        id="signup-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <p
                        id="signup-error-email"
                        className={`login-error ${emailError ? "show" : ""}`}
                    >{emailError}</p>

                    <label htmlFor="signup-password">Password</label>

                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >

                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <p
                        id="signup-error-password"
                        className={`login-error ${passwordError ? "show" : ""}`}
                    >{passwordError}</p>

                    <label htmlFor="signup-confirm-password">
                        Confirm Password
                    </label>

                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="signup-confirm-password"
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <p
                        id="signup-error-confirm"
                        className={`login-error ${confirmError ? "show" : ""}`}
                    >{confirmError}</p>

                    <button type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
