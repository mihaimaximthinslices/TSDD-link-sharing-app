import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
  })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
