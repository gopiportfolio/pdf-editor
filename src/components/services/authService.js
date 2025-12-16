const VALID_CREDENTIALS = {
  admin: "password",
  user: "user123",
}

export const authService = {
  authenticate: (username, password) => {
    if (VALID_CREDENTIALS[username] === password) {
      return {
        username,
        id: Math.random().toString(36).substr(2, 9),
        loginTime: new Date(),
      }
    }
    return null
  },

  logout: () => {
    // Clear session
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("currentUser"))
  },
}
