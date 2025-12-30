'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export type Role = "jobseeker" | "recruiter" | "admin"

export interface User {
  id: string
  name?: string
  role: Role
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  authLoading: boolean
  actionLoading: boolean
  error: string | null
  login: (token: string, user: User) => void
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🔥 HYDRATE AUTH STATE
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth")
      if (stored) {
        const parsed = JSON.parse(stored)
        setUser(parsed.user)
        setToken(parsed.token)
      }
    } catch {
      localStorage.removeItem("auth")
    } finally {
      setAuthLoading(false)
    }
  }, [])

  const login = (token: string, user: User) => {
    setActionLoading(true)
    try {
      setUser(user)
      setToken(token)
      localStorage.setItem("auth", JSON.stringify({ token, user }))
      if (user.role === 'admin') router.replace('/admin/dashboard')
      else if (user.role === 'recruiter') router.replace("/recruiter/dashboard")
      else router.replace('/jobseeker/dashboard')
    } catch {
      setError("Login failed")
    } finally {
      setActionLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth")
    router.replace("/login")
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        authLoading,
        actionLoading,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider")
  return ctx
}
