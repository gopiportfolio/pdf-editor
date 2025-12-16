"use client"

import { useState } from "react"
import "../styles/login.css"

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }
    const success = onLogin(username, password)
    if (!success) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">PDF Editor</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-hint">
          Demo: Use <strong>admin</strong> / <strong>password</strong>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
