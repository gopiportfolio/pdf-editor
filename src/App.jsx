"use client"

import { useState } from "react"
import { authService } from "./components/services/authService"
import LoginPage from "./components/pages/LoginPage"
import DashboardPage from "./components/pages/DashboardPage"
import "./components/styles/index.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (username, password) => {
    const user = authService.authenticate(username, password)
    if (user) {
      setIsAuthenticated(true)
      setCurrentUser(user)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <DashboardPage user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
