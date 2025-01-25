"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UserResponse, SessionResponse, UserCreate } from "@/types/api"
import apiClient from "@/lib/api-client"
import Cookies from "js-cookie"

interface AuthContextType {
  user: UserResponse | null
  session: SessionResponse | null
  isLoading: boolean
  error: string | null
  login: (info: UserCreate) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [session, setSession] = useState<SessionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = Cookies.get("user")
      const storedSession = Cookies.get("session")

      if (storedUser && storedSession) {
        const parsedUser = JSON.parse(storedUser) as UserResponse
        const parsedSession = JSON.parse(storedSession) as SessionResponse

        if (new Date(parsedSession.expires_at) > new Date()) {
          setUser(parsedUser)
          setSession(parsedSession)
        } else {
          try {
            const ip_address = await fetch("https://api.ipify.org?format=json")
              .then((res) => res.json())
              .then((data) => data.ip)

            const newSession = await apiClient.createSession({ user_id: parsedUser.id, ip_address })
            setUser(parsedUser)
            setSession(newSession)
            Cookies.set("session", JSON.stringify(newSession), { expires: 1 })
          } catch (err) {
            console.error("Failed to create new session:", err)
            logout()
          }
        }
      }

      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async ({email, name}: UserCreate) => {
    try {
      setIsLoading(true)
      const userData = await apiClient.registerUser({ email, name })
      
      const ip_address = await fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => data.ip)
      
      const sessionData = await apiClient.createSession({ user_id: userData.id, ip_address })
      
      setUser(userData)
      setSession(sessionData)

      Cookies.set("user", JSON.stringify(userData), { expires: 1 })
      Cookies.set("session", JSON.stringify(sessionData), { expires: 1 })
    } catch (err) {
      setError("Login failed")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove("user")
    Cookies.remove("session")
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, error, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

